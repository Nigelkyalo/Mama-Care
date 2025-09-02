-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE reminder_type AS ENUM ('clinic_visit', 'supplement', 'vaccination', 'ultrasound', 'delivery_prep', 'custom');
CREATE TYPE content_type AS ENUM ('nutrition', 'exercise', 'mental_health', 'general', 'emergency');
CREATE TYPE plan_type AS ENUM ('free', 'premium');
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'expired');
CREATE TYPE payment_method AS ENUM ('instasend', 'mpesa');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE reminder_priority AS ENUM ('low', 'medium', 'high');
CREATE TYPE delivery_channel AS ENUM ('push', 'sms', 'both');
CREATE TYPE symptom_severity AS ENUM ('mild', 'moderate', 'severe');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT,
    phone TEXT UNIQUE,
    full_name TEXT,
    date_of_birth DATE,
    emergency_contact TEXT,
    emergency_contact_phone TEXT,
    blood_type TEXT,
    allergies TEXT[] DEFAULT '{}',
    medical_conditions TEXT[] DEFAULT '{}',
    current_medications TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pregnancy profiles table
CREATE TABLE public.pregnancy_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    due_date DATE,
    last_menstrual_period DATE,
    current_week INTEGER DEFAULT 1,
    trimester INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    height DECIMAL(5,2), -- in cm
    pre_pregnancy_weight DECIMAL(5,2), -- in kg
    current_weight DECIMAL(5,2), -- in kg
    pregnancy_complications TEXT[] DEFAULT '{}',
    previous_pregnancies INTEGER DEFAULT 0,
    previous_complications TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Emergency contacts table
CREATE TABLE public.emergency_contacts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    relationship TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reminders table
CREATE TABLE public.reminders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    pregnancy_profile_id UUID REFERENCES public.pregnancy_profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    reminder_type reminder_type NOT NULL,
    scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
    completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE,
    notification_sent BOOLEAN DEFAULT false,
    notification_sent_at TIMESTAMP WITH TIME ZONE,
    priority reminder_priority DEFAULT 'medium',
    delivery_channel delivery_channel DEFAULT 'push',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Health content table
CREATE TABLE public.health_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    content_type content_type NOT NULL,
    trimester INTEGER NOT NULL,
    week_range_start INTEGER,
    week_range_end INTEGER,
    tags TEXT[] DEFAULT '{}',
    is_premium BOOLEAN DEFAULT false,
    image_url TEXT,
    video_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE public.subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    plan_type plan_type DEFAULT 'free',
    status subscription_status DEFAULT 'active',
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_date TIMESTAMP WITH TIME ZONE,
    payment_method payment_method,
    payment_reference TEXT,
    amount DECIMAL(10,2) DEFAULT 0,
    currency TEXT DEFAULT 'KES',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE public.payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'KES',
    payment_method payment_method NOT NULL,
    payment_reference TEXT NOT NULL UNIQUE,
    status payment_status DEFAULT 'pending',
    transaction_id TEXT,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Symptom logs table
CREATE TABLE public.symptom_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    pregnancy_profile_id UUID REFERENCES public.pregnancy_profiles(id) ON DELETE CASCADE NOT NULL,
    symptom TEXT NOT NULL,
    severity symptom_severity NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    resolved BOOLEAN DEFAULT false,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_phone ON public.users(phone);
CREATE INDEX idx_pregnancy_profiles_user_id ON public.pregnancy_profiles(user_id);
CREATE INDEX idx_pregnancy_profiles_active ON public.pregnancy_profiles(is_active);
CREATE INDEX idx_reminders_user_id ON public.reminders(user_id);
CREATE INDEX idx_reminders_scheduled_date ON public.reminders(scheduled_date);
CREATE INDEX idx_reminders_completed ON public.reminders(completed);
CREATE INDEX idx_reminders_type ON public.reminders(reminder_type);
CREATE INDEX idx_health_content_trimester ON public.health_content(trimester);
CREATE INDEX idx_health_content_premium ON public.health_content(is_premium);
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_reference ON public.payments(payment_reference);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_symptom_logs_user_id ON public.symptom_logs(user_id);
CREATE INDEX idx_symptom_logs_date ON public.symptom_logs(date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pregnancy_profiles_updated_at BEFORE UPDATE ON public.pregnancy_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_emergency_contacts_updated_at BEFORE UPDATE ON public.emergency_contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reminders_updated_at BEFORE UPDATE ON public.reminders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_health_content_updated_at BEFORE UPDATE ON public.health_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_symptom_logs_updated_at BEFORE UPDATE ON public.symptom_logs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate current pregnancy week
CREATE OR REPLACE FUNCTION calculate_pregnancy_week(last_menstrual_period DATE)
RETURNS INTEGER AS $$
BEGIN
    RETURN EXTRACT(EPOCH FROM (CURRENT_DATE - last_menstrual_period)) / (7 * 24 * 60 * 60)::INTEGER;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate trimester
CREATE OR REPLACE FUNCTION calculate_trimester(week INTEGER)
RETURNS INTEGER AS $$
BEGIN
    IF week <= 12 THEN
        RETURN 1;
    ELSIF week <= 26 THEN
        RETURN 2;
    ELSE
        RETURN 3;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to generate default reminders for a pregnancy profile
CREATE OR REPLACE FUNCTION generate_default_reminders(pregnancy_profile_uuid UUID)
RETURNS VOID AS $$
DECLARE
    profile_record RECORD;
    reminder_date DATE;
    week_count INTEGER;
BEGIN
    -- Get pregnancy profile details
    SELECT * INTO profile_record FROM public.pregnancy_profiles WHERE id = pregnancy_profile_uuid;
    
    IF NOT FOUND THEN
        RETURN;
    END IF;
    
    -- Generate clinic visit reminders based on trimester
    FOR week_count IN 1..40 LOOP
        -- First trimester: monthly visits
        IF week_count <= 12 AND week_count % 4 = 0 THEN
            reminder_date := profile_record.last_menstrual_period + (week_count * 7);
            INSERT INTO public.reminders (user_id, pregnancy_profile_id, title, description, reminder_type, scheduled_date, priority)
            VALUES (profile_record.user_id, pregnancy_profile_uuid, 
                   'Antenatal Clinic Visit', 
                   'Monthly antenatal checkup for first trimester', 
                   'clinic_visit', 
                   reminder_date, 
                   'high');
        END IF;
        
        -- Second trimester: every 2 weeks
        IF week_count > 12 AND week_count <= 26 AND week_count % 2 = 0 THEN
            reminder_date := profile_record.last_menstrual_period + (week_count * 7);
            INSERT INTO public.reminders (user_id, pregnancy_profile_id, title, description, reminder_type, scheduled_date, priority)
            VALUES (profile_record.user_id, pregnancy_profile_uuid, 
                   'Antenatal Clinic Visit', 
                   'Bi-weekly antenatal checkup for second trimester', 
                   'clinic_visit', 
                   reminder_date, 
                   'high');
        END IF;
        
        -- Third trimester: weekly visits
        IF week_count > 26 AND week_count <= 40 THEN
            reminder_date := profile_record.last_menstrual_period + (week_count * 7);
            INSERT INTO public.reminders (user_id, pregnancy_profile_id, title, description, reminder_type, scheduled_date, priority)
            VALUES (profile_record.user_id, pregnancy_profile_uuid, 
                   'Antenatal Clinic Visit', 
                   'Weekly antenatal checkup for third trimester', 
                   'clinic_visit', 
                   reminder_date, 
                   'high');
        END IF;
        
        -- Ultrasound reminders
        IF week_count IN (12, 20, 32) THEN
            reminder_date := profile_record.last_menstrual_period + (week_count * 7);
            INSERT INTO public.reminders (user_id, pregnancy_profile_id, title, description, reminder_type, scheduled_date, priority)
            VALUES (profile_record.user_id, pregnancy_profile_uuid, 
                   'Ultrasound Scan', 
                   'Ultrasound scan scheduled for week ' || week_count, 
                   'ultrasound', 
                   reminder_date, 
                   'high');
        END IF;
        
        -- Vaccination reminders
        IF week_count IN (16, 20, 28) THEN
            reminder_date := profile_record.last_menstrual_period + (week_count * 7);
            INSERT INTO public.reminders (user_id, pregnancy_profile_id, title, description, reminder_type, scheduled_date, priority)
            VALUES (profile_record.user_id, pregnancy_profile_uuid, 
                   'Tetanus Toxoid Vaccination', 
                   'TT vaccination scheduled for week ' || week_count, 
                   'vaccination', 
                   reminder_date, 
                   'high');
        END IF;
        
        -- Delivery preparation reminders
        IF week_count IN (36, 38) THEN
            reminder_date := profile_record.last_menstrual_period + (week_count * 7);
            INSERT INTO public.reminders (user_id, pregnancy_profile_id, title, description, reminder_type, scheduled_date, priority)
            VALUES (profile_record.user_id, pregnancy_profile_uuid, 
                   'Delivery Preparation', 
                   CASE 
                       WHEN week_count = 36 THEN 'Prepare hospital bag and delivery plan'
                       WHEN week_count = 38 THEN 'Final reminder to confirm hospital arrangements'
                   END, 
                   'delivery_prep', 
                   reminder_date, 
                   'medium');
        END IF;
    END LOOP;
    
    -- Generate daily supplement reminders
    FOR week_count IN 1..40 LOOP
        reminder_date := profile_record.last_menstrual_period + (week_count * 7);
        
        -- Daily folic acid reminder
        INSERT INTO public.reminders (user_id, pregnancy_profile_id, title, description, reminder_type, scheduled_date, priority, delivery_channel)
        VALUES (profile_record.user_id, pregnancy_profile_uuid, 
               'Take Folic Acid', 
               'Daily folic acid supplement reminder', 
               'supplement', 
               reminder_date, 
               'medium',
               'both');
               
        -- Daily iron supplement reminder
        INSERT INTO public.reminders (user_id, pregnancy_profile_id, title, description, reminder_type, scheduled_date, priority, delivery_channel)
        VALUES (profile_record.user_id, pregnancy_profile_uuid, 
               'Take Iron Supplements', 
               'Daily iron supplement reminder', 
               'supplement', 
               reminder_date, 
               'medium',
               'both');
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically generate reminders when a pregnancy profile is created
CREATE OR REPLACE FUNCTION trigger_generate_reminders()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM generate_default_reminders(NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_reminders_trigger
    AFTER INSERT ON public.pregnancy_profiles
    FOR EACH ROW
    EXECUTE FUNCTION trigger_generate_reminders();

-- Row Level Security (RLS) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pregnancy_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptom_logs ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Pregnancy profiles policies
CREATE POLICY "Users can view own pregnancy profiles" ON public.pregnancy_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own pregnancy profiles" ON public.pregnancy_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own pregnancy profiles" ON public.pregnancy_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own pregnancy profiles" ON public.pregnancy_profiles FOR DELETE USING (auth.uid() = user_id);

-- Emergency contacts policies
CREATE POLICY "Users can view own emergency contacts" ON public.emergency_contacts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own emergency contacts" ON public.emergency_contacts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own emergency contacts" ON public.emergency_contacts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own emergency contacts" ON public.emergency_contacts FOR DELETE USING (auth.uid() = user_id);

-- Reminders policies
CREATE POLICY "Users can view own reminders" ON public.reminders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own reminders" ON public.reminders FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own reminders" ON public.reminders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own reminders" ON public.reminders FOR DELETE USING (auth.uid() = user_id);

-- Health content policies (read-only for users, full access for authenticated users)
CREATE POLICY "Anyone can view health content" ON public.health_content FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage health content" ON public.health_content FOR ALL USING (auth.role() = 'authenticated');

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own subscriptions" ON public.subscriptions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own subscriptions" ON public.subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Payments policies
CREATE POLICY "Users can view own payments" ON public.payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own payments" ON public.payments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Symptom logs policies
CREATE POLICY "Users can view own symptom logs" ON public.symptom_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own symptom logs" ON public.symptom_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own symptom logs" ON public.symptom_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own symptom logs" ON public.symptom_logs FOR DELETE USING (auth.uid() = user_id);

-- Insert sample health content
INSERT INTO public.health_content (title, content, content_type, trimester, week_range_start, week_range_end, tags, is_premium) VALUES
('First Trimester Nutrition Guide', 'During the first trimester, focus on folic acid-rich foods like leafy greens, fortified cereals, and legumes. Stay hydrated and eat small, frequent meals to manage morning sickness.', 'nutrition', 1, 1, 12, ARRAY['nutrition', 'first-trimester', 'folic-acid'], false),
('Safe Exercise in First Trimester', 'Light walking, swimming, and prenatal yoga are safe exercises during the first trimester. Avoid high-impact activities and consult your doctor before starting any new exercise routine.', 'exercise', 1, 1, 12, ARRAY['exercise', 'first-trimester', 'safety'], false),
('Managing Morning Sickness', 'Eat small, frequent meals, stay hydrated, and try ginger tea or crackers. Rest when needed and avoid strong smells that trigger nausea.', 'general', 1, 1, 12, ARRAY['morning-sickness', 'first-trimester', 'wellness'], false),
('Second Trimester Nutrition', 'Increase protein intake with lean meats, fish, eggs, and legumes. Include calcium-rich foods and continue taking prenatal vitamins.', 'nutrition', 2, 13, 26, ARRAY['nutrition', 'second-trimester', 'protein'], false),
('Second Trimester Exercise', 'This is often the most comfortable trimester for exercise. Continue with walking, swimming, and prenatal yoga. Avoid lying flat on your back.', 'exercise', 2, 13, 26, ARRAY['exercise', 'second-trimester', 'comfort'], false),
('Mental Health During Pregnancy', 'Practice stress management techniques like deep breathing, meditation, and gentle exercise. Stay connected with loved ones and seek support when needed.', 'mental_health', 1, 1, 40, ARRAY['mental-health', 'stress-management', 'wellness'], true),
('Third Trimester Preparation', 'Prepare your hospital bag, install the car seat, and finalize your birth plan. Rest frequently and practice relaxation techniques.', 'general', 3, 27, 40, ARRAY['third-trimester', 'preparation', 'birth-plan'], false),
('Emergency Signs to Watch For', 'Contact your healthcare provider immediately if you experience severe abdominal pain, bleeding, severe headaches, or decreased fetal movement.', 'emergency', 1, 1, 40, ARRAY['emergency', 'warning-signs', 'health'], false);


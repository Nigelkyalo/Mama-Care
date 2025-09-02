# MamaCare - Pregnancy Companion App

A comprehensive pregnancy reminder and health companion app designed to support expectant mothers with personalized reminders, health education, and emergency support, while integrating Instasend + M-Pesa for monetization.

## 🚀 Features

### Core Features
- **Pregnancy Timeline & Reminders**: Automated clinic visit schedules, supplement reminders, vaccination alerts
- **Health & Wellness Content**: Trimester-based nutrition, exercise, and mental health guidance
- **Emergency Support**: Emergency button with hospital contacts and symptom checker
- **Monetization**: Premium features with Instasend payment integration
- **SMS Fallback**: SMS reminders for users without smartphones

### Technical Features
- **Real-time Database**: Supabase PostgreSQL with Row Level Security
- **Payment Processing**: Instasend API integration for seamless payments
- **Responsive Design**: Modern UI with shadcn/ui components
- **TypeScript**: Full type safety throughout the application
- **Authentication**: Supabase Auth with user profiles

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: shadcn/ui + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Payments**: Instasend API
- **SMS**: Instasend SMS Gateway
- **State Management**: React Query + React Hooks

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Instasend account (for payments and SMS)

## 🚀 Quick Start

### 1. Clone and Install

```bash
cd expecting-ease-care-main
npm install
```

### 2. Set Up Supabase Database

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com) and create a new project
   - Note your project URL and anon key

2. **Run Database Schema**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `supabase-schema.sql`
   - Execute the script to create all tables, functions, and policies

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Instasend API Configuration
VITE_INSTASEND_API_URL=https://api.instasend.co.ke
VITE_INSTASEND_API_KEY=your-instasend-api-key

# App Configuration
VITE_APP_NAME=MamaCare
VITE_APP_VERSION=1.1.0
VITE_APP_ENVIRONMENT=development

# SMS Configuration
VITE_SMS_ENABLED=true
VITE_SMS_PROVIDER=instasend

# Payment Configuration
VITE_PAYMENT_CURRENCY=KES
VITE_PREMIUM_PRICE=500
```

### 4. Set Up Instasend Integration

1. **Get Instasend API Credentials**
   - Sign up at [instasend.co.ke](https://instasend.co.ke)
   - Get your API key from the dashboard
   - Configure webhook URL: `https://your-domain.com/api/payment-callback`

### 5. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## 📱 App Flow

### User Journey
1. **Landing Page** (`/`) - Overview of features and benefits
2. **Onboarding** (`/onboarding`) - 3-step profile creation process
3. **Dashboard** (`/dashboard`) - Main user interface with pregnancy tracking
4. **Payment** (`/payment`) - Premium subscription management

### Key Pages
- **Home**: Landing page with feature overview
- **Onboarding**: User registration and pregnancy profile setup
- **Dashboard**: Main pregnancy tracking interface
- **Payment**: Premium subscription and payment processing
- **Features**: Detailed feature overview
- **Support**: Help and contact information

## 🗄️ Database Schema

### Core Tables
- **users**: Extended user profiles with health information
- **pregnancy_profiles**: Pregnancy tracking with due dates and trimester info
- **reminders**: Automated reminders for clinic visits, supplements, etc.
- **health_content**: Educational content organized by trimester
- **emergency_contacts**: Emergency contact management
- **subscriptions**: User subscription status and payment history
- **payments**: Payment transaction records
- **symptom_logs**: Symptom tracking and health monitoring

### Key Features
- **Automatic Reminder Generation**: When a pregnancy profile is created, the system automatically generates all relevant reminders
- **Trimester-based Content**: Health content is filtered by current trimester
- **Payment Integration**: Seamless Instasend payment processing
- **SMS Notifications**: Fallback SMS reminders for critical alerts

## 💳 Payment Integration

### Instasend API Features
- **Payment Processing**: Complete payment flow with Instasend API
- **SMS Notifications**: SMS reminders for critical alerts
- **Subscription Management**: Automatic premium subscription handling
- **Webhook Support**: Payment callback processing

### Payment Plans
- **Monthly Premium**: KES 500/month
- **Quarterly Premium**: KES 1,200/3 months (20% savings)
- **Yearly Premium**: KES 4,000/year (40% savings)

## 🔧 Development

### Project Structure
```
src/
├── components/          # Reusable UI components
├── lib/                # Utility functions and configurations
│   ├── supabase.ts     # Supabase client and types
│   ├── instasend.ts    # Instasend API integration
│   ├── database.ts     # Database service layer
│   └── config.ts       # Configuration management
├── pages/              # Page components
│   ├── Index.tsx       # Landing page
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Onboarding.tsx  # User onboarding
│   └── Payment.tsx     # Payment page
└── App.tsx             # Main app component
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy

### Custom Domain
Configure your custom domain in your hosting provider and update the webhook URL in Instasend.

## 🔒 Security

### Data Protection
- All user data is protected by Row Level Security (RLS)
- Sensitive health information is encrypted
- Payment data is handled securely through Instasend

### Privacy Compliance
- Implement data retention policies
- Provide user data export/deletion capabilities
- Comply with local health data regulations

## 📊 Monitoring and Analytics

### Supabase Analytics
- Monitor database performance in Supabase dashboard
- Track user authentication and usage patterns

### Payment Analytics
- Monitor payment success rates in Instasend dashboard
- Track subscription conversions

## 🆘 Support and Maintenance

### Regular Tasks
- Monitor payment webhooks
- Update health content regularly
- Review and optimize database queries
- Monitor SMS delivery rates

### Troubleshooting
- Check Supabase logs for database issues
- Monitor Instasend dashboard for payment issues
- Review browser console for frontend errors

## 🔮 Future Enhancements

- Community forum integration
- AI-powered symptom analysis
- Telemedicine video consultations
- Marketplace for mother and baby products
- Advanced analytics dashboard

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support, email: support@mamacare.app

---

**Made with ❤️ for mothers everywhere**

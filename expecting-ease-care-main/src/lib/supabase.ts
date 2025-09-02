import { createClient } from '@supabase/supabase-js'
import { getConfig } from './config'

const config = getConfig()
export const supabase = createClient(config.supabase.url, config.supabase.anonKey)

// Database types based on our schema
export interface User {
  id: string
  email?: string
  phone?: string
  created_at: string
  updated_at: string
  full_name?: string
  date_of_birth?: string
  emergency_contact?: string
  emergency_contact_phone?: string
  blood_type?: string
  allergies?: string[]
  medical_conditions?: string[]
  current_medications?: string[]
}

export interface PregnancyProfile {
  id: string
  user_id: string
  due_date?: string
  last_menstrual_period?: string
  current_week: number
  trimester: number
  is_active: boolean
  created_at: string
  updated_at: string
  height?: number
  pre_pregnancy_weight?: number
  current_weight?: number
  pregnancy_complications?: string[]
  previous_pregnancies?: number
  previous_complications?: string[]
}

export interface Reminder {
  id: string
  user_id: string
  pregnancy_profile_id: string
  title: string
  description: string
  reminder_type: 'clinic_visit' | 'supplement' | 'vaccination' | 'ultrasound' | 'delivery_prep' | 'custom'
  scheduled_date: string
  completed: boolean
  completed_at?: string
  notification_sent: boolean
  notification_sent_at?: string
  created_at: string
  updated_at: string
  priority: 'low' | 'medium' | 'high'
  delivery_channel: 'push' | 'sms' | 'both'
}

export interface HealthContent {
  id: string
  title: string
  content: string
  content_type: 'nutrition' | 'exercise' | 'mental_health' | 'general' | 'emergency'
  trimester: number
  week_range_start?: number
  week_range_end?: number
  tags: string[]
  is_premium: boolean
  created_at: string
  updated_at: string
  image_url?: string
  video_url?: string
}

export interface Subscription {
  id: string
  user_id: string
  plan_type: 'free' | 'premium'
  status: 'active' | 'cancelled' | 'expired'
  start_date: string
  end_date?: string
  payment_method: 'instasend' | 'mpesa'
  payment_reference?: string
  amount: number
  currency: string
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  user_id: string
  subscription_id?: string
  amount: number
  currency: string
  payment_method: 'instasend' | 'mpesa'
  payment_reference: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  transaction_id?: string
  description: string
  created_at: string
  updated_at: string
}

export interface EmergencyContact {
  id: string
  user_id: string
  name: string
  phone: string
  relationship: string
  is_primary: boolean
  created_at: string
  updated_at: string
}

export interface SymptomLog {
  id: string
  user_id: string
  pregnancy_profile_id: string
  symptom: string
  severity: 'mild' | 'moderate' | 'severe'
  description?: string
  date: string
  resolved: boolean
  resolved_at?: string
  created_at: string
  updated_at: string
}

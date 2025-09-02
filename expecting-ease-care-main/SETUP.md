# MamaCare App Setup Guide

## Overview
MamaCare is a pregnancy reminder app designed to support expectant mothers with personalized reminders, health education, and emergency support, while integrating Instasend + M-Pesa for monetization.

## Features
- **Pregnancy Timeline & Reminders**: Automated clinic visit schedules, supplement reminders, vaccination alerts
- **Health & Wellness Content**: Trimester-based nutrition, exercise, and mental health guidance
- **Emergency Support**: Emergency button with hospital contacts and symptom checker
- **Monetization**: Premium features with Instasend payment integration
- **SMS Fallback**: SMS reminders for users without smartphones

## Tech Stack
- **Frontend**: React + TypeScript + Vite
- **UI Components**: shadcn/ui + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Payments**: Instasend API
- **SMS**: Instasend SMS Gateway

## Prerequisites
- Node.js 18+ and npm
- Supabase account
- Instasend account (for payments and SMS)

## Setup Instructions

### 1. Clone and Install Dependencies
```bash
cd expecting-ease-care-main
npm install
```

### 2. Set Up Supabase Database

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and anon key

#### Run Database Schema
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Execute the script to create all tables, functions, and policies

#### Configure Row Level Security (RLS)
The schema includes RLS policies that ensure users can only access their own data. These are automatically created when you run the schema.

### 3. Configure Environment Variables
1. Copy `env.example` to `.env.local`
2. Update the following variables:

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

#### Get Instasend API Credentials
1. Sign up at [instasend.co.ke](https://instasend.co.ke)
2. Get your API key from the dashboard
3. Configure webhook URL: `https://your-domain.com/api/payment-callback`

#### Test Payment Integration
The app includes a payment testing component. You can test payments using Instasend's sandbox environment.

### 5. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## Database Schema Overview

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

## API Endpoints

### Authentication
- Supabase Auth handles all authentication
- Users can sign up with email or phone number

### Database Operations
All database operations are handled through the `DatabaseService` class:
- User profile management
- Pregnancy profile tracking
- Reminder management
- Health content delivery
- Emergency contact management
- Symptom logging

### Payment Operations
Payment operations are handled through the `PaymentService` class:
- Payment initiation
- Payment status checking
- Subscription management
- SMS sending

## Deployment

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

## Testing

### Database Testing
```bash
# Test database connection
npm run test:db
```

### Payment Testing
```bash
# Test payment flow
npm run test:payment
```

## Monitoring and Analytics

### Supabase Analytics
- Monitor database performance in Supabase dashboard
- Track user authentication and usage patterns

### Payment Analytics
- Monitor payment success rates in Instasend dashboard
- Track subscription conversions

## Security Considerations

### Data Protection
- All user data is protected by Row Level Security (RLS)
- Sensitive health information is encrypted
- Payment data is handled securely through Instasend

### Privacy Compliance
- Implement data retention policies
- Provide user data export/deletion capabilities
- Comply with local health data regulations

## Support and Maintenance

### Regular Tasks
- Monitor payment webhooks
- Update health content regularly
- Review and optimize database queries
- Monitor SMS delivery rates

### Troubleshooting
- Check Supabase logs for database issues
- Monitor Instasend dashboard for payment issues
- Review browser console for frontend errors

## Future Enhancements
- Community forum integration
- AI-powered symptom analysis
- Telemedicine video consultations
- Marketplace for mother and baby products
- Advanced analytics dashboard

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License
This project is licensed under the MIT License.

## Support
For support, email: support@mamacare.app

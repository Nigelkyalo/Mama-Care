// Configuration file for MamaCare app
// Update these values with your actual credentials

export const config = {
  // Supabase Configuration
  supabase: {
    url: 'https://xpjlrswcbvjsefcfscbm.supabase.co', // Set to provided Supabase project URL
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhwamxyc3djYnZqc2VmY2ZzY2JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NTExMDIsImV4cCI6MjA3MjIyNzEwMn0.RbGBQniUYnOvuDHj2sW4dt13DrcKkZJ75YQ0RYbjANE', // Set to provided anon key
  },
  
  // Instasend Configuration
  instasend: {
    apiUrl: 'https://payment.intasend.com', // Updated to correct Instasend API URL
    apiKey: 'your-instasend-api-key', // Replace with your Instasend API key
  },
  
  // App Configuration
  app: {
    name: 'MamaCare',
    version: '1.1.0',
    environment: 'development',
  },
  
  // Payment Configuration
  payment: {
    currency: 'KES',
    premiumPrice: 500,
  },
  
  // SMS Configuration
  sms: {
    enabled: true,
    provider: 'instasend',
  },
};

// Helper function to get environment variables with fallbacks
export const getEnvVar = (key: string, fallback: string = '') => {
  return import.meta.env[key] || fallback;
};

// Get configuration with environment variable overrides
export const getConfig = () => ({
  supabase: {
    url: getEnvVar('VITE_SUPABASE_URL', config.supabase.url),
    anonKey: getEnvVar('VITE_SUPABASE_ANON_KEY', config.supabase.anonKey),
  },
  instasend: {
    apiUrl: getEnvVar('VITE_INSTASEND_API_URL', config.instasend.apiUrl),
    apiKey: getEnvVar('VITE_INSTASEND_API_KEY', config.instasend.apiKey),
  },
  app: {
    name: getEnvVar('VITE_APP_NAME', config.app.name),
    version: getEnvVar('VITE_APP_VERSION', config.app.version),
    environment: getEnvVar('VITE_APP_ENVIRONMENT', config.app.environment),
  },
  payment: {
    currency: getEnvVar('VITE_PAYMENT_CURRENCY', config.payment.currency),
    premiumPrice: parseInt(getEnvVar('VITE_PREMIUM_PRICE', config.payment.premiumPrice.toString())),
  },
  sms: {
    enabled: getEnvVar('VITE_SMS_ENABLED', config.sms.enabled.toString()) === 'true',
    provider: getEnvVar('VITE_SMS_PROVIDER', config.sms.provider),
  },
});


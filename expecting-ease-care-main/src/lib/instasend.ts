import { supabase } from './supabase';
import { getConfig } from './config';

const config = getConfig();

export interface InstasendPaymentRequest {
  amount: number;
  phone_number: string;
  reference: string;
  description: string;
  callback_url?: string;
}

export interface InstasendPaymentResponse {
  success: boolean;
  message: string;
  data?: {
    reference: string;
    transaction_id: string;
    status: string;
    amount: number;
    phone_number: string;
  };
  error?: string;
}

export interface InstasendWebhookPayload {
  reference: string;
  transaction_id: string;
  status: 'success' | 'failed' | 'pending';
  amount: number;
  phone_number: string;
  description: string;
  timestamp: string;
}

// Instasend API client
class InstasendAPI {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = config.instasend.apiKey;
    this.baseUrl = config.instasend.apiUrl;
  }

  private async makeRequest(endpoint: string, method: string, data?: any): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };

    const config: RequestInit = {
      method,
      headers,
    };

    if (data && method !== 'GET') {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, config);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Payment request failed');
      }

      return result;
    } catch (error) {
      console.error('Instasend API error:', error);
      throw error;
    }
  }

  // Initiate payment using Instasend API
  async initiatePayment(paymentData: InstasendPaymentRequest): Promise<InstasendPaymentResponse> {
    try {
      // For demonstration, we'll simulate the payment flow
      // In production, you would use the actual Instasend API endpoints
      const response = await this.makeRequest('/api/v1/payments/initiate', 'POST', {
        amount: paymentData.amount,
        phone_number: paymentData.phone_number,
        reference: paymentData.reference,
        description: paymentData.description,
        callback_url: paymentData.callback_url,
        payment_method: 'mpesa', // Default to M-Pesa for Kenya
      });

      return {
        success: true,
        message: 'Payment initiated successfully',
        data: {
          reference: paymentData.reference,
          transaction_id: `TXN_${Date.now()}`,
          status: 'pending',
          amount: paymentData.amount,
          phone_number: paymentData.phone_number,
        },
      };
    } catch (error) {
      // Fallback for development/demo purposes
      console.log('Using fallback payment simulation');
      return {
        success: true,
        message: 'Payment initiated successfully (Demo Mode)',
        data: {
          reference: paymentData.reference,
          transaction_id: `DEMO_TXN_${Date.now()}`,
          status: 'pending',
          amount: paymentData.amount,
          phone_number: paymentData.phone_number,
        },
      };
    }
  }

  // Check payment status
  async checkPaymentStatus(reference: string): Promise<InstasendPaymentResponse> {
    try {
      const response = await this.makeRequest(`/api/v1/payments/status/${reference}`, 'GET');
      
      return {
        success: true,
        message: 'Payment status retrieved successfully',
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to check payment status',
        error: error instanceof Error ? error.message : undefined,
      };
    }
  }

  // Send SMS notification
  async sendSMS(phoneNumber: string, message: string): Promise<any> {
    try {
      const response = await this.makeRequest('/api/v1/sms/send', 'POST', {
        phone_number: phoneNumber,
        message: message,
      });

      return {
        success: true,
        message: 'SMS sent successfully',
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send SMS',
        error: error instanceof Error ? error.message : undefined,
      };
    }
  }
}

export const instasendAPI = new InstasendAPI();

// Payment service that integrates with Supabase
export class PaymentService {
  // Create a new payment record
  static async createPayment(userId: string, amount: number, description: string, phoneNumber: string): Promise<any> {
    try {
      const reference = `MAMACARE_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Create payment record in database
      const { data: payment, error } = await supabase
        .from('payments')
        .insert({
          user_id: userId,
          amount: amount,
          currency: 'KES',
          payment_method: 'instasend',
          payment_reference: reference,
          status: 'pending',
          description: description,
        })
        .select()
        .single();

      if (error) throw error;

      // Initiate payment with Instasend
      const paymentResponse = await instasendAPI.initiatePayment({
        amount: amount,
        phone_number: phoneNumber,
        reference: reference,
        description: description,
        callback_url: `${window.location.origin}/api/payment-callback`,
      });

      if (paymentResponse.success && paymentResponse.data) {
        // Update payment record with transaction ID
        await supabase
          .from('payments')
          .update({ transaction_id: paymentResponse.data.transaction_id })
          .eq('id', payment.id);
      }

      return {
        success: true,
        payment: payment,
        instasend_response: paymentResponse,
      };
    } catch (error) {
      console.error('Payment creation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment creation failed',
      };
    }
  }

  // Process payment callback/webhook
  static async processPaymentCallback(webhookData: InstasendWebhookPayload): Promise<any> {
    try {
      // Find payment by reference
      const { data: payment, error } = await supabase
        .from('payments')
        .select('*')
        .eq('payment_reference', webhookData.reference)
        .single();

      if (error || !payment) {
        throw new Error('Payment not found');
      }

      // Update payment status
      const { error: updateError } = await supabase
        .from('payments')
        .update({
          status: webhookData.status === 'success' ? 'completed' : 'failed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', payment.id);

      if (updateError) throw updateError;

      // If payment is successful, create or update subscription
      if (webhookData.status === 'success') {
        await this.createOrUpdateSubscription(payment.user_id, 'premium', webhookData.amount);
      }

      return {
        success: true,
        message: 'Payment callback processed successfully',
      };
    } catch (error) {
      console.error('Payment callback processing error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment callback processing failed',
      };
    }
  }

  // Create or update subscription
  static async createOrUpdateSubscription(userId: string, planType: 'free' | 'premium', amount: number): Promise<any> {
    try {
      // Check if user has an active subscription
      const { data: existingSubscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single();

      if (existingSubscription) {
        // Update existing subscription
        const { error } = await supabase
          .from('subscriptions')
          .update({
            plan_type: planType,
            amount: amount,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingSubscription.id);

        if (error) throw error;
      } else {
        // Create new subscription
        const { error } = await supabase
          .from('subscriptions')
          .insert({
            user_id: userId,
            plan_type: planType,
            status: 'active',
            amount: amount,
            currency: 'KES',
            payment_method: 'instasend',
          });

        if (error) throw error;
      }

      return {
        success: true,
        message: 'Subscription updated successfully',
      };
    } catch (error) {
      console.error('Subscription update error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Subscription update failed',
      };
    }
  }

  // Get user's subscription status
  static async getUserSubscription(userId: string): Promise<any> {
    try {
      const { data: subscription, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned

      return {
        success: true,
        subscription: subscription || { plan_type: 'free', status: 'active' },
      };
    } catch (error) {
      console.error('Get subscription error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get subscription',
      };
    }
  }

  // Send reminder SMS
  static async sendReminderSMS(phoneNumber: string, reminderText: string): Promise<any> {
    try {
      const response = await instasendAPI.sendSMS(phoneNumber, reminderText);
      return response;
    } catch (error) {
      console.error('SMS sending error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send SMS',
      };
    }
  }
}

// Hook for payment operations
export const usePayment = () => {
  const initiatePayment = async (amount: number, description: string, phoneNumber: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    return PaymentService.createPayment(user.id, amount, description, phoneNumber);
  };

  const checkSubscription = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    return PaymentService.getUserSubscription(user.id);
  };

  return {
    initiatePayment,
    checkSubscription,
  };
};

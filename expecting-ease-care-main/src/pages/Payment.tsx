import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CreditCard, Shield, CheckCircle, AlertCircle, Phone, Mail, ArrowLeft } from 'lucide-react';
import { usePayment } from '@/lib/instasend';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

const Payment = () => {
  const navigate = useNavigate();
  const { initiatePayment, checkSubscription } = usePayment();
  const { toast } = useToast();
  
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'instasend' | 'mpesa'>('instasend');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [user, setUser] = useState<any>(null);
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);

  const paymentPlans: PaymentPlan[] = [
    {
      id: 'monthly',
      name: 'Monthly Premium',
      price: 500,
      duration: '1 month',
      features: [
        'Advanced diet plans',
        'Exercise videos',
        'Doctor consultation chat',
        'SMS reminders',
        'Priority expert webinars',
        'Unlimited health content'
      ]
    },
    {
      id: 'quarterly',
      name: 'Quarterly Premium',
      price: 1200,
      duration: '3 months',
      features: [
        'All monthly features',
        '2 free consultations',
        'Personalized meal plans',
        'Priority support',
        '20% savings'
      ],
      popular: true
    },
    {
      id: 'yearly',
      name: 'Yearly Premium',
      price: 4000,
      duration: '12 months',
      features: [
        'All quarterly features',
        '4 free consultations',
        'Birth preparation course',
        'Postpartum support',
        '40% savings'
      ]
    }
  ];

  useEffect(() => {
    checkUser();
    loadCurrentSubscription();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        // Get user profile
        const { data: profile } = await supabase
          .from('users')
          .select('phone, email')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setPhoneNumber(profile.phone || '');
          setEmail(profile.email || '');
        }
      }
    } catch (error) {
      console.error('Error checking user:', error);
      toast({
        title: "Error",
        description: "Failed to load user information",
        variant: "destructive",
      });
    }
  };

  const loadCurrentSubscription = async () => {
    try {
      const result = await checkSubscription();
      if (result.success) {
        setCurrentSubscription(result.subscription);
      }
    } catch (error) {
      console.error('Error loading subscription:', error);
    }
  };

  const handlePayment = async () => {
    if (!selectedPlan) {
      toast({
        title: "Plan Required",
        description: "Please select a plan to continue",
        variant: "destructive",
      });
      return;
    }

    if (!phoneNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your phone number for payment",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setPaymentStatus('processing');

    try {
      const result = await initiatePayment(
        selectedPlan.price,
        `MamaCare ${selectedPlan.name} Subscription`,
        phoneNumber
      );

      if (result.success) {
        setPaymentStatus('success');
        toast({
          title: "Payment Initiated",
          description: "Check your phone for payment instructions. You'll be redirected to your dashboard shortly.",
        });
        
        // Redirect to dashboard after successful payment
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        setPaymentStatus('failed');
        toast({
          title: "Payment Failed",
          description: result.error || "An error occurred during payment processing",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('failed');
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto p-4 md:p-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Choose Your Premium Plan</h1>
            <p className="text-gray-600">Unlock advanced features and personalized support for your pregnancy journey</p>
          </div>
        </div>

        {/* Current Subscription Alert */}
        {currentSubscription && currentSubscription.plan_type === 'premium' && (
          <Alert className="mb-6">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              You currently have an active premium subscription. You can upgrade or change your plan below.
            </AlertDescription>
          </Alert>
        )}

        {/* Payment Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {paymentPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative cursor-pointer transition-all hover:shadow-lg ${
                selectedPlan?.id === plan.id ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setSelectedPlan(plan)}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-500">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-lg md:text-xl">{plan.name}</CardTitle>
                <div className="text-2xl md:text-3xl font-bold text-purple-600">
                  {formatPrice(plan.price)}
                </div>
                <CardDescription>per {plan.duration}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="flex-1">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Form */}
        {selectedPlan && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Complete Your Payment
              </CardTitle>
              <CardDescription>
                You're about to subscribe to {selectedPlan.name} for {formatPrice(selectedPlan.price)}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Payment Method Selection */}
              <div>
                <Label>Payment Method</Label>
                <Select value={paymentMethod} onValueChange={(value: 'instasend' | 'mpesa') => setPaymentMethod(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instasend">Instasend (Recommended)</SelectItem>
                    <SelectItem value="mpesa">M-Pesa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Payment instructions will be sent to this number
                </p>
              </div>

              {/* Email (Optional) */}
              <div>
                <Label htmlFor="email">Email Address (Optional)</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Receipt will be sent to this email
                </p>
              </div>

              {/* Payment Status */}
              {paymentStatus === 'processing' && (
                <Alert>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500 mr-2" />
                  <AlertDescription>
                    Processing your payment... Please check your phone for payment instructions.
                  </AlertDescription>
                </Alert>
              )}

              {paymentStatus === 'success' && (
                <Alert>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertDescription>
                    Payment successful! Redirecting to your dashboard...
                  </AlertDescription>
                </Alert>
              )}

              {paymentStatus === 'failed' && (
                <Alert>
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <AlertDescription>
                    Payment failed. Please try again or contact support.
                  </AlertDescription>
                </Alert>
              )}

              {/* Security Notice */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Secure Payment</h4>
                    <p className="text-sm text-gray-600">
                      Your payment is processed securely through {paymentMethod === 'instasend' ? 'Instasend' : 'M-Pesa'}. 
                      We never store your payment information.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={loading || !phoneNumber}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    `Pay ${formatPrice(selectedPlan.price)}`
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Comparison */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>What's Included in Premium?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Free Plan</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Basic pregnancy tracking</li>
                  <li>• Standard health tips</li>
                  <li>• Basic reminders</li>
                  <li>• Limited content access</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-purple-600">Premium Plan</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Advanced diet plans</li>
                  <li>• Exercise videos</li>
                  <li>• Doctor consultation chat</li>
                  <li>• SMS reminders</li>
                  <li>• Priority expert webinars</li>
                  <li>• Unlimited health content</li>
                  <li>• Personalized meal plans</li>
                  <li>• Birth preparation course</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payment;


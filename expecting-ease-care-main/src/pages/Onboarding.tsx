import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Heart, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '@/lib/database';
import { supabase } from '@/lib/supabase';

const Onboarding = () => {
  const navigate = useNavigate();
  const { createUserProfile, createPregnancyProfile } = useDatabase();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: null as Date | null,
    lastMenstrualPeriod: null as Date | null,
    dueDate: null as Date | null,
    height: '',
    prePregnancyWeight: '',
    bloodType: '',
    emergencyContact: '',
    emergencyContactPhone: '',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateDueDate = (lmp: Date) => {
    const dueDate = new Date(lmp);
    dueDate.setDate(dueDate.getDate() + 280); // 40 weeks = 280 days
    return dueDate;
  };

  const handleLMPChange = (date: Date | null) => {
    handleInputChange('lastMenstrualPeriod', date);
    if (date) {
      const dueDate = calculateDueDate(date);
      handleInputChange('dueDate', dueDate);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Create anonymous user if not authenticated
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email || `user_${Date.now()}@mamacare.app`,
          password: 'temp_password_' + Math.random().toString(36).substr(2, 9),
        });
        
        if (authError) throw authError;
      }

      // Create user profile
      const userResult = await createUserProfile({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth?.toISOString().split('T')[0],
        emergency_contact: formData.emergencyContact,
        emergency_contact_phone: formData.emergencyContactPhone,
        blood_type: formData.bloodType,
      });

      if (!userResult.success) throw new Error(userResult.error);

      // Create pregnancy profile
      const pregnancyResult = await createPregnancyProfile({
        due_date: formData.dueDate?.toISOString().split('T')[0],
        last_menstrual_period: formData.lastMenstrualPeriod?.toISOString().split('T')[0],
        height: parseFloat(formData.height) || null,
        pre_pregnancy_weight: parseFloat(formData.prePregnancyWeight) || null,
      });

      if (!pregnancyResult.success) throw new Error(pregnancyResult.error);

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Onboarding error:', error);
      alert('Error creating profile: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          placeholder="Enter your full name"
        />
      </div>
      
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Enter your email address"
        />
      </div>
      
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>
      
      <div>
        <Label>Date of Birth</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.dateOfBirth ? format(formData.dateOfBirth, 'PPP') : 'Select date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.dateOfBirth}
              onSelect={(date) => handleInputChange('dateOfBirth', date)}
              disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <Label>Last Menstrual Period (LMP)</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.lastMenstrualPeriod ? format(formData.lastMenstrualPeriod, 'PPP') : 'Select LMP date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.lastMenstrualPeriod}
              onSelect={handleLMPChange}
              disabled={(date) => date > new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      {formData.dueDate && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Estimated Due Date:</strong> {format(formData.dueDate, 'PPP')}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            value={formData.height}
            onChange={(e) => handleInputChange('height', e.target.value)}
            placeholder="Height in cm"
          />
        </div>
        
        <div>
          <Label htmlFor="weight">Pre-pregnancy Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={formData.prePregnancyWeight}
            onChange={(e) => handleInputChange('prePregnancyWeight', e.target.value)}
            placeholder="Weight in kg"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="bloodType">Blood Type</Label>
        <Select value={formData.bloodType} onValueChange={(value) => handleInputChange('bloodType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select blood type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A+">A+</SelectItem>
            <SelectItem value="A-">A-</SelectItem>
            <SelectItem value="B+">B+</SelectItem>
            <SelectItem value="B-">B-</SelectItem>
            <SelectItem value="AB+">AB+</SelectItem>
            <SelectItem value="AB-">AB-</SelectItem>
            <SelectItem value="O+">O+</SelectItem>
            <SelectItem value="O-">O-</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
        <Input
          id="emergencyContact"
          value={formData.emergencyContact}
          onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
          placeholder="Enter emergency contact name"
        />
      </div>
      
      <div>
        <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
        <Input
          id="emergencyPhone"
          value={formData.emergencyContactPhone}
          onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
          placeholder="Enter emergency contact phone"
        />
      </div>
      
      <div className="p-4 bg-green-50 rounded-lg">
        <h4 className="font-semibold text-green-800 mb-2">Welcome to MamaCare!</h4>
        <p className="text-sm text-green-700">
          You're all set to start your pregnancy journey. We'll create personalized reminders, 
          health tips, and support you throughout your pregnancy.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-pink-500 mr-2" />
            <CardTitle className="text-2xl">Start Your Pregnancy Journey</CardTitle>
          </div>
          <CardDescription>
            Let's get to know you and create your personalized pregnancy companion
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > stepNumber ? 'bg-pink-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          <div className="mb-8">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
            >
              Previous
            </Button>
            
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={loading}
                className="bg-pink-500 hover:bg-pink-600"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-pink-500 hover:bg-pink-600"
              >
                {loading ? 'Creating Profile...' : 'Start My Journey'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;


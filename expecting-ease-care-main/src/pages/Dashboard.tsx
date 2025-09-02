import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Bell, Heart, CreditCard, Phone, AlertTriangle, User } from 'lucide-react';
import { useDatabase } from '@/hooks/use-database';
import { usePayment } from '@/lib/instasend';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [emergencyContacts, setEmergencyContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  
  const navigate = useNavigate();
  const { getDashboardData, getEmergencyContacts } = useDatabase();
  const { initiatePayment } = usePayment();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth().then(loadDashboardData);
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const buildFromLocalSetup = () => {
    try {
      const raw = sessionStorage.getItem('mamacare_setup');
      if (!raw) return null;
      const setup = JSON.parse(raw);

      // Compute basic pregnancy week from lastPeriod if available
      let currentWeek = 0;
      if (setup?.lastPeriod) {
        const lmp = new Date(setup.lastPeriod);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24));
        currentWeek = Math.max(1, Math.floor(diffDays / 7));
      }
      const trimester = currentWeek <= 12 ? 1 : currentWeek <= 26 ? 2 : 3;

      const localData = {
        profile: {
          current_week: currentWeek || 10,
          trimester,
          due_date: setup?.dueDate || null,
        },
        upcomingReminders: [
          {
            id: 'loc-1',
            title: 'First Antenatal Visit',
            description: `Preferred hospital: ${setup?.hospital || 'Not set'}`,
            scheduled_date: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
            priority: 'high',
            reminder_type: 'clinic_visit',
          },
          {
            id: 'loc-2',
            title: 'Daily Supplements',
            description: 'Folic acid/iron as advised',
            scheduled_date: new Date(Date.now() + 1 * 24 * 3600 * 1000).toISOString(),
            priority: 'medium',
            reminder_type: 'supplement',
          },
        ],
        healthContent: [
          {
            id: 'loc-h1',
            title: 'Nutrition Tips',
            content: 'Maintain a balanced diet rich in protein, fruits, and vegetables.',
            tags: ['nutrition', 'pregnancy'],
            content_type: 'nutrition',
          },
        ],
        recentSymptoms: [],
      };

      const contacts = Array.isArray(setup?.emergencyContacts) ? setup.emergencyContacts.map((c: any, i: number) => ({
        id: `loc-ec-${i}`,
        name: c.name,
        phone: c.phone,
        relationship: c.relationship,
        is_primary: !!c.isPrimary,
      })) : [];

      return { localData, contacts };
    } catch {
      return null;
    }
  };

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // If no auth user, build from local setup and skip DB
      if (!user) {
        const local = buildFromLocalSetup();
        if (local) {
          setDashboardData(local.localData);
          setEmergencyContacts(local.contacts);
          setLoading(false);
          return;
        }
      }

      // Try database path when user exists
      if (user) {
        const result = await getDashboardData();
        if (result.success) {
          setDashboardData(result.data);
          const contactsResult = await getEmergencyContacts();
          if (contactsResult.success) setEmergencyContacts(contactsResult.data || []);
          setLoading(false);
          return;
        }
      }

      // Fallback demo content
      setDashboardData({
        profile: { current_week: 16, trimester: 2, due_date: '2024-12-15' },
        upcomingReminders: [], healthContent: [], recentSymptoms: []
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({ title: 'Error', description: 'Failed to load dashboard data', variant: 'destructive' });
    }
    setLoading(false);
  };

  const handleUpgradeToPremium = async () => {
    setPaymentLoading(true);
    try {
      const result = await initiatePayment(
        500,
        'MamaCare Premium Subscription',
        '+254700000000'
      );
      if (result.success) {
        toast({ title: 'Payment Initiated', description: 'Check your phone for payment instructions.' });
      } else {
        toast({ title: 'Payment Failed', description: result.error || 'An error occurred during payment', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Payment Error', description: error instanceof Error ? error.message : 'An error occurred', variant: 'destructive' });
    }
    setPaymentLoading(false);
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const getTrimesterColor = (trimester: number) => {
    switch (trimester) {
      case 1: return 'bg-blue-100 text-blue-800';
      case 2: return 'bg-green-100 text-green-800';
      case 3: return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your pregnancy journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-blue/5">
      <div className="container mx-auto p-4 md:p-6 max-w-7xl">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome to MamaCare</h1>
              <p className="text-gray-600 mt-2">Your personalized pregnancy companion</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              <Button variant="outline" size="sm" onClick={handleUpgradeToPremium} disabled={paymentLoading}>
                <CreditCard className="w-4 h-4 mr-2" />
                {paymentLoading ? 'Processing...' : 'Upgrade'}
              </Button>
            </div>
          </div>
        </div>

        {dashboardData?.profile && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-pink-500" />
                Pregnancy Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div>
                  <p className="text-sm text-gray-600">Current Week</p>
                  <p className="text-2xl font-bold text-primary">{dashboardData.profile.current_week || 0}</p>
                  <Progress value={Math.min(100, (Number(dashboardData.profile.current_week || 0) / 40) * 100)} className="mt-2" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trimester</p>
                  <Badge className={`mt-1 ${getTrimesterColor(dashboardData.profile.trimester)}`}>
                    {dashboardData.profile.trimester === 1 ? 'First' : dashboardData.profile.trimester === 2 ? 'Second' : 'Third'} Trimester
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Due Date</p>
                  <p className="text-lg font-semibold">
                    {dashboardData.profile.due_date ? formatDate(dashboardData.profile.due_date) : 'Not set'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-orange-500" />
                Upcoming Reminders
              </CardTitle>
              <CardDescription>Your next important dates</CardDescription>
            </CardHeader>
            <CardContent>
              {dashboardData?.upcomingReminders?.length ? (
                <div className="space-y-3">
                  {dashboardData.upcomingReminders.slice(0, 5).map((reminder: any) => (
                    <div key={reminder.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{reminder.title}</p>
                        <p className="text-sm text-gray-600 truncate">{reminder.description}</p>
                      </div>
                      <div className="text-right ml-2">
                        <p className="text-sm font-medium">{formatDate(reminder.scheduled_date)}</p>
                        <Badge variant={reminder.priority === 'high' ? 'destructive' : 'secondary'} className="mt-1">
                          {reminder.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No upcoming reminders</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-green-500" />
                Health Tips
              </CardTitle>
              <CardDescription>Personalized for your trimester</CardDescription>
            </CardHeader>
            <CardContent>
              {dashboardData?.healthContent?.length ? (
                <div className="space-y-3">
                  {dashboardData.healthContent.map((content: any) => (
                    <div key={content.id} className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900">{content.title}</h4>
                      <p className="text-sm text-blue-700 mt-1 line-clamp-2">{content.content}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {content.tags?.map((tag: string) => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No health content available</p>
              )}
            </CardContent>
          </Card>
        </div>

        {emergencyContacts?.length ? (
          <Card className="mt-6 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Phone className="h-5 w-5" />
                Emergency Contacts
              </CardTitle>
              <CardDescription>Quick access to emergency contacts and support</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {emergencyContacts.map((contact: any) => (
                  <div key={contact.id} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.phone}</p>
                      <p className="text-xs text-gray-500 capitalize">{contact.relationship}</p>
                    </div>
                    {contact.is_primary && <Badge variant="secondary" className="text-xs">Primary</Badge>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;

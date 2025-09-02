import { supabase } from './supabase';
import { 
  User, 
  PregnancyProfile, 
  Reminder, 
  HealthContent, 
  EmergencyContact, 
  SymptomLog 
} from './supabase';

// Database service class for managing all database operations
export class DatabaseService {
  // User management
  static async createUserProfile(userData: Partial<User>): Promise<any> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('users')
        .insert({
          id: user.id,
          ...userData,
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Create user profile error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create user profile',
      };
    }
  }

  static async updateUserProfile(updates: Partial<User>): Promise<any> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Update user profile error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update user profile',
      };
    }
  }

  static async getUserProfile(): Promise<any> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Get user profile error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get user profile',
      };
    }
  }

  // Pregnancy profile management
  static async createPregnancyProfile(profileData: Partial<PregnancyProfile>): Promise<any> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Calculate current week and trimester
      let currentWeek = 1;
      let trimester = 1;

      if (profileData.last_menstrual_period) {
        const lmp = new Date(profileData.last_menstrual_period);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - lmp.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        currentWeek = Math.floor(diffDays / 7) + 1;
        
        if (currentWeek <= 12) trimester = 1;
        else if (currentWeek <= 26) trimester = 2;
        else trimester = 3;
      }

      const { data, error } = await supabase
        .from('pregnancy_profiles')
        .insert({
          user_id: user.id,
          current_week: currentWeek,
          trimester: trimester,
          ...profileData,
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Create pregnancy profile error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create pregnancy profile',
      };
    }
  }

  static async updatePregnancyProfile(profileId: string, updates: Partial<PregnancyProfile>): Promise<any> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('pregnancy_profiles')
        .update(updates)
        .eq('id', profileId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Update pregnancy profile error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update pregnancy profile',
      };
    }
  }

  static async getPregnancyProfile(): Promise<any> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('pregnancy_profiles')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned

      return { success: true, data };
    } catch (error) {
      console.error('Get pregnancy profile error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get pregnancy profile',
      };
    }
  }

  // Reminder management
  static async getReminders(profileId?: string): Promise<any> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      let query = supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user.id)
        .order('scheduled_date', { ascending: true });

      if (profileId) {
        query = query.eq('pregnancy_profile_id', profileId);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Get reminders error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get reminders',
      };
    }
  }

  static async createReminder(reminderData: Partial<Reminder>): Promise<any> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('reminders')
        .insert({
          user_id: user.id,
          ...reminderData,
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Create reminder error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create reminder',
      };
    }
  }

  static async updateReminder(reminderId: string, updates: Partial<Reminder>): Promise<any> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('reminders')
        .update(updates)
        .eq('id', reminderId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Update reminder error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update reminder',
      };
    }
  }

  static async markReminderComplete(reminderId: string): Promise<any> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('reminders')
        .update({
          completed: true,
          completed_at: new Date().toISOString(),
        })
        .eq('id', reminderId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Mark reminder complete error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to mark reminder complete',
      };
    }
  }

  // Health content management
  static async getHealthContent(trimester?: number, contentType?: string, isPremium?: boolean): Promise<any> {
    try {
      let query = supabase
        .from('health_content')
        .select('*')
        .order('created_at', { ascending: false });

      if (trimester) {
        query = query.eq('trimester', trimester);
      }

      if (contentType) {
        query = query.eq('content_type', contentType);
      }

      if (isPremium !== undefined) {
        query = query.eq('is_premium', isPremium);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Get health content error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get health content',
      };
    }
  }

  // Emergency contacts management
  static async getEmergencyContacts(): Promise<any> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('emergency_contacts')
        .select('*')
        .eq('user_id', user.id)
        .order('is_primary', { ascending: false });

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Get emergency contacts error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get emergency contacts',
      };
    }
  }

  static async createEmergencyContact(contactData: Partial<EmergencyContact>): Promise<any> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('emergency_contacts')
        .insert({
          user_id: user.id,
          ...contactData,
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Create emergency contact error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create emergency contact',
      };
    }
  }

  static async updateEmergencyContact(contactId: string, updates: Partial<EmergencyContact>): Promise<any> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('emergency_contacts')
        .update(updates)
        .eq('id', contactId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Update emergency contact error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update emergency contact',
      };
    }
  }

  static async deleteEmergencyContact(contactId: string): Promise<any> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('emergency_contacts')
        .delete()
        .eq('id', contactId)
        .eq('user_id', user.id);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('Delete emergency contact error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete emergency contact',
      };
    }
  }

  // Symptom logging
  static async logSymptom(symptomData: Partial<SymptomLog>): Promise<any> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('symptom_logs')
        .insert({
          user_id: user.id,
          ...symptomData,
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Log symptom error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to log symptom',
      };
    }
  }

  static async getSymptomLogs(profileId?: string): Promise<any> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      let query = supabase
        .from('symptom_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (profileId) {
        query = query.eq('pregnancy_profile_id', profileId);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Get symptom logs error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get symptom logs',
      };
    }
  }

  static async updateSymptomLog(symptomId: string, updates: Partial<SymptomLog>): Promise<any> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('symptom_logs')
        .update(updates)
        .eq('id', symptomId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Update symptom log error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update symptom log',
      };
    }
  }

  // Dashboard data aggregation
  static async getDashboardData(): Promise<any> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Get pregnancy profile
      const { data: profile } = await supabase
        .from('pregnancy_profiles')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      // Get upcoming reminders
      const { data: upcomingReminders } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user.id)
        .eq('completed', false)
        .gte('scheduled_date', new Date().toISOString())
        .order('scheduled_date', { ascending: true })
        .limit(5);

      // Get recent symptoms
      const { data: recentSymptoms } = await supabase
        .from('symptom_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(5);

      // Get health content for current trimester
      const { data: healthContent } = await supabase
        .from('health_content')
        .select('*')
        .eq('trimester', profile?.trimester || 1)
        .eq('is_premium', false)
        .order('created_at', { ascending: false })
        .limit(3);

      return {
        success: true,
        data: {
          profile,
          upcomingReminders: upcomingReminders || [],
          recentSymptoms: recentSymptoms || [],
          healthContent: healthContent || [],
        },
      };
    } catch (error) {
      console.error('Get dashboard data error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get dashboard data',
      };
    }
  }
}

// Custom hooks for database operations
export const useDatabase = () => {
  return {
    // User operations
    createUserProfile: DatabaseService.createUserProfile,
    updateUserProfile: DatabaseService.updateUserProfile,
    getUserProfile: DatabaseService.getUserProfile,

    // Pregnancy profile operations
    createPregnancyProfile: DatabaseService.createPregnancyProfile,
    updatePregnancyProfile: DatabaseService.updatePregnancyProfile,
    getPregnancyProfile: DatabaseService.getPregnancyProfile,

    // Reminder operations
    getReminders: DatabaseService.getReminders,
    createReminder: DatabaseService.createReminder,
    updateReminder: DatabaseService.updateReminder,
    markReminderComplete: DatabaseService.markReminderComplete,

    // Health content operations
    getHealthContent: DatabaseService.getHealthContent,

    // Emergency contact operations
    getEmergencyContacts: DatabaseService.getEmergencyContacts,
    createEmergencyContact: DatabaseService.createEmergencyContact,
    updateEmergencyContact: DatabaseService.updateEmergencyContact,
    deleteEmergencyContact: DatabaseService.deleteEmergencyContact,

    // Symptom logging operations
    logSymptom: DatabaseService.logSymptom,
    getSymptomLogs: DatabaseService.getSymptomLogs,
    updateSymptomLog: DatabaseService.updateSymptomLog,

    // Dashboard operations
    getDashboardData: DatabaseService.getDashboardData,
  };
};


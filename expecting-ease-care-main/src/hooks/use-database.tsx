import { DatabaseService } from '@/lib/database';

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

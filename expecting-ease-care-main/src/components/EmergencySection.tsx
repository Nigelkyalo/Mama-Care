import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, MapPin, Clock, Heart, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useDatabase } from "@/hooks/use-database";
import { useToast } from "@/hooks/use-toast";

const EmergencySection = () => {
  const [emergencyContacts, setEmergencyContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { getEmergencyContacts } = useDatabase();
  const { toast } = useToast();

  useEffect(() => {
    loadEmergencyContacts();
  }, []);

  const loadEmergencyContacts = async () => {
    try {
      const result = await getEmergencyContacts();
      if (result.success) {
        setEmergencyContacts(result.data || []);
      } else {
        // Fallback to default contacts if no user contacts found
        setEmergencyContacts([
          {
            name: "Ambulance Service",
            phone: "999",
            description: "24/7 Emergency Response",
            type: "emergency"
          },
          {
            name: "Kenyatta Hospital",
            phone: "+254 20 272 6300",
            description: "Maternity Ward",
            type: "hospital"
          },
          {
            name: "Nairobi Hospital",
            phone: "+254 20 284 6000", 
            description: "Women's Health Center",
            type: "hospital"
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading emergency contacts:', error);
      toast({
        title: "Error",
        description: "Failed to load emergency contacts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmergencyCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const warningSymptoms = [
    "Severe bleeding",
    "Severe abdominal pain", 
    "Persistent vomiting",
    "High fever (>38°C)",
    "Severe headache with vision changes",
    "Decreased fetal movement"
  ];

  if (loading) {
    return (
      <section className="py-16 px-4 bg-emergency/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emergency mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading emergency contacts...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-emergency/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emergency/10 rounded-full mb-4">
            <AlertTriangle className="w-8 h-8 text-emergency" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Emergency Support
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quick access to emergency contacts and symptom guidance when you need it most
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Emergency Contacts */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <Phone className="w-5 h-5 text-emergency mr-2" />
              Emergency Contacts
            </h3>
            
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <Card key={contact.id || index} className="shadow-gentle hover:shadow-card transition-all duration-300">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate">{contact.name}</h4>
                      <p className="text-sm text-muted-foreground truncate">{contact.description || contact.relationship}</p>
                      {contact.is_primary && (
                        <span className="inline-block bg-primary text-primary-foreground text-xs px-2 py-1 rounded mt-1">
                          Primary Contact
                        </span>
                      )}
                    </div>
                    <Button 
                      className={`ml-3 ${contact.type === 'emergency' 
                        ? 'bg-emergency hover:bg-emergency/90 text-emergency-foreground' 
                        : 'bg-primary hover:bg-primary/90'
                      }`}
                      onClick={() => handleEmergencyCall(contact.phone)}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6 bg-gradient-wellness shadow-card">
              <CardContent className="p-6 text-center">
                <MapPin className="w-8 h-8 text-wellness-foreground mx-auto mb-3" />
                <h4 className="font-semibold text-wellness-foreground mb-2">
                  Find Nearest Hospital
                </h4>
                <Button 
                  variant="outline" 
                  className="border-wellness-foreground text-wellness-foreground hover:bg-wellness-foreground hover:text-wellness"
                  onClick={() => {
                    // Open Google Maps with hospital search
                    window.open('https://www.google.com/maps/search/hospital', '_blank');
                  }}
                >
                  Open Maps
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Warning Symptoms */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <Heart className="w-5 h-5 text-emergency mr-2" />
              Warning Symptoms
            </h3>
            
            <Card className="shadow-gentle mb-6">
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="w-8 h-8 bg-emergency/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <Clock className="w-4 h-4 text-emergency" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Call immediately if you experience:</h4>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {warningSymptoms.map((symptom, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-emergency rounded-full mr-3 flex-shrink-0"></div>
                      <span className="flex-1">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-emergency/10 border-emergency/20">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="w-10 h-10 text-emergency mx-auto mb-3" />
                <h4 className="font-semibold text-emergency mb-2">
                  When in Doubt, Call for Help
                </h4>
                <p className="text-sm text-emergency/80 mb-4">
                  Trust your instincts. If something doesn't feel right, seek medical attention immediately.
                </p>
                <Button 
                  className="bg-emergency hover:bg-emergency/90 text-emergency-foreground"
                  onClick={() => {
                    const primaryContact = emergencyContacts.find(contact => contact.is_primary);
                    if (primaryContact) {
                      handleEmergencyCall(primaryContact.phone);
                    } else if (emergencyContacts.length > 0) {
                      handleEmergencyCall(emergencyContacts[0].phone);
                    } else {
                      toast({
                        title: "No Emergency Contacts",
                        description: "Please add emergency contacts in your profile settings",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Call
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencySection;
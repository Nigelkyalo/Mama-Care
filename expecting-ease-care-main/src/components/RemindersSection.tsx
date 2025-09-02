import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Pill, Calendar, Stethoscope, CheckCircle } from "lucide-react";

const RemindersSection = () => {
  const reminders = [
    {
      id: 1,
      type: "supplement",
      title: "Take Folic Acid",
      time: "9:00 AM",
      status: "pending",
      icon: Pill,
      description: "Daily folic acid supplement"
    },
    {
      id: 2,
      type: "appointment",
      title: "Antenatal Visit",
      time: "Tomorrow, 2:00 PM",
      status: "scheduled",
      icon: Stethoscope,
      description: "Routine checkup with Dr. Sarah"
    },
    {
      id: 3,
      type: "ultrasound",
      title: "20-Week Scan",
      time: "Next Week",
      status: "upcoming",
      icon: Calendar,
      description: "Detailed anomaly scan"
    },
    {
      id: 4,
      type: "vaccine",
      title: "Tetanus Vaccination",
      time: "Completed",
      status: "completed",
      icon: CheckCircle,
      description: "TT injection completed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-primary text-primary-foreground";
      case "scheduled": return "bg-wellness text-wellness-foreground";
      case "upcoming": return "bg-accent text-accent-foreground";
      case "completed": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Never Miss Important Moments
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Smart reminders for appointments, supplements, and health milestones
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {reminders.map((reminder) => {
            const IconComponent = reminder.icon;
            return (
              <Card key={reminder.id} className="shadow-gentle hover:shadow-card transition-all duration-300">
                <CardContent className="flex items-center p-6">
                  <div className="w-12 h-12 bg-gradient-maternal rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{reminder.title}</h3>
                      <Badge className={`text-xs ${getStatusColor(reminder.status)}`}>
                        {reminder.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{reminder.description}</p>
                    <p className="text-xs text-primary font-medium">{reminder.time}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Card className="inline-block bg-gradient-wellness shadow-card">
            <CardContent className="flex items-center p-6">
              <Bell className="w-8 h-8 text-wellness-foreground mr-4" />
              <div className="text-left">
                <h3 className="font-semibold text-wellness-foreground mb-1">
                  Stay Connected
                </h3>
                <p className="text-sm text-wellness-foreground/80">
                  Get SMS reminders even without internet
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RemindersSection;
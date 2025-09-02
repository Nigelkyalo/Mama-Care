import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, Baby } from "lucide-react";

const PregnancyTracker = () => {
  const currentWeek = 24;
  const trimester = currentWeek <= 13 ? 1 : currentWeek <= 26 ? 2 : 3;
  
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Track Your Beautiful Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Personalized pregnancy timeline with week-by-week guidance and reminders
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-maternal text-primary-foreground shadow-gentle hover:shadow-card transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Baby className="w-8 h-8" />
              </div>
              <CardTitle className="text-xl">Week {currentWeek}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Badge variant="secondary" className="mb-3">
                Trimester {trimester}
              </Badge>
              <p className="text-sm opacity-90">
                Your baby is now the size of a cantaloupe! Time for your regular checkup.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-gentle hover:shadow-card transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-wellness rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-wellness-foreground" />
              </div>
              <CardTitle className="text-xl">Next Appointment</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-primary mb-2">Dec 15</p>
              <p className="text-sm text-muted-foreground">Routine checkup & ultrasound</p>
            </CardContent>
          </Card>

          <Card className="shadow-gentle hover:shadow-card transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-premium rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-premium-foreground" />
              </div>
              <CardTitle className="text-xl">Health Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="text-3xl font-bold text-wellness">95%</div>
              </div>
              <p className="text-sm text-muted-foreground">Excellent progress!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PregnancyTracker;
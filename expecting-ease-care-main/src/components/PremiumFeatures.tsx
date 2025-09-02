import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Video, MessageCircle, BookOpen, Smartphone, Star } from "lucide-react";

const PremiumFeatures = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Personalized Diet Plans",
      description: "Custom nutrition guides for each trimester",
      included: false
    },
    {
      icon: Video,
      title: "Exercise Videos",
      description: "Safe workout routines for pregnant mothers",
      included: false
    },
    {
      icon: MessageCircle,
      title: "Expert Consultations",
      description: "Chat with doctors and nutritionists 24/7",
      included: false
    },
    {
      icon: Smartphone,
      title: "SMS Reminders",
      description: "Never miss appointments with SMS backup",
      included: false
    }
  ];

  const freeFeatures = [
    "Pregnancy week tracker",
    "Basic clinic reminders",
    "Standard health tips",
    "Emergency contacts"
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Care Level
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start with our free features, upgrade for premium maternal care
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <Card className="shadow-gentle hover:shadow-card transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">Free Care</CardTitle>
              <div className="text-3xl font-bold text-primary">KSh 0</div>
              <p className="text-sm text-muted-foreground">Perfect to get started</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {freeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-wellness/20 rounded-full flex items-center justify-center mr-3">
                      <div className="w-2 h-2 bg-wellness rounded-full"></div>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full">
                Get Started Free
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="shadow-premium bg-gradient-premium relative overflow-hidden">
            <Badge className="absolute top-4 right-4 bg-premium-foreground text-premium">
              <Crown className="w-3 h-3 mr-1" />
              Popular
            </Badge>
            
            <CardHeader className="text-center pb-4 text-premium-foreground">
              <CardTitle className="text-2xl">Premium Care</CardTitle>
              <div className="text-3xl font-bold">KSh 999<span className="text-lg font-normal">/month</span></div>
              <p className="text-sm opacity-90">Complete maternal wellness</p>
            </CardHeader>
            
            <CardContent>
              <div className="text-xs text-premium-foreground/80 mb-4 font-medium">
                Everything in Free, plus:
              </div>
              
              <div className="grid grid-cols-1 gap-4 mb-6">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                        <IconComponent className="w-4 h-4 text-premium-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium text-premium-foreground text-sm">{feature.title}</h4>
                        <p className="text-xs text-premium-foreground/80">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button className="w-full bg-premium-foreground text-premium hover:bg-premium-foreground/90">
                Upgrade to Premium
                <Star className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Card className="inline-block bg-card/50 border-dashed border-2">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-2">
                Secure Payments with M-Pesa
              </h3>
              <p className="text-sm text-muted-foreground">
                Easy, secure payments through M-Pesa and other trusted payment methods
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PremiumFeatures;
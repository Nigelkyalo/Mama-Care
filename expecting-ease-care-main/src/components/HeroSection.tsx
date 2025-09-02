import { Button } from "@/components/ui/button";
import { Heart, Shield, Bell, Users } from "lucide-react";
import heroImage from "@/assets/hero-african-woman.jpg";

const HeroSection = () => {
  const features = [
    {
      icon: Bell,
      title: "Smart Reminders",
      description: "Never miss appointments or supplements"
    },
    {
      icon: Heart,
      title: "Health Tracking",
      description: "Monitor your pregnancy week by week"
    },
    {
      icon: Shield,
      title: "Emergency Support", 
      description: "24/7 access to emergency contacts"
    },
    {
      icon: Users,
      title: "Expert Care",
      description: "Connect with doctors and specialists"
    }
  ];

  return (
    <section className="min-h-screen flex items-center bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Heart className="w-4 h-4 text-primary-foreground mr-2" />
              <span className="text-sm font-medium text-primary-foreground">
                Trusted by 10,000+ mothers
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Your Pregnancy Journey, 
              <span className="block bg-gradient-to-r from-primary-glow to-white bg-clip-text text-transparent">
                Beautifully Guided
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-xl mx-auto lg:mx-0">
              MamaCare provides personalized reminders, expert guidance, and emergency support 
              throughout your pregnancy journey. Never miss a moment that matters.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-gentle">
                Start Your Journey
                <Heart className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/40 text-primary-foreground hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="text-center lg:text-left">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto lg:mx-0 mb-3">
                      <IconComponent className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-primary-foreground text-sm mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-primary-foreground/80">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Happy pregnant mother using MamaCare app" 
                className="w-full h-auto rounded-3xl shadow-premium animate-float"
              />
              
              {/* Floating notification cards */}
              <div className="absolute -top-4 -right-4 bg-card rounded-2xl p-4 shadow-card animate-pulse-gentle border border-border/20">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-wellness rounded-full flex items-center justify-center mr-3">
                    <Bell className="w-4 h-4 text-wellness-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Reminder</p>
                    <p className="text-xs text-muted-foreground">Take your supplements</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-card animate-pulse-gentle border border-border/20" style={{animationDelay: '1.5s'}}>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-maternal rounded-full flex items-center justify-center mr-3">
                    <Heart className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Week 24</p>
                    <p className="text-xs text-muted-foreground">Baby is growing well!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
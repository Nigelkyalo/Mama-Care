import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Calendar, 
  Bell, 
  Shield, 
  Baby, 
  Stethoscope,
  MessageCircle,
  Phone,
  Star,
  Clock,
  Users,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: "Pregnancy Timeline Tracker",
      description: "Track your pregnancy week by week with personalized milestones and development updates.",
      details: [
        "Week-by-week baby development",
        "Pregnancy milestone tracking",
        "Due date calculator",
        "Symptom logging"
      ],
      premium: false
    },
    {
      icon: Bell,
      title: "Smart Reminders",
      description: "Never miss important appointments, medications, or health checkups.",
      details: [
        "Antenatal clinic visits",
        "Medication reminders",
        "Vaccination schedules",
        "Ultrasound appointments"
      ],
      premium: false
    },
    {
      icon: Heart,
      title: "Health & Wellness Tips",
      description: "Get personalized health advice tailored to your pregnancy stage.",
      details: [
        "Nutrition guidance",
        "Exercise recommendations",
        "Mental health support",
        "Sleep optimization"
      ],
      premium: false
    },
    {
      icon: Shield,
      title: "Emergency Support",
      description: "24/7 access to emergency contacts and medical guidance.",
      details: [
        "Emergency hotlines",
        "Hospital locator",
        "Symptom checker",
        "Crisis intervention"
      ],
      premium: false
    },
    {
      icon: Stethoscope,
      title: "Advanced Health Plans",
      description: "Comprehensive diet and exercise plans created by experts.",
      details: [
        "Personalized meal plans",
        "Exercise video library",
        "Nutritionist consultations",
        "Health progress tracking"
      ],
      premium: true
    },
    {
      icon: MessageCircle,
      title: "Expert Chat Support",
      description: "Direct access to healthcare professionals and nutritionists.",
      details: [
        "Live chat with doctors",
        "Nutritionist consultations",
        "Lactation support",
        "24/7 expert availability"
      ],
      premium: true
    },
    {
      icon: Phone,
      title: "SMS Reminders",
      description: "Receive important reminders even when offline via SMS.",
      details: [
        "Offline accessibility",
        "Multi-language support",
        "Custom reminder frequency",
        "Family notifications"
      ],
      premium: true
    },
    {
      icon: Star,
      title: "Priority Webinars",
      description: "Exclusive access to expert-led sessions and workshops.",
      details: [
        "Live expert sessions",
        "Interactive Q&A",
        "Recorded sessions library",
        "Certificate programs"
      ],
      premium: true
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Mothers" },
    { number: "95%", label: "Appointment Success" },
    { number: "24/7", label: "Emergency Support" },
    { number: "50+", label: "Weekly Tips" }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border/40 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 bg-gradient-maternal rounded-full flex items-center justify-center mr-3">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">MamaCare</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/features" className="text-sm text-primary font-medium">Features</Link>
            <Link to="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors">Support</Link>
            <Link to="/get-started">
              <Button variant="maternal" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-primary/5 to-blue/5">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Comprehensive Features for Your
            <span className="text-primary block">Pregnancy Journey</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover all the tools and features designed to support you through every stage of pregnancy, 
            from conception to delivery and beyond.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need in One App
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From basic pregnancy tracking to premium expert consultations, 
              we've got you covered at every step.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="relative shadow-gentle hover:shadow-card transition-all duration-300">
                {feature.premium && (
                  <Badge className="absolute top-4 right-4 bg-gradient-premium text-primary-foreground">
                    Premium
                  </Badge>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      feature.premium ? 'bg-gradient-premium' : 'bg-gradient-maternal'
                    }`}>
                      <feature.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <ArrowRight className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-hero relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue/80"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Experience All Features?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of mothers who trust MamaCare for their pregnancy journey. 
            Start with our free features or upgrade to premium for the full experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-started">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Start Free Trial
                <Heart className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/support">
              <Button variant="outline" size="lg" className="border-white/40 text-primary-foreground hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
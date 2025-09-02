import HeroSection from "@/components/HeroSection";
import PregnancyTracker from "@/components/PregnancyTracker";
import RemindersSection from "@/components/RemindersSection";
import PremiumFeatures from "@/components/PremiumFeatures";
import EmergencySection from "@/components/EmergencySection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star, Users, Award, Phone, Mail } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border/40 z-50 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-maternal rounded-full flex items-center justify-center mr-3">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">MamaCare</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</a>
            <Link to="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors">Support</Link>
            <ThemeToggle />
            <Link to="/get-started">
              <Button variant="maternal" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Pregnancy Tracker */}
      <PregnancyTracker />

      {/* Reminders Section */}
      <RemindersSection />

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-muted-foreground">Happy Mothers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-wellness mb-2">95%</div>
              <p className="text-muted-foreground">Appointment Success</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-premium mb-2">24/7</div>
              <p className="text-muted-foreground">Emergency Support</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Health Tips Weekly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Loved by Mothers Everywhere
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of mothers who trust MamaCare for their pregnancy journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                location: "Nairobi",
                rating: 5,
                comment: "MamaCare helped me never miss a single appointment. The SMS reminders were a lifesaver!"
              },
              {
                name: "Grace K.", 
                location: "Mombasa",
                rating: 5,
                comment: "The emergency contacts feature gave me peace of mind throughout my pregnancy."
              },
              {
                name: "Mary W.",
                location: "Kisumu", 
                rating: 5,
                comment: "The weekly health tips and personalized reminders made my pregnancy journey so much easier."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="shadow-gentle hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-premium fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <div id="pricing">
        <PremiumFeatures />
      </div>

      {/* Emergency Section */}
      <EmergencySection />

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-hero relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of mothers who trust MamaCare for personalized pregnancy guidance, 
            smart reminders, and emergency support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/onboarding">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Start Your Journey
                <Heart className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/download-app">
              <Button variant="outline" size="lg" className="border-white/40 text-primary-foreground hover:bg-white/10">
                Download App
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12 px-4 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-maternal rounded-full flex items-center justify-center mr-2">
                  <Heart className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-primary">MamaCare</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Supporting mothers through every step of their pregnancy journey with personalized care and guidance.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Pregnancy Tracking</li>
                <li>Smart Reminders</li>
                <li>Health Tips</li>
                <li>Emergency Support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/help-center" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link to="/contact-us" className="hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 mr-2" />
                  +254 700 123 456
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 mr-2" />
                  support@mamacare.ke
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border/40 mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 MamaCare. All rights reserved. Made with ❤️ for mothers everywhere.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Made by Nigel and Kevin
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
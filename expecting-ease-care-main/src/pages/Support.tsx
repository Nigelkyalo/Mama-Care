import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  Phone, 
  Mail, 
  MessageCircle,
  Clock,
  MapPin,
  HelpCircle,
  FileText,
  Shield,
  Book,
  Users,
  Search
} from "lucide-react";
import { Link } from "react-router-dom";

const Support = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Emergency Hotline",
      description: "24/7 immediate pregnancy emergency support",
      contact: "+254 700 123 456",
      availability: "Available 24/7"
    },
    {
      icon: MessageCircle,
      title: "Live Chat Support", 
      description: "Get instant help from our support team",
      contact: "Start Chat",
      availability: "Mon-Fri 8AM-8PM"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your questions and concerns",
      contact: "support@mamacare.ke", 
      availability: "Response within 24hrs"
    }
  ];

  const faqCategories = [
    {
      title: "Getting Started",
      questions: [
        {
          q: "How do I set up my pregnancy timeline?",
          a: "Simply enter your due date or last menstrual period during onboarding, and we'll create a personalized timeline for you."
        },
        {
          q: "Is MamaCare free to use?",
          a: "Yes! We offer essential features for free including basic reminders and health tips. Premium features are available for enhanced support."
        },
        {
          q: "How do I enable SMS reminders?",
          a: "SMS reminders are available with our premium plan. Upgrade in the app settings to receive offline notifications."
        }
      ]
    },
    {
      title: "Appointments & Reminders",
      questions: [
        {
          q: "Can I customize my reminder schedule?",
          a: "Absolutely! You can adjust reminder frequency and timing in your profile settings to match your preferences."
        },
        {
          q: "What if I miss a scheduled appointment?",
          a: "We'll send follow-up reminders and help you reschedule. For premium users, we can also notify your emergency contacts."
        },
        {
          q: "How accurate are the clinic visit schedules?",
          a: "Our schedules follow WHO and Kenya Ministry of Health guidelines. Always consult your healthcare provider for personalized advice."
        }
      ]
    },
    {
      title: "Premium Features",
      questions: [
        {
          q: "What's included in the premium plan?",
          a: "Premium includes advanced meal plans, exercise videos, expert chat, SMS reminders, and priority access to webinars."
        },
        {
          q: "How do I upgrade to premium?",
          a: "Tap 'Upgrade to Premium' in the app and choose your payment method. We support M-Pesa and other local payment options."
        },
        {
          q: "Can I cancel my premium subscription?",
          a: "Yes, you can cancel anytime in your account settings. You'll retain premium features until your current billing period ends."
        }
      ]
    }
  ];

  const supportResources = [
    {
      icon: Book,
      title: "Knowledge Base",
      description: "Comprehensive guides and tutorials",
      link: "/help-center"
    },
    {
      icon: FileText,
      title: "Privacy Policy",
      description: "How we protect your data",
      link: "/privacy-policy"
    },
    {
      icon: Shield,
      title: "Terms of Service", 
      description: "Service terms and conditions",
      link: "/terms-of-service"
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other mothers",
      link: "#"
    }
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
            <Link to="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link>
            <Link to="/support" className="text-sm text-primary font-medium">Support</Link>
            <Link to="/get-started">
              <Button variant="maternal" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-primary/5 to-blue/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            We're Here to
            <span className="text-primary block">Support You</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get the help you need, when you need it. Our support team and resources 
            are available to ensure you have the best pregnancy experience.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the best way to reach us
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center shadow-gentle hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-maternal rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{method.title}</CardTitle>
                  <p className="text-muted-foreground">{method.description}</p>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-primary mb-2">{method.contact}</p>
                  <p className="text-sm text-muted-foreground">{method.availability}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-blue/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about MamaCare
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {faqCategories.map((category, index) => (
              <Card key={index} className="shadow-gentle">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.questions.map((item, idx) => (
                    <div key={idx}>
                      <h4 className="font-semibold text-foreground mb-2">{item.q}</h4>
                      <p className="text-sm text-muted-foreground">{item.a}</p>
                      {idx < category.questions.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Resources */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Support Resources
            </h2>
            <p className="text-lg text-muted-foreground">
              Additional resources to help you get the most out of MamaCare
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {supportResources.map((resource, index) => (
              <Link key={index} to={resource.link}>
                <Card className="text-center shadow-gentle hover:shadow-card transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-maternal rounded-full flex items-center justify-center mx-auto mb-4">
                      <resource.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 bg-gradient-hero relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue/80"></div>
        <div className="container mx-auto max-w-2xl relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Still Need Help?
            </h2>
            <p className="text-lg text-primary-foreground/90">
              Send us a message and we'll get back to you within 24 hours
            </p>
          </div>

          <Card className="shadow-elegant">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Name</label>
                    <Input placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                    <Input type="email" placeholder="your.email@example.com" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                  <Input placeholder="How can we help you?" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                  <Textarea 
                    placeholder="Please describe your question or issue in detail..." 
                    rows={5}
                  />
                </div>
                <Button className="w-full" variant="maternal">
                  Send Message
                  <Mail className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Support;
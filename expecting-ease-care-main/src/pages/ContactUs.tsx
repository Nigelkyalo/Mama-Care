import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Heart, 
  Phone, 
  Mail, 
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Building,
  Globe,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      primary: "+254 700 123 456",
      secondary: "Emergency: +254 711 456 789",
      hours: "24/7 Emergency | 8AM-8PM General"
    },
    {
      icon: Mail,
      title: "Email Support",
      primary: "support@mamacare.ke",
      secondary: "emergency@mamacare.ke", 
      hours: "Response within 24 hours"
    },
    {
      icon: MapPin,
      title: "Office Location",
      primary: "Nairobi, Kenya",
      secondary: "Westlands, ABC Place",
      hours: "Mon-Fri: 9AM-5PM"
    }
  ];

  const departments = [
    { value: "general", label: "General Inquiry" },
    { value: "technical", label: "Technical Support" },
    { value: "billing", label: "Billing & Payments" },
    { value: "partnership", label: "Partnership" },
    { value: "emergency", label: "Emergency Support" }
  ];

  const offices = [
    {
      city: "Nairobi",
      address: "ABC Place, Westlands",
      phone: "+254 700 123 456",
      email: "nairobi@mamacare.ke"
    },
    {
      city: "Mombasa", 
      address: "Nyali Centre, Links Road",
      phone: "+254 701 234 567",
      email: "mombasa@mamacare.ke"
    },
    {
      city: "Kisumu",
      address: "Mega Plaza, Oginga Odinga Street", 
      phone: "+254 702 345 678",
      email: "kisumu@mamacare.ke"
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
            <Link to="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors">Support</Link>
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
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have questions, feedback, or need support? We're here to help you 
            every step of the way on your pregnancy journey.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center shadow-gentle hover:shadow-card transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-maternal rounded-full flex items-center justify-center mx-auto mb-6">
                    <info.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{info.title}</h3>
                  <div className="space-y-2 mb-4">
                    <p className="font-semibold text-primary">{info.primary}</p>
                    <p className="text-muted-foreground">{info.secondary}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{info.hours}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-blue/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground flex items-center">
                  <MessageCircle className="w-6 h-6 mr-3 text-primary" />
                  Send us a Message
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="Enter your first name" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Enter your last name" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" required />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+254 700 123 456" />
                </div>

                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.value} value={dept.value}>
                          {dept.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input id="subject" placeholder="Brief description of your inquiry" required />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea 
                    id="message"
                    placeholder="Please provide detailed information about your question or concern..."
                    rows={5}
                    required
                  />
                </div>

                <Button className="w-full" variant="maternal">
                  Send Message
                  <Send className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By sending this message, you agree to our{' '}
                  <Link to="/privacy-policy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  {' '}and{' '}
                  <Link to="/terms-of-service" className="text-primary hover:underline">
                    Terms of Service
                  </Link>
                </p>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <div className="space-y-8">
              {/* Business Hours */}
              <Card className="shadow-gentle">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center">
                    <Clock className="w-5 h-5 mr-3 text-primary" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="text-foreground font-medium">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="text-foreground font-medium">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="text-foreground font-medium">Emergency Only</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-muted-foreground">Emergency Line</span>
                    <span className="text-primary font-medium">24/7 Available</span>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="shadow-gentle border-red-200 bg-red-50/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-red-600" />
                    </div>
                    <h3 className="text-lg font-bold text-red-800">Emergency Support</h3>
                  </div>
                  <p className="text-red-700 mb-4">
                    For pregnancy emergencies or urgent medical concerns, contact our 24/7 emergency line.
                  </p>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Emergency: +254 711 456 789
                  </Button>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="shadow-gentle">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center">
                    <Globe className="w-5 h-5 mr-3 text-primary" />
                    Follow Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Stay connected for the latest updates and pregnancy tips.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm">Facebook: @MamaCarekenya</p>
                    <p className="text-sm">Twitter: @MamaCareke</p>
                    <p className="text-sm">Instagram: @mamacare.ke</p>
                    <p className="text-sm">WhatsApp: +254 700 123 456</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Offices
            </h2>
            <p className="text-lg text-muted-foreground">
              Visit us at any of our regional offices across Kenya
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card key={index} className="shadow-gentle hover:shadow-card transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-maternal rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Building className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{office.city}</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>{office.address}</p>
                    <p className="font-medium text-primary">{office.phone}</p>
                    <p className="text-sm">{office.email}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
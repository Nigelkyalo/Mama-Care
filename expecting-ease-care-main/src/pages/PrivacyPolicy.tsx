import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, Shield, Lock, Eye, FileText, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const lastUpdated = "December 1, 2024";

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      content: [
        "Personal Information: Name, email address, phone number, date of birth, and location information you provide during registration.",
        "Pregnancy Information: Due date, pregnancy stage, medical history, appointment schedules, and health preferences.",
        "Usage Data: How you interact with our app, features used, and time spent on different sections.",
        "Device Information: Device type, operating system, unique device identifiers, and mobile network information.",
        "Location Data: General location information to provide localized content and nearby healthcare facilities (with your permission)."
      ]
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      content: [
        "Provide personalized pregnancy tracking and reminders based on your due date and preferences.",
        "Send you relevant health tips, appointment reminders, and educational content.",
        "Improve our services through usage analytics and user feedback.",
        "Ensure the security and functionality of our platform.",
        "Communicate important updates, policy changes, or emergency information.",
        "Connect you with healthcare providers and emergency services when needed.",
        "Process payments for premium features through our secure payment partners."
      ]
    },
    {
      id: "information-sharing",
      title: "Information Sharing and Disclosure",
      content: [
        "Healthcare Providers: With your explicit consent, we may share relevant information with your chosen healthcare providers.",
        "Emergency Contacts: During emergencies, we may contact your designated emergency contacts with relevant information.",
        "Service Providers: We work with trusted third-party services for payments (Instasend, M-Pesa), SMS delivery, and cloud storage.",
        "Legal Requirements: We may disclose information when required by law, court order, or to protect the rights and safety of our users.",
        "Business Transfers: In the event of a merger or acquisition, user information may be transferred as part of the business assets.",
        "We never sell your personal information to third parties for marketing purposes."
      ]
    },
    {
      id: "data-security",
      title: "Data Security",
      content: [
        "All sensitive data is encrypted in transit and at rest using industry-standard encryption protocols.",
        "We implement multi-factor authentication and access controls for our systems.",
        "Regular security audits and vulnerability assessments are conducted.",
        "Payment information is processed through PCI-compliant payment processors.",
        "Staff access to personal information is limited and monitored.",
        "We maintain backup systems to prevent data loss while ensuring security."
      ]
    },
    {
      id: "your-rights",
      title: "Your Privacy Rights",
      content: [
        "Access: Request a copy of the personal information we have about you.",
        "Correction: Update or correct inaccurate personal information.",
        "Deletion: Request deletion of your personal information (subject to legal retention requirements).",
        "Portability: Receive your data in a structured, machine-readable format.",
        "Opt-out: Unsubscribe from marketing communications while maintaining essential service notifications.",
        "Consent Withdrawal: Withdraw consent for data processing where consent is the legal basis."
      ]
    },
    {
      id: "data-retention",
      title: "Data Retention",
      content: [
        "Account Information: Retained while your account is active and for up to 3 years after account closure.",
        "Health Data: Pregnancy-related information is retained for 5 years for continuity of care and legal compliance.",
        "Usage Analytics: Aggregated and anonymized usage data may be retained indefinitely for service improvement.",
        "Communication Records: Support conversations are retained for 2 years for quality assurance.",
        "You can request earlier deletion of your data, subject to legal and safety requirements."
      ]
    },
    {
      id: "international-transfers",
      title: "International Data Transfers",
      content: [
        "Your data may be processed and stored in servers located in Kenya and other countries.",
        "We ensure appropriate safeguards are in place for international data transfers.",
        "All transfers comply with applicable data protection laws and regulations.",
        "We work only with service providers that maintain adequate data protection standards."
      ]
    },
    {
      id: "childrens-privacy",
      title: "Children's Privacy",
      content: [
        "MamaCare is not intended for use by individuals under 18 years of age.",
        "We do not knowingly collect personal information from children under 18.",
        "If we become aware that we have collected information from a child under 18, we will delete it promptly.",
        "Parents or guardians who believe their child has provided information should contact us immediately."
      ]
    },
    {
      id: "cookies-tracking",
      title: "Cookies and Tracking",
      content: [
        "We use cookies and similar technologies to enhance your experience and analyze usage patterns.",
        "Essential cookies are necessary for the app to function properly.",
        "Analytics cookies help us understand how users interact with our services.",
        "You can manage cookie preferences through your device settings.",
        "We do not use tracking technologies for advertising purposes."
      ]
    },
    {
      id: "third-party-services",
      title: "Third-Party Services",
      content: [
        "Payment Processing: Instasend and M-Pesa for secure payment transactions.",
        "SMS Services: Local SMS providers for appointment and medication reminders.",
        "Cloud Storage: Secure cloud services for data backup and synchronization.",
        "Analytics: Privacy-focused analytics tools to improve our services.",
        "All third-party services are carefully vetted for security and privacy compliance."
      ]
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
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-maternal rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Your privacy and the security of your personal information are our top priorities.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Overview */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="shadow-gentle mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Our Commitment to Your Privacy</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-maternal rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Secure by Design</h3>
                  <p className="text-sm text-muted-foreground">All data is encrypted and stored securely</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-maternal rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Transparent Practices</h3>
                  <p className="text-sm text-muted-foreground">Clear information about data usage</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-maternal rounded-xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Your Control</h3>
                  <p className="text-sm text-muted-foreground">Manage your data and privacy settings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Privacy Policy Sections */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-blue/5">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={section.id} className="shadow-gentle">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground" id={section.id}>
                    {index + 1}. {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-muted-foreground leading-relaxed">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground flex items-center">
                <Mail className="w-6 h-6 mr-3 text-primary" />
                Questions About Your Privacy?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, your personal information, 
                or how we handle your data, please don't hesitate to contact us.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Data Protection Officer</h4>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Email: privacy@mamacare.ke</p>
                    <p>Phone: +254 700 123 456</p>
                    <p>Address: Westlands, Nairobi, Kenya</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Response Time</h4>
                  <div className="space-y-2 text-muted-foreground">
                    <p>General inquiries: Within 48 hours</p>
                    <p>Data requests: Within 30 days</p>
                    <p>Emergency: Within 24 hours</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact-us" className="flex-1">
                  <Button variant="maternal" className="w-full">
                    Contact Privacy Team
                  </Button>
                </Link>
                <Link to="/terms-of-service" className="flex-1">
                  <Button variant="outline" className="w-full">
                    View Terms of Service
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Updates Notice */}
      <section className="py-16 px-4 bg-gradient-hero relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue/80"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Policy Updates
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            We may update this Privacy Policy from time to time. We will notify you of any 
            significant changes through the app or via email.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            Subscribe to Updates
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
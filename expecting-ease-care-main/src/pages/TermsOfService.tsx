import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Heart, FileText, Scale, Shield, AlertTriangle, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  const lastUpdated = "December 1, 2024";
  const effectiveDate = "December 15, 2024";

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      content: [
        "By accessing or using MamaCare services, you agree to be bound by these Terms of Service.",
        "If you do not agree to these terms, please do not use our services.",
        "These terms apply to all users, including free and premium subscribers.",
        "You must be at least 18 years old to use MamaCare services."
      ]
    },
    {
      id: "service-description", 
      title: "Service Description",
      content: [
        "MamaCare provides pregnancy tracking, health reminders, and educational content for expectant mothers.",
        "Our services include appointment reminders, health tips, emergency support, and premium features.",
        "We offer both free and paid subscription tiers with varying features and capabilities.",
        "Services are provided 'as is' and we reserve the right to modify features and functionality."
      ]
    },
    {
      id: "user-responsibilities",
      title: "User Responsibilities",
      content: [
        "Provide accurate and up-to-date information during registration and throughout use.",
        "Maintain the confidentiality of your account credentials and notify us of unauthorized access.",
        "Use the service only for lawful purposes and in accordance with these terms.",
        "Not share your account with others or create multiple accounts without authorization.",
        "Comply with all applicable laws and regulations in your jurisdiction.",
        "Report any technical issues or security vulnerabilities promptly."
      ]
    },
    {
      id: "medical-disclaimer",
      title: "Medical Disclaimer",
      content: [
        "MamaCare is NOT a substitute for professional medical advice, diagnosis, or treatment.",
        "Always seek the advice of qualified healthcare providers with questions about your health.",
        "Never disregard professional medical advice or delay seeking it because of information from our app.",
        "In case of medical emergency, contact emergency services immediately - do not rely solely on our emergency features.",
        "Our health tips and information are for educational purposes only and should not replace medical consultation.",
        "We do not provide medical services or employ licensed medical professionals."
      ]
    },
    {
      id: "payment-terms",
      title: "Payment and Subscription Terms",
      content: [
        "Premium subscriptions are billed monthly or annually as selected during subscription.",
        "All payments are processed securely through Instasend and M-Pesa payment platforms.",
        "Subscription fees are non-refundable except as required by applicable law.",
        "You may cancel your subscription at any time, with cancellation taking effect at the end of the current billing period.",
        "We reserve the right to change subscription prices with 30 days advance notice.",
        "Failed payments may result in temporary suspension of premium features."
      ]
    },
    {
      id: "privacy-data",
      title: "Privacy and Data Protection",
      content: [
        "Your privacy is important to us. Please review our Privacy Policy for details on data handling.",
        "You consent to the collection, processing, and storage of your personal information as described in our Privacy Policy.",
        "We implement industry-standard security measures to protect your personal information.",
        "You have the right to access, correct, or delete your personal information subject to legal requirements.",
        "We may share information with healthcare providers only with your explicit consent.",
        "Data retention periods are outlined in our Privacy Policy."
      ]
    },
    {
      id: "prohibited-uses",
      title: "Prohibited Uses",
      content: [
        "Using the service for any illegal or unauthorized purpose.",
        "Attempting to gain unauthorized access to our systems or other users' accounts.",
        "Transmitting viruses, malware, or other harmful code.",
        "Harassing, abusing, or threatening other users or our staff.",
        "Sharing false, misleading, or harmful health information.",
        "Using automated systems to access our services without permission.",
        "Reverse engineering, decompiling, or attempting to extract source code."
      ]
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      content: [
        "All content, features, and functionality of MamaCare are owned by us and protected by copyright and trademark laws.",
        "You are granted a limited, non-exclusive license to use our services for personal, non-commercial purposes.",
        "You may not copy, modify, distribute, or create derivative works based on our content.",
        "Any feedback or suggestions you provide may be used by us without compensation.",
        "Third-party content is subject to the intellectual property rights of their respective owners."
      ]
    },
    {
      id: "service-availability",
      title: "Service Availability and Modifications",
      content: [
        "We strive to maintain service availability but cannot guarantee uninterrupted access.",
        "Scheduled maintenance may temporarily interrupt service availability.",
        "We reserve the right to modify, suspend, or discontinue any part of our services at any time.",
        "Critical updates may be implemented with minimal notice for security or legal compliance.",
        "We are not liable for any inconvenience or loss resulting from service interruptions."
      ]
    },
    {
      id: "limitation-liability",
      title: "Limitation of Liability",
      content: [
        "Our liability is limited to the maximum extent permitted by applicable law.",
        "We are not liable for any indirect, incidental, or consequential damages.",
        "Our total liability shall not exceed the amount paid by you for our services in the past 12 months.",
        "We are not responsible for decisions made based on information provided by our service.",
        "Some jurisdictions do not allow limitation of liability, so these limitations may not apply to you."
      ]
    },
    {
      id: "indemnification",
      title: "Indemnification",
      content: [
        "You agree to indemnify and hold us harmless from claims arising from your use of our services.",
        "This includes claims related to violation of these terms or infringement of third-party rights.",
        "You are responsible for any costs, including legal fees, arising from such claims.",
        "We reserve the right to control the defense of any matter subject to indemnification by you."
      ]
    },
    {
      id: "termination",
      title: "Termination",
      content: [
        "You may terminate your account at any time by contacting our support team.",
        "We may terminate or suspend your account for violation of these terms.",
        "Upon termination, your right to use our services ceases immediately.",
        "We may retain certain information as required by law or for legitimate business purposes.",
        "Termination does not relieve you of obligations that accrued prior to termination."
      ]
    },
    {
      id: "governing-law",
      title: "Governing Law and Disputes",
      content: [
        "These terms are governed by the laws of Kenya.",
        "Any disputes will be resolved in the courts of Kenya.",
        "We encourage resolution of disputes through direct communication before legal action.",
        "Class action lawsuits and jury trials are waived where legally permissible.",
        "If any provision of these terms is found unenforceable, the remaining provisions continue in effect."
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
              <Scale className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Please read these terms carefully before using MamaCare services.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">Last Updated</Badge>
                {lastUpdated}
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">Effective</Badge>
                {effectiveDate}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="shadow-gentle border-orange-200 bg-orange-50/50 mb-12">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-orange-800 mb-3">Important Medical Disclaimer</h2>
                  <p className="text-orange-700 leading-relaxed">
                    MamaCare is a pregnancy support and reminder application, <strong>NOT</strong> a medical service. 
                    Our app provides educational information and reminders but should never replace professional 
                    medical advice. Always consult with qualified healthcare providers for medical decisions 
                    and emergency situations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Terms Sections */}
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

      {/* Contact and Legal */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-primary" />
                  Legal Questions?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you have questions about these terms or need legal clarification, 
                  our legal team is available to help.
                </p>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Legal Team:</strong> legal@mamacare.ke</p>
                  <p className="text-sm"><strong>Business Hours:</strong> Mon-Fri 9AM-5PM EAT</p>
                  <p className="text-sm"><strong>Response Time:</strong> Within 5 business days</p>
                </div>
                <Link to="/contact-us">
                  <Button variant="maternal" className="w-full">
                    Contact Legal Team
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-primary" />
                  Emergency Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  For medical emergencies, always contact local emergency services first. 
                  Our emergency support is supplementary.
                </p>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Kenya Emergency:</strong> 999 or 911</p>
                  <p className="text-sm"><strong>MamaCare Emergency:</strong> +254 711 456 789</p>
                  <p className="text-sm"><strong>Available:</strong> 24/7</p>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Emergency Contacts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Agreement and Updates */}
      <section className="py-16 px-4 bg-gradient-hero relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue/80"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Agreement and Updates
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            By continuing to use MamaCare, you acknowledge that you have read, understood, 
            and agree to be bound by these Terms of Service. We will notify you of any 
            significant updates to these terms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/privacy-policy">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                <Shield className="w-5 h-5 mr-2" />
                View Privacy Policy
              </Button>
            </Link>
            <Link to="/get-started">
              <Button variant="outline" size="lg" className="border-white/40 text-primary-foreground hover:bg-white/10">
                <Heart className="w-5 h-5 mr-2" />
                Start Using MamaCare
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
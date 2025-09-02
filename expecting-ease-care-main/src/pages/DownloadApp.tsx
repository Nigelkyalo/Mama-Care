import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Smartphone, 
  Download,
  Star,
  Shield,
  Zap,
  Bell,
  QrCode,
  Apple,
  PlayCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const DownloadApp = () => {
  const appFeatures = [
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Get timely reminders even when offline"
    },
    {
      icon: Zap,
      title: "Fast & Reliable",
      description: "Works seamlessly on all devices"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and protected"
    }
  ];

  const platforms = [
    {
      name: "Android",
      icon: PlayCircle,
      version: "v2.1.0",
      size: "12.5 MB",
      rating: "4.8",
      reviews: "2.1k",
      available: true,
      link: "#"
    },
    {
      name: "iOS",
      icon: Apple,
      version: "v2.1.0", 
      size: "15.2 MB",
      rating: "4.9",
      reviews: "1.8k",
      available: true,
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
            <Link to="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors">Support</Link>
            <Link to="/get-started">
              <Button variant="maternal" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-primary/5 to-blue/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Download the
                <span className="text-primary block">MamaCare App</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Get the complete pregnancy support experience on your mobile device. 
                Track your journey, receive reminders, and access expert guidance anytime, anywhere.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {appFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-maternal rounded-full flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="maternal" className="flex-1">
                  <Download className="w-5 h-5 mr-2" />
                  Download for Android
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  <Apple className="w-5 h-5 mr-2" />
                  Download for iOS
                </Button>
              </div>
            </div>

            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-80 h-80 bg-gradient-maternal rounded-3xl flex items-center justify-center shadow-elegant">
                  <Smartphone className="w-32 h-32 text-primary-foreground" />
                </div>
                <Badge className="absolute -top-2 -right-2 bg-gradient-premium text-primary-foreground">
                  New v2.1.0
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Details */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Platform
            </h2>
            <p className="text-lg text-muted-foreground">
              Available on all major mobile platforms
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {platforms.map((platform, index) => (
              <Card key={index} className="shadow-gentle hover:shadow-card transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-maternal rounded-2xl flex items-center justify-center">
                        <platform.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{platform.name}</h3>
                        <p className="text-muted-foreground">{platform.version}</p>
                      </div>
                    </div>
                    {platform.available && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Available
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-bold text-foreground ml-1">{platform.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{platform.reviews} reviews</p>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-foreground mb-2">{platform.size}</div>
                      <p className="text-xs text-muted-foreground">Size</p>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-foreground mb-2">Free</div>
                      <p className="text-xs text-muted-foreground">Price</p>
                    </div>
                  </div>

                  <Button className="w-full" variant="maternal">
                    <Download className="w-4 h-4 mr-2" />
                    Download {platform.name} App
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* QR Code Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-blue/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Quick Download
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Scan the QR code with your phone camera to download instantly
            </p>
            
            <div className="flex justify-center">
              <Card className="p-8 shadow-elegant">
                <div className="w-48 h-48 bg-gradient-maternal rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-24 h-24 text-primary-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Scan to download MamaCare
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              System Requirements
            </h2>
            <p className="text-lg text-muted-foreground">
              Make sure your device is compatible
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-gentle">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-maternal rounded-xl flex items-center justify-center">
                    <PlayCircle className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Android Requirements</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Android 6.0 or higher</li>
                  <li>• 50MB free storage space</li>
                  <li>• Internet connection for sync</li>
                  <li>• Camera for QR scanning (optional)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-gentle">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-maternal rounded-xl flex items-center justify-center">
                    <Apple className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">iOS Requirements</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• iOS 12.0 or later</li>
                  <li>• Compatible with iPhone & iPad</li>
                  <li>• 60MB free storage space</li>
                  <li>• Internet connection for sync</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-hero relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue/80"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Start Your Journey Today
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of mothers who trust MamaCare for their pregnancy journey. 
            Download now and get started in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              <Download className="w-5 h-5 mr-2" />
              Download Now
            </Button>
            <Link to="/get-started">
              <Button variant="outline" size="lg" className="border-white/40 text-primary-foreground hover:bg-white/10">
                Try Web Version
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DownloadApp;
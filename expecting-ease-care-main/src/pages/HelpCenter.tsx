import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Search, 
  BookOpen,
  Video,
  HelpCircle,
  MessageCircle,
  Calendar,
  Bell,
  Shield,
  Baby,
  Phone,
  Pill,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

const HelpCenter = () => {
  const categories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics of using MamaCare",
      articles: 12,
      color: "bg-blue-100 text-blue-800"
    },
    {
      icon: Calendar,
      title: "Appointments & Scheduling",
      description: "Manage your antenatal visits and reminders",
      articles: 8,
      color: "bg-green-100 text-green-800"
    },
    {
      icon: Bell,
      title: "Notifications & Reminders",
      description: "Customize your reminder preferences",
      articles: 6,
      color: "bg-orange-100 text-orange-800"
    },
    {
      icon: Baby,
      title: "Pregnancy Tracking",
      description: "Monitor your pregnancy progress",
      articles: 15,
      color: "bg-pink-100 text-pink-800"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Keep your data safe and secure",
      articles: 5,
      color: "bg-purple-100 text-purple-800"
    },
    {
      icon: Pill,
      title: "Health & Wellness",
      description: "Tips for a healthy pregnancy",
      articles: 20,
      color: "bg-teal-100 text-teal-800"
    }
  ];

  const popularArticles = [
    {
      title: "How to set up your pregnancy timeline",
      category: "Getting Started",
      readTime: "3 min read",
      views: "2.1k views"
    },
    {
      title: "Customizing reminder notifications",
      category: "Notifications",
      readTime: "2 min read", 
      views: "1.8k views"
    },
    {
      title: "Understanding your weekly health tips",
      category: "Health & Wellness",
      readTime: "4 min read",
      views: "1.5k views"
    },
    {
      title: "Managing emergency contacts",
      category: "Privacy & Security",
      readTime: "2 min read",
      views: "1.2k views"
    },
    {
      title: "Upgrading to premium features",
      category: "Getting Started",
      readTime: "3 min read",
      views: "1.1k views"
    }
  ];

  const quickLinks = [
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      link: "#"
    },
    {
      icon: MessageCircle,
      title: "Contact Support",
      description: "Get help from our team",
      link: "/support"
    },
    {
      icon: Phone,
      title: "Emergency Help",
      description: "24/7 emergency support",
      link: "tel:+254700123456"
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
            Help Center
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find answers to your questions and learn how to get the most out of MamaCare
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              className="pl-12 h-14 text-lg"
              placeholder="Search for help articles, guides, and more..."
            />
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {quickLinks.map((link, index) => (
              <Link key={index} to={link.link}>
                <Card className="text-center shadow-gentle hover:shadow-card transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-maternal rounded-full flex items-center justify-center mx-auto mb-4">
                      <link.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{link.title}</h3>
                    <p className="text-muted-foreground">{link.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-blue/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-muted-foreground">
              Find help organized by topic
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="shadow-gentle hover:shadow-card transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-maternal rounded-xl flex items-center justify-center flex-shrink-0">
                      <category.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-foreground">{category.title}</h3>
                        <Badge className={category.color}>
                          {category.articles} articles
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                      <div className="flex items-center text-primary text-sm font-medium">
                        View articles
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Articles
            </h2>
            <p className="text-lg text-muted-foreground">
              Most viewed help articles this week
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {popularArticles.map((article, index) => (
              <Card key={index} className="shadow-gentle hover:shadow-card transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{article.readTime}</span>
                    <span>{article.views}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 px-4 bg-gradient-hero relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue/80"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Still Need Help?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you 
            with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/support">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Support
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white/40 text-primary-foreground hover:bg-white/10">
              <Phone className="w-5 h-5 mr-2" />
              Call Emergency Line
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
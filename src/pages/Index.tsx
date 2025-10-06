import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Home, BarChart3, Briefcase, FileText } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Home,
      title: "Properties",
      description: "Manage property listings, prices, and availability",
    },
    {
      icon: Users,
      title: "Team",
      description: "Add and manage your team members",
    },
    {
      icon: BarChart3,
      title: "Statistics",
      description: "Track performance and analytics",
    },
    {
      icon: Briefcase,
      title: "Careers",
      description: "Post and manage job openings",
    },
    {
      icon: FileText,
      title: "Content",
      description: "Update website content and media",
    },
    {
      icon: Shield,
      title: "Security",
      description: "User management and access control",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="inline-flex p-4 rounded-2xl bg-primary/10 animate-scale-in">
            <Shield className="h-16 w-16 text-primary" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Real Estate Admin Dashboard
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Manage your properties, team members, users, and statistics all in one powerful platform
            </p>
          </div>

          <div className="pt-4 animate-fade-in-delay">
            <Button asChild size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
              <a href="/admin">Go to Admin Panel</a>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 animate-fade-in-delay">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-8 text-center text-muted-foreground border-t">
        <p>© 2025 Real Estate Admin. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Index;

import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <Shield className="h-24 w-24 mx-auto text-primary" />
        <h1 className="text-4xl font-bold">Real Estate Admin Dashboard</h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          Manage your properties, team members, users, and statistics all in one place
        </p>
        <Button asChild size="lg" className="mt-4">
          <a href="/admin">Go to Admin Panel</a>
        </Button>
      </div>
    </div>
  );
};

export default Index;

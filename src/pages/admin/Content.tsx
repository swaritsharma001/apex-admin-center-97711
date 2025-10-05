import { ContentManagement } from "@/components/admin/ContentManagement";
import { Settings, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Content = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-20 pb-8 bg-gradient-to-r from-luxury to-luxury-light">
        <div className="container mx-auto px-4">
          <div className="text-white">
            <Button variant="ghost" asChild className="mb-4 text-white hover:text-white/90">
              <Link to="/admin" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Admin
              </Link>
            </Button>
            <div className="flex items-center mb-4">
              <Settings className="h-12 w-12 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold">Content Management</h1>
            </div>
            <p className="text-xl opacity-90">
              Manage website content and settings
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <ContentManagement />
        </div>
      </section>
    </div>
  );
};

export default Content;

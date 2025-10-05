import { CareersManagement } from "@/components/admin/CareersManagement";
import { Briefcase, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Careers = () => {
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
              <Briefcase className="h-12 w-12 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold">Careers Management</h1>
            </div>
            <p className="text-xl opacity-90">
              Manage job postings and career opportunities
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <CareersManagement />
        </div>
      </section>
    </div>
  );
};

export default Careers;

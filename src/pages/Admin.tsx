import { Shield, Users, Home, Settings, UsersRound, BarChart3, Briefcase } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Admin = () => {

  return (
    <div className="min-h-screen bg-background">
      <section className="pt-20 pb-8 bg-gradient-to-r from-luxury to-luxury-light">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold">Admin Panel</h1>
            </div>
            <p className="text-xl opacity-90">
              Manage users, properties, team members, statistics, and website content
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/admin/users">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>Manage registered users</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    View, edit, and manage all user accounts
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/admin/properties">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Home className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Property Management</CardTitle>
                      <CardDescription>Manage properties</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Add, edit, and manage property listings
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/admin/team">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <UsersRound className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Team Management</CardTitle>
                      <CardDescription>Manage team members</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Add and manage team members and agents
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/admin/statistics">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Statistics</CardTitle>
                      <CardDescription>View platform stats</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Monitor and analyze platform metrics
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/admin/content">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Settings className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Content Management</CardTitle>
                      <CardDescription>Manage website content</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Update content and website settings
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/admin/careers">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Careers Management</CardTitle>
                      <CardDescription>Manage job postings</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Create and manage career opportunities
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;

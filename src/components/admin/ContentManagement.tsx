import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Edit, FileText, Image as ImageIcon, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContentPage {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  published: boolean;
}

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export const ContentManagement = () => {
  const { toast } = useToast();
  const [pages, setPages] = useState<ContentPage[]>([]);
  const [editingPage, setEditingPage] = useState<ContentPage | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const [pageForm, setPageForm] = useState<ContentPage>({
    title: "",
    slug: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    published: false,
  });

  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "Real Estate Admin",
    siteDescription: "Your trusted real estate partner",
    contactEmail: "info@realestate.com",
    contactPhone: "+1 234 567 8900",
    address: "123 Main St, City, State 12345",
    socialMedia: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
  });

  const handlePageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pageForm.title || !pageForm.slug) {
      toast({
        title: "Error",
        description: "Title and slug are required",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: editingPage ? "Page updated successfully" : "Page created successfully",
    });

    setPageForm({
      title: "",
      slug: "",
      content: "",
      metaTitle: "",
      metaDescription: "",
      published: false,
    });
    setIsAdding(false);
    setEditingPage(null);
  };

  const handleDeletePage = (id: string) => {
    toast({
      title: "Success",
      description: "Page deleted successfully",
    });
  };

  const handleSettingsSave = () => {
    toast({
      title: "Success",
      description: "Settings saved successfully",
    });
  };

  return (
    <Tabs defaultValue="pages" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="pages">Pages</TabsTrigger>
        <TabsTrigger value="media">Media</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="pages" className="space-y-6 mt-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Pages</h2>
            <p className="text-muted-foreground">Manage website pages and content</p>
          </div>
          {!isAdding && !editingPage && (
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Page
            </Button>
          )}
        </div>

        {(isAdding || editingPage) && (
          <Card>
            <CardHeader>
              <CardTitle>{editingPage ? "Edit Page" : "Add New Page"}</CardTitle>
              <CardDescription>
                {editingPage ? "Update page details" : "Create a new page"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePageSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Page Title *</Label>
                    <Input
                      id="title"
                      value={pageForm.title}
                      onChange={(e) => setPageForm({ ...pageForm, title: e.target.value })}
                      placeholder="e.g., About Us"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug *</Label>
                    <Input
                      id="slug"
                      value={pageForm.slug}
                      onChange={(e) => setPageForm({ ...pageForm, slug: e.target.value })}
                      placeholder="e.g., about-us"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Page Content</Label>
                  <Textarea
                    id="content"
                    value={pageForm.content}
                    onChange={(e) => setPageForm({ ...pageForm, content: e.target.value })}
                    placeholder="Enter page content..."
                    rows={8}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="metaTitle">Meta Title (SEO)</Label>
                    <Input
                      id="metaTitle"
                      value={pageForm.metaTitle}
                      onChange={(e) => setPageForm({ ...pageForm, metaTitle: e.target.value })}
                      placeholder="SEO title for search engines"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metaDescription">Meta Description (SEO)</Label>
                    <Input
                      id="metaDescription"
                      value={pageForm.metaDescription}
                      onChange={(e) => setPageForm({ ...pageForm, metaDescription: e.target.value })}
                      placeholder="SEO description"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit">
                    {editingPage ? "Update Page" : "Create Page"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAdding(false);
                      setEditingPage(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {pages.length === 0 && !isAdding && !editingPage && (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No pages yet. Click "Add Page" to create your first page.
              </CardContent>
            </Card>
          )}

          {pages.map((page) => (
            <Card key={page._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{page.title}</CardTitle>
                    <CardDescription>/{page.slug}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setEditingPage(page);
                        setPageForm(page);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => page._id && handleDeletePage(page._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="media" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Media Library
            </CardTitle>
            <CardDescription>Manage images and media files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Media Library</h3>
              <p className="text-muted-foreground mb-4">
                Upload and manage images, videos, and documents
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Upload Media
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Site Settings
            </CardTitle>
            <CardDescription>Configure website settings and information</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Social Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook URL</Label>
                    <Input
                      id="facebook"
                      value={settings.socialMedia.facebook}
                      onChange={(e) => setSettings({
                        ...settings,
                        socialMedia: { ...settings.socialMedia, facebook: e.target.value }
                      })}
                      placeholder="https://facebook.com/yourpage"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter URL</Label>
                    <Input
                      id="twitter"
                      value={settings.socialMedia.twitter}
                      onChange={(e) => setSettings({
                        ...settings,
                        socialMedia: { ...settings.socialMedia, twitter: e.target.value }
                      })}
                      placeholder="https://twitter.com/yourhandle"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram URL</Label>
                    <Input
                      id="instagram"
                      value={settings.socialMedia.instagram}
                      onChange={(e) => setSettings({
                        ...settings,
                        socialMedia: { ...settings.socialMedia, instagram: e.target.value }
                      })}
                      placeholder="https://instagram.com/yourhandle"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input
                      id="linkedin"
                      value={settings.socialMedia.linkedin}
                      onChange={(e) => setSettings({
                        ...settings,
                        socialMedia: { ...settings.socialMedia, linkedin: e.target.value }
                      })}
                      placeholder="https://linkedin.com/company/yourcompany"
                    />
                  </div>
                </div>
              </div>

              <Button type="button" onClick={handleSettingsSave}>
                Save Settings
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

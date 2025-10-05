import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Job {
  _id?: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary?: string;
  salaryMin?: number;
  salaryMax?: number;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: Date;
  applyUrl: string;
  contactEmail: string;
  experience: string;
  benefits: string[];
  remote: boolean;
}

export const CareersManagement = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const [formData, setFormData] = useState<Job>({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    description: "",
    requirements: [],
    responsibilities: [],
    postedDate: new Date(),
    applyUrl: "",
    contactEmail: "",
    experience: "",
    benefits: [],
    remote: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast({
        title: "Error",
        description: "Title and description are required",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would make an API call
    toast({
      title: "Success",
      description: editingJob ? "Job updated successfully" : "Job created successfully",
    });

    // Reset form
    setFormData({
      title: "",
      department: "",
      location: "",
      type: "Full-time",
      description: "",
      requirements: [],
      responsibilities: [],
      postedDate: new Date(),
      applyUrl: "",
      contactEmail: "",
      experience: "",
      benefits: [],
      remote: false,
    });
    setIsAdding(false);
    setEditingJob(null);
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Success",
      description: "Job deleted successfully",
    });
  };

  const handleArrayInput = (field: 'requirements' | 'responsibilities' | 'benefits', value: string) => {
    setFormData({
      ...formData,
      [field]: value.split('\n').filter(item => item.trim() !== ''),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Careers Management</h2>
          <p className="text-muted-foreground">Manage job postings and career opportunities</p>
        </div>
        {!isAdding && !editingJob && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Job
          </Button>
        )}
      </div>

      {(isAdding || editingJob) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingJob ? "Edit Job" : "Add New Job"}</CardTitle>
            <CardDescription>
              {editingJob ? "Update job posting details" : "Create a new job posting"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Senior Real Estate Agent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g., Sales"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., New York, NY"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Job Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Required</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g., 3-5 years"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="careers@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salaryMin">Salary Min</Label>
                  <Input
                    id="salaryMin"
                    type="number"
                    value={formData.salaryMin || ""}
                    onChange={(e) => setFormData({ ...formData, salaryMin: Number(e.target.value) })}
                    placeholder="50000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salaryMax">Salary Max</Label>
                  <Input
                    id="salaryMax"
                    type="number"
                    value={formData.salaryMax || ""}
                    onChange={(e) => setFormData({ ...formData, salaryMax: Number(e.target.value) })}
                    placeholder="80000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="applyUrl">Apply URL</Label>
                  <Input
                    id="applyUrl"
                    type="url"
                    value={formData.applyUrl}
                    onChange={(e) => setFormData({ ...formData, applyUrl: e.target.value })}
                    placeholder="https://apply.company.com/job/123"
                  />
                </div>

                <div className="space-y-2 flex items-center gap-2 pt-8">
                  <Switch
                    id="remote"
                    checked={formData.remote}
                    onCheckedChange={(checked) => setFormData({ ...formData, remote: checked })}
                  />
                  <Label htmlFor="remote">Remote Position</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the role and what the candidate will do..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements (one per line)</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements.join('\n')}
                  onChange={(e) => handleArrayInput('requirements', e.target.value)}
                  placeholder="Bachelor's degree in relevant field&#10;3+ years of experience&#10;Strong communication skills"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsibilities">Responsibilities (one per line)</Label>
                <Textarea
                  id="responsibilities"
                  value={formData.responsibilities.join('\n')}
                  onChange={(e) => handleArrayInput('responsibilities', e.target.value)}
                  placeholder="Manage client relationships&#10;Conduct property showings&#10;Negotiate contracts"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefits">Benefits (one per line)</Label>
                <Textarea
                  id="benefits"
                  value={formData.benefits.join('\n')}
                  onChange={(e) => handleArrayInput('benefits', e.target.value)}
                  placeholder="Health insurance&#10;401(k) matching&#10;Flexible hours"
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  {editingJob ? "Update Job" : "Create Job"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingJob(null);
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
        {jobs.length === 0 && !isAdding && !editingJob && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No job postings yet. Click "Add Job" to create your first posting.
            </CardContent>
          </Card>
        )}

        {jobs.map((job) => (
          <Card key={job._id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>
                    {job.department} • {job.location} • {job.type}
                    {job.remote && " • Remote"}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingJob(job);
                      setFormData(job);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => job._id && handleDelete(job._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
              {job.experience && (
                <p className="text-sm">
                  <strong>Experience:</strong> {job.experience}
                </p>
              )}
              {(job.salaryMin || job.salaryMax) && (
                <p className="text-sm">
                  <strong>Salary Range:</strong> ${job.salaryMin?.toLocaleString()} - ${job.salaryMax?.toLocaleString()}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

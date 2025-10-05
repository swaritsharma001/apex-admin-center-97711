import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Home, Users, Calendar, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

interface Statistic {
  icon: string;
  value: string;
  label: string;
  description: string;
}

const iconMap = {
  home: Home,
  users: Users,
  calendar: Calendar,
  star: Star,
};

export const StatisticsManagement = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([
    {
      icon: "home",
      value: "500",
      label: "Properties Sold",
      description: "Successfully completed property transactions",
    },
    {
      icon: "users",
      value: "1200",
      label: "Happy Clients",
      description: "Satisfied customers across all services",
    },
    {
      icon: "calendar",
      value: "15",
      label: "Years Experience",
      description: "Expertise in real estate market",
    },
    {
      icon: "star",
      value: "98",
      label: "Customer Satisfaction",
      description: "Based on client feedback and reviews",
    },
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/page/statistics`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.statistics) {
        setStatistics(response.data.statistics);
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const saveStatistics = async () => {
    setLoading(true);
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/page/statistics`,
        { statistics },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "Success",
        description: "Statistics updated successfully",
      });
    } catch (error) {
      console.error("Error saving statistics:", error);
      toast({
        title: "Error",
        description: "Failed to update statistics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatistic = (index: number, field: keyof Statistic, value: string) => {
    const updated = [...statistics];
    updated[index] = { ...updated[index], [field]: value };
    setStatistics(updated);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Statistics Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {statistics.map((stat, index) => {
              const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Home;
              return (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="grid gap-4">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-5 w-5 text-primary" />
                        <Label>Statistic {index + 1}</Label>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`value-${index}`}>Value</Label>
                          <Input
                            id={`value-${index}`}
                            value={stat.value}
                            onChange={(e) =>
                              updateStatistic(index, "value", e.target.value)
                            }
                            placeholder="500"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`label-${index}`}>Label</Label>
                          <Input
                            id={`label-${index}`}
                            value={stat.label}
                            onChange={(e) =>
                              updateStatistic(index, "label", e.target.value)
                            }
                            placeholder="Properties Sold"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor={`description-${index}`}>
                          Description
                        </Label>
                        <Textarea
                          id={`description-${index}`}
                          value={stat.description}
                          onChange={(e) =>
                            updateStatistic(index, "description", e.target.value)
                          }
                          placeholder="Enter description"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex gap-4 mt-6">
            <Button onClick={saveStatistics} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
            <Button variant="outline" onClick={fetchStatistics}>
              Reset to Current
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat, index) => {
              const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Home;
              return (
                <Card key={index} className="border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="p-3 rounded-full bg-primary/10">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-primary">
                        {stat.value}
                        {stat.label.includes("Satisfaction") && "%"}
                        {stat.label.includes("Sold") && "+"}
                        {stat.label.includes("Clients") && "+"}
                      </div>
                      <div className="font-semibold">{stat.label}</div>
                      <p className="text-sm text-muted-foreground">
                        {stat.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Home, 
  Settings, 
  Watch, 
  User, 
  Phone, 
  Menu, 
  X,
  Plane,
  Activity,
  Heart,
  Moon,
  Footprints
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  userName: string;
  wearableConnected: boolean;
  wellnessScore: number;
  profilePhoto?: string | null;
}

export const Sidebar = ({ userName, wearableConnected, wellnessScore, profilePhoto }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/",
      active: location.pathname === "/"
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
      active: location.pathname === "/settings"
    }
  ];

  const getWellnessStatus = () => {
    if (wellnessScore > 70) return { text: "Healthy", color: "bg-success" };
    if (wellnessScore >= 40) return { text: "Stressed", color: "bg-warning" };
    return { text: "Critical", color: "bg-critical" };
  };

  const status = getWellnessStatus();

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-80 bg-card border-r border-border z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:fixed lg:z-40
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <Plane className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">AeroMind</h2>
                  <p className="text-sm text-muted-foreground">Pilot Wellness</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                {profilePhoto ? (
                  <img 
                    src={profilePhoto} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-primary" />
                )}
              </div>
              <div>
                <p className="font-medium text-foreground">{userName}</p>
                <p className="text-sm text-muted-foreground">Pilot</p>
              </div>
            </div>
            
            {/* Wellness Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${status.color}`} />
              <span className="text-sm font-medium text-foreground">
                {status.text} ({wellnessScore}/100)
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  variant={item.active ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>

          {/* Wearable Status */}
          <div className="p-4 border-t border-border">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Watch className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Wearable</span>
                </div>
                <Badge variant={wearableConnected ? "default" : "secondary"}>
                  {wearableConnected ? "Connected" : "Disconnected"}
                </Badge>
              </div>
              {wearableConnected ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Heart className="w-3 h-3" />
                    <span>Heart Rate: Active</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Moon className="w-3 h-3" />
                    <span>Sleep: Tracking</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Footprints className="w-3 h-3" />
                    <span>Steps: Monitoring</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Connect your wearable to start tracking
                </p>
              )}
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-border">
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  // In a real app, this would open a contact modal or call
                  alert("Contacting medical personnel...");
                }}
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact Medical
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

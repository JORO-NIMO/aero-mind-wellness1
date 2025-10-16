import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Database, Camera, Upload, Phone, MessageCircle, Video, Watch, Wifi, Bluetooth, AlertTriangle, Mic, MicOff, VideoOff, PhoneOff, Clock } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useWearable } from "@/contexts/WearableContext";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [availableDevices, setAvailableDevices] = useState([
    { id: '1', name: 'Apple Watch Series 9', type: 'smartwatch', battery: 85 },
    { id: '2', name: 'Fitbit Charge 5', type: 'fitness-tracker', battery: 72 },
    { id: '3', name: 'Garmin Fenix 7', type: 'smartwatch', battery: 91 }
  ]);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  const { isConnected: wearableConnected, isConnecting: isConnectingWearable, connectWearable, disconnectWearable } = useWearable();

  // Mock user data - in a real app this would come from context/API
  const userName = "John Pilot";
  const wellnessScore = 85;

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfilePhoto(e.target?.result as string);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const handleMedicalContact = (type: 'call' | 'message' | 'video') => {
    // In a real app, this would initiate the appropriate communication method
    switch (type) {
      case 'call':
        alert('Initiating call to medical personnel...');
        break;
      case 'message':
        alert('Opening secure messaging with medical team...');
        break;
      case 'video':
        setIsVideoCallOpen(true);
        // Start call timer
        const timer = setInterval(() => {
          setCallDuration(prev => prev + 1);
        }, 1000);
        // Store timer for cleanup
        (window as any).callTimer = timer;
        break;
    }
  };

  const endVideoCall = () => {
    setIsVideoCallOpen(false);
    setCallDuration(0);
    // Clear timer
    if ((window as any).callTimer) {
      clearInterval((window as any).callTimer);
      (window as any).callTimer = null;
    }
  };

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleWearableConnection = (deviceId: string) => {
    connectWearable();
    alert('Wearable device connected successfully!');
  };

  const handleWearableDisconnect = () => {
    disconnectWearable();
    alert('Wearable device disconnected');
  };

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Sidebar 
        userName={userName}
        wearableConnected={wearableConnected}
        wellnessScore={wellnessScore}
        profilePhoto={profilePhoto}
      />
      <div className="lg:ml-80 p-6">
        <div className={`max-w-4xl mx-auto space-y-6 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}> 
        {/* Header */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2 bg-blue-100 rounded-lg">
            <SettingsIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your wellness app preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Medical Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-red-600" />
                <span>Medical Contact</span>
              </CardTitle>
              <CardDescription>
                Contact medical personnel for emergencies or consultations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  For medical emergencies, call your local emergency services immediately.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleMedicalContact('call')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Call
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleMedicalContact('message')}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Secure Message
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleMedicalContact('video')}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Video Consultation
                </Button>
              </div>
              
              <Separator />
              
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Available 24/7:</strong> Medical support team</p>
                <p><strong>Response Time:</strong> 5 minutes for emergencies</p>
                <p><strong>Languages:</strong> English, Luganda, Kiswahili</p>
              </div>
            </CardContent>
          </Card>

          {/* Wearable Device Connection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Watch className="h-5 w-5 text-blue-600" />
                <span>Wearable Devices</span>
              </CardTitle>
              <CardDescription>
                Connect and manage your wellness tracking devices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Connection Status</Label>
                  <p className="text-sm text-gray-500">
                    {wearableConnected ? 'Device connected and syncing' : 
                     isConnectingWearable ? 'Connecting to device...' : 
                     'No device connected'}
                  </p>
                </div>
                <Badge variant={wearableConnected ? "default" : "secondary"}>
                  {isConnectingWearable ? 'Connecting...' :
                   wearableConnected ? "Connected" : "Disconnected"}
                </Badge>
              </div>

              {wearableConnected && (
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-green-800">Live Data Sync</span>
                  </div>
                  <p className="text-xs text-green-700">
                    Heart rate, sleep, and activity data syncing in real-time
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={handleWearableDisconnect}
                  >
                    Disconnect
                  </Button>
                </div>
              )}

              {!wearableConnected && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" disabled={isConnectingWearable}>
                      <Bluetooth className="h-4 w-4 mr-2" />
                      {isConnectingWearable ? 'Searching...' : 'Connect Device'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Available Devices</DialogTitle>
                      <DialogDescription>
                        Select a device to connect to your wellness app
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3">
                      {availableDevices.map((device) => (
                        <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Watch className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="font-medium">{device.name}</p>
                              <p className="text-sm text-gray-500 capitalize">
                                {device.type} • {device.battery}% battery
                              </p>
                            </div>
                          </div>
                          <Button 
                            size="sm"
                            onClick={() => handleWearableConnection(device.id)}
                            disabled={isConnectingWearable}
                          >
                            {isConnectingWearable ? 'Connecting...' : 'Connect'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              )}

              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Supported Devices:</strong> Apple Watch, Fitbit, Garmin, Samsung Galaxy Watch</p>
                <p><strong>Data Tracked:</strong> Heart rate, sleep, steps, stress levels</p>
              </div>
            </CardContent>
          </Card>
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <span>Profile</span>
              </CardTitle>
              <CardDescription>
                Manage your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Profile Photo Upload */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profilePhoto || undefined} />
                  <AvatarFallback>
                    {isUploading ? (
                      <div className="animate-spin">
                        <Camera className="h-8 w-8" />
                      </div>
                    ) : (
                      <User className="h-8 w-8" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Upload className="h-4 w-4" />
                      <span>{profilePhoto ? "Change Photo" : "Upload Photo"}</span>
                    </div>
                  </Label>
                  <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                    disabled={isUploading}
                  />
                  <p className="text-xs text-gray-500">
                    JPG, PNG up to 5MB
                  </p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" defaultValue={userName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="Enter your age" />
              </div>
              <Button className="w-full">Update Profile</Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-green-600" />
                <span>Notifications</span>
              </CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive wellness reminders and updates
                  </p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Get weekly wellness reports via email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Reminder Alerts</Label>
                  <p className="text-sm text-gray-500">
                    Daily mindfulness and breathing reminders
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <span>Privacy & Data</span>
              </CardTitle>
              <CardDescription>
                Control your data sharing and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Anonymous Data Sharing</Label>
                  <p className="text-sm text-gray-500">
                    Help improve the app by sharing anonymous usage data
                  </p>
                </div>
                <Switch
                  checked={dataSharing}
                  onCheckedChange={setDataSharing}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Health Data Export</Label>
                  <p className="text-sm text-gray-500">
                    Allow exporting your wellness data
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button variant="outline" className="w-full">
                Download My Data
              </Button>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-orange-600" />
                <span>Appearance</span>
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your app
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-gray-500">
                    Switch to dark theme for better night viewing
                  </p>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Accent Color</Label>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="w-8 h-8 p-0 bg-blue-500" />
                  <Button size="sm" variant="outline" className="w-8 h-8 p-0 bg-green-500" />
                  <Button size="sm" variant="outline" className="w-8 h-8 p-0 bg-purple-500" />
                  <Button size="sm" variant="outline" className="w-8 h-8 p-0 bg-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-gray-600" />
              <span>Advanced</span>
            </CardTitle>
            <CardDescription>
              Advanced settings and data management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Reset App Data</Label>
                <p className="text-sm text-gray-500">
                  Clear all your wellness data and start fresh
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Reset Data
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>App Version</Label>
                <p className="text-sm text-gray-500">
                  Current version information
                </p>
              </div>
              <Badge variant="secondary">v1.0.0</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Save Changes Button */}
        <div className="flex justify-end space-x-4 pt-6">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
        </div>
      </div>

      {/* Video Consultation Modal */}
      <Dialog open={isVideoCallOpen} onOpenChange={setIsVideoCallOpen}>
        <DialogContent className="max-w-4xl w-full h-[600px] p-0">
          <div className="relative h-full bg-gray-900 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Dr. Sarah Johnson</h3>
                    <p className="text-green-400 text-sm">Medical Personnel • Online</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono">{formatCallDuration(callDuration)}</span>
                </div>
              </div>
            </div>

            {/* Video Areas */}
            <div className="relative h-full flex">
              {/* Main Video (Doctor) */}
              <div className="flex-1 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="h-16 w-16" />
                  </div>
                  <h2 className="text-2xl font-medium mb-2">Dr. Sarah Johnson</h2>
                  <p className="text-blue-200">Medical Personnel</p>
                  <div className="mt-4 flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm">Connected</span>
                  </div>
                </div>
              </div>

              {/* User Video (Small) */}
              <div className="absolute top-20 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-white/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <User className="h-8 w-8" />
                  </div>
                  <p className="text-sm">{userName}</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm p-6">
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant={isAudioMuted ? "destructive" : "secondary"}
                  size="lg"
                  className="rounded-full w-12 h-12"
                  onClick={() => setIsAudioMuted(!isAudioMuted)}
                >
                  {isAudioMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant={isVideoMuted ? "destructive" : "secondary"}
                  size="lg"
                  className="rounded-full w-12 h-12"
                  onClick={() => setIsVideoMuted(!isVideoMuted)}
                >
                  {isVideoMuted ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant="destructive"
                  size="lg"
                  className="rounded-full w-12 h-12"
                  onClick={endVideoCall}
                >
                  <PhoneOff className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-white/70 text-sm">
                  {isAudioMuted ? "Microphone muted" : "Microphone active"} • 
                  {isVideoMuted ? " Camera off" : " Camera on"}
                </p>
              </div>
            </div>

            {/* Connection Status */}
            <div className="absolute top-20 left-4 z-10">
              <div className="bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                HD Video Call
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;

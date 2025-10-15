import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Heart, 
  Phone, 
  MessageCircle, 
  BookOpen, 
  Play, 
  Download, 
  ExternalLink, 
  Search,
  Brain,
  Users,
  Shield,
  Clock,
  Star,
  AlertTriangle,
  Headphones,
  FileText,
  Video,
  Smartphone,
  User,
  Calendar
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";

const MentalHealthResources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  
  const { toast } = useToast();
  
  // Mock user data - in a real app this would come from context/API
  const userName = "John Pilot";
  const profilePhoto = null;
  const wearableConnected = true;
  const wellnessScore = 85;

  // Country-specific crisis resources based on regulatory body
  const getCountrySpecificCrisisResources = () => {
    const userData = localStorage.getItem("aeromind_user");
    let selectedCountry = "UG"; // Default to Uganda
    
    if (userData) {
      const user = JSON.parse(userData);
      // Map regulatory bodies to countries
      if (user.compliance === "UCAA") selectedCountry = "UG";
      else if (user.compliance === "KCAA") selectedCountry = "KE";
      else if (user.compliance === "TCAA") selectedCountry = "TZ";
    }

    const crisisResourcesByCountry = {
      UG: [
        {
          id: 1,
          title: "Mental Health Uganda (MHU)",
          description: "Provides free, confidential counseling and mental health support",
          phone: "0800 21 21 21",
          available: "Weekdays (business hours)",
          type: "crisis",
          priority: "high",
          country: "Uganda",
          flag: "🇺🇬"
        },
        {
          id: 2,
          title: "StrongMinds Uganda",
          description: "Offers psychological and emotional support, especially for stress and depression",
          phone: "+256 800 200 600",
          available: "24/7",
          type: "crisis",
          priority: "high",
          country: "Uganda",
          flag: "🇺🇬"
        }
      ],
      KE: [
        {
          id: 3,
          title: "Befrienders Kenya",
          description: "24/7 emotional support for people in distress or with suicidal thoughts",
          phone: "+254 722 178 177",
          website: "www.befrienderskenya.org",
          available: "24/7",
          type: "crisis",
          priority: "high",
          country: "Kenya",
          flag: "🇰🇪"
        },
        {
          id: 4,
          title: "Emergency Medicine Kenya Foundation (EMKF) Mental Health Support Line",
          description: "Offers psychological first aid and mental health crisis counseling",
          phone: "0800 723 253",
          available: "24/7",
          type: "crisis",
          priority: "high",
          country: "Kenya",
          flag: "🇰🇪"
        },
        {
          id: 5,
          title: "NACADA Helpline (Substance Abuse & Mental Health)",
          description: "Free and confidential support for individuals struggling with stress, substance abuse, or related mental health issues",
          phone: "1192",
          available: "24/7",
          type: "crisis",
          priority: "high",
          country: "Kenya",
          flag: "🇰🇪"
        }
      ],
      TZ: [
        {
          id: 6,
          title: "Mental Health Trust Tanzania",
          description: "Provides counseling and emotional support for mental health crises",
          phone: "+255 755 740 725",
          available: "24/7",
          type: "crisis",
          priority: "high",
          country: "Tanzania",
          flag: "🇹🇿"
        },
        {
          id: 7,
          title: "Muhimbili National Hospital – Psychiatry & Mental Health Unit",
          description: "Offers professional psychiatric consultation and referrals",
          phone: "+255 22 277 5726",
          available: "24/7",
          type: "crisis",
          priority: "high",
          country: "Tanzania",
          flag: "🇹🇿"
        }
      ]
    };

    return crisisResourcesByCountry[selectedCountry] || crisisResourcesByCountry.UG;
  };

  const crisisResources = getCountrySpecificCrisisResources();
  
  // Get current country name for display
  const getCurrentCountryInfo = () => {
    const userData = localStorage.getItem("aeromind_user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.compliance === "UCAA") return { name: "Uganda", flag: "🇺🇬" };
      else if (user.compliance === "KCAA") return { name: "Kenya", flag: "🇰🇪" };
      else if (user.compliance === "TCAA") return { name: "Tanzania", flag: "🇹🇿" };
    }
    return { name: "Uganda", flag: "🇺🇬" }; // Default
  };
  
  const currentCountry = getCurrentCountryInfo();

  // Handler functions for button actions
  const handleCrisisContact = (resource: any) => {
    if (resource.website) {
      // Open website in new tab
      window.open(`https://${resource.website}`, '_blank');
      toast({
        title: "Opening Website",
        description: `Opening ${resource.title} website in a new tab.`,
      });
    } else {
      // For phone numbers, show a confirmation dialog
      const phoneNumber = resource.phone.replace(/\D/g, ''); // Remove non-digits
      const confirmCall = window.confirm(`Call ${resource.title} at ${resource.phone}?`);
      if (confirmCall) {
        // In a real app, this would initiate a phone call
        toast({
          title: "Call Initiated",
          description: `Calling ${resource.title} at ${resource.phone}`,
        });
      }
    }
  };

  const handleSelfHelpTool = (tool: any) => {
    setSelectedTool(tool);
    setIsToolOpen(true);
  };

  const handleProfessionalMessage = (professional: any) => {
    setSelectedProfessional(professional);
    setMessageText("");
    setIsMessageOpen(true);
  };

  const handleProfessionalBooking = (professional: any) => {
    setSelectedProfessional(professional);
    setBookingDate("");
    setBookingTime("");
    setIsBookingOpen(true);
  };

  const handleEducationalContent = (content: any) => {
    setSelectedContent(content);
    setIsContentOpen(true);
  };

  const handleJoinGroup = (group: any) => {
    setSelectedGroup(group);
    setIsGroupOpen(true);
  };

  const sendMessage = () => {
    if (messageText.trim()) {
      toast({
        title: "Message Sent",
        description: `Your message has been sent to ${selectedProfessional.name}`,
      });
      setIsMessageOpen(false);
      setMessageText("");
    }
  };

  const confirmBooking = () => {
    if (bookingDate && bookingTime) {
      toast({
        title: "Appointment Booked",
        description: `Your appointment with ${selectedProfessional.name} has been scheduled for ${bookingDate} at ${bookingTime}`,
      });
      setIsBookingOpen(false);
      setBookingDate("");
      setBookingTime("");
    }
  };

  const confirmGroupJoin = () => {
    toast({
      title: "Group Joined",
      description: `You have successfully joined ${selectedGroup.name}`,
    });
    setIsGroupOpen(false);
  };

  const selfHelpTools = [
    {
      id: 1,
      title: "Breathing Exercises",
      description: "Guided breathing techniques for stress relief",
      type: "audio",
      duration: "5-10 min",
      category: "stress-relief",
      rating: 4.8
    },
    {
      id: 2,
      title: "Progressive Muscle Relaxation",
      description: "Step-by-step muscle relaxation guide",
      type: "audio",
      duration: "15 min",
      category: "relaxation",
      rating: 4.6
    },
    {
      id: 3,
      title: "Mindfulness Meditation",
      description: "Beginner-friendly mindfulness practices",
      type: "audio",
      duration: "10-20 min",
      category: "mindfulness",
      rating: 4.9
    },
    {
      id: 4,
      title: "Gratitude Journal",
      description: "Daily gratitude practice template",
      type: "interactive",
      duration: "5 min",
      category: "wellness",
      rating: 4.7
    }
  ];

  const professionalResources = [
    {
      id: 1,
      name: "Dr. Sarah Muwanguzi",
      specialty: "Aviation Psychology",
      experience: "15 years",
      availability: "Online",
      rating: 4.9,
      languages: ["English", "Luganda"],
      photo: null
    },
    {
      id: 2,
      name: "Dr. Michael Ahebwa",
      specialty: "Stress Management",
      experience: "12 years",
      availability: "In-person",
      rating: 4.8,
      languages: ["English", "Runyankole-Rukiga"],
      photo: null
    },
    {
      id: 3,
      name: "Dr. Emily Akello",
      specialty: "Trauma Therapy",
      experience: "10 years",
      availability: "Hybrid",
      rating: 4.9,
      languages: ["English", "Kiswahili", "Luganda"],
      photo: null
    }
  ];

  const educationalContent = [
    {
      id: 1,
      title: "Understanding Pilot Stress",
      type: "article",
      readTime: "8 min",
      category: "education",
      featured: true
    },
    {
      id: 2,
      title: "Sleep Hygiene for Pilots",
      type: "article",
      readTime: "6 min",
      category: "sleep",
      featured: false
    },
    {
      id: 3,
      title: "Managing Jet Lag",
      type: "video",
      duration: "12 min",
      category: "wellness",
      featured: true
    },
    {
      id: 4,
      title: "Coping with Irregular Schedules",
      type: "podcast",
      duration: "25 min",
      category: "lifestyle",
      featured: false
    }
  ];

  const supportGroups = [
    {
      id: 1,
      name: "Pilot Mental Health Support",
      members: 1250,
      type: "peer-support",
      nextMeeting: "Tomorrow 7:00 PM",
      frequency: "Weekly"
    },
    {
      id: 2,
      name: "Aviation Professionals Anonymous",
      members: 890,
      type: "recovery",
      nextMeeting: "Thursday 8:00 PM",
      frequency: "Bi-weekly"
    },
    {
      id: 3,
      name: "Long-haul Pilots Wellness",
      members: 654,
      type: "specialized",
      nextMeeting: "Saturday 2:00 PM",
      frequency: "Monthly"
    }
  ];

  const filteredResources = (resources: any[]) => {
    if (!searchQuery) return resources;
    return resources.filter(resource => 
      resource.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.specialty?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Sidebar 
        userName={userName}
        wearableConnected={wearableConnected}
        wellnessScore={wellnessScore}
        profilePhoto={profilePhoto}
      />
      <div className="lg:ml-80 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 bg-green-100 rounded-lg">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mental Health Resources</h1>
              <p className="text-gray-600">Find support, tools, and professional help for your mental wellness</p>
            </div>
          </div>

          {/* Crisis Alert */}
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>In crisis?</strong> If you're experiencing thoughts of self-harm, please contact emergency services immediately or call your local mental health helpline using the resources below.
            </AlertDescription>
          </Alert>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search resources, professionals, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Crisis Resources */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Shield className="h-6 w-6 text-red-600 mr-2" />
                Crisis Support
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-lg">{currentCountry.flag}</span>
                <span className="text-sm font-medium text-gray-600">{currentCountry.name}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources(crisisResources).map((resource) => (
                <Card key={resource.id} className="border-red-200 bg-red-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-red-900">{resource.title}</CardTitle>
                      <Badge variant="destructive">Crisis</Badge>
                    </div>
                    <CardDescription className="text-red-700">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2 text-red-800">
                      <Phone className="h-4 w-4" />
                      <span className="font-medium">{resource.phone}</span>
                    </div>
                    {resource.website && (
                      <div className="flex items-center space-x-2 text-red-700">
                        <ExternalLink className="h-4 w-4" />
                        <span className="text-sm">{resource.website}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-red-700">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{resource.available}</span>
                    </div>
                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700"
                      onClick={() => handleCrisisContact(resource)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Self-Help Tools */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Brain className="h-6 w-6 text-blue-600 mr-2" />
              Self-Help Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredResources(selfHelpTools).map((tool) => (
                <Card key={tool.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{tool.rating}</span>
                      </div>
                    </div>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-600">
                      {tool.type === 'audio' ? <Headphones className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                      <span className="text-sm">{tool.duration}</span>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleSelfHelpTool(tool)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Professional Resources */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Users className="h-6 w-6 text-purple-600 mr-2" />
              Mental Health Professionals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources(professionalResources).map((professional) => (
                <Card key={professional.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={professional.photo || undefined} />
                        <AvatarFallback>
                          <User className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{professional.name}</CardTitle>
                        <CardDescription>{professional.specialty}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{professional.experience} experience</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{professional.availability}</Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{professional.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {professional.languages.map((lang, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleProfessionalMessage(professional)}
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleProfessionalBooking(professional)}
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        Book
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Educational Content */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <BookOpen className="h-6 w-6 text-green-600 mr-2" />
              Educational Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResources(educationalContent).map((content) => (
                <Card key={content.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{content.title}</CardTitle>
                      {content.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      {content.type === 'video' && <Video className="h-4 w-4" />}
                      {content.type === 'article' && <FileText className="h-4 w-4" />}
                      {content.type === 'podcast' && <Headphones className="h-4 w-4" />}
                      <span>{content.readTime || content.duration}</span>
                      <Badge variant="outline" className="capitalize">
                        {content.category}
                      </Badge>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleEducationalContent(content)}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {content.type === 'video' ? 'Watch' : content.type === 'podcast' ? 'Listen' : 'Read'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Support Groups */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Users className="h-6 w-6 text-orange-600 mr-2" />
              Support Groups
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources(supportGroups).map((group) => (
                <Card key={group.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <CardDescription>
                      {group.members.toLocaleString()} members
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Next: {group.nextMeeting}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{group.frequency}</span>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {group.type.replace('-', ' ')}
                      </Badge>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleJoinGroup(group)}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Join Group
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Self-Help Tool Modal */}
      <Dialog open={isToolOpen} onOpenChange={setIsToolOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Play className="h-5 w-5" />
              <span>{selectedTool?.title}</span>
            </DialogTitle>
            <DialogDescription>
              {selectedTool?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">Instructions:</h4>
              {selectedTool?.title === "Breathing Exercises" && (
                <div className="space-y-2 text-sm">
                  <p>1. Sit comfortably and close your eyes</p>
                  <p>2. Inhale slowly through your nose for 4 counts</p>
                  <p>3. Hold your breath for 4 counts</p>
                  <p>4. Exhale slowly through your mouth for 6 counts</p>
                  <p>5. Repeat for 5-10 cycles</p>
                </div>
              )}
              {selectedTool?.title === "Progressive Muscle Relaxation" && (
                <div className="space-y-2 text-sm">
                  <p>1. Start with your toes, tense for 5 seconds</p>
                  <p>2. Release and feel the relaxation</p>
                  <p>3. Move up through each muscle group</p>
                  <p>4. Focus on the contrast between tension and relaxation</p>
                </div>
              )}
              {selectedTool?.title === "Mindfulness Meditation" && (
                <div className="space-y-2 text-sm">
                  <p>1. Find a quiet, comfortable space</p>
                  <p>2. Focus on your breathing</p>
                  <p>3. Notice thoughts without judgment</p>
                  <p>4. Gently return focus to your breath</p>
                </div>
              )}
              {selectedTool?.title === "Gratitude Journal" && (
                <div className="space-y-2 text-sm">
                  <p>1. Write down 3 things you're grateful for today</p>
                  <p>2. Be specific and detailed</p>
                  <p>3. Reflect on why you're grateful</p>
                  <p>4. Notice how this makes you feel</p>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <Button className="flex-1">
                <Play className="h-4 w-4 mr-2" />
                Start Session
              </Button>
              <Button variant="outline" onClick={() => setIsToolOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Professional Message Modal */}
      <Dialog open={isMessageOpen} onOpenChange={setIsMessageOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Send Message to {selectedProfessional?.name}</DialogTitle>
            <DialogDescription>
              Send a secure message to {selectedProfessional?.specialty} specialist
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Your Message</label>
              <textarea
                className="w-full mt-1 p-3 border rounded-lg resize-none"
                rows={4}
                placeholder="Describe your concerns or questions..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button className="flex-1" onClick={sendMessage}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" onClick={() => setIsMessageOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Professional Booking Modal */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book Appointment with {selectedProfessional?.name}</DialogTitle>
            <DialogDescription>
              Schedule a session with {selectedProfessional?.specialty} specialist
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Preferred Date</label>
              <Input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Preferred Time</label>
              <Input
                type="time"
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex space-x-2">
              <Button className="flex-1" onClick={confirmBooking}>
                <Calendar className="h-4 w-4 mr-2" />
                Book Appointment
              </Button>
              <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Educational Content Modal */}
      <Dialog open={isContentOpen} onOpenChange={setIsContentOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {selectedContent?.type === 'video' && <Video className="h-5 w-5" />}
              {selectedContent?.type === 'article' && <FileText className="h-5 w-5" />}
              {selectedContent?.type === 'podcast' && <Headphones className="h-5 w-5" />}
              <span>{selectedContent?.title}</span>
            </DialogTitle>
            <DialogDescription>
              {selectedContent?.readTime || selectedContent?.duration} • {selectedContent?.category}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Content Preview:</h4>
              <p className="text-sm text-gray-600">
                {selectedContent?.title === "Understanding Pilot Stress" && 
                  "This comprehensive guide explores the unique stressors faced by aviation professionals and provides evidence-based strategies for managing stress in high-pressure environments."}
                {selectedContent?.title === "Sleep Hygiene for Pilots" && 
                  "Learn essential sleep hygiene practices specifically designed for pilots with irregular schedules and time zone changes."}
                {selectedContent?.title === "Managing Jet Lag" && 
                  "Discover effective techniques to minimize jet lag impact and maintain peak performance during long-haul flights."}
                {selectedContent?.title === "Coping with Irregular Schedules" && 
                  "Explore strategies for maintaining work-life balance and mental wellness despite unpredictable work schedules."}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button className="flex-1">
                {selectedContent?.type === 'video' ? (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Watch Video
                  </>
                ) : selectedContent?.type === 'podcast' ? (
                  <>
                    <Headphones className="h-4 w-4 mr-2" />
                    Listen Now
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Read Article
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={() => setIsContentOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Support Group Join Modal */}
      <Dialog open={isGroupOpen} onOpenChange={setIsGroupOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Join {selectedGroup?.name}</DialogTitle>
            <DialogDescription>
              Connect with {selectedGroup?.members.toLocaleString()} members in this support group
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">Group Details:</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Type:</strong> {selectedGroup?.type.replace('-', ' ')}</p>
                <p><strong>Next Meeting:</strong> {selectedGroup?.nextMeeting}</p>
                <p><strong>Frequency:</strong> {selectedGroup?.frequency}</p>
                <p><strong>Members:</strong> {selectedGroup?.members.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button className="flex-1" onClick={confirmGroupJoin}>
                <Users className="h-4 w-4 mr-2" />
                Join Group
              </Button>
              <Button variant="outline" onClick={() => setIsGroupOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MentalHealthResources;

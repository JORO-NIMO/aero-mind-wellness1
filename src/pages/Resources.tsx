import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
  
  // Mock user data - in a real app this would come from context/API
  const userName = "John Pilot";
  const profilePhoto = null;
  const wearableConnected = true;
  const wellnessScore = 85;

  const crisisResources = [
    {
      id: 1,
      title: "National Suicide Prevention Lifeline",
      description: "24/7 crisis support and suicide prevention",
      phone: "988",
      available: "24/7",
      type: "crisis",
      priority: "high"
    },
    {
      id: 2,
      title: "Crisis Text Line",
      description: "Text-based crisis support",
      phone: "Text HOME to 741741",
      available: "24/7",
      type: "crisis",
      priority: "high"
    },
    {
      id: 3,
      title: "Aviation Mental Health Hotline",
      description: "Specialized support for aviation professionals",
      phone: "1-800-AVIATE",
      available: "24/7",
      type: "aviation",
      priority: "high"
    }
  ];

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
      name: "Dr. Sarah Johnson",
      specialty: "Aviation Psychology",
      experience: "15 years",
      availability: "Online",
      rating: 4.9,
      languages: ["English", "Spanish"],
      photo: null
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Stress Management",
      experience: "12 years",
      availability: "In-person",
      rating: 4.8,
      languages: ["English", "Mandarin"],
      photo: null
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Trauma Therapy",
      experience: "10 years",
      availability: "Hybrid",
      rating: 4.9,
      languages: ["English", "Spanish", "French"],
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
              <strong>In crisis?</strong> If you're experiencing thoughts of self-harm, please contact emergency services immediately or call the National Suicide Prevention Lifeline at <strong>988</strong>.
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Shield className="h-6 w-6 text-red-600 mr-2" />
              Crisis Support
            </h2>
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
                    <div className="flex items-center space-x-2 text-red-700">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{resource.available}</span>
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700">
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
                    <Button className="w-full">
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
                      <Button size="sm" className="flex-1">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
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
                    <Button className="w-full">
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
                    <Button className="w-full">
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
    </div>
  );
};

export default MentalHealthResources;

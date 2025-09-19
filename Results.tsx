import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Download, 
  Mail, 
  FileText, 
  CheckCircle, 
  Clock, 
  Copy,
  Share2,
  Star,
  Calendar,
  User,
  Target,
  Lightbulb
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  const { transcript, fileName } = location.state || {};

  useEffect(() => {
    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setShowResults(true), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, []);

  // Enhanced demo data with more realistic content
  const meetingData = {
    metadata: {
      duration: "47 minutes",
      participants: 6,
      date: "December 10, 2024",
      confidence: 94
    },
    summary: "The Q4 strategic planning session focused on product roadmap priorities, resource allocation, and timeline adjustments. The team reached consensus on implementing a phased approach to the new authentication system while deferring UI enhancements to Q1 2025. Key concerns around technical debt and security compliance were addressed with specific action items assigned.",
    keyTopics: [
      "Product Roadmap Planning",
      "Authentication System",
      "Resource Allocation", 
      "Security Compliance",
      "Q1 2025 Planning"
    ],
    actionPoints: [
      { 
        task: "Conduct comprehensive security audit of current authentication system", 
        person: "Sarah Chen", 
        deadline: "December 15, 2024",
        priority: "high",
        status: "pending"
      },
      { 
        task: "Create detailed wireframes for mobile app authentication flow", 
        person: "Mike Johnson", 
        deadline: "December 20, 2024",
        priority: "medium",
        status: "pending"
      },
      { 
        task: "Review and update API documentation for authentication endpoints", 
        person: "David Lee", 
        deadline: "December 18, 2024",
        priority: "high",
        status: "pending"
      },
      { 
        task: "Schedule user testing sessions for new authentication UX", 
        person: "Emma Wilson", 
        deadline: "January 5, 2025",
        priority: "low",
        status: "pending"
      }
    ],
    decisions: [
      "Implement two-factor authentication as the highest priority security feature",
      "Postpone advanced UI animations and micro-interactions to Q1 2025 roadmap",
      "Allocate additional $50K budget for security infrastructure and compliance",
      "Establish weekly sprint reviews every Tuesday at 2:00 PM starting next week"
    ],
    insights: [
      "Team consensus strongly favors security-first approach over feature richness",
      "Mobile authentication UX requires significant user research before implementation",
      "Current technical debt may impact Q1 delivery timeline by 2-3 weeks"
    ]
  };

  const handleCopyText = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${type} has been copied successfully.`,
    });
  };

  const handleDownloadPDF = () => {
    toast({
      title: "PDF Generated",
      description: "Your meeting summary is being prepared for download.",
    });
    
    // Simulate download
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Meeting summary saved to your downloads folder.",
      });
    }, 2000);
  };

  const handleEmailTeam = () => {
    toast({
      title: "Email Sent",
      description: "Meeting summary has been shared with your team members.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Link Copied",
      description: "Share link copied to clipboard.",
    });
  };

  if (!transcript && !fileName) {
    navigate("/");
    return null;
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Mesh */}
      <div className="gradient-mesh fixed inset-0 opacity-30" />
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 animate-slide-up">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-6 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Upload
            </Button>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <div className="flex items-center mb-2">
                  <h1 className="text-4xl font-bold text-foreground mr-4">
                    Meeting Analysis
                  </h1>
                  <Badge variant="secondary" className="px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    {meetingData.metadata.confidence}% Confidence
                  </Badge>
                </div>
                {fileName && (
                  <p className="text-lg text-muted-foreground">
                    📁 {fileName} • {meetingData.metadata.duration}
                  </p>
                )}
              </div>
            </div>

            {/* Processing Progress */}
            {!showResults && (
              <Card className="professional-card-lg rounded-2xl p-8 mb-8">
                <div className="text-center space-y-6">
                  <div className="animate-pulse">
                    <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-foreground mb-2">
                      Analyzing Your Meeting
                    </h2>
                    <p className="text-muted-foreground">
                      Our AI is extracting insights and organizing information...
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Progress value={analysisProgress} className="h-3 rounded-full" />
                    <p className="text-sm text-muted-foreground">
                      {analysisProgress < 30 && "Processing audio and extracting text..."}
                      {analysisProgress >= 30 && analysisProgress < 60 && "Identifying key topics and speakers..."}
                      {analysisProgress >= 60 && analysisProgress < 90 && "Generating action items and decisions..."}
                      {analysisProgress >= 90 && "Finalizing summary and insights..."}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Results */}
            {showResults && (
              <div className="space-y-8 animate-fade-in-delay">
                {/* Meeting Metadata */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="professional-card rounded-xl p-4 text-center">
                    <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-semibold">{meetingData.metadata.date}</p>
                  </Card>
                  <Card className="professional-card rounded-xl p-4 text-center">
                    <Clock className="w-6 h-6 text-secondary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold">{meetingData.metadata.duration}</p>
                  </Card>
                  <Card className="professional-card rounded-xl p-4 text-center">
                    <User className="w-6 h-6 text-accent mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Participants</p>
                    <p className="font-semibold">{meetingData.metadata.participants} people</p>
                  </Card>
                  <Card className="professional-card rounded-xl p-4 text-center">
                    <Target className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Topics</p>
                    <p className="font-semibold">{meetingData.keyTopics.length} identified</p>
                  </Card>
                </div>

                {/* Key Topics */}
                <Card className="professional-card-lg rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-foreground flex items-center">
                      <Lightbulb className="w-6 h-6 text-accent mr-3" />
                      Key Topics Discussed
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {meetingData.keyTopics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </Card>

                {/* Meeting Summary */}
                <Card className="professional-card-lg rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-foreground flex items-center">
                      <FileText className="w-6 h-6 text-primary mr-3" />
                      📌 Executive Summary
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyText(meetingData.summary, "Summary")}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {meetingData.summary}
                    </p>
                  </div>
                </Card>

                {/* Action Points */}
                <Card className="professional-card-lg rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-foreground flex items-center">
                      <CheckCircle className="w-6 h-6 text-secondary mr-3" />
                      ✅ Action Items ({meetingData.actionPoints.length})
                    </h2>
                    <Button
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleCopyText(
                        meetingData.actionPoints.map(item => 
                          `• ${item.task} (${item.person}, Due: ${item.deadline})`
                        ).join('\n'), 
                        "Action Items"
                      )}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {meetingData.actionPoints.map((item, index) => (
                      <div key={index} className="p-5 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-foreground pr-4 leading-relaxed">
                            {item.task}
                          </h3>
                          <div className={`w-3 h-3 rounded-full ${getPriorityColor(item.priority)} flex-shrink-0 mt-1`} />
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground space-x-4">
                          <span className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            <strong>{item.person}</strong>
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Due: <strong className="ml-1">{item.deadline}</strong>
                          </span>
                          <Badge variant="outline" className="capitalize text-xs">
                            {item.priority} priority
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Key Decisions */}
                <Card className="professional-card-lg rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-foreground flex items-center">
                      <Clock className="w-6 h-6 text-accent mr-3" />
                      ⏰ Key Decisions ({meetingData.decisions.length})
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyText(
                        meetingData.decisions.map(decision => `• ${decision}`).join('\n'),
                        "Decisions"
                      )}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {meetingData.decisions.map((decision, index) => (
                      <div key={index} className="flex items-start p-4 rounded-xl bg-muted/30 border border-border/50">
                        <div className="w-3 h-3 rounded-full bg-primary mr-4 mt-2 flex-shrink-0" />
                        <p className="text-foreground leading-relaxed">{decision}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* AI Insights */}
                <Card className="professional-card-lg rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <Lightbulb className="w-6 h-6 text-accent mr-3" />
                    <h2 className="text-2xl font-semibold text-foreground">
                      💡 AI Insights
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {meetingData.insights.map((insight, index) => (
                      <div key={index} className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                        <p className="text-foreground leading-relaxed">💡 {insight}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                  <Button
                    onClick={handleDownloadPDF}
                    variant="default"
                    size="lg"
                    className="flex-1 sm:flex-none min-w-[220px] rounded-xl h-14 text-lg font-semibold"
                  >
                    <Download className="mr-3 h-5 w-5" />
                    Download PDF Report
                  </Button>
                  
                  <Button
                    onClick={handleEmailTeam}
                    variant="secondary"
                    size="lg"
                    className="flex-1 sm:flex-none min-w-[220px] rounded-xl h-14 text-lg font-semibold"
                  >
                    <Mail className="mr-3 h-5 w-5" />
                    Email to Team
                  </Button>

                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="lg"
                    className="flex-1 sm:flex-none min-w-[220px] rounded-xl h-14 text-lg font-semibold"
                  >
                    <Share2 className="mr-3 h-5 w-5" />
                    Share Link
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DragDropUpload } from "@/components/DragDropUpload";
import { StatsCard } from "@/components/StatsCard";
import { 
  Mic, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Users, 
  TrendingUp,
  Zap,
  Shield,
  Brain
} from "lucide-react";

const Index = () => {
  const [transcript, setTranscript] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!transcript.trim() && !selectedFile) return;
    
    setIsProcessing(true);
    
    // Simulate processing time with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    navigate("/results", { 
      state: { 
        transcript: transcript.trim(), 
        fileName: selectedFile?.name 
      } 
    });
  };

  const canGenerate = transcript.trim() || selectedFile;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Mesh Gradient */}
      <div className="gradient-mesh fixed inset-0 opacity-40" />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-16 pb-12">
          <div className="text-center mb-16 animate-slide-up">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Meeting Intelligence
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Meeting Chaos
              </span>
              <span className="block">Into Clarity</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Turn hours of meeting recordings into actionable insights in minutes. 
              Extract key decisions, assign tasks, and never miss important details again.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-12 animate-fade-in-delay">
              <StatsCard 
                icon={Clock} 
                title="Time Saved" 
                value="89%" 
                description="vs manual notes"
                color="primary"
              />
              <StatsCard 
                icon={Users} 
                title="Teams" 
                value="10K+" 
                description="trust our AI"
                color="secondary"
              />
              <StatsCard 
                icon={TrendingUp} 
                title="Accuracy" 
                value="96%" 
                description="key point extraction"
                color="accent"
              />
            </div>
          </div>

          {/* Main Form */}
          <Card className="professional-card-lg rounded-3xl p-8 md:p-12 max-w-4xl mx-auto mb-16 animate-scale-in backdrop-blur-sm border-white/20">
            <div className="space-y-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-2xl bg-primary text-primary-foreground">
                    <Mic className="w-8 h-8" />
                  </div>
                </div>
                <h2 className="text-3xl font-semibold mb-3 text-card-foreground">
                  Upload Your Meeting
                </h2>
                <p className="text-lg text-muted-foreground">
                  Choose your preferred method to get started
                </p>
              </div>
              
              <div className="space-y-8">
                {/* File Upload Section */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-primary" />
                    Upload Recording (Recommended)
                  </Label>
                  <DragDropUpload
                    selectedFile={selectedFile}
                    onFileSelect={setSelectedFile}
                    disabled={isProcessing}
                  />
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm uppercase">
                    <span className="bg-card px-6 py-2 text-muted-foreground rounded-full border">
                      Or paste transcript
                    </span>
                  </div>
                </div>

                {/* Transcript Section */}
                <div className="space-y-4">
                  <Label htmlFor="transcript" className="text-lg font-semibold flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-secondary" />
                    Manual Transcript Entry
                  </Label>
                  <div className="relative">
                    <Textarea
                      id="transcript"
                      placeholder="Paste your meeting transcript here... 
                      
Example: 'The team discussed Q4 goals. John will handle the marketing campaign by Friday. Sarah raised concerns about the budget allocation...'"
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                      className="min-h-[200px] resize-none rounded-2xl text-base leading-relaxed border-2 focus:border-primary/50 transition-colors"
                      disabled={isProcessing}
                    />
                    <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
                      {transcript.length}/5000 characters
                    </div>
                  </div>
                </div>
                
                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={!canGenerate || isProcessing}
                  variant="professional"
                  size="lg"
                  className="w-full h-16 text-xl rounded-2xl font-semibold shadow-2xl hover:shadow-primary/25 transition-all duration-300"
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-3 border-primary-foreground border-t-transparent mr-3" />
                      <div className="text-left">
                        <div>Processing Your Meeting...</div>
                        <div className="text-sm font-normal opacity-80">This may take 30-60 seconds</div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Sparkles className="mr-3 h-6 w-6" />
                      Generate AI Summary
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </div>
                  )}
                </Button>

                {canGenerate && (
                  <div className="text-center text-sm text-muted-foreground animate-fade-in-delay">
                    <Shield className="w-4 h-4 inline mr-2" />
                    Your data is processed securely and never stored permanently
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Features Grid */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
              Everything You Need for Better Meetings
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8 animate-fade-in-delay">
              <Card className="professional-card hover-lift rounded-2xl p-8 text-center group">
                <div className="p-4 rounded-2xl bg-primary/10 w-fit mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Brain className="w-10 h-10 text-primary group-hover:text-primary-foreground" />
                </div>
                <h4 className="text-xl font-semibold text-card-foreground mb-4">Smart AI Summaries</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Our advanced AI extracts key insights, decisions, and outcomes from your meetings with 96% accuracy.
                </p>
                <div className="mt-4 text-sm text-primary font-medium">
                  ✨ Contextual understanding
                </div>
              </Card>
              
              <Card className="professional-card hover-lift rounded-2xl p-8 text-center group">
                <div className="p-4 rounded-2xl bg-secondary/10 w-fit mx-auto mb-6 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                  <Users className="w-10 h-10 text-secondary group-hover:text-secondary-foreground" />
                </div>
                <h4 className="text-xl font-semibold text-card-foreground mb-4">Action Item Tracking</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Automatically identify tasks, assign responsibilities, and set deadlines. Never let important work slip through the cracks.
                </p>
                <div className="mt-4 text-sm text-secondary font-medium">
                  📋 Zero manual effort
                </div>
              </Card>

              <Card className="professional-card hover-lift rounded-2xl p-8 text-center group">
                <div className="p-4 rounded-2xl bg-accent/10 w-fit mx-auto mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <TrendingUp className="w-10 h-10 text-accent group-hover:text-accent-foreground" />
                </div>
                <h4 className="text-xl font-semibold text-card-foreground mb-4">Export & Share</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Share polished summaries via PDF or email. Keep your entire team aligned with professional meeting notes.
                </p>
                <div className="mt-4 text-sm text-accent font-medium">
                  🚀 One-click sharing
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

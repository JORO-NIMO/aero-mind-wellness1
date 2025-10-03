import { useState, useEffect } from "react";
import { Plane, RefreshCw, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WellnessScore } from "@/components/WellnessScore";
import { WearableData } from "@/components/WearableData";
import { MoodCheckIn } from "@/components/MoodCheckIn";
import { AlertBanner } from "@/components/AlertBanner";
import { BreathingExercise } from "@/components/BreathingExercise";
import { HistoryChart } from "@/components/HistoryChart";
import { DemoControls } from "@/components/DemoControls";
import { useToast } from "@/hooks/use-toast";

const generateMockData = (baseScore?: number) => {
  const score = baseScore ?? Math.floor(Math.random() * 100);
  return {
    score,
    heartRate: score > 70 ? 65 + Math.floor(Math.random() * 15) : 
               score >= 40 ? 75 + Math.floor(Math.random() * 20) : 
               85 + Math.floor(Math.random() * 25),
    sleepHours: score > 70 ? 7 + Math.random() * 2 :
                score >= 40 ? 5 + Math.random() * 2 :
                3 + Math.random() * 2,
    steps: score > 70 ? 8000 + Math.floor(Math.random() * 4000) :
           score >= 40 ? 4000 + Math.floor(Math.random() * 4000) :
           1000 + Math.floor(Math.random() * 3000),
  };
};

const generateHistory = (currentScore: number) => {
  const history = [];
  const dates = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];
  
  for (let i = 0; i < 7; i++) {
    const variance = Math.random() * 30 - 15;
    const score = Math.max(0, Math.min(100, currentScore + variance));
    history.push({
      date: dates[i],
      score: Math.floor(score),
    });
  }
  
  history[6].score = currentScore;
  return history;
};

const Index = () => {
  const [data, setData] = useState(generateMockData(75));
  const [history, setHistory] = useState(generateHistory(75));
  const [breathingOpen, setBreathingOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setHistory(generateHistory(data.score));
  }, [data.score]);

  const refreshData = () => {
    const newData = generateMockData();
    setData(newData);
    toast({
      title: "Data Refreshed",
      description: "Wearable data has been updated with new readings.",
    });
  };

  const handleMoodSubmit = (mood: number) => {
    const moodImpact = (mood - 5) * 3;
    const newScore = Math.max(0, Math.min(100, data.score + moodImpact));
    setData({ ...data, score: Math.floor(newScore) });
    toast({
      title: "Mood Recorded",
      description: "Your wellness score has been updated based on your mood.",
    });
  };

  const setHealthy = () => {
    setData(generateMockData(85));
    toast({ title: "Demo Mode", description: "Set to Healthy state (85)" });
  };

  const setStressed = () => {
    setData(generateMockData(55));
    toast({ title: "Demo Mode", description: "Set to Stressed state (55)" });
  };

  const setCritical = () => {
    setData(generateMockData(25));
    toast({ title: "Demo Mode", description: "Set to Critical state (25)" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Plane className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">AeroMind</h1>
                <p className="text-white/80 text-sm">Pilot Mental Health Assistant</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={() => setBreathingOpen(true)}
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Wind className="w-4 h-4 mr-2" />
                Breathing Exercise
              </Button>
              
              <Button
                onClick={refreshData}
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Alert Banner */}
        <AlertBanner score={data.score} />

        {/* Wellness Score & Mood Check-in */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WellnessScore score={data.score} />
          </div>
          <div>
            <MoodCheckIn onMoodSubmit={handleMoodSubmit} />
          </div>
        </div>

        {/* Wearable Data */}
        <WearableData
          heartRate={data.heartRate}
          sleepHours={data.sleepHours}
          steps={data.steps}
        />

        {/* History Chart */}
        <HistoryChart history={history} />

        {/* Demo Controls */}
        <DemoControls
          onSetHealthy={setHealthy}
          onSetStressed={setStressed}
          onSetCritical={setCritical}
        />
      </main>

      {/* Breathing Exercise Modal */}
      <BreathingExercise isOpen={breathingOpen} onClose={() => setBreathingOpen(false)} />

      {/* Footer */}
      <footer className="bg-secondary border-t border-border mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            AeroMind © 2025 · Hackathon Demo Project · Not for actual medical use
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

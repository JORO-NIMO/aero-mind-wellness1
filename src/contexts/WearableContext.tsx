import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

interface WearableContextType {
  isConnected: boolean;
  isConnecting: boolean;
  connectWearable: () => void;
  disconnectWearable: () => void;
  setConnecting: (connecting: boolean) => void;
  metrics: any;
  loadingMetrics: boolean;
  syncData: (data: { heartRate: number, sleepHours: number, steps: number }) => Promise<void>;
  error: string | null;
}

const WearableContext = createContext<WearableContextType | undefined>(undefined);

export const WearableProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [metrics, setMetrics] = useState<any>(null);
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedStatus = localStorage.getItem("aeromind_wearable_connected");
    setIsConnected(savedStatus === "true");
    fetchLatestMetrics();

    // Listen to network status online event to drain offline sync queue
    const handleOnline = () => {
      console.log("Device is back online. Attemping to drain offline sync queue...");
      drainOfflineQueue();
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  const drainOfflineQueue = async () => {
    try {
      const queuedData = localStorage.getItem("aeromind_offline_sync_queue");
      if (queuedData) {
        const items = JSON.parse(queuedData);
        if (Array.isArray(items) && items.length > 0) {
          console.log(`Draining ${items.length} queued metrics...`);
          const remainingItems = [];
          for (const data of items) {
            try {
              await syncData(data, true);
            } catch (err) {
              console.error("Individual offline sync item failed. Retaining in queue:", err);
              remainingItems.push(data);
            }
          }
          if (remainingItems.length > 0) {
            localStorage.setItem("aeromind_offline_sync_queue", JSON.stringify(remainingItems));
          } else {
            localStorage.removeItem("aeromind_offline_sync_queue");
          }
        }
      }
    } catch (e) {
      console.error("Failed to drain offline metrics sync queue:", e);
    }
  };

  const fetchLatestMetrics = async () => {
    setLoadingMetrics(true);
    setError(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoadingMetrics(false);
        return;
      }

      const { data, error } = await supabase
        .from('wellness_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: false })
        .limit(7);

      if (error) throw error;

      if (data && data.length > 0) {
        const latest = data[0];
        setMetrics({
          score: latest.score,
          heartRate: latest.heart_rate,
          sleepHours: latest.sleep_hours,
          steps: latest.steps,
          history: data.map(m => ({
            date: new Date(m.recorded_at).toLocaleDateString('en-US', { weekday: 'short' }),
            score: m.score
          })).reverse(),
          insights: [
            latest.score > 70 ? "✨ Condition stable for operations." : "⚠️ Fatigue markers detected. Review rest cycle.",
            "Historical data successfully retrieved from encrypted health vault."
          ]
        });
      }
    } catch (e: any) {
      setError(e.message || "Failed to fetch metrics.");
    } finally {
      setLoadingMetrics(false);
    }
  };

  const syncData = async (data: { heartRate: number, sleepHours: number, steps: number }, isRetry = false) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Handle offline mode check
      if (!navigator.onLine && !isRetry) {
        console.log("Device offline. Queuing wearable metrics sync.");
        const currentQueue = JSON.parse(localStorage.getItem("aeromind_offline_sync_queue") || "[]");
        currentQueue.push(data);
        localStorage.setItem("aeromind_offline_sync_queue", JSON.stringify(currentQueue));

        // Update local metrics state for offline UX
        const score = (data.heartRate < 85 && data.sleepHours > 6.5) ? 88 : 55;
        setMetrics((prev: any) => ({
          ...(prev || { history: [], insights: [] }),
          score,
          heartRate: data.heartRate,
          sleepHours: data.sleepHours,
          steps: data.steps,
        }));
        return;
      }

      const score = (data.heartRate < 85 && data.sleepHours > 6.5) ? 88 : 55;

      const { error } = await supabase.from('wellness_metrics').insert({
        user_id: user.id,
        heart_rate: data.heartRate,
        sleep_hours: data.sleepHours,
        steps: data.steps,
        score: score,
      });

      if (error) throw error;

      if (!isRetry) {
        fetchLatestMetrics();
      }
    } catch (e: any) {
      console.error("Sync failed:", e.message);
    }
  };

  const connectWearable = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      localStorage.setItem("aeromind_wearable_connected", "true");
    }, 1500);
  };

  const disconnectWearable = () => {
    setIsConnected(false);
    localStorage.setItem("aeromind_wearable_connected", "false");
  };

  const value = {
    isConnected,
    isConnecting,
    connectWearable,
    disconnectWearable,
    setConnecting: setIsConnecting,
    metrics,
    loadingMetrics,
    syncData,
    error
  };

  return <WearableContext.Provider value={value}>{children}</WearableContext.Provider>;
};

export const useWearable = () => {
  const context = useContext(WearableContext);
  if (context === undefined) throw new Error('useWearable must be used within a WearableProvider');
  return context;
};

import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, HeartPulse, Brain, PlaneTakeoff, ShieldCheck, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Landing = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("aeromind_logged_in") === "true";
  const isOnboarded = localStorage.getItem("aeromind_onboarded") === "true";

  const getPrimaryCta = () => {
    if (isLoggedIn && isOnboarded) return { label: "Open Dashboard", to: "/dashboard" };
    if (isLoggedIn && !isOnboarded) return { label: "Continue Onboarding", to: "/onboarding" };
    return { label: "Get Started", to: "/signup" };
  };

  const cta = getPrimaryCta();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.15),_transparent_40%),linear-gradient(180deg,_hsl(var(--background))_0%,_hsl(var(--secondary)/0.35)_100%)] text-foreground">
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/15 p-2">
              <PlaneTakeoff className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-lg font-semibold leading-none">AeroMind</p>
              <p className="text-xs text-muted-foreground">Pilot Wellness Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to={cta.to}>{cta.label}</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-16 pt-10">
        <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit">Built for high-stakes flight teams</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              The AeroMind Story:
              <span className="block text-primary">Helping pilots stay mentally fit to fly</span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              AeroMind started with a simple mission: make mental wellness as operationally visible as any cockpit checklist.
              Our platform gives pilots practical, daily support through wellness tracking, guided recovery tools, and context-aware insights.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={() => navigate(cta.to)}>
                {cta.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/resources")}>
                Explore Resources
              </Button>
            </div>
          </div>

          <Card className="border-primary/25 bg-gradient-to-br from-primary/8 to-background p-6 shadow-lg">
            <div className="space-y-5">
              <h2 className="text-xl font-semibold">A clear journey from first visit to daily use</h2>
              <div className="space-y-4">
                {[
                  { title: "1. Create account", body: "Use company email and quick verification to get started." },
                  { title: "2. Complete onboarding", body: "Set role, compliance context, and preferred wellness metrics." },
                  { title: "3. Use the dashboard", body: "Track score trends, wearable data, and recommended actions." },
                  { title: "4. Recover intentionally", body: "Use guided breathing and support resources before stress compounds." },
                ].map((step) => (
                  <div key={step.title} className="flex items-start gap-3 rounded-lg border border-border/70 bg-card/80 p-3">
                    <ChevronRight className="mt-0.5 h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">{step.title}</p>
                      <p className="text-sm text-muted-foreground">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>

        <section className="mt-14 grid gap-5 md:grid-cols-3">
          <Card className="border-border/70 p-6">
            <div className="mb-3 w-fit rounded-md bg-primary/15 p-2">
              <HeartPulse className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Operational Wellness</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Track score, heart rate trends, sleep, and mood in one place with easy-to-read indicators.
            </p>
          </Card>
          <Card className="border-border/70 p-6">
            <div className="mb-3 w-fit rounded-md bg-primary/15 p-2">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Actionable Insights</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Translate wellness signals into practical next steps instead of generic motivational advice.
            </p>
          </Card>
          <Card className="border-border/70 p-6">
            <div className="mb-3 w-fit rounded-md bg-primary/15 p-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Pilot-Centered Support</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Move from prevention to recovery with breathing sessions, resources, and professional support channels.
            </p>
          </Card>
        </section>

        <section className="mt-14 rounded-2xl border border-primary/30 bg-primary/6 px-6 py-10 text-center">
          <Sparkles className="mx-auto mb-3 h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Ready to experience AeroMind?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Start your account in under two minutes and move through a guided setup designed for busy flight operations.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link to="/signup">Start with Signup</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">I Already Have an Account</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
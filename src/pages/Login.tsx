import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plane, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("aeromind_logged_in");
    if (isLoggedIn === "true") {
      navigate("/");
      return;
    }
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = localStorage.getItem("aeromind_user");
    let user: any = existing ? JSON.parse(existing) : {};
    user = { ...user, name, email };
    localStorage.setItem("aeromind_user", JSON.stringify(user));
    localStorage.setItem("aeromind_logged_in", "true");
    toast({ title: "Welcome", description: "You're now logged in." });
    navigate("/onboarding");
  };

  const disabled = !name || !email;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className={`w-full max-w-md p-8 transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3">
            <div className="bg-primary/20 p-3 rounded-lg">
              <Plane className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">AeroMind Login</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Ronnie Asiimwe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="ronnie@airlinecompany.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={disabled}>
              <LogIn className="w-4 h-4 mr-2" />
              Continue
            </Button>
          </form>

          <div>
            <Button variant="link" asChild>
              <Link to="/signup">New pilot? Sign up</Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Your details are stored locally on this device for demo purposes.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;

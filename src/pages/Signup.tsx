import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Mail, Phone, ShieldCheck, UserPlus } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const [email, setEmail] = useState("");
  const [workerId, setWorkerId] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");

  const allowedDomain = useMemo(() => "airlinecompany.com", []);

  const [emailCode, setEmailCode] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [smsOtp, setSmsOtp] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("aeromind_logged_in");
    if (isLoggedIn === "true") {
      navigate("/");
      return;
    }
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, [navigate]);

  const isAdult = (v: string) => {
    if (!v) return false;
    const d = new Date(v);
    if (isNaN(d.getTime())) return false;
    const now = new Date();
    let age = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
    return age >= 18;
  };

  const isValidEmailDomain = (v: string) => v.toLowerCase().endsWith(`@${allowedDomain}`);
  const isValidWorkerId = (v: string) => /^[A-Z0-9]{3,12}$/.test(v.trim());
  const isValidPhone = (v: string) => /^\+[1-9]\d{7,14}$/.test(v.trim());

  const disabledStart = !email || !workerId || !phone || !dob;
  const disabledVerify = emailOtp.length !== 6 || smsOtp.length !== 6;

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmailDomain(email)) {
      toast({ title: "Use company email", description: `Email must end with @${allowedDomain}` });
      return;
    }
    if (!isValidWorkerId(workerId)) {
      toast({ title: "Invalid worker ID", description: "Use 3–12 uppercase letters or digits" });
      return;
    }
    if (!isValidPhone(phone)) {
      toast({ title: "Invalid phone", description: "Use E.164 format like +256700000000" });
      return;
    }
    if (!isAdult(dob)) {
      toast({ title: "Age restriction", description: "You must be at least 18" });
      return;
    }
    const gen = () => String(Math.floor(100000 + Math.random() * 900000));
    const ec = gen();
    const sc = gen();
    setEmailCode(ec);
    setSmsCode(sc);
    setStep(2);
    toast({ title: "Demo mode", description: "Use the on-screen codes to verify" });
  };

  const handleVerify = () => {
    if (emailOtp !== emailCode || smsOtp !== smsCode) {
      toast({ title: "Incorrect codes", description: "Double-check and try again" });
      return;
    }
    const existing = localStorage.getItem("aeromind_user");
    const prev = existing ? JSON.parse(existing) : {};
    const user = {
      ...prev,
      email,
      workerId,
      phone,
      dob,
      emailVerified: true,
      phoneVerified: true,
    };
    localStorage.setItem("aeromind_user", JSON.stringify(user));
    localStorage.setItem("aeromind_logged_in", "true");
    toast({ title: "Signup complete", description: "You're now signed in" });
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className={`w-full max-w-md p-8 transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3">
            <div className="bg-primary/20 p-3 rounded-lg">
              <UserPlus className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Pilot Signup</h1>
          </div>

          {step === 1 && (
            <form onSubmit={handleStart} className="space-y-4 text-left">
              <div className="space-y-2">
                <Label htmlFor="email">Company Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={`john@${allowedDomain}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workerId">Worker ID</Label>
                <Input
                  id="workerId"
                  placeholder="ABC123"
                  value={workerId}
                  onChange={(e) => setWorkerId(e.target.value.toUpperCase())}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (E.164)</Label>
                <Input
                  id="phone"
                  placeholder="+256700000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={disabledStart}>
                <ShieldCheck className="w-4 h-4 mr-2" />
                Continue
              </Button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>Demo email OTP:</span>
                  <span className="font-mono text-foreground">{emailCode}</span>
                </div>
                <Label>Enter Email Code</Label>
                <InputOTP maxLength={6} value={emailOtp} onChange={setEmailOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>Demo SMS OTP:</span>
                  <span className="font-mono text-foreground">{smsCode}</span>
                </div>
                <Label>Enter SMS Code</Label>
                <InputOTP maxLength={6} value={smsOtp} onChange={setSmsOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button className="w-full" size="lg" onClick={handleVerify} disabled={disabledVerify}>
                <ShieldCheck className="w-4 h-4 mr-2" />
                Verify and Continue
              </Button>

              <p className="text-xs text-muted-foreground text-center">Demo mode shows OTPs on screen.</p>
            </div>
          )}

          <p className="text-xs text-muted-foreground">Your details are stored locally on this device for demo purposes.</p>
        </div>
      </Card>
    </div>
  );
};

export default Signup;

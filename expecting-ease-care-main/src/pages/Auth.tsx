import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useNavigate, Link } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password || !fullName) {
      toast({ title: "Missing info", description: "Enter name, email and password", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      const userId = data.user?.id;
      if (userId) {
        // Create a profile row if not exists
        await supabase.from('users').upsert({ id: userId, email, full_name: fullName }, { onConflict: 'id' });
      }

      toast({ title: "Sign up successful", description: "Welcome to MamaCare" });
      navigate('/get-started');
    } catch (err) {
      toast({ title: "Sign up failed", description: err instanceof Error ? err.message : 'Error', variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      toast({ title: "Missing info", description: "Enter email and password", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({ title: "Welcome back", description: "Signed in successfully" });
      navigate('/get-started');
    } catch (err) {
      toast({ title: "Sign in failed", description: err instanceof Error ? err.message : 'Error', variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-blue/5">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to MamaCare</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>
              <Button className="w-full" onClick={handleSignIn} disabled={loading}>{loading ? 'Please wait...' : 'Sign In'}</Button>
              <p className="text-xs text-muted-foreground text-center">New here? <Link to="#" onClick={(e) => { e.preventDefault(); const t = document.querySelector('[data-state="active"][data-value="signup"]'); }} className="text-primary">Sign up</Link></p>
            </TabsContent>
            <TabsContent value="signup" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Doe" />
              </div>
              <div>
                <Label htmlFor="email2">Email</Label>
                <Input id="email2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div>
                <Label htmlFor="password2">Password</Label>
                <Input id="password2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>
              <Button className="w-full" onClick={handleSignUp} disabled={loading}>{loading ? 'Please wait...' : 'Create account'}</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;

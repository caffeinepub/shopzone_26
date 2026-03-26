import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, KeyRound, Leaf, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";
import type { Page } from "../types";

interface LoginPageProps {
  onLogin: (email: string, password: string) => "ok" | "invalid";
  onRegister: (
    name: string,
    email: string,
    password: string,
  ) => "ok" | "email_taken";
  onResetPassword: (email: string, newPassword: string) => "ok" | "not_found";
  onNavigate: (page: Page) => void;
}

export default function LoginPage({
  onLogin,
  onRegister,
  onResetPassword,
  onNavigate,
}: LoginPageProps) {
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showLoginPw, setShowLoginPw] = useState(false);

  // Register state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regError, setRegError] = useState("");
  const [showRegPw, setShowRegPw] = useState(false);

  // Forgot password state
  const [fpEmail, setFpEmail] = useState("");
  const [fpNewPw, setFpNewPw] = useState("");
  const [fpConfirmPw, setFpConfirmPw] = useState("");
  const [fpError, setFpError] = useState("");
  const [fpSuccess, setFpSuccess] = useState(false);
  const [fpOpen, setFpOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const result = onLogin(loginEmail.trim(), loginPassword);
    if (result === "ok") {
      onNavigate("home");
    } else {
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");
    if (!regName.trim()) {
      setRegError("Name is required.");
      return;
    }
    if (!regEmail.trim()) {
      setRegError("Email is required.");
      return;
    }
    if (regPassword.length < 6) {
      setRegError("Password must be at least 6 characters.");
      return;
    }
    if (regPassword !== regConfirm) {
      setRegError("Passwords do not match.");
      return;
    }
    const result = onRegister(regName.trim(), regEmail.trim(), regPassword);
    if (result === "ok") {
      onNavigate("home");
    } else {
      setRegError("An account with this email already exists.");
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setFpError("");
    setFpSuccess(false);
    if (!fpEmail.trim()) {
      setFpError("Email is required.");
      return;
    }
    if (fpNewPw.length < 6) {
      setFpError("Password must be at least 6 characters.");
      return;
    }
    if (fpNewPw !== fpConfirmPw) {
      setFpError("Passwords do not match.");
      return;
    }
    const result = onResetPassword(fpEmail.trim(), fpNewPw);
    if (result === "ok") {
      setFpSuccess(true);
      setTimeout(() => {
        setFpOpen(false);
        setFpSuccess(false);
        setFpEmail("");
        setFpNewPw("");
        setFpConfirmPw("");
      }, 1800);
    } else {
      setFpError("No account found with this email.");
    }
  };

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-background">
      <div className="w-full max-w-md">
        {/* Brand mark */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
            <Leaf className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight">
            ShopZone
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Pahadi Store — Sign in to continue
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-card border border-border p-6">
          <Tabs defaultValue="login">
            <TabsList className="w-full mb-6" data-ocid="auth.tab">
              <TabsTrigger
                value="login"
                className="flex-1"
                data-ocid="login.tab"
              >
                <LogIn className="w-4 h-4 mr-2" /> Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="flex-1"
                data-ocid="register.tab"
              >
                <UserPlus className="w-4 h-4 mr-2" /> Create Account
              </TabsTrigger>
            </TabsList>

            {/* ── Login Tab ── */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    data-ocid="login.input"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      data-ocid="login.input"
                      type={showLoginPw ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPw((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showLoginPw ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {loginError && (
                  <p
                    data-ocid="login.error_state"
                    className="text-sm text-destructive"
                  >
                    {loginError}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  data-ocid="login.submit_button"
                >
                  Sign In
                </Button>

                {/* Forgot Password */}
                <div className="text-center">
                  <Dialog open={fpOpen} onOpenChange={setFpOpen}>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        data-ocid="login.open_modal_button"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    </DialogTrigger>
                    <DialogContent data-ocid="forgot_password.dialog">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <KeyRound className="w-5 h-5" /> Reset Password
                        </DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={handleForgotPassword}
                        className="space-y-4 pt-2"
                      >
                        <div className="space-y-1.5">
                          <Label htmlFor="fp-email">Registered Email</Label>
                          <Input
                            id="fp-email"
                            data-ocid="forgot_password.input"
                            type="email"
                            placeholder="you@example.com"
                            value={fpEmail}
                            onChange={(e) => setFpEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="fp-newpw">New Password</Label>
                          <Input
                            id="fp-newpw"
                            data-ocid="forgot_password.input"
                            type="password"
                            placeholder="Min. 6 characters"
                            value={fpNewPw}
                            onChange={(e) => setFpNewPw(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="fp-confirmpw">
                            Confirm New Password
                          </Label>
                          <Input
                            id="fp-confirmpw"
                            data-ocid="forgot_password.input"
                            type="password"
                            placeholder="Repeat password"
                            value={fpConfirmPw}
                            onChange={(e) => setFpConfirmPw(e.target.value)}
                            required
                          />
                        </div>
                        {fpError && (
                          <p
                            data-ocid="forgot_password.error_state"
                            className="text-sm text-destructive"
                          >
                            {fpError}
                          </p>
                        )}
                        {fpSuccess && (
                          <p
                            data-ocid="forgot_password.success_state"
                            className="text-sm text-green-600 font-medium"
                          >
                            ✓ Password updated successfully!
                          </p>
                        )}
                        <div className="flex gap-3">
                          <Button
                            type="submit"
                            className="flex-1"
                            data-ocid="forgot_password.confirm_button"
                          >
                            Reset Password
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setFpOpen(false)}
                            data-ocid="forgot_password.cancel_button"
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </form>
            </TabsContent>

            {/* ── Register Tab ── */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="reg-name">Full Name</Label>
                  <Input
                    id="reg-name"
                    data-ocid="register.input"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    id="reg-email"
                    data-ocid="register.input"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="reg-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="reg-password"
                      data-ocid="register.input"
                      type={showRegPw ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Min. 6 characters"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPw((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showRegPw ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="reg-confirm">Confirm Password</Label>
                  <Input
                    id="reg-confirm"
                    data-ocid="register.input"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Repeat password"
                    value={regConfirm}
                    onChange={(e) => setRegConfirm(e.target.value)}
                    required
                  />
                </div>

                {regError && (
                  <p
                    data-ocid="register.error_state"
                    className="text-sm text-destructive"
                  >
                    {regError}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  data-ocid="register.submit_button"
                >
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          By continuing, you agree to our terms of service.
        </p>
      </div>
    </main>
  );
}

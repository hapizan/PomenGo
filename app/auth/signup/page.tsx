"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Lock, User, Facebook, Twitter, Chrome, Wrench, UserCircle, Phone, MapPin } from "lucide-react";

type UserRole = "customer" | "mechanic" | null;

export default function SignupPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const handleEmailSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedRole) return;
    
    setLoading(true);
    // Simulate signup
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    
    // Redirect based on role
    if (selectedRole === "mechanic") {
      router.push("/mechanic");
    } else {
      router.push("/customer");
    }
  };

  const handleSocialLogin = async (provider: string, role: UserRole) => {
    if (!role) {
      alert("Please select a role first");
      return;
    }
    
    setLoading(true);
    // Simulate social signup
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    
    // Redirect based on role
    if (role === "mechanic") {
      router.push("/mechanic");
    } else {
      router.push("/customer");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-20 left-20 text-9xl">🚗</div>
        <div className="absolute bottom-20 right-20 text-9xl">🔧</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl">⚙️</div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <span className="text-xl font-bold">MechanicOnDemand</span>
              <p className="text-xs text-muted-foreground">Grab for Mechanics</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">{t("auth.signup.title")}</CardTitle>
            <CardDescription className="text-center">
              {t("auth.signup.subtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("auth.selectRole")}</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole("customer")}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    selectedRole === "customer"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <UserCircle className={`h-8 w-8 mx-auto mb-2 ${
                    selectedRole === "customer" ? "text-primary" : "text-muted-foreground"
                  }`} />
                  <div className="font-semibold">{t("auth.role.customer")}</div>
                  <div className="text-xs text-muted-foreground">{t("auth.role.customer.desc")}</div>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole("mechanic")}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    selectedRole === "mechanic"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Wrench className={`h-8 w-8 mx-auto mb-2 ${
                    selectedRole === "mechanic" ? "text-primary" : "text-muted-foreground"
                  }`} />
                  <div className="font-semibold">{t("auth.role.mechanic")}</div>
                  <div className="text-xs text-muted-foreground">{t("auth.role.mechanic.desc")}</div>
                </button>
              </div>
            </div>

            {selectedRole && (
              <>
                {/* Social Login Buttons */}
                <div className="space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-950/40"
                    onClick={() => handleSocialLogin("facebook", selectedRole)}
                    disabled={loading}
                  >
                    <Facebook className="mr-3 h-5 w-5 text-blue-600 dark:text-blue-400" />
                    {t("auth.social.facebook")}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start bg-sky-50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-800 hover:bg-sky-100 dark:hover:bg-sky-950/40"
                    onClick={() => handleSocialLogin("twitter", selectedRole)}
                    disabled={loading}
                  >
                    <Twitter className="mr-3 h-5 w-5 text-sky-600 dark:text-sky-400" />
                    {t("auth.social.twitter")}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-950/40"
                    onClick={() => handleSocialLogin("gmail", selectedRole)}
                    disabled={loading}
                  >
                    <Chrome className="mr-3 h-5 w-5 text-red-600 dark:text-red-400" />
                    {t("auth.social.gmail")}
                  </Button>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">{t("auth.orContinue")}</span>
                  </div>
                </div>
              </>
            )}

            {/* Email Signup Form */}
            {selectedRole ? (
              <form onSubmit={handleEmailSignup} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {t("auth.name")}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t("auth.email")}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    {t("auth.phone")}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1234567890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {selectedRole === "mechanic" && (
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium">
                      {t("auth.location")}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        type="text"
                        placeholder="City, State"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    {t("auth.password")}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? t("common.loading") : t("auth.createAccount")}
                </Button>
              </form>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>{t("auth.selectRole")}</p>
              </div>
            )}

            {/* Login Link */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">{t("auth.alreadyHaveAccount")} </span>
              <Link href="/auth/login" className="text-primary font-medium hover:underline">
                {t("auth.signIn")}
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}


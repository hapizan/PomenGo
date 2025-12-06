"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  TrendingUp,
  Shield,
  Video,
  DollarSign,
  Clock,
  Users,
  BarChart3,
  Zap,
  MapPin,
  Star,
  ArrowRight,
} from "lucide-react";
import { FloatingElements } from "@/components/animated/FloatingElements";
import { MovingCar } from "@/components/animated/MovingCar";
import { FloatingTools } from "@/components/animated/FloatingTools";
import { FeedbackForm } from "@/components/landing/FeedbackForm";
import { MalaysiaMap } from "@/components/landing/MalaysiaMap";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function LandingPage() {
  const { t } = useLanguage();
  
  const stats = [
    { label: t("landing.stats.mechanics"), value: "500+", icon: Users },
    { label: t("landing.stats.jobs"), value: "10K+", icon: CheckCircle2 },
    { label: t("landing.stats.satisfaction"), value: "4.9/5", icon: Star },
    { label: t("landing.stats.cities"), value: "25+", icon: MapPin },
  ];

  const features = [
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description: "AI-powered price estimates before booking. No hidden fees, complete transparency.",
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: Video,
      title: "Video Proof",
      description: "Before, during, and after repair videos for complete transparency and trust.",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Shield,
      title: "Verified Mechanics",
      description: "All mechanics are background-checked, rated, and verified by our platform.",
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Clock,
      title: "On-Demand Service",
      description: "Book a mechanic in minutes. Average response time: 30 minutes.",
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description: "Track your mechanic's location in real-time as they travel to you.",
      color: "text-red-600 dark:text-red-400",
    },
    {
      icon: Zap,
      title: "AI-Powered Diagnosis",
      description: "Instant symptom analysis and price estimates powered by advanced AI.",
      color: "text-yellow-600 dark:text-yellow-400",
    },
  ];

  const testimonials = [
    {
      name: "Ahmad bin Abdullah",
      role: "Business Owner, KL",
      content: "PomenGo saved me hours of downtime. The mechanic arrived quickly and the video proof gave me complete confidence in the work. Sangat bagus!",
      rating: 5,
    },
    {
      name: "Lim Wei Ming",
      role: "Tech Professional, Penang",
      content: "The transparency is unmatched. I knew exactly what I was paying for before the mechanic even arrived. Game changer! Harga sangat jelas.",
      rating: 5,
    },
    {
      name: "Siti Nurhaliza",
      role: "Fleet Manager, Selangor",
      content: "We use PomenGo for our entire fleet. The platform makes managing repairs across multiple vehicles effortless. Recommended!",
      rating: 5,
    },
    {
      name: "Raj Kumar",
      role: "Entrepreneur, Johor",
      content: "Best service in Malaysia! Fast response, fair pricing, and professional mechanics. Will definitely use again.",
      rating: 5,
    },
  ];

  const marketMetrics = [
    { label: "Market Size", value: "RM 15B+", description: "Malaysian automotive aftermarket" },
    { label: "Growth Rate", value: "8.2%", description: "Annual market growth in Malaysia" },
    { label: "Target Market", value: "15M+", description: "Vehicle owners in Malaysia" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <div>
              <span className="text-xl font-bold">PomenGo</span>
              <p className="text-xs text-muted-foreground">Your Trusted Auto Repair Partner</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost" className="hidden sm:inline-flex">{t("nav.login")}</Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="hidden sm:inline-flex">{t("nav.getStarted")}</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
        {/* Animated floating elements */}
        <FloatingElements />
        {/* Moving cars */}
        <MovingCar startX="-10%" startY="20%" endX="110%" endY="20%" duration={20} delay={0} size={60} />
        <MovingCar startX="110%" startY="70%" endX="-10%" endY="70%" duration={25} delay={5} size={55} />
        <MovingCar startX="50%" startY="10%" endX="50%" endY="90%" duration={18} delay={2} size={50} />
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 text-9xl">🚗</div>
          <div className="absolute bottom-20 left-20 text-9xl">🔧</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl">⚙️</div>
        </div>
        {/* Geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-12 md:py-16 relative w-full z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <TrendingUp className="w-3 h-3 mr-2" />
              Trusted by 10,000+ Customers
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t("landing.hero.title")}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 md:mb-8 leading-relaxed px-4">
              {t("landing.hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 md:mb-12 px-4">
              <Link href="/customer">
                <Button size="lg" className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 w-full sm:w-auto">
                  {t("landing.hero.cta")}
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </Link>
              <Link href="/mechanic">
                <Button size="lg" variant="outline" className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 w-full sm:w-auto">
                  {t("landing.hero.cta2")}
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs sm:text-sm text-muted-foreground px-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                No Hidden Fees
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Video Proof Guaranteed
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                30-Min Response Time
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-12 md:py-16 bg-muted/30 overflow-hidden">
        {/* Floating tools in background */}
        <FloatingTools />
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-32 h-32 border-2 border-primary rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-24 h-24 border-2 border-primary rounded-full" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 mb-3 md:mb-4">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Market Opportunity - Investor Focus */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background to-muted/20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 text-7xl">📊</div>
          <div className="absolute bottom-20 right-10 text-7xl">💰</div>
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <Badge className="mb-3 md:mb-4 bg-primary/10 text-primary border-primary/20">
              Market Opportunity
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 px-4">
              A RM 15B+ Market in Malaysia
              <br />
              Ready for Disruption
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              The Malaysian automotive aftermarket is massive and underserved. We&apos;re bringing transparency,
              trust, and technology to transform car repair services across Malaysia.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {marketMetrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="border-2 h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-3xl md:text-4xl font-bold text-primary">{metric.value}</CardTitle>
                    <CardDescription className="text-sm md:text-base font-semibold">{metric.label}</CardDescription>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">{metric.description}</p>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
        {/* More moving cars */}
        <MovingCar startX="-5%" startY="40%" endX="105%" endY="40%" duration={22} delay={1} size={45} />
        <MovingCar startX="105%" startY="60%" endX="-5%" endY="60%" duration={24} delay={8} size={40} />
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-20 text-6xl">🛠️</div>
          <div className="absolute bottom-10 left-20 text-6xl">🚙</div>
          <div className="absolute top-1/2 right-10 text-5xl">🔩</div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <Badge className="mb-3 md:mb-4 bg-primary/10 text-primary border-primary/20">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 px-4">
              Everything You Need
              <br />
              For Peace of Mind
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              We&apos;ve built the most comprehensive platform for on-demand auto repair,
              combining technology, transparency, and trust.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
                    <CardHeader className="pb-3">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 md:mb-4 ${feature.color}`}>
                        <Icon className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <CardTitle className="text-lg md:text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm md:text-base">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-muted/30 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-1/4 text-8xl">🚗</div>
          <div className="absolute bottom-20 right-1/4 text-8xl">🔧</div>
        </div>
        {/* Geometric pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/3 left-1/3 w-48 h-48 border-2 border-primary/10 rounded-full" />
            <div className="absolute bottom-1/3 right-1/3 w-64 h-64 border-2 border-primary/10 rounded-full" />
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <Badge className="mb-3 md:mb-4 bg-primary/10 text-primary border-primary/20">
              Simple Process
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 px-4">How It Works</h2>
            <p className="text-lg md:text-xl text-muted-foreground px-4">
              Get your car fixed in 4 simple steps
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Report Issue", desc: "Describe your problem or use AI symptom checker" },
              { step: "2", title: "Get Estimate", desc: "Receive AI-powered price estimate instantly" },
              { step: "3", title: "Mechanic Arrives", desc: "Track mechanic in real-time as they travel to you" },
              { step: "4", title: "Repair & Pay", desc: "Review repair videos, approve quote, and pay securely" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center relative"
              >
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary/20 -z-10" />
                )}
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl md:text-2xl font-bold mx-auto mb-3 md:mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">{item.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground px-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-7xl">⭐</div>
          <div className="absolute bottom-10 right-10 text-7xl">💬</div>
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <Badge className="mb-3 md:mb-4 bg-primary/10 text-primary border-primary/20">
              Customer Stories
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 px-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground px-4">
              See what our customers are saying
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full border-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardDescription className="text-sm md:text-base">{testimonial.content}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="font-semibold text-sm md:text-base">{testimonial.name}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Malaysia Map Section */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <Badge className="mb-3 md:mb-4 bg-primary/10 text-primary border-primary/20">
              Service Coverage
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 px-4">
              Serving All of Malaysia
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground px-4">
              We&apos;re expanding across Malaysia to bring quality auto repair services to every city
            </p>
          </motion.div>
          <MalaysiaMap />
        </div>
      </section>

      {/* Feedback Section */}
      <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Your Voice Matters
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Share Your Feedback
              </h2>
              <p className="text-lg text-muted-foreground">
                We value your opinion! Help us improve our services by sharing your experience, 
                suggestions, or any concerns. Your feedback helps us serve Malaysia better.
              </p>
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>We read every feedback</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>Response within 24 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>Your privacy is protected</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <FeedbackForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary to-primary/80 text-white overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full" />
          <div className="absolute bottom-20 right-20 w-24 h-24 border-4 border-white rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-white rounded-full" />
        </div>
        {/* Car/Mechanic decorative icons */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 text-8xl">🚗</div>
          <div className="absolute bottom-20 left-10 text-8xl">🔧</div>
          <div className="absolute top-1/2 right-1/4 text-6xl">⚙️</div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 px-4 text-white">
              Ready to Transform
              <br />
              Auto Repair?
            </h2>
            <p className="text-lg md:text-xl mb-6 md:mb-8 text-white/95 px-4">
              Join thousands of satisfied customers and mechanics who trust PomenGo.
              <br className="hidden sm:block" />
              <span className="block sm:inline">Experience the future of automotive service today.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link href="/customer" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 w-full sm:w-auto bg-white text-primary hover:bg-white/90">
                  Get Started as Customer
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </Link>
              <Link href="/mechanic" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 border-2 border-white text-white hover:bg-white/20 w-full sm:w-auto bg-transparent">
                  Join as Mechanic
                </Button>
              </Link>
            </div>
            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/30 px-4">
              <p className="text-sm md:text-base text-white/90 mb-3 md:mb-4 font-medium">
                Interested in investing or partnerships?
              </p>
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/20 bg-transparent">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 md:py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg" />
                <span className="font-bold">PomenGo</span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">
                The future of on-demand auto repair. Transparent, trusted, and technology-driven.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Product</h3>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-muted-foreground">
                <li><Link href="/customer" className="hover:text-foreground">For Customers</Link></li>
                <li><Link href="/mechanic" className="hover:text-foreground">For Mechanics</Link></li>
                <li><Link href="/workshop" className="hover:text-foreground">For Workshops</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Company</h3>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">About Us</Link></li>
                <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
                <li><Link href="#" className="hover:text-foreground">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Investors</h3>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Investor Relations</Link></li>
                <li><Link href="#" className="hover:text-foreground">Partnerships</Link></li>
                <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-6 md:pt-8 text-center text-xs md:text-sm text-muted-foreground">
            <p>&copy; 2024 PomenGo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

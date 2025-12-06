"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  Wallet,
  CheckCircle2,
  ArrowRight,
  Shield,
  TrendingUp
} from "lucide-react";

const paymentMethods = [
  {
    id: "rhb-paynow",
    name: "RHB PayNow",
    description: "Pay instantly with RHB mobile banking",
    icon: Smartphone,
    color: "bg-blue-500",
    popular: true,
  },
  {
    id: "rhb-online",
    name: "RHB Online Banking",
    description: "Transfer from your RHB account",
    icon: Building2,
    color: "bg-blue-600",
  },
  {
    id: "rhb-wallet",
    name: "RHB Digital Wallet",
    description: "Pay from your RHB wallet balance",
    icon: Wallet,
    color: "bg-blue-400",
  },
  {
    id: "credit-card",
    name: "Credit/Debit Card",
    description: "Visa, Mastercard, or RHB card",
    icon: CreditCard,
    color: "bg-gray-500",
  },
];

const financingOptions = [
  {
    id: "installment-3",
    months: 3,
    interest: 0,
    monthlyPayment: 116.67,
    total: 350,
  },
  {
    id: "installment-6",
    months: 6,
    interest: 0,
    monthlyPayment: 58.33,
    total: 350,
  },
  {
    id: "installment-12",
    months: 12,
    interest: 2.5,
    monthlyPayment: 30.21,
    total: 362.50,
  },
];

export default function PaymentPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const params = useParams();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [selectedFinancing, setSelectedFinancing] = useState<string | null>(null);
  const [showFinancing, setShowFinancing] = useState(false);
  const [processing, setProcessing] = useState(false);

  const jobId = params.id as string;
  const totalAmount = 350.00; // Mock amount
  const serviceFee = 10.00;
  const finalAmount = totalAmount + serviceFee;

  const handlePayment = async () => {
    if (!selectedPayment) return;
    
    setProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setProcessing(false);
    
    // Redirect to success page
    router.push(`/customer/job/${jobId}/payment/success`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Payment</h1>
          <p className="text-muted-foreground">Complete your payment securely</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="md:col-span-2 space-y-6">
            {/* Bank Integration Badge */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Powered by Ryt Bank & RHB Bank</p>
                    <p className="text-sm text-muted-foreground">
                      AI-powered secure payments with Malaysia's leading digital banks
                    </p>
                  </div>
                  <Badge variant="outline" className="border-primary text-primary">
                    <Shield className="w-3 h-3 mr-1" />
                    Secure
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Select Payment Method</CardTitle>
                <CardDescription>Choose your preferred payment option</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = selectedPayment === method.id;
                  
                  return (
                    <motion.div
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        onClick={() => {
                          setSelectedPayment(method.id);
                          setShowFinancing(
                            method.id === "rhb-paynow" || 
                            method.id === "rhb-online" || 
                            method.id === "ryt-wallet" ||
                            method.id === "ryt-ai-pay"
                          );
                        }}
                        className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                          isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{method.name}</h3>
                              {method.popular && (
                                <Badge variant="secondary" className="text-xs">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-6 h-6 text-primary" />
                          )}
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Financing Options */}
            {showFinancing && selectedPayment && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      RHB Financing Options
                    </CardTitle>
                    <CardDescription>
                      Spread your payment with 0% interest installment plans
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 mb-4">
                      <input
                        type="radio"
                        id="pay-full"
                        name="financing"
                        checked={selectedFinancing === null}
                        onChange={() => setSelectedFinancing(null)}
                        className="w-4 h-4"
                      />
                      <label htmlFor="pay-full" className="flex-1 cursor-pointer">
                        <div className="font-semibold">Pay Full Amount</div>
                        <div className="text-sm text-muted-foreground">RM {finalAmount.toFixed(2)}</div>
                      </label>
                    </div>
                    
                    {financingOptions.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                        onClick={() => setSelectedFinancing(option.id)}
                      >
                        <input
                          type="radio"
                          id={option.id}
                          name="financing"
                          checked={selectedFinancing === option.id}
                          onChange={() => setSelectedFinancing(option.id)}
                          className="w-4 h-4"
                        />
                        <label htmlFor={option.id} className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold">
                                {option.months} Months Installment
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {option.interest === 0 ? "0% Interest" : `${option.interest}% p.a.`}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">RM {option.monthlyPayment.toFixed(2)}/mo</div>
                              <div className="text-sm text-muted-foreground">
                                Total: RM {option.total.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Payment Summary */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service Amount</span>
                    <span>RM {totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span>RM {serviceFee.toFixed(2)}</span>
                  </div>
                  {selectedFinancing && (
                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Financing Plan</span>
                        <span className="text-primary font-semibold">
                          {financingOptions.find((o) => o.id === selectedFinancing)?.months} Months
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Monthly Payment</span>
                        <span className="font-semibold">
                          RM {financingOptions.find((o) => o.id === selectedFinancing)?.monthlyPayment.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="pt-2 border-t">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>
                        {selectedFinancing ? "First Payment" : "Total Amount"}
                      </span>
                      <span className="text-primary">
                        RM {selectedFinancing 
                          ? financingOptions.find((o) => o.id === selectedFinancing)?.monthlyPayment.toFixed(2)
                          : finalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={!selectedPayment || processing}
                  className="w-full"
                  size="lg"
                >
                  {processing ? (
                    "Processing..."
                  ) : (
                    <>
                      Pay Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Secured by Ryt Bank & RHB Bank. Your payment is protected with AI-powered fraud detection.</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

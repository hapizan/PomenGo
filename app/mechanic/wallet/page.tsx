"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MechanicWalletPage() {
  const { t } = useLanguage();
  const balance = 2500.0;
  const transactions = [
    { id: "1", type: "earned", amount: 350, description: "Job #job-1", date: "2024-01-20" },
    { id: "2", type: "earned", amount: 200, description: "Job #job-2", date: "2024-01-18" },
    { id: "3", type: "withdrawn", amount: -500, description: "Withdrawal", date: "2024-01-15" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("wallet.title")}</h1>
        <p className="text-muted-foreground">{t("wallet.manageEarnings")}</p>
      </div>

      {/* Balance Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t("wallet.currentBalance")}</CardTitle>
          <CardDescription>{t("wallet.availableForWithdrawal")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-primary mb-4">RM {balance.toFixed(2)}</div>
          <Button>{t("wallet.withdrawFunds")}</Button>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>{t("wallet.transactionHistory")}</CardTitle>
          <CardDescription>{t("wallet.transactionHistoryDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-semibold">{tx.description}</p>
                  <p className="text-sm text-muted-foreground">{tx.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={tx.type === "earned" ? "default" : "secondary"}>
                    {tx.type === "earned" ? t("wallet.earned") : t("wallet.withdrawn")}
                  </Badge>
                  <span
                    className={`text-lg font-bold ${
                      tx.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.amount > 0 ? "+" : ""}RM {Math.abs(tx.amount).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


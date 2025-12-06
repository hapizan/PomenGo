"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function IssuePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    router.push("/customer");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">{t("issue.title")}</h1>
        <p className="text-muted-foreground">{t("issue.description")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("issue.title")}</CardTitle>
          <CardDescription>{t("issue.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">{t("issue.selectCar")}</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option>{t("issue.selectCar")}...</option>
                <option>Toyota Camry - ABC-1234</option>
                <option>Honda Civic - XYZ-5678</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("issue.serviceType")}</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option>{t("issue.serviceType")}...</option>
                <option>Engine Repair</option>
                <option>Brake Service</option>
                <option>Oil Change</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("issue.description")}</label>
              <textarea
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder={t("issue.description")}
                required
              />
            </div>
            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? t("common.loading") : t("issue.submit")}
              </Button>
              <Link href="/customer">
                <Button type="button" variant="outline">{t("common.cancel")}</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Not sure what&apos;s wrong? Use our AI symptom checker to get an instant diagnosis.
          </p>
          <Link href="/customer/ai-check">
            <Button variant="outline">{t("ai.title")}</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}


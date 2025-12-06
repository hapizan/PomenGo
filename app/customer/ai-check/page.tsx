"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { checkSymptoms } from "@/lib/mock-services";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AICheckPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    possibleIssues: string[];
    estimatedPrice: { min: number; max: number };
    confidence: number;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const description = formData.get("description") as string;
    const carModel = formData.get("carModel") as string;

    const analysis = await checkSymptoms(description, carModel);
    setResult(analysis);
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">{t("ai.title")}</h1>
        <p className="text-muted-foreground">{t("ai.description")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("ai.enterSymptoms")}</CardTitle>
          <CardDescription>
            {t("ai.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Car Model</label>
              <Input name="carModel" placeholder="e.g., Toyota Camry 2020" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("ai.enterSymptoms")}</label>
              <textarea
                name="description"
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder={t("ai.enterSymptoms")}
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? t("ai.analyzing") : t("ai.check")}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>{t("ai.results")}</CardTitle>
            <CardDescription>
              Confidence: {Math.round(result.confidence * 100)}%
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">{t("ai.possibleIssues")}:</h3>
              <div className="flex flex-wrap gap-2">
                {result.possibleIssues.map((issue, idx) => (
                  <Badge key={idx} variant="secondary">
                    {issue}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t("ai.estimatedPrice")}:</h3>
              <p className="text-2xl font-bold text-primary">
                RM {result.estimatedPrice.min} - RM {result.estimatedPrice.max}
              </p>
            </div>
            <Button className="w-full">{t("landing.hero.cta")}</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


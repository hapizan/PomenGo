"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function WorkshopPricingPage() {
  const pricingRules = [
    { service: "Engine Repair", basePrice: 200, hourlyRate: 50 },
    { service: "Brake Service", basePrice: 150, hourlyRate: 40 },
    { service: "AC Service", basePrice: 100, hourlyRate: 35 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pricing Rules</h1>
        <p className="text-muted-foreground">Configure service pricing</p>
      </div>

      <div className="space-y-4">
        {pricingRules.map((rule) => (
          <Card key={rule.service}>
            <CardHeader>
              <CardTitle>{rule.service}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Base Price ($)</label>
                <Input type="number" defaultValue={rule.basePrice} />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Hourly Rate ($)</label>
                <Input type="number" defaultValue={rule.hourlyRate} />
              </div>
              <Button variant="outline" size="sm">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function NewCarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    router.push("/customer/cars");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Add New Car</h1>
        <p className="text-muted-foreground">Register your vehicle to get started</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Car Information</CardTitle>
          <CardDescription>Enter your vehicle details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-2 block">Brand</label>
                <Input placeholder="Toyota" required />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Model</label>
                <Input placeholder="Camry" required />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Year</label>
                <Input type="number" placeholder="2020" required />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">License Plate</label>
                <Input placeholder="ABC-1234" required />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-2 block">Mileage (km)</label>
                <Input type="number" placeholder="45000" required />
              </div>
            </div>
            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Car"}
              </Button>
              <Link href="/customer/cars">
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


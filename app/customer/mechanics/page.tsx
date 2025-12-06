"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getMechanics } from "@/lib/mock-services";
import { Mechanic } from "@/types/user";
import { MechanicsMapView } from "@/components/customer/MechanicsMapView";
import { useLanguage } from "@/contexts/LanguageContext";
import { Wrench, MapPin } from "lucide-react";

export default function MechanicsPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMechanics() {
      const data = await getMechanics();
      setMechanics(data);
      setLoading(false);
    }
    loadMechanics();
  }, []);

  const handleMechanicSelect = (mechanic: Mechanic) => {
    // Navigate to issue page with mechanic pre-selected
    router.push(`/customer/issue?mechanicId=${mechanic.id}`);
  };

  const availableCount = mechanics.filter((m) => m.is_available).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Wrench className="h-8 w-8 text-primary" />
          Available PomenGO Mechanics
        </h1>
        <p className="text-muted-foreground">
          Find and view available mechanics near you with ratings and feedback
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Mechanics</CardDescription>
            <CardTitle className="text-3xl">{mechanics.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Available Now</CardDescription>
            <CardTitle className="text-3xl text-green-600">{availableCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Average Rating</CardDescription>
            <CardTitle className="text-3xl">
              {mechanics.length > 0
                ? (mechanics.reduce((sum, m) => sum + m.rating, 0) / mechanics.length).toFixed(1)
                : "0.0"}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {loading ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Loading mechanics...</p>
          </CardContent>
        </Card>
      ) : mechanics.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No mechanics available at the moment.</p>
          </CardContent>
        </Card>
      ) : (
        <MechanicsMapView mechanics={mechanics} onMechanicSelect={handleMechanicSelect} />
      )}
    </div>
  );
}


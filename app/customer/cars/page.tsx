"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCars } from "@/lib/mock-services";
import { Car } from "@/types/mock-data";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CarsPage() {
  const { t } = useLanguage();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCars() {
      const data = await getCars("user-1");
      setCars(data);
      setLoading(false);
    }
    loadCars();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("cars.title")}</h1>
          <p className="text-muted-foreground">{t("cars.manageCars")}</p>
        </div>
        <Link href="/customer/cars/new">
          <Button>{t("cars.addNew")}</Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">{t("common.loading")}</div>
      ) : cars.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground mb-4">{t("cars.noCars")}</p>
            <Link href="/customer/cars/new">
              <Button>{t("cars.addFirstCar")}</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <Card key={car.id}>
              <CardHeader>
                <CardTitle>{car.brand} {car.model}</CardTitle>
                <CardDescription>{car.year} • {car.plate}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("cars.mileage")}:</span>
                    <span>{car.mileage.toLocaleString()} km</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    {t("common.edit")}
                  </Button>
                  <Button variant="destructive" size="sm" className="flex-1">
                    {t("common.delete")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


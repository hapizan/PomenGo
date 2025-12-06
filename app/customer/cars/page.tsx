"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCars } from "@/lib/mock-services";
import { Car } from "@/types/mock-data";
import { useLanguage } from "@/contexts/LanguageContext";
import { Car as CarIcon, Edit, Trash2, ZoomIn, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function CarsPage() {
  const { t } = useLanguage();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoomedImage, setZoomedImage] = useState<{ url: string; alt: string } | null>(null);

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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 group">
                {/* Car Image */}
                <div 
                  className="relative w-full h-48 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden cursor-pointer"
                  onClick={() => car.image_url && setZoomedImage({ url: car.image_url, alt: `${car.brand} ${car.model}` })}
                >
                  {car.image_url ? (
                    <>
                      <Image
                        src={car.image_url}
                        alt={`${car.brand} ${car.model}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                          // Fallback if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      {/* Zoom icon overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="bg-background/90 backdrop-blur-sm p-3 rounded-full shadow-lg">
                          <ZoomIn className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <CarIcon className="h-20 w-20 text-primary/30" />
                    </div>
                  )}
                  {/* Fallback icon if image fails */}
                  {!car.image_url && (
                    <div className="w-full h-full flex items-center justify-center">
                      <CarIcon className="h-20 w-20 text-primary/30" />
                    </div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent pointer-events-none" />
                  {/* Year badge */}
                  <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md border z-10">
                    <span className="text-xs font-semibold text-foreground">{car.year}</span>
                  </div>
                  {/* Click hint */}
                  <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md border text-xs text-muted-foreground">
                      Click to zoom
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{car.brand} {car.model}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="font-mono text-sm bg-muted px-2 py-1 rounded">{car.plate}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm text-muted-foreground">{t("cars.mileage")}</span>
                      <span className="text-sm font-semibold">{car.mileage.toLocaleString()} km</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 gap-2">
                        <Edit className="h-4 w-4" />
                        {t("common.edit")}
                      </Button>
                      <Button variant="destructive" size="sm" className="flex-1 gap-2">
                        <Trash2 className="h-4 w-4" />
                        {t("common.delete")}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setZoomedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-background/90 hover:bg-background"
                onClick={() => setZoomedImage(null)}
              >
                <X className="h-6 w-6" />
              </Button>
              
              {/* Zoomed Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={zoomedImage.url}
                  alt={zoomedImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              
              {/* Image info */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg border">
                <p className="text-sm font-medium text-center">{zoomedImage.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


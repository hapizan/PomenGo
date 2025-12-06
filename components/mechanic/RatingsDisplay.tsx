"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Facebook, Youtube, Music } from "lucide-react";
import { Mechanic } from "@/types/user";
import { motion } from "framer-motion";

interface RatingsDisplayProps {
  mechanic: Mechanic;
  showTitle?: boolean;
}

export function RatingsDisplay({ mechanic, showTitle = true }: RatingsDisplayProps) {
  const { rating, platform_ratings } = mechanic;

  const renderStars = (value: number) => {
    const fullStars = Math.floor(value);
    const hasHalfStar = value % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative h-4 w-4">
            <Star className="absolute h-4 w-4 fill-gray-300 text-gray-300" />
            <div className="absolute overflow-hidden" style={{ width: "50%" }}>
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 fill-gray-300 text-gray-300" />
        ))}
        <span className="ml-2 text-sm font-semibold">{value.toFixed(1)}</span>
      </div>
    );
  };

  const platformConfig = [
    {
      name: "PomenGO",
      rating: rating,
      icon: Star,
      color: "bg-primary/10 text-primary border-primary/20",
      iconColor: "text-primary",
    },
    {
      name: "Facebook",
      rating: platform_ratings?.facebook,
      icon: Facebook,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      name: "YouTube",
      rating: platform_ratings?.youtube,
      icon: Youtube,
      color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
      iconColor: "text-red-600 dark:text-red-400",
    },
    {
      name: "TikTok",
      rating: platform_ratings?.tiktok,
      icon: Music,
      color: "bg-black/10 text-black dark:text-white border-black/20 dark:border-white/20",
      iconColor: "text-black dark:text-white",
    },
  ];

  return (
    <Card className="border-2">
      {showTitle && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            Ratings & Reviews
          </CardTitle>
          <CardDescription>Your ratings across all platforms</CardDescription>
        </CardHeader>
      )}
      <CardContent className={showTitle ? "" : "pt-6"}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platformConfig.map((platform, index) => {
            if (platform.rating === undefined) return null;
            const PlatformIcon = platform.icon;

            return (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="p-4 border-2 rounded-lg hover:shadow-md transition-all bg-card">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${platform.color}`}>
                        <PlatformIcon className={`h-5 w-5 ${platform.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{platform.name}</h3>
                        <Badge className={platform.color} variant="outline">
                          {platform.rating.toFixed(1)} / 5.0
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">{renderStars(platform.rating)}</div>
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Overall Rating</span>
                      <span className="font-semibold text-foreground">
                        {platform.rating >= 4.5
                          ? "Excellent"
                          : platform.rating >= 4.0
                          ? "Very Good"
                          : platform.rating >= 3.5
                          ? "Good"
                          : platform.rating >= 3.0
                          ? "Fair"
                          : "Needs Improvement"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Overall Average */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Overall Average Rating</h3>
              <p className="text-sm text-muted-foreground">
                Combined rating across all platforms
              </p>
            </div>
            <div className="text-right">
              {(() => {
                const ratings = [
                  rating,
                  platform_ratings?.facebook,
                  platform_ratings?.youtube,
                  platform_ratings?.tiktok,
                ].filter((r): r is number => r !== undefined);
                const average = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
                return (
                  <>
                    <div className="text-3xl font-bold text-primary">
                      {average.toFixed(1)}
                    </div>
                    <div className="mt-1">
                      {renderStars(average)}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


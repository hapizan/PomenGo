"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { LocationMap } from "@/components/customer/LocationMap";
import { X, Image as ImageIcon, Video, FileVideo, Wrench, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { getMechanics, getCars, createJob } from "@/lib/mock-services";
import { Mechanic } from "@/types/user";
import { Car } from "@/types/mock-data";

interface MediaFile {
  file: File;
  preview: string;
  type: "image" | "video";
}

export default function IssuePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const mechanicId = searchParams.get("mechanicId");
  
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [selectedMechanic, setSelectedMechanic] = useState<Mechanic | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCarId, setSelectedCarId] = useState<string>("");
  const [serviceType, setServiceType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Load mechanic and cars data
  useEffect(() => {
    async function loadData() {
      if (mechanicId) {
        const mechanics = await getMechanics();
        const mechanic = mechanics.find((m) => m.id === mechanicId);
        setSelectedMechanic(mechanic || null);
      }
      const carsData = await getCars("user-1");
      setCars(carsData);
      if (carsData.length > 0) {
        setSelectedCarId(carsData[0].id);
      }
    }
    loadData();
  }, [mechanicId]);

  const handleLocationChange = (lat: number, lng: number) => {
    setLocation({ lat, lng });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("Image size should be less than 10MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaFiles((prev) => [
          ...prev,
          { file, preview: reader.result as string, type: "image" },
        ]);
      };
      reader.readAsDataURL(file);
    });
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      if (!file.type.startsWith("video/")) {
        alert("Please select a valid video file");
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        alert("Video size should be less than 50MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaFiles((prev) => [
          ...prev,
          { file, preview: reader.result as string, type: "video" },
        ]);
      };
      reader.readAsDataURL(file);
    });
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  const handleRemoveMedia = (index: number) => {
    setMediaFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Create job with all the data
      const jobData = {
        customer_id: "user-1",
        car_id: selectedCarId,
        mechanic_id: selectedMechanic?.id,
        service_type: serviceType || "Other",
        description: description,
        location_lat: location?.lat || 3.1390,
        location_lng: location?.lng || 101.6869,
        status: "pending" as const,
      };

      // In a real app, you would:
      // 1. Upload mediaFiles to a server and get URLs
      // 2. Create the job with the API
      const newJob = await createJob(jobData);
      
      // Simulate media upload delay
      if (mediaFiles.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      
      setLoading(false);
      // Navigate to customer dashboard with success message
      router.push("/customer?jobCreated=true");
    } catch (error) {
      console.error("Error creating job:", error);
      setLoading(false);
      alert("Failed to create service request. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("issue.title")}</h1>
        <p className="text-muted-foreground">{t("issue.description")}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Side - Form */}
        <div className="space-y-6">
          {/* Selected Mechanic Info */}
          {selectedMechanic && (
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <Wrench className="h-5 w-5" />
                      Selected Mechanic
                    </CardTitle>
                    <CardDescription className="mt-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{selectedMechanic.name}</span>
                        <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Available
                        </Badge>
                      </div>
                      <div className="mt-1 text-xs">
                        Rating: {selectedMechanic.rating.toFixed(1)} ⭐ | {selectedMechanic.total_jobs} jobs completed
                      </div>
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push("/customer/issue")}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>{t("issue.title")}</CardTitle>
              <CardDescription>{t("issue.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">{t("issue.selectCar")}</label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={selectedCarId}
                    onChange={(e) => setSelectedCarId(e.target.value)}
                    required
                  >
                    <option value="">{t("issue.selectCar")}...</option>
                    {cars.map((car) => (
                      <option key={car.id} value={car.id}>
                        {car.brand} {car.model} - {car.plate}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t("issue.serviceType")}</label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    required
                  >
                    <option value="">{t("issue.serviceType")}...</option>
                    {selectedMechanic?.specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                    <option value="Engine Repair">Engine Repair</option>
                    <option value="Brake Service">Brake Service</option>
                    <option value="Oil Change">Oil Change</option>
                    <option value="AC Service">AC Service</option>
                    <option value="Electrical Issues">Electrical Issues</option>
                    <option value="Battery Replacement">Battery Replacement</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t("issue.description")}</label>
                  <textarea
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder={t("issue.description")}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                {/* Media Upload Section */}
                <div className="space-y-3">
                  <label className="text-sm font-medium block">Attach Images or Videos</label>
                  
                  {/* Upload Buttons */}
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={() => imageInputRef.current?.click()}
                    >
                      <ImageIcon className="h-4 w-4" />
                      Upload Images
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={() => videoInputRef.current?.click()}
                    >
                      <Video className="h-4 w-4" />
                      Upload Videos
                    </Button>
                  </div>

                  {/* Hidden File Inputs */}
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={handleVideoChange}
                    className="hidden"
                  />

                  {/* Media Previews */}
                  {mediaFiles.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {mediaFiles.map((media, index) => (
                        <div
                          key={index}
                          className="relative group rounded-lg border-2 border-muted overflow-hidden bg-muted/20"
                        >
                          {media.type === "image" ? (
                            <div className="relative aspect-video">
                              <Image
                                src={media.preview}
                                alt={`Upload ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 25vw"
                              />
                            </div>
                          ) : (
                            <div className="relative aspect-video bg-black">
                              <video
                                src={media.preview}
                                className="w-full h-full object-cover"
                                controls
                              />
                            </div>
                          )}
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 hover:bg-background"
                            onClick={() => handleRemoveMedia(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs">
                              {media.type === "image" ? (
                                <ImageIcon className="h-3 w-3" />
                              ) : (
                                <FileVideo className="h-3 w-3" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground">
                    Images: Max 10MB each. Videos: Max 50MB each. You can upload multiple files.
                  </p>
                </div>

                {location && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Location Coordinates</p>
                    <p className="text-sm font-mono">
                      {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                    </p>
                  </div>
                )}
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

        {/* Right Side - Map */}
        <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
          <LocationMap onLocationChange={handleLocationChange} />
        </div>
      </div>
    </div>
  );
}


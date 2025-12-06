"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { Upload, X } from "lucide-react";

export default function NewCarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const DEFAULT_IMAGE = "/image/honda_civic.png";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    // In a real app, you would upload the imageFile to a server
    // and get back the image_url, then save it with the car data
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium block">Car Image</label>
              <div className="space-y-4">
                {/* Image Preview */}
                <div className="relative w-full h-64 rounded-lg border-2 border-dashed border-muted overflow-hidden bg-muted/20">
                  {imagePreview ? (
                    <>
                      <Image
                        src={imagePreview}
                        alt="Car preview"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 bg-background/90 hover:bg-background"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                      <div className="relative w-32 h-32">
                        <Image
                          src={DEFAULT_IMAGE}
                          alt="Default car icon"
                          fill
                          className="object-contain opacity-50"
                          sizes="128px"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground text-center px-4">
                        Default icon will be used if no image is uploaded
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Upload Button */}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    {imagePreview ? "Change Image" : "Upload Image"}
                  </Button>
                  {imagePreview && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="gap-2"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" />
                      Remove
                    </Button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <p className="text-xs text-muted-foreground">
                  Supported formats: JPG, PNG, WebP. Max size: 5MB
                </p>
              </div>
            </div>

            {/* Car Information Fields */}
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
            
            <div className="flex gap-4 pt-4">
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


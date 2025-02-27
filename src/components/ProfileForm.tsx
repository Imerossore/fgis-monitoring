"use client";

import { useActionState, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadProfile } from "@/actions/uploadProfile";

const initialState = {
  success: false,
  message: "",
};

export default function ProfileForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(uploadProfile, initialState);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (formData: FormData) => {
    setIsLoading(true);
    try {
      formAction(formData);
      if (state.success) {
        setPreview(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="space-y-6 w-full max-w-md mx-auto"
    >
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          name="firstName"
          required
          placeholder="Enter your first name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          name="lastName"
          required
          placeholder="Enter your last name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email (optional)</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Profile Image</Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <div
          onClick={() => document.getElementById("image")?.click()}
          className="w-32 h-32 rounded-full overflow-hidden cursor-pointer border-2 border-gray-300 hover:border-gray-400 transition-colors"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-500">Click to upload</span>
            </div>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Uploading..." : "Submit"}
      </Button>

      {state.message && (
        <p
          className={`text-sm ${
            state.success ? "text-green-500" : "text-red-500"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}

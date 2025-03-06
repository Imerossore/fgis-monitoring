"use client";
import { useActionState, useEffect, useState } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { ActionState, addProfile } from "@/lib/getAuthUser";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfileForm({ user }: { user: string }) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const initialState: ActionState = {
    success: false,
    message: "",
  };

  const [state, action, isPending] = useActionState(addProfile, initialState);
  const router = useRouter();

  useEffect(() => {
    if (!isPending && state.message) {
      toast[state.success ? "success" : "error"](state.message, {
        id: "profile-toast",
      });
      setPreview(null);
      router.push("/verification");
    } else if (isPending) {
      toast.loading("Updating Profile...", { id: "profile-toast" });
    }
  }, [isPending, state.success, state.message, router]);

  return (
    <form action={action} className="p-4 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div>
            <label
              htmlFor="avatar_url"
              className={`h-24 w-24 flex justify-center items-center bg-gray-50  rounded-full overflow-hidden cursor-pointer text-xs font-medium text-muted-foreground relative ${
                !preview &&
                "ring-2 ring-offset-2 ring-offset-gray-300 ring-white"
              }`}
            >
              {preview ? (
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                "Upload Avatar"
              )}
            </label>
            <Input
              id="avatar_url"
              name="avatar_url"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <div>
            <h1 className=" font-semibold">{user || "Unspecified"}</h1>
            <p className="text-sm text-muted-foreground font-medium">
              ID NUMBER
            </p>
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </div>
      <div className=" grid grid-cols-2 gap-3 grid-rows-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="first_name" className="text-muted-foreground">
            First Name
          </Label>
          <Input
            id="first_name"
            name="first_name"
            placeholder="First Name"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="last_name" className="text-muted-foreground ">
            Last Name
          </Label>
          <Input
            id="last_name"
            name="last_name"
            placeholder="Last Name"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email_address" className="text-muted-foreground ">
            Email Address(optional)
          </Label>
          <Input
            id="email_address"
            name="  email_address"
            placeholder="Email Address"
          />
        </div>
      </div>
    </form>
  );
}

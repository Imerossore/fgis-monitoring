import ProfileForm from "@/components/ProfileForm";
import { getAuthUser } from "@/lib/getAuthUser";
import Image from "next/image";

export default async function SetupProfilePage() {
  const user = await getAuthUser();
  const id_number = user?.id_number;


  return (
    <div className="flex items-center justify-center h-full">
      <div className="glassmorphic p-4">
        <h1 className="text-3xl text-white font-semibold">Setup Profile</h1>
        <p className="text-white">
          Complete your profile by filling out the information below.
        </p>
        <div className="w-[45vw] overflow-hidden rounded-2xl mt-4 flex flex-col">
          <div className="overflow-hidden">
            <Image
              src="/images/pic-6-crop.jpg"
              alt="image"
              width={1000}
              height={280}
              className="object-cover"
              priority
            />
          </div>
          <div className="flex-1 bg-white p-3">
            <ProfileForm user={id_number} />
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";

export default async function VerificationPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="glassmorphic p-7 rounded-xl">
        <h1 className="text-3xl text-white font-semibold">
          Waiting for Verification
        </h1>
        <p className="text-white pb-3">
          Your profile is currently under review. Please wait for the
          verification process to complete.
        </p>
        <Image
          src="/images/verification-day.png"
          alt="image"
          width={700}
          height={220}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}

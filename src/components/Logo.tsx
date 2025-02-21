import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  height?: number;
  href?: string;
};

export default function Logo({ height = 50, href }: LogoProps) {
  const logoImage = (
    <Image
      src="/images/nia-logo.PNG"
      alt="Logo"
      height={height}
      width={height}
      priority
    />
  );

  return href ? (
    <Link href={href} className="cursor-pointer">
      {logoImage}
    </Link>
  ) : (
    logoImage
  );
}

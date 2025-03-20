import Image from "next/image";
import Link from "next/link";

export default function LogoProjector() {
  return (
    <Link href="/">
      <Image
        src="/images/logo-white.png"
        alt="Logo"
        width={60}
        height={60}
        priority
      />
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-ivy-blue font-medium py-10 flex flex-col items-center m-0">

      <div className="flex flex-row gap-2 mx-10 text-center ">
        <Link className="underline hover:opacity-75" href="/tos">TERMS OF SERVICE</Link> |
        <Link className="underline hover:opacity-75" href="/privacy">PRIVACY POLICY</Link> |
        <span>TOUCHABLEPHOTOS.COM © {new Date().getFullYear()}</span>
      </div>


    </footer>
  )
}
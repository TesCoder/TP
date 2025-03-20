import { useRouter } from "next/router";
import Footer from "./Footer";
import Navbar from "./navbar";
import MarqueeDisplay from "./MarqueeDisplay";

const noNavPages = ["/contact"];

export default function Layout({ children }) {
  const { pathname } = useRouter();

  // hides navigation bar and footer when page is used in iFrame in /contact
  // an iFrame of ContactForm is implemented in SQS site temporarily
  const hide = noNavPages.includes(pathname);

  // create layout for website NavBar, Marque, Content, then Footer
  // < MarqueeDisplay /> 
  return (
    <>
    <div className="mt-20"></div>
      {!hide && <Navbar/>}
      
      <main className="min-h-screen font-raleway">{children}</main>
      {!hide && <Footer />}
    </>
  );
}

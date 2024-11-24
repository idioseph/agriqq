import Footer from "@/components/FRONTEND/Footer";
import Topbar from "@/components/FRONTEND/Topbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Topbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

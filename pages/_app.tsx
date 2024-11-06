import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="">
        <Navbar />
        <br />
        <br />
      </div>
      <div className="md:mx-auto mx-2 md:w-3/4">
        <Component {...pageProps} />
      </div>
    </>
  );
}

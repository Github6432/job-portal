import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="mt-16">
        <Navbar />
        <hr />
      </div>
      <div className="mx-10">
        <Component {...pageProps} />
      </div>
    </>
  );
}

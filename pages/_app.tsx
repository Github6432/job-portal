import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { UserProvider } from "./context/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider initialUser={pageProps.userData}>
        <div className="">
          <Navbar  />
          <br />
          <br />
        </div>
        <div className="md:mx-auto mx-2 md:w-3/4">
          <Component {...pageProps} />
        </div>
      </UserProvider>
    </>
  );
}

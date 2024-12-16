import Navbar from "@/components/Navbar";
import store from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {




  return (
    <>
      <Provider store={store}>
        <div className="">
          <Navbar />
          <br />
          <br />
        </div>
        <div className="md:mx-auto mx-2 md:w-3/4">
          <Component {...pageProps} />
        </div>
      </Provider>
    </>
  );
}



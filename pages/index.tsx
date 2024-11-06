import Footer from "@/components/Footer";
import Card from "./mainhome/Card";
import Topmenu from "./mainhome/Topmenu";
import Govtlinks from "./mainhome/Govtlinks";
import Head from "next/head";


export default function Home() {
  return (
    <>
      <Head>
        <title>CodesWear.com - wear the code</title>
        <meta name="description" content="govtlinks.com - all govt link available here" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className=" mb-10">
          <Topmenu />
        </div>
        <div className="">
          <Card />
        </div>
        <div className="">
          <Govtlinks />
        </div>
        <div className="">
          <Footer />
        </div>
      </main>
    </>
  );
}

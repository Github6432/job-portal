import Footer from "@/components/Footer";
import Card from "./mainhome/Card";
import Topmenu from "./mainhome/Topmenu";
import Govtlinks from "./mainhome/Govtlinks";


export default function Home() {
  return (
    <>
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

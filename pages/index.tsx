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
        <div className="mx-auto ">
          {/* <Card /> */}
        </div>
        <div className="mx-auto ">
          {/* <Govtlinks /> */}
        </div>
        <div className="mx-auto  bg-gray-400 text-center">
          {/* <Footer /> */}
        </div>  
      </main>
    </>
  );
}

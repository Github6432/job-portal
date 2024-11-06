import Footer from "@/components/Footer";
import Card from "./mainhome/Card";
import Topmenu from "./mainhome/Topmenu";
import Govtlinks from "./mainhome/Govtlinks";


export default function Home() {
  return (
    <>
      <main>
        <div className=" bg-red-500">
          <Topmenu />
        </div>
        <div className="my-6">
          <Card />
        </div>
        <div className="my-6">
          <Govtlinks />
        </div>
        <div className="my-6 bg-gray-400 text-center">
          <Footer />
        </div>  
      </main>
    </>
  );
}

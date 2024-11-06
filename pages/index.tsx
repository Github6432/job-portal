import Card from "./mainhome/Card";
import Topmenu from "./mainhome/Topmenu";


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
      </main>
    </>
  );
}

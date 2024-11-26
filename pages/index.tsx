import Footer from "@/components/Footer";
import Card from "./mainhome/Card";
import Topmenu from "./mainhome/Topmenu";
import Govtlinks from "./mainhome/Govtlinks";
import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsContext } from 'next';


export default function Home() {
  return (
    <>
      <Head>
        <title>mylogo.com - my logo</title>
        <meta name="description" content="govtlinks.com - all govt link available here" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="">
          <Topmenu />
          <br />
        </div>
        <div className="">
          <Card />
          <br />
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


export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.token || null;
  let user = null;
  if (token) {
    try {
      // Decode token to get user ID
      const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      const userId = decoded.id;

      // Send ID to API
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId }),  // Send user ID in the request body
      });

      user = await response.json();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  return { props: { user } };
};


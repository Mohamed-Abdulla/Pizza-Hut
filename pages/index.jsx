import Head from "next/head";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import axios from "axios";
import { useState } from "react";

export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Paradise</title>
        <meta name="description" content="Best Pizza in NY" />
        <link rel="icon" href="../img/pizza.png" />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />

      {!close && <Add setClose={setClose} />}
    </div>
  );
}
export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  const res = await axios.get("http://localhost:3000/api/products");
  //we are gonna use this res as props.
  // console.log(res.data);
  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};

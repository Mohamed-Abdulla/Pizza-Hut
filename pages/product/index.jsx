import axios from "axios";
import React from "react";
import { Grow } from "@mui/material";
import PizzaList from "../../components/PizzaList";
import { BASE_URL } from "../../util";

const Index = ({ pizzaList }) => {
  return (
    <>
      <PizzaList pizzaList={pizzaList} />
    </>
  );
};

export default Index;
export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  const res = await axios.get(`${BASE_URL}/api/products`);
  //we are gonna use this res as props.
  // console.log(res.data);
  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};

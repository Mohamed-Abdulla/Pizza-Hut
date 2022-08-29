import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import { Button } from "@mui/material";
import React from "react";
import { BASE_URL } from "../../util";

const Index = ({ orders, products }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this product?")) {
        await axios.delete(`${BASE_URL}/api/products` + id);
        setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0]; //each order
    const currentStatus = item.status;
    try {
      const res = await axios.put(`${BASE_URL}/api/orders` + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data, //updated orderList
        ...orderList.filter((order) => order._id !== id), //deleted old order list
      ]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        {/* <h1 className={styles.title}>Products</h1> */}
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList?.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image src={product.img} width={50} height={50} objectFit="cover" alt="" />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>₹ {product.prices[0]}</td>
                <td>
                  {/* <Button color="success" variant="contained" size="small" sx={{ marginRight: "10px" }}>
                    Edit
                  </Button> */}
                  <Button color="error" variant="contained" size="small" onClick={() => handleDelete(product._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>{order.method === 0 ? <span>cash</span> : <span>paid</span>}</td>
                <td>{status[order.status]}</td>
                <td>
                  <button
                    onClick={() => handleStatus(order._id)}
                    className={styles.nextStage}
                    disabled={status[order.status] === "delivered"}
                  >
                    {status[order.status] === "delivered" ? "Done ☑️" : "Next Stage"}
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  //not allowed to admin page if we dont have cookie or wrong token
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  const productRes = await axios.get(`${BASE_URL}/api/products`);
  const orderRes = await axios.get(`${BASE_URL}/api/orders`);

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;

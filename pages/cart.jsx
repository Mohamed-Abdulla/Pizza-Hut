import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "@mui/material";
import Order from "../components/Order";
import Link from "next/link";
import { LocalMall, ShoppingBasket, DeleteOutline } from "@mui/icons-material";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [openOrder, setOpenOrder] = useState(false);
  const handleCloseOrder = () => setOpenOrder(false);

  return (
    <>
      {cart.length !== 0 ? (
        <div className={styles.container}>
          <div className={styles.left}>
            <table className={styles.table}>
              <tr className={styles.trTitle}>
                <th>Product</th>
                <th>Name</th>
                <th>Extras</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
              {cart.products.map((product) => (
                <>
                  <tr className={styles.tr} key={product._id}>
                    <Link href={`/product/${product._id}`}>
                      <td>
                        <div className={styles.imgContainer}>
                          <Image src={product.img} layout="fill" objectFit="cover" alt="" />
                        </div>
                      </td>
                    </Link>
                    <Link href={`/product/${product._id}`}>
                      <td>
                        <span className={styles.name}>{product.title}</span>
                      </td>
                    </Link>
                    <td>
                      <span className={styles.extras}>
                        {product.extras.map((extra) => (
                          <span key={extra._id}>{extra.text}</span>
                        ))}
                      </span>
                    </td>
                    <td>
                      <span className={styles.price}>₹{product.price}</span>
                    </td>
                    <td>
                      <span className={styles.quantity}>{product.quantity}</span>
                    </td>
                    <td>
                      <span className={styles.total}>₹{product.price * product.quantity}</span>
                    </td>
                  </tr>
                  <DeleteOutline />
                </>
              ))}
            </table>
          </div>
          <div className={styles.right}>
            <div className={styles.wrapper}>
              <h2 className={styles.title}>
                CART TOTAL <LocalMall />
              </h2>
              <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Subtotal:</b>₹{cart.total}
              </div>
              <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Discount:</b>₹ 0.00
              </div>
              <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Total:</b>₹{cart.total}
              </div>
              <Button
                onClick={() => setOpenOrder(true)}
                variant="contained"
                color="inherit"
                sx={{ mt: "20px", background: "gold", color: "black" }}
              >
                CHECKOUT NOW!
              </Button>
            </div>
          </div>
          <Order open={openOrder} handleClose={handleCloseOrder} />
        </div>
      ) : (
        <div className={styles.emptycart}>
          <LocalMall />
          <h2>Your Cart is empty ☹️</h2>
        </div>
      )}
    </>
  );
};

export default Cart;

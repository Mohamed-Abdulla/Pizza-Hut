import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <a className={styles.text} href="tel:6382344165">
            6382344165
          </a>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link href="/" passHref>
              Homepage
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/product" passHref>
              Products
            </Link>
          </li>
          <li className={styles.listItem}>Menu</li>
          <Link href="/" passHref>
            <span className={styles.logo}>
              <Image src="/img/pizza.png" alt="" width="40px" height="40px" />
              <span>Pizza Hut</span>
            </span>
          </Link>
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>
            <a href="mailto:abdabdulla78.com">Contact</a>
          </li>
        </ul>
      </div>
      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;

import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const PizzaList = ({ pizzaList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        Preparing pizza dough, sauces, and various toppings, such as tomatoes, peppers, mushrooms, onions, and meats.
        Monitoring the temperature of the pizza ovens as well as cooking times. Preparing high-quality pizzas according
        to company recipes. Monitoring inventory and placing orders for more supplies as needed.
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;

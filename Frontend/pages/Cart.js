import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h1>Cart</h1>
      {cart.map((item, index) => (
        <p key={index}>{item.name}</p>
      ))}

      <Link to="/checkout">Checkout</Link>
    </div>
  );
}

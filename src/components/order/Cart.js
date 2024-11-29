import Layout from "../Layout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteCartItem, getCartItems, updateCartItems } from "../api/ApiOrder";
import { userInfo } from "../../utils/auth";
import CartItem from "./CartItem";
import MobileCart from "./MobileCart";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(false);

  const loadCart = () => {
    getCartItems(userInfo().token)
      .then((response) => setCartItems(response.data))
      .catch((err) => {
        if (err.response) setError(err.response.data);
        else setError("Cart item loading failed");
      });
  };

  useEffect(() => {
    loadCart();
  }, []);

  const increaseItem = (item) => {
    if (item.count === 5) return;
    const cartItem = {
      ...item,
      count: item.count + 1,
    };

    updateCartItems(userInfo().token, cartItem)
      .then((response) => loadCart())
      .catch((err) => {
        if (err.response) setError(err.response.data);
        else setError("Cart item update failed");
      });
  };

  const decreaseItem = (item) => {
    if (item.count === 1) return;
    const cartItem = {
      ...item,
      count: item.count - 1,
    };
    updateCartItems(userInfo().token, cartItem)
      .then((response) => loadCart())
      .catch((err) => {
        if (err.response) setError(err.response.data);
        else setError("Cart item update failed");
      });
  };

  const removeItem = (item) => {

    if (!window.confirm("Delete Item?")) return;
    deleteCartItem(userInfo().token, item)
      .then((response) => {
        loadCart();
      })
      .catch((err) => {
        if (err.response) setError(err.response.data);
        else setError("Cart item delete failed");
      });
  };

  return (
    <Layout
      title="Your Cart"
      description="Hurry up! Place your order!"
      className="container mx-auto px-8 md:px-16"
    >
      <div className="pt-8 md:pt-16">
      <MobileCart />
      </div>
    </Layout>
  );
};

export default Cart;

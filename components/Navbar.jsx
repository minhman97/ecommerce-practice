import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "./";
import { useStateContext } from "@/context/StateContext";

const Navbar = () => {
  const { showCard, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">link a</Link>
      </p>
      <buton
        type="button"
        className="cart-icon"
        onClick={() => {
          setShowCart(true);
        }}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </buton>

      {showCard && <Cart />}
    </div>
  );
};

export default Navbar;

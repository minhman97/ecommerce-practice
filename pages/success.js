import React, { useEffect, useState } from "react";
import { BsBagCheckFill } from "react-icons/bs";

import { useStateContext } from "@/context/StateContext";
import Link from "next/link";
import { runFireWork } from "../lib/utils";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireWork();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt</p>
        <p className="description">
          If you have any questions, please email
          <a href="mailto:order@example.com" className="email">
            order@example.com
          </a>
        </p>
        <Link href={`/`}>
          <button className="btn" type="button" width="300px">
            Continue shoppping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;

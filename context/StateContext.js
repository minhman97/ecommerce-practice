import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCard, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  let foundProduct, index;

  const onAdd = (product, quantity) => {
    var haveProduct = cartItems.find((item) => item._id === product._id);
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    if (haveProduct) {
      const updateCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updateCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (id) => {
    foundProduct = cartItems.find((item) => item._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);
    setCartItems(newCartItems);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.quantity * foundProduct.price
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
  };

  const toggleCardItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((item) => item._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);
    switch (value) {
      case "inc":
        let newItem = { ...foundProduct, quantity: foundProduct.quantity + 1 };
        newCartItems.splice(index, 0, newItem);
        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
        setTotalQuantities((prevQuantities) => prevQuantities + 1);
        break;
      case "dec":
        if (foundProduct.quantity > 1) {
          let newItem = {
            ...foundProduct,
            quantity: foundProduct.quantity - 1,
          };
          newCartItems.splice(index, 0, newItem);
          setCartItems(newCartItems);
          setTotalPrice(
            (prevTotalPrice) => prevTotalPrice - foundProduct.price
          );
          setTotalQuantities((prevQuantities) => prevQuantities - 1);
        }
        break;
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCard,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCardItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  return useContext(Context);
};

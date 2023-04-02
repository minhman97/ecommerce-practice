import { loadStripe } from "@stripe/stripe-js";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      `pk_test_51Ms0HqJjVftVSbHXIeZglDnw26ViGqtg8Uz16L74L5wVrUBOADV8buj0jtyLfbGjGvpzEs2uLjeTtPsbHVxyKhNp00o6KMrUcw`
    );
    //process.env.NEXT_STRIPE_PUBLISHABLE_KEY
  }
  return stripePromise;
};

export default getStripe;

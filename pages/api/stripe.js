const stripe = require("stripe")(
  `sk_test_51Ms0HqJjVftVSbHXRjudSrh5XpHhqy6SdrEH5Lo0jeIJSvB4gNJAPowe8keMaxl7luVo0fuaTBOmeyyjSZUb3XrB00zK52yU6m`
);
//process.env.NEXT_STRIPE_SECRET_KEY

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      var params = {
        // submit_type: "pay",
        // payment_method_types: ["card"],
        // billing_address_collection: "auto",
        // shipping_options: [
        //   "shr_1Ms0oyJjVftVSbHXijjP1R5I",
        //   "shr_1Ms0qBJjVftVSbHXF1asa2ZU",
        // ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/z5klh0ra/production/"
            )
            .replace("-webp", ".webp");
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      // res.redirect(303, session.url);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

import React from "react";

import { urlFor } from "@/lib/client";
import Link from "next/link";

const Product = ({ product }) => {
  return (
    <div>
      <Link href={`product/${product.slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(product.image && product.image[0])}
            alt="#"
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{product.name}</p>
          <p className="product-price">${product.price}</p> 
        </div>
      </Link>
    </div>
  );
};

export default Product;

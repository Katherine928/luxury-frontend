import { ProductStyles } from "../styles/ProductStyle";
import Link from "next/link";
import formatMoney from "../lib/formatMoney";

export default function Product({ product }) {
  //Extract from props
  const { title, price, image, slug } = product.attributes;

  return (
    <ProductStyles>
      <Link href={`/product/${slug}`}>
        <div>
          <img src={image.data.attributes.formats.small.url} alt={title} />
        </div>
      </Link>
      <h2>{title} </h2>
      <h3>{formatMoney(price)}</h3>
    </ProductStyles>
  );
}

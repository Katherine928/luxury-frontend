import { useStateContext } from "../lib/context";
import Link from "next/link";
import {
  CartWrapper,
  CartStyle,
  Card,
  CardInfo,
  EmptyStyle,
  Check,
  Checkout,
  Cards,
} from "../styles/CartStyles";
import { Quantity } from "../styles/ProductDetails";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import getStripe from "../lib/getStripe";
import formatMoney from "../lib/formatMoney";

const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.2,
    },
  },
};

export default function Cart() {
  const { cartItems, setShowCart, onAdd, onRemove, totalPrice } =
    useStateContext();

  const handleCheckout = async () => {
    const strip = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItems),
    });
    const data = await response.json();
    await strip.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <CartWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        e.stopPropagation();
        setShowCart(false);
      }}
    >
      <CartStyle
        initial={{ x: "50%" }}
        animate={{ x: "0%" }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        {cartItems.length < 1 && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1>Your Shopping Bag is Empty</h1>

            <Link href={"/"}>
              <Check onClick={() => setShowCart(false)}>SEE WHAT'S NEW</Check>
            </Link>
          </EmptyStyle>
        )}
        <Cards variants={cards} initial="hidden" animate="show" layout>
          {cartItems.length >= 1 &&
            cartItems.map((item) => {
              return (
                <Card variants={card} key={item.slug} layout>
                  <img
                    src={item.image.data.attributes.formats.thumbnail.url}
                    alt={item.title}
                  />
                  <CardInfo>
                    <h3>{item.title}</h3>
                    <h3>{formatMoney(item.price)}</h3>
                    <Quantity>
                      <span>Quantity</span>
                      <button onClick={() => onRemove(item)}>
                        <AiFillMinusCircle />
                      </button>
                      <p>{item.quantity}</p>
                      <button onClick={() => onAdd(item, 1)}>
                        <AiFillPlusCircle />
                      </button>
                    </Quantity>
                  </CardInfo>
                </Card>
              );
            })}
        </Cards>
        {cartItems.length >= 1 && (
          <Checkout>
            <div>
              <h3>Total:</h3>
              <h3>{formatMoney(totalPrice)}</h3>
            </div>
            <button onClick={handleCheckout}>Proceed to checkout</button>
          </Checkout>
        )}
      </CartStyle>
    </CartWrapper>
  );
}

import { useRouter } from "next/router";
import { motion } from "framer-motion";
import styled from "styled-components";
import { HiLocationMarker } from "react-icons/hi";
import { HiCreditCard } from "react-icons/hi";
import { MdLocalShipping } from "react-icons/md";
import formatMoney from "../lib/formatMoney";

const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      expand: ["line_items"],
    }
  );

  return { props: { order } };
}

export default function Success({ order }) {
  const route = useRouter();
  console.log(order);
  return (
    <Wrapper>
      <Card
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.75 } }}
        initial={{ opacity: 0, scale: 0.75 }}
      >
        <h1>Thank You!</h1>
        <h3>
          We sent an email to <span>{order.customer_details.email}</span> with
          your order confirmation and receipt. If the email hasn't arrived
          within two minutes, please check your spam folder to see if the email
          was routed there.
        </h3>
        <button onClick={() => route.push("/")}>Continue Shopping</button>
        <InfoWrapper>
          <Address>
            <HiLocationMarker />
            <h2>Shipping</h2>
            <h4>{order.shipping_details.name}</h4>
            <p>
              {order.shipping_details.address.line1}{" "}
              {order.shipping_details.address.city}{" "}
              {order.shipping_details.address.state}{" "}
              {order.shipping_details.address.postal_code}
            </p>
            <p>{order.shipping_details.address.country}</p>
          </Address>
          <Address>
            <HiCreditCard />
            <h2>Billing Details</h2>
            <h4>{order.customer_details.name}</h4>
            <p>
              {order.customer_details.address.line1}{" "}
              {order.customer_details.address.city}{" "}
              {order.customer_details.address.state}{" "}
              {order.customer_details.address.postal_code}
            </p>
            <p>{order.customer_details.address.country}</p>
          </Address>
          {order.shipping_cost.amount_subtotal === 499 && (
            <Address>
              <MdLocalShipping />
              <h2>Shipping Method</h2>
              <p>Preferred Method:</p>
              <p>U.S Standard</p>
              <p>(normally 5-7 bussiness days, unless other wise noted)</p>
            </Address>
          )}
          {order.shipping_cost.amount_subtotal === 999 && (
            <Address>
              <MdLocalShipping />
              <h2>Shipping Method</h2>
              <p>Preferred Method:</p>
              <p>U.S Express</p>
              <p>(normally 3-5 bussiness days, unless other wise noted)</p>
            </Address>
          )}
          {order.shipping_cost.amount_subtotal === 1999 && (
            <Address>
              <MdLocalShipping />
              <h2>Shipping Method</h2>
              <p>Preferred Method:</p>
              <p>U.S Premium</p>
              <p>(normally 1-2 bussiness days, unless other wise noted)</p>
            </Address>
          )}
        </InfoWrapper>
        <ProductWrapper>
          <OrderInfo>
            <h2>Order List</h2>
            {order.line_items.data.map((item) => (
              <div key={item.id}>
                <p>Product: {item.description}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {formatMoney(item.price.unit_amount / 100)}</p>
              </div>
            ))}
          </OrderInfo>
          <SummaryWrapper>
            <h2>Order Summary</h2>
            <div>
              <p>Subtotal:</p>
              <p>{formatMoney(order.amount_subtotal / 100)}</p>
            </div>
            <div>
              <p>Shipping & Handling:</p>
              <p>{formatMoney(order.shipping_cost.amount_subtotal / 100)}</p>
            </div>
            {order.total_details.amount_discount !== 0 && (
              <div>
                <p>Discount:</p>
                <p>-{formatMoney(order.total_details.amount_discount / 100)}</p>
              </div>
            )}
            <div>
              <p>Est Sales Tax:</p>
              <p>{formatMoney(order.total_details.amount_tax / 100)}</p>
            </div>
            <hr />
            <div>
              <p>Total:</p>
              <p>{formatMoney(order.amount_total / 100)}</p>
            </div>
          </SummaryWrapper>
        </ProductWrapper>
      </Card>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin: 5rem 15rem;
`;

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 2rem;
  padding: 3rem 3rem;

  h1 {
    color: var(--primary);
    margin-bottom: 1rem;
  }
  h2 {
    color: black;
    font-weight: 700;
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }
  h3 {
    text-align: center;
    width: 65%;
    font-weight: 300;
    span {
      font-weight: 700;
    }
  }
  button {
    background: var(--primary);
    color: white;
    font-weight: 500;
    font-size: 1.2rem;
    padding: 1rem 2rem;
    margin-top: 2rem;
    cursor: pointer;
  }
`;
const Address = styled.div`
  font-size: 1rem;
  width: 100%;
  padding: 1.5rem 1rem;
  border: 1px solid #e7e6e6;
  h4 {
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  p {
    width: 70%;
    color: #7f8487;
  }
  :nth-child(2) {
    border-left: none;
    border-right: none;
  }
`;
const OrderInfo = styled.div`
  font-size: 1rem;
  width: 100%;
  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: 1.5rem;
  }
  div {
    padding-bottom: 1rem;
  }
`;
const InfoWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
`;
const ProductWrapper = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  margin-top: 2rem;
`;
const SummaryWrapper = styled.div`
  font-size: 1rem;
  width: 50%;
  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: 1.5rem;
  }
  div {
    padding-bottom: 1rem;
    display: flex;
    justify-content: space-between;
  }
  hr {
    margin: 1rem 0;
    border: 1px solid #eeeeee;
  }
`;

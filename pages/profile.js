import { useRouter } from "next/router";
import { motion } from "framer-motion";
import formatMoney from "../lib/formatMoney";
// Specify Stripe secret api key here
const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import styled from "styled-components";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    // access the user session
    const session = getSession(ctx.req, ctx.res);
    const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`];
    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    });
    return { props: { orders: paymentIntents.data } };
  },
});

export default function Profile({ user, orders }) {
  const route = useRouter();
  console.log(user);
  console.log(orders);
  return (
    <ProfileWrapper
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.75 } }}
      initial={{ opacity: 0, scale: 0.75 }}
    >
      {user && (
        <div>
          <ProfileLayout>
            <ProfileInfo>
              <div>
                <img src={user.picture} alt="" />
              </div>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <button onClick={() => route.push("/api/auth/logout")}>
                Log out
              </button>
            </ProfileInfo>
            <OrderInfo>
              <h1>My Orders</h1>
              {orders.map((order) => (
                <Order key={order.id}>
                  <h1>Order Number: {order.id}</h1>
                  <h2>Amount: {formatMoney(order.amount / 100)}</h2>
                  <h1>Receipt Email: {user.email}</h1>
                </Order>
              ))}
            </OrderInfo>
          </ProfileLayout>
        </div>
      )}
    </ProfileWrapper>
  );
}
const ProfileWrapper = styled(motion.div)`
  margin: 5% 10%;

  button {
    background: var(--primary);
    color: white;
    font-weight: 500;
    font-size: 1.2rem;
    padding: 1rem 2rem;
    margin-top: 2rem;
    cursor: pointer;
    :hover {
      background-color: red;
      border: 1px solid red;
    }
  }
`;
const Order = styled.div`
  background: white;
  margin: 2rem 0rem;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 1rem;
    color: var(--primary);
    margin-bottom: 0.5rem;
  }
  h2 {
    font-size: 1rem;
    color: var(--secondary);
  }
`;
const ProfileLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProfileInfo = styled.div`
  margin: 6% auto;
`;
const OrderInfo = styled.div`
  width: 70%;
`;

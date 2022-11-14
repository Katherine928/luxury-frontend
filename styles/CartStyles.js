import styled from "styled-components";
import { motion } from "framer-motion";
export const CartWrapper = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
`;

export const CartStyle = styled(motion.div)`
  width: 30%;
  background-color: #f1f1f1;
  padding: 2rem 5rem;
  overflow-y: scroll;
  position: relative;
`;

export const Card = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  overflow: hidden;
  background: white;
  padding: 2rem;
  margin: 2rem 0rem;
  img {
    width: 8rem;
  }
`;

export const CardInfo = styled(motion.div)`
  width: 50%;
  div {
    display: flex;
    justify-content: space-between;
  }
`;

export const EmptyStyle = styled(motion.div)`
  position: absolute;
  top: 0;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 80%;
  h1 {
    font-size: 2rem;
    padding: 2rem;
  }
  svg {
    font-size: 8rem;
    color: var(--secondary);
  }
`;
export const Check = styled(motion.div)`
  width: 100%;
  background: var(--primary);
  color: white;
  font-weight: 700;
  padding: 1.5rem 3rem;
  font-size: 1rem;
  cursor: pointer;
  :hover {
    background-color: #eeeeee;
    color: black;
    border: 1px solid black;
  }
`;
export const Checkout = styled(motion.div)`
  h3 {
    font-size: 1.25rem;
    font-weight: 500;
  }
  div {
    display: flex;
    justify-content: space-between;
  }
  button {
    background: var(--primary);
    padding: 1rem 2rem;
    width: 100%;
    color: white;
    margin-top: 2rem;
    cursor: pointer;
  }
`;
export const Cards = styled(motion.div)``;

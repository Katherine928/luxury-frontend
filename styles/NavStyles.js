import styled from "styled-components";

export const NavStyles = styled.nav`
  min-height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  background-color: black;
  color: white;

  a {
    font-size: 1.5rem;
    font-weight: 700;
    margin-left: 2%;
  }
`;

export const NavItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  margin-right: 2rem;

  div {
    margin-left: 3rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  h3 {
    font-size: 0.75rem;
    padding: 0.25rem;
    color: white;
  }
  svg {
    font-size: 1.5rem;
  }
  span {
    background: #ff2626;
    color: white;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.75rem;
    position: absolute;
    right: -10%;
    top: -20%;
    font-weight: 700;
    pointer-events: none;
  }
`;

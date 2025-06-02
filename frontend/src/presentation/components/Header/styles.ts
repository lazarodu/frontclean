import styled from "styled-components";
import { colors } from "../../../shared/styles/GlobalStyle";

export const SHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.3rem solid ${colors.primary};
  height: 4rem;
  margin-bottom: 0.3rem;

  input#menu {
    display: none;
  }

  svg {
    font-size: 5rem;
    margin: 0.5rem;
  }

  nav {
    display: flex;
    align-items: center;

    div {
      display: flex;

      form {
        background-color: ${colors.secondaryLight};
        border-radius: 1rem;
        display: flex;
        align-items: center;

        input {
          background-color: transparent;
          font-size: 1rem;
        }

        svg {
          font-size: 2rem;
          margin: 0.3rem;
        }
      }

      a, button {
        text-decoration: none;
        color: ${colors.black};
        background-color: ${colors.primary};
        padding: 0.7rem;
        border-radius: 1.4rem;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
  }

  @media (max-width: 560px) {
    flex-direction: row-reverse;

    nav {
      div {
        display: none;
      }

      label {
        margin-left: 0.5rem;
        border: 0.18rem solid ${colors.black};
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        cursor: pointer;

        span {
          border: 0.1rem solid ${colors.black};
          width: 1.6rem;
          height: 0.1rem;

          &:first-child {
            margin-top: 0.2rem;
          }

          &:last-child {
            margin-bottom: 0.2rem;
          }
        }
      }
    }

    input:checked ~ nav {
      div {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 3.1rem;
        left: 0.5rem;
      }
    }
  }
`;

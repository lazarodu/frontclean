import styled from "styled-components";
import { colors } from "../../../shared/styles/GlobalStyle";

export const SForm = styled.form`
  margin: 1rem 0;
  div {
    display: grid;
    grid-template-columns: 5rem auto;
    gap: 0.5rem;
    margin: 0.3rem 0;
    input, textarea {
      border: 1px solid ${colors.black};
      padding: 0.3rem;
      font-size: 1.1rem;
    }
  }
  button {
    background-color: ${colors.secondary};
    color: ${colors.white};
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: bold;
    text-decoration: none;
    
    &:hover {
      background-color: ${colors.secondaryDark};
    }
  }
`;

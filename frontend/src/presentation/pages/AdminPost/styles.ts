
import { Link } from "react-router-dom"
import styled from "styled-components"
import { colors } from "../../../shared/styles/GlobalStyle"

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

export const Title = styled.h1`
  font-size: 2rem;
  color: ${colors.text};
`

export const CreateButton = styled(Link)`
  background-color: ${colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  
  &:hover {
    background-color: ${colors.secondaryDark};
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const Th = styled.th`
  text-align: left;
  padding: 1rem;
  border-bottom: 2px solid ${colors.border};
`

export const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${colors.border};
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const EditButton = styled(Link)`
  background-color: ${colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  text-decoration: none;
  
  &:hover {
    background-color: ${colors.secondaryDark};
  }
`

export const DeleteButton = styled.button`
  background-color: ${colors.error};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  
  &:hover {
    background-color: ${colors.errorDark};
  }
`

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${colors.textLight};
`

export const NoPosts = styled.p`
  color: ${colors.textLight};
  font-style: italic;
  text-align: center;
  padding: 2rem;
`

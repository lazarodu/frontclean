
import styled from "styled-components"
import { colors } from "../../../shared/styles/GlobalStyle"

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${colors.text};
`

export const CommentItem = styled.div`
  border: 1px solid ${colors.border};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`

export const PostTitle = styled.h3`
  margin: 0;
  color: ${colors.text};
`

export const CommentDate = styled.span`
  color: ${colors.textLight};
  font-size: 0.875rem;
`

export const CommentContent = styled.p`
  margin: 0;
  margin-bottom: 1rem;
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

export const NoComments = styled.p`
  color: ${colors.textLight};
  font-style: italic;
  text-align: center;
  padding: 2rem;
`

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${colors.textLight};
`

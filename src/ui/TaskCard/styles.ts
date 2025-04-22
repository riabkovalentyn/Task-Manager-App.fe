import styled from 'styled-components';

export const Card = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: #fff;
`;

export const Button = styled.button`
  margin-right: 0.5rem;
  background: #0070f3;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #005bb5;
  }
`;

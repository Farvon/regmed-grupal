import React from 'react';
import styled from 'styled-components';

const ButtonLink = ({ children, fontSize, onClick }) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <StyledButton fontSize={fontSize} onClick={(e) => handleClick(e)}>
      {children}
    </StyledButton>
  );
};

export default ButtonLink;

const StyledButton = styled.button`
  cursor: pointer;
  border: none;
  font-family: sans-serif;
  font-size: ${({ fontSize }) => fontSize};
  background: transparent;
  color: #3dadc5;
  padding: 10px;
  border-radius: 4px;
  transition-duration: 0.2s;

  :before {
    content: '»';
    opacity: 0;
    margin-left: -15px;
    transition-duration: 0.2s;
  }

  :hover:before {
    margin-left: 0px;
    opacity: 1;
  }

  :hover {
    color: black;
  }
`;

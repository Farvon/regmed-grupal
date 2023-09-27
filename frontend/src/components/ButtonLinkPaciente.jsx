import React from 'react';
import styled from 'styled-components';

const ButtonLinkPaciente = ({ children, fontSize, onClick , estado}) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <StyledButton fontSize={fontSize} estado={estado} onClick={(e) => handleClick(e)}>
      {children}
    </StyledButton>
  );
};

export default ButtonLinkPaciente;

const StyledButton = styled.button`
  cursor: pointer;
  border: none;
  font-family: sans-serif;
  font-size: ${({ fontSize }) => fontSize};
  background: transparent;
  color: ${({ estado }) => (estado ? '#3dadc5' : 'red')};
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
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import CloseIcon from '@mui/icons-material/Close';

const ModalTemplate = ({ onCloseIconClick, title, content }) => {
  const modalRef = useRef(null);

  const handleCloseIconClick = () => {
    if (onCloseIconClick) {
      onCloseIconClick();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCloseIconClick();
      }
    };

    // Bind and unbind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <Backdrop>
        <ModalContainer ref={modalRef}>
          <ModalForm>
            <FormInfo>
              <ModalSpan>{title}</ModalSpan>
              <CloseIcon onClick={() => handleCloseIconClick()} />
            </FormInfo>
            {content}
          </ModalForm>
        </ModalContainer>
      </Backdrop>
    </>
  );
};

export default ModalTemplate;

const Backdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
`;

const ModalContainer = styled.div`
  display: flex;
  width: auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 16px;
  width: 30%;
`;

const ModalForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
`;

const ModalSpan = styled.span`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 16px;
`;

const FormInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

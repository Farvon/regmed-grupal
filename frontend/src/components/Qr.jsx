import React from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { QRCodeCanvas } from 'qrcode.react';

const Qr = ({ paciente }) => {
  return (
    <Container>
      <QRCodeCanvas
        //value={`http://localhost:5173/info?dni=${paciente.dni}`}
        value={`http://192.168.1.20:5173/mobil?dni=${paciente.dni}`}
        size={128}
        bgColor={'#ffffff'}
        fgColor={'#000000'}
        level={'H'}
        includeMargin={true}
        imageSettings={{
          src: './logo_circle.png',
          x: undefined,
          y: undefined,
          height: 32,
          width: 32,
          excavate: false,
        }}
      />
      {/* <QRCode
        size="100"
        value={`http://192.168.1.20:5173/info?dni=${paciente.dni}`}
        renderAs="canvas"
      /> */}
    </Container>
  );
};

export default Qr;

const Container = styled.div`
  display: flex;
  align-item: center;
`;

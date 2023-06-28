import React from "react";
import styled from "styled-components";
import QRCode from 'qrcode.react';



const Qr = ({paciente}) =>{
    return(
        <Container>
            <QRCode size="100" value={`http://localhost:3001/api/pacients/${paciente.dni}`} renderAs="canvas" />
        </Container>
    )
}

export default Qr;

const Container = styled.div`
    display:flex;
    align-item: center;
`;

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import Qr from './Qr';

const PDF = ({ paciente }) => {
  const [pacientePdf, setPacientePdf] = useState(paciente);
  const pdfRef = useRef();

  //Descarga el PDF
  const Download = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        'PNG',
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save('resumen.pdf');
    });
  };

  return (
    <>
      <PdfContainer ref={pdfRef}>
        <h1>
          {pacientePdf.apellido}, {pacientePdf.nombre}
        </h1>
        <PersonalInfoBody>
          <PersonaInfoSeparadorLeft>
            <PersonalInfoGroup>
              <PersonalInfoType>Dni</PersonalInfoType>
              <PersonalInfoData>{pacientePdf.dni}</PersonalInfoData>
            </PersonalInfoGroup>
            <PersonalInfoGroup>
              <PersonalInfoType>Teléfono</PersonalInfoType>
              <PersonalInfoData>{paciente.telefono}</PersonalInfoData>
            </PersonalInfoGroup>
            <PersonalInfoGroup>
              <PersonalInfoType>Dirección</PersonalInfoType>
              <PersonalInfoData>{pacientePdf.direccion}</PersonalInfoData>
            </PersonalInfoGroup>
            <PersonalInfoGroup>
              <PersonalInfoType>Mutual y N°</PersonalInfoType>
              <PersonalInfoData>
                {pacientePdf.mutual} - {pacientePdf.num_socio}
              </PersonalInfoData>
            </PersonalInfoGroup>
            <PersonalInfoGroup>
              <PersonalInfoType>Grupo y Factor Sang.</PersonalInfoType>
              <PersonalInfoData>
                {pacientePdf.grup_sang}
                {pacientePdf.fact_sang}
              </PersonalInfoData>
            </PersonalInfoGroup>
          </PersonaInfoSeparadorLeft>
          <PersonaInfoSeparadorRight>
            <Qr paciente={pacientePdf} />
          </PersonaInfoSeparadorRight>
        </PersonalInfoBody>
      </PdfContainer>
      <Button onClick={Download}>Descargar</Button>
    </>
  );
};

export default PDF;

const PdfContainer = styled.div`
  padding: 30px;
  border: solid black 1px;
  border-radius: 10px;
`;

const PersonalInfoBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 8px;
  width: 60vw;
`;

const PersonaInfoSeparadorLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const PersonaInfoSeparadorRight = styled.div`
  display: flex;
  width: 30%;
  align-item: center;
`;

const PersonalInfoGroup = styled.div`
  display: flex;
`;

const PersonalInfoType = styled.label`
  display: flex;
  justify-content: flex-end;
  width: 30%;
  font-size: 16px;
  margin-left: 32px;
  color: gray;
`;

const PersonalInfoData = styled.span`
  margin-left: 12px;
  font-size: 16px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  margin: 16px auto;
  color: white;
  padding: 12px 24px 12px 24px;
  font-size: 14px;
  border-radius: 8px;
  background: #3498db;
  background-image: linear-gradient(to bottom, #3498db, #2980b9);
  border: none;
  transition: all 0.3s ease;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;

  :hover {
    background: #3cb0fd;
    background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
  }

  :active {
    background: #3498db;
    background-image: linear-gradient(to bottom, #3498db, #2980b9);
  }
`;

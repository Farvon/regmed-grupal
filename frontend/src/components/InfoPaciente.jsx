import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getPacientByDni } from '../services/pacients';
import Pagination from './Pagination';
import ModalTemplate from './ModalTemplate';
import EditInfo from './EditInfo';
import ViewComment from './ViewComment';
import AddComment from './AddComment';
import ButtonLink from './ButtonLink';
import SideBar from './SideBar';

const InfoPaciente = ({ dni, setDni, user }) => {
  const [paciente, setPaciente] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [modalTitle, setModalTitle] = useState();

  useEffect(() => {
    getPacientByDni(dni).then((paciente) => setPaciente(paciente));
  }, [dni, showModal]);

  // Get current comments
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments =
    paciente &&
    paciente.length !== 0 &&
    paciente.historial.slice(indexOfFirstComment, indexOfLastComment);

  // Callback to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <PageContainer>
      <SideBar setDni={setDni} user={user} />
      <InfoContainer>
        {paciente && paciente.length !== 0 ? (
          <>
            <PersonalInfoContainer>
              <PersonalInfoHeader>
                <PersonalInfoTitle>Información Personal</PersonalInfoTitle>
                {user && user.username !== 'guest' && (
                  <ButtonLink
                    fontSize="16px"
                    onClick={() => {
                      setShowModal(true);
                      setModalContent(<EditInfo paciente={paciente} />);
                      setModalTitle('Editar Información Personal');
                    }}
                  >
                    Edit
                  </ButtonLink>
                )}
              </PersonalInfoHeader>
              <PersonalInfoBody>
                <PersonalInfoGroup>
                  <PersonalInfoType>Nombre y Apellido</PersonalInfoType>
                  <PersonalInfoData>
                    {paciente.nombre}, {paciente.apellido}
                  </PersonalInfoData>
                </PersonalInfoGroup>
                <PersonalInfoGroup>
                  <PersonalInfoType>Dni</PersonalInfoType>
                  <PersonalInfoData>{paciente.dni}</PersonalInfoData>
                </PersonalInfoGroup>
                <PersonalInfoGroup>
                  <PersonalInfoType>Teléfono</PersonalInfoType>
                  <PersonalInfoData>{paciente.telefono}</PersonalInfoData>
                </PersonalInfoGroup>
                <PersonalInfoGroup>
                  <PersonalInfoType>Dirección</PersonalInfoType>
                  <PersonalInfoData>{paciente.direccion}</PersonalInfoData>
                </PersonalInfoGroup>
                <PersonalInfoGroup>
                  <PersonalInfoType>Mutual y N°</PersonalInfoType>
                  <PersonalInfoData>
                    {paciente.mutual} - {paciente.num_socio}
                  </PersonalInfoData>
                </PersonalInfoGroup>
                <PersonalInfoGroup>
                  <PersonalInfoType>Grupo y Factor Sang.</PersonalInfoType>
                  <PersonalInfoData>
                    {paciente.grup_sang}
                    {paciente.fact_sang}
                  </PersonalInfoData>
                </PersonalInfoGroup>
              </PersonalInfoBody>
            </PersonalInfoContainer>

            <PersonalInfoContainer className="comments">
              <PersonalInfoHeader>
                <PersonalInfoTitle>Comentarios</PersonalInfoTitle>
              </PersonalInfoHeader>
              <CommentBodyContainer>
                {currentComments.map((item, idx) => (
                  <CommentContainer key={idx}>
                    <CommentHeader>
                      <CommentGroup>
                        <CommentType>Fecha:</CommentType>
                        <CommentData>{item.fecha_hist}</CommentData>
                      </CommentGroup>
                      <CommentGroup>
                        <CommentType>Médico:</CommentType>
                        <CommentData>{item.medico_hist}</CommentData>
                      </CommentGroup>
                      <CommentGroup>
                        <CommentType>Especialidad:</CommentType>
                        <CommentData>{item.rama_hist}</CommentData>
                      </CommentGroup>
                    </CommentHeader>
                    <CommentBody>
                      <CommentGroup>
                        <CommentType>Comentario:</CommentType>
                        <CommentData>{item.comentario_hist}</CommentData>
                      </CommentGroup>
                    </CommentBody>
                    <ViewCommentBottonContainer>
                      <ButtonLink
                        fontSize="14px"
                        onClick={() => {
                          setShowModal(true);
                          setModalContent(<ViewComment comment={item} />);
                          setModalTitle('Comentario');
                        }}
                      >
                        Ver Comentario
                      </ButtonLink>
                    </ViewCommentBottonContainer>
                  </CommentContainer>
                ))}
                {user && user.username !== 'guest' && (
                  <AddCommentButton
                    onClick={() => {
                      setShowModal(true);
                      setModalContent(
                        <AddComment
                          dni={dni}
                          setShowModal={setShowModal}
                          name={user.name}
                        />
                      );
                      setModalTitle('Agregar Comentario');
                    }}
                  >
                    Agregar Comentario
                  </AddCommentButton>
                )}
              </CommentBodyContainer>
            </PersonalInfoContainer>
            {showModal ? (
              <ModalTemplate
                onCloseIconClick={() => setShowModal(false)}
                title={modalTitle}
                content={modalContent}
              />
            ) : null}
            <PaginationContainer>
              <Pagination
                commentsPerPage={commentsPerPage}
                currentPage={currentPage}
                totalComments={paciente.historial.length}
                paginate={paginate}
              />
            </PaginationContainer>
          </>
        ) : (
          <InfoTitle>Ups, parece que no hay nadie con ese DNI.</InfoTitle>
        )}
      </InfoContainer>
    </PageContainer>
  );
};

export default InfoPaciente;

const PageContainer = styled.div`
  display: flex;
`;

const InfoContainer = styled.div`
  width: calc(100vw - 300px);
  height: calc(100vh - 64px);
  background: #f4f6f5;
`;

const PersonalInfoContainer = styled.div`
  display: flex;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  flex-direction: column;
  box-sizing: border-box;
  margin: 16px;
`;

const PersonalInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 8px;
`;

const PersonalInfoTitle = styled.span`
  font-weight: bold;
  font-size: 24px;
`;

const PersonalInfoBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 8px;
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

const CommentContainer = styled.div`
  border: solid 1px lightgray;
  box-shadow: 0 1px 1px black;
  padding: 8px;
  margin: 4px;
`;

const CommentBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 8px;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentBody = styled.div`
  display: flex;
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid lightgray;
`;

const CommentGroup = styled.div`
  display: flex;
`;

const CommentType = styled.label`
  display: flex;
  font-size: 16px;
  color: gray;
`;

const CommentData = styled.span`
  margin-left: 6px;
  font-size: 16px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ViewCommentBottonContainer = styled.div`
  display: flex;
  margin: auto;
  margin-right: 0;
  width: 150px;
`;

const AddCommentButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  margin: 16px auto;
  color: white;
  padding: 12px 24px 12px 24px;
  font-size: 18px;
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

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoTitle = styled.h2`
  width: 100%;
  text-align: center;
  margin: 16px 0px 0px 0px;
`;

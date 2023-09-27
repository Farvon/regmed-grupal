import React from 'react';
import styled from 'styled-components';

import Welcome from './Welcome';
import SideBar from './SideBar';

const WelcomePage = ({ setDni, user }) => {
  return (
    <PageContainer id="page-container">
      <SideBar setDni={setDni} user={user} />
      <SectionContainer>
        <Welcome />
      </SectionContainer>
    </PageContainer>
  );
};

export default WelcomePage;

const PageContainer = styled.div`
  display: flex;
`;

const SectionContainer = styled.div`
  width: calc(100vw - 300px);
  height: calc(100vh - 64px);
`;

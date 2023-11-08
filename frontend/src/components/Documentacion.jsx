import React from 'react';
import styled from 'styled-components';

const Documentacion = () => {
  return (
    <BodyContainer>
      <DocumentContainer>
        <IframeDocument src="/mu.pdf"></IframeDocument>
      </DocumentContainer>
    </BodyContainer>
  );
};

export default Documentacion;

const BodyContainer = styled.body`
  padding: 0;
  margin: 0;
`;

const DocumentContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const IframeDocument = styled.iframe`
  width: 100%;
  height: 100%;
`;

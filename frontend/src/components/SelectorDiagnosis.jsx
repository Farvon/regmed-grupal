import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { getAllDiagnosis } from '../services/diagnosis';

const SelectorDiagnosis = (data) => {
  const [diagnosticos, setDiagnosticos] = useState([]);

  useEffect(() => {
    getAllDiagnosis().then((data) => setDiagnosticos(data));
  }, []);
  return (
    <>
      <Container>
        <SelectorContainer name="Diagnosticos">
          <Option selected>Diagnostico</Option>
          {diagnosticos.map((item, idx) => (
            <Option value={item.cod} key={item.cod}>
              {item.description}
            </Option>
          ))}
        </SelectorContainer>
      </Container>
    </>
  );
};

export default SelectorDiagnosis;

const Container = styled.div`
  max-width: 200px;
  size: 400px;
`;

const SelectorContainer = styled.select`
  width: 200px;
`;

const Option = styled.option`
  max-width: 200px;
`;

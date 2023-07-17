import React from 'react';
import styled from 'styled-components';

const Pagination = ({
  diagnosticPerPage,
  currentPage,
  totalDiagnostics,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDiagnostics / diagnosticPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <PaginationUl>
        {pageNumbers.map((number) => (
          <PaginationList key={number}>
            <PaginationButton
              isCurrent={number === currentPage}
              onClick={() => paginate(number)}
            >
              {number}
            </PaginationButton>
          </PaginationList>
        ))}
      </PaginationUl>
    </nav>
  );
};

export default Pagination;

const PaginationUl = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const PaginationList = styled.li`
  margin: 0 4px;
`;

const PaginationButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid ${({ isCurrent }) => (isCurrent ? '#3dadc5' : 'lightgray')};
  font-weight: bold;

  :hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.8);
  }
`;

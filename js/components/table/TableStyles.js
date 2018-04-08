import styled from 'styled-components';

export const STable = styled.div`
  display: table;
  width: 100%;
`;

export const STableBody = styled.div`
  display: table-row-group;
`;

export const STableRow = styled.div`
  display: table-row;
  cursor: pointer;
  
  &:hover {
    background-color: #eceff1 ;
  }
`;

export const STableHeader = styled.div`
  display: table-header-group;
  
  &:hover ${STableRow}{
    cursor: default;
    background-color: transparent ;
  }
`;

export const STableCell = styled.div`
  display: table-cell;
  padding: 5px;
  border-bottom: 1px solid #000;
`;
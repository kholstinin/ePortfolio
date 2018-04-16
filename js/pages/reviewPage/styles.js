import styled from 'styled-components';

export const STableWrapper = styled.div`
  height: 600px;
  overflow-y: auto;
`;

export const SWorkTable = styled.div`
  display: table;
  width: 100%;
`;

export const SWorkTableBody = styled.div`
  display: table-row-group;
`;

export const SWorkTableRow = styled.div`
  display: table-row;
  cursor: pointer;
  
  &:hover {
    background-color: #dcdcdc;
  }
`;

export const SWorkTableHeader = styled.div`
  display: table-header-group;
  cursor: default;
  
  &:hover ${SWorkTableRow}{
    background-color: transparent ;
  }
`;

export const SWorkTableCell = styled.div`
  display: table-cell;
  padding: 5px;
  border-bottom: 1px solid #000;
`;

export const SControls = styled.div`
  width: 100%;
  height: 80px;
`;
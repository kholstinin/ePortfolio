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
  
  &:hover ${SWorkTableRow}{
    cursor: default;
    background-color: transparent ;
  }
`;

export const SWorkTableCell = styled.div`
  display: table-cell;
  text-align: center;
  padding: 5px;
  border-bottom: 1px solid #000;
`;

export const STableHeaderInput = styled.input`
  margin: 5px auto 0;
  width: 80%;
`;

export const SWorkTableHeaderAction = styled.div`
  display: flex;
  flex-direction: column;    
`;
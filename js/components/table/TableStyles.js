import styled from 'styled-components';

export const StableWrapper = styled.div`
  height: 600px;
  overflow-y: auto;
`;

export const STable = styled.div`
  display: table;
  width: 100%;
  overflow: auto;
`;

export const STableBody = styled.div`
  display: table-row-group;
`;

export const STableRow = styled.div`
  display: table-row;
  cursor: pointer;
  
  &:hover {
    background-color: #eceff1;
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

export const STableButton = styled.div`
  display: inline-block;
  padding: 0 10px;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  color: #fff;
`;
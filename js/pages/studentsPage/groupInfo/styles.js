import styled from 'styled-components';
import TablePageContent from '../../../components/tablePage/Content';
import {
  STableButton,
  STableRow,
} from '../../../components/table/TableStyles';

import {btnDangerColor, btnSuccessColor} from '../../../common/palette';

export const SColumnHeader = styled.div`
  margin-bottom: 10px;
`;

export const SColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SStudentsTableWrapper = styled.div`
  height: 400px;
  overflow-y: auto;
  margin: 15px 0;
`;

export const SGroupInfoWrapper = TablePageContent.extend`
    
`;

export const SActionsWrapper = styled.div`
  visibility: hidden;
`;

export const SEditButton = STableButton.extend`
  background-color: ${btnSuccessColor};  
`;

export const SRemoveButton = STableButton.extend`
  background-color: ${btnDangerColor};  
  margin-left: 15px;
`;

export const SStudentsTableRow = STableRow.extend`
  cursor: default;
  
  &:hover ${SActionsWrapper} {
    visibility: visible;
  }
`;

export const SFooterActions = styled.div`
  display: flex;
  flex-direction: row;
  
  & > * {
  margin-right: 20px;
  }
`;

export const SIconWrapper = styled.div`
  cursor: pointer;
  margin-left: 5px;
`;
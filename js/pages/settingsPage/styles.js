import styled from 'styled-components';
import {STableButton, STableRow, STable} from '../../components/table/TableStyles';
import {linkColor} from '../../common/palette';

export const SRemoveBtn = STableButton.extend`
  background-color: red;
`;

export const SOpenBtn = STableButton.extend`
  background-color: green;
`;

export const SActionsWrapper = styled.div`
  
  & > * {
    margin-right: 15px;
  }    
`;

export const SPathsRow = STableRow.extend`
  cursor: default;
`;

export const SSettingsHeader = styled.div`
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;    
`;

export const SPathsTable = STable.extend`
  margin-bottom: 20px;    
`;

export const SMasterText = styled.div`
  font-size: 18px;
`;

export const SChangeAction = styled.div`
  cursor: pointer;
  color: ${linkColor};
`;
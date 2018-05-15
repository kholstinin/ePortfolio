import styled from 'styled-components';
import {STableButton, STableRow} from '../../components/table/TableStyles';

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
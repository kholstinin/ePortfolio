import styled from 'styled-components';
import TablePageContent from '../../../components/tablePage/Content';


export const SDisciplineListWrapper = styled.div`
  
`;

export const SDisciplineList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const SDisciplineListItem = styled.li`
  margin-bottom: 2px;
`;

export const SDisciplineInfoWrapper = TablePageContent.extend`
    
`;

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

export const SActionWrapper = styled.span`
  margin-left: 15px;
  cursor: pointer;
  
  &:hover {
    color: red;  
  }
`;

export const SButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  
  & > * {
    margin-right: 15px;
  }   
`;
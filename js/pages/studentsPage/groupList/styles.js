import styled from 'styled-components';
import LeftMenu from '../../../components/tablePage/LeftMenu';

export const SGroupListWrapper = LeftMenu.extend`
  
`;

export const SGroupList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const SGroupListItem = styled.li`
  width: 100%;
  text-align: center;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  
  &:hover {
    background-color: #eceff1;
  }
`;

export const SGroupListHeader = styled.div`
  width: 100%:
  height: 20px;
  line-height: 20px;
  font-size: 18px;
  margin-bottom: 15px;
  text-align: center;
`;

export const SGroupListInput = styled.input`
  width: 100px;
  margin-bottom: 15px;
`;

export const SGroupListInputWrapper =styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const SGroupButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  width: 100%;
`;
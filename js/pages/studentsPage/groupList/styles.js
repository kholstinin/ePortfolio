import styled from 'styled-components';
import LeftMenu from '../../../components/tablePage/LeftMenu';

const hoverColor = '#eceff1';

export const SGroupListWrapper = LeftMenu.extend`
  
`;


export const SGroupList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const SGroupListItem = styled.li`
  width: 100%;
  background-color: ${props => props.selected ? hoverColor : 'transparent'};
  text-align: center;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  
  &:hover {
    background-color: ${hoverColor};
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

export const SGroupListInputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const SGroupListInputClearIcon = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #dedede;
  right: 5px;
  top: 1px;
  cursor: pointer;
`;

export const SGroupButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  width: 100%;
`;
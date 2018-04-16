import styled from 'styled-components';
import {pageColor} from '../../common/palette';

export const SMenu = styled.div`
  width: 200px;
  height: 100%;
`;

export const SMenuWrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const itemHeight = 50;
const activeColor = '#e8eaf6';
export const SMenuItem = styled.li`
  cursor: pointer;
  width: 100%;
  height: ${itemHeight}px;
  line-height: ${itemHeight}px;
  background-color: ${props => props.active ? activeColor : 'transparent'}
  text-align: center;
  
  &:hover {
        background-color: ${activeColor};
      }
`;

export const SButtonsWrapper = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: ${pageColor}
`;

export const SRefreshButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
`;

/*
*
  &:hover {
        background-color: #dedede;
      }
* */
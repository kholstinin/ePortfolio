import {containerHeight} from '../../common/global';
import styled from 'styled-components';

export const Container = styled.div`
  width: 1200px;
  height: ${containerHeight}px;
  background-color: #fff;
  box-shadow: 0 8px 17px 2px rgba(0,0,0,0.14),0 3px 14px 2px rgba(0,0,0,0.12),0 5px 5px -3px rgba(0,0,0,0.2);
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export const SPage = styled.div`
  width: 1000px;
  height: 100%;
`;

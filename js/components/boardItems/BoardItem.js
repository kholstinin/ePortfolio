import styled from 'styled-components';

const SBoardItem = styled.span`
  margin-bottom: 2px;
  color: ${props => props.isDone ? '#000' : 'red'};
  cursor: pointer;
`;

export default SBoardItem;
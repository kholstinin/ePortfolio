import styled from 'styled-components';

function getTextColor(props) {
  if (props.err) {
    return '#c62828 ';
  }

  if (props.verified === false || props.isDone === false) {
    return '#ffd600  ';
  }

  return '#43a047';
}

const SBoardItem = styled.span`
  margin-bottom: 2px;
  color: ${props => getTextColor(props)};
  cursor: pointer;
`;

export default SBoardItem;
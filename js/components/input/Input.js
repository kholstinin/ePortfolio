import styled from 'styled-components';

const inputHeight = 25;
const SInput = styled.input`
  width: ${props => props.width ? props.width + 'px' : '100%'};
  height: ${props => props.height ? props.height : inputHeight}px;
  line-height: ${inputHeight}px;
  font-size: 18px;
  margin: 0;
  border: 1px solid #ccc;
`;

export default SInput;
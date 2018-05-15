import React from 'react';
import styled from 'styled-components';

import Input from '../../input/Input';
import Button from '../../button/Button';

const SModalContent = styled.div`
  width: 500px;
  padding: 25px 15px;
`;

const SButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 15px;
  flex-direction: row;
  justify-content: center;
  
  & > * {
    margin-right: 15px;
  }
`;

type TEditStudentTemplateProps = {
  inputValue: string,
  onSubmit: (newValue: string) => void,
}

export default class EditStudentTemplate extends React.Component<TEditStudentTemplateProps> {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: props.inputValue,
    };
  }

  render() {
    return (
        <SModalContent>
          <span>Старое имя: {this.props.inputValue}</span>
          <Input onChange={(e) => this.onInputChange(e.target.value)}
                 value={this.state.inputValue}
          />
          <SButtonsWrapper>
            <Button onClick={this.onSubmit}
                    text='Изменить имя студента'/>
            <Button color='warning' text='Отмена'
                    onClick={this.props.closeModal}/>
          </SButtonsWrapper>
        </SModalContent>
    );
  }

  onSubmit = () => {
    if (this.validateName()) {
      this.props.onSubmit(this.state.inputValue);
      this.props.closeModal();
    } else {
      // todo
    }
  };

  validateName() {
    const studentName = this.state.inputValue.trim();
    const splitName = studentName.split(' ');

    return splitName.length === 3;
  }

  onInputChange = (inputValue: string): void => {
    this.setState({inputValue});
  };
}
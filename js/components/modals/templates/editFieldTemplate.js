import React from 'react';
import styled from 'styled-components';

import Button from '../../button/Button';
import Input from '../../input/Input';

type EditFieldTemplateProps = {
  buttonText: string,
  closeModal: () => void,
  onSubmit: (newValue: string) => void,
  oldValueLabel: string,
  oldValue: string,
}

const SModalContent = styled.div`
  width: 500px;
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

const SOldValueWrapper = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

export default class EditFieldTemplate extends React.Component<EditFieldTemplateProps> {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: props.oldValue,
    };
  }

  render() {
    return (
        <SModalContent>
          <SOldValueWrapper>{`${this.props.oldValueLabel}: ${this.props.oldValue}`}</SOldValueWrapper>
          <Input value={this.state.inputValue}
                 onChange={(e) => this.onInputChange(e.target.value)}/>
          <SButtonsWrapper>
            <Button onClick={this.onSubmit}
                    text={this.props.buttonText}/>
            <Button color='warning' text='Отмена'
                    onClick={this.props.closeModal}/>
          </SButtonsWrapper>
        </SModalContent>
    );
  }

  onSubmit = () => {
    this.props.onSubmit(this.state.inputValue);
    this.props.closeModal();
  };

  onInputChange = (inputValue: string): void => {
    this.setState({inputValue});
  };
}
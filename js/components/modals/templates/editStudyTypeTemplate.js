import React from 'react';
import styled from 'styled-components';

import Button from '../../button/Button';
import SelectInput from '../../selectInput/SelectInput';
import {getStudyTypes, printStudyType} from '../../../common/utils';

type EditStudyTypeTemplateProps = {
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

export default class EditStudyTypeTemplate extends React.Component<EditStudyTypeTemplateProps> {
  constructor(props) {
    super(props);

    this.state = {
      studyType: props.oldValue,
    };
  }

  render() {
    return (
        <SModalContent>
          <SOldValueWrapper>{`${this.props.oldValueLabel}: ${printStudyType(
              this.props.oldValue)}`}</SOldValueWrapper>
          <SelectInput
              width={100}
              options={getStudyTypes()}
              value={this.state.studyType}
              onItemPress={(studyType) => this.setState({studyType})}/>
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
    this.props.onSubmit(this.state.studyType);
    this.props.closeModal();
  };

  onInputChange = (studyType: string): void => {
    this.setState({studyType});
  };
}
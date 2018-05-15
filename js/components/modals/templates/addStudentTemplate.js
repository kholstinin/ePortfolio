import React from 'react';
import styled from 'styled-components';

import Input from '../../input/Input';
import Button from '../../button/Button';
import {getNameWithInitials} from '../../../common/nameSplit';

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

const SRow = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
`;

const SColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const SLabel = styled.div`
  width: 130px;
  margin-left: 5px;
  font-size: 18px;
  line-height: 21px;
`;

type TAddStudentTemplateProps = {
  onSubmit: (newValue: string) => void,
}

export default class AddStudentTemplate extends React.Component<TAddStudentTemplateProps> {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      surname: '',
      patronymic: '',
    };
  }

  render() {
    return (
        <SModalContent>
          <SColumn>
            <SRow>
              <SLabel>
                Фамилия:
              </SLabel>
              <Input
                  onChange={(e) => this.setState({surname: e.target.value})}
                  placeholder='Фамилия'
                  value={this.state.surname}
              />
            </SRow>
            <SRow>
              <SLabel>
                Имя:
              </SLabel>
              <Input
                  onChange={(e) => this.setState({name: e.target.value})}
                  placeholder='Имя'
                  value={this.state.name}
              />
            </SRow>
            <SRow>
              <SLabel>
                Отчество:
              </SLabel>
              <Input
                  onChange={(e) => this.setState({patronymic: e.target.value})}
                  placeholder='Отчество'
                  value={this.state.patronymic}
              />
            </SRow>
          </SColumn>
          <SButtonsWrapper>
            <Button onClick={this.onSubmit}
                    text='Добавить студента'/>
            <Button color='warning' text='Отмена'
                    onClick={this.props.closeModal}/>
          </SButtonsWrapper>
        </SModalContent>
    );
  }

  onSubmit = () => {
    const {name, surname, patronymic} = this.state;
    const studentFullName = getNameWithInitials(`${surname} ${name} ${patronymic}`);

    this.props.onSubmit(studentFullName);
    this.props.closeModal();
  };
}
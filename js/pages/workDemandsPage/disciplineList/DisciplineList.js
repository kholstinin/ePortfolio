import React from 'react';
import Button from '../../../components/button/Button';

import {
  SDisciplineListWrapper,
  SDisciplineList,
  SDisciplineListItem,
  SDisciplineListInputClear,
  SDisciplineListHeader,
  SDisciplineListInputWrapper,
  SDisciplineListInput,
  SDisciplineButton,
} from './styles';

export default class DisciplineList extends React.Component {
  render() {
    const {disciplines, setSelectedDiscipline} = this.props;

    return (
        <SDisciplineListWrapper>
          <SDisciplineListHeader>Список дисциплин</SDisciplineListHeader>
          <SDisciplineListInputWrapper>
            <SDisciplineListInput value={this.props.disciplineInput}
                                  onChange={(e) => this.props.onInputChange(
                                      e.target.value)}/>
            <SDisciplineListInputClear
              onClick={() => this.props.onInputChange('')}/>
          </SDisciplineListInputWrapper>
          <SDisciplineList>
            {disciplines && disciplines.map((discipline, index) =>
                <SDisciplineListItem
                    selected={this.props.selectedDisciplineName.shortName ===
                    discipline.shortName}
                    onClick={() => setSelectedDiscipline(discipline.fullName,
                        discipline.shortName)}
                    key={index}>
                  {discipline.shortName}
                </SDisciplineListItem>,
            )}
          </SDisciplineList>
          <SDisciplineButton>
            <Button onClick={this.props.addDiscipline}
                    text='Доб. дисциплину'/>
          </SDisciplineButton>
        </SDisciplineListWrapper>
    );
  }
}
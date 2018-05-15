import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import {mainColor} from '../../../common/palette';
import {
  SDisciplineListWrapper,
  SDisciplineList,
  SDisciplineListItem,
  SDisciplineListInputClear,
  SDisciplineListHeader,
  SDisciplineListInputWrapper,
  SDisciplineListInput,
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
                onClick={() => this.props.onInputChange('')}>
              <FontAwesomeIcon
                  icon="times-circle"
                  transform={{size: 15}}
                  color={mainColor}
              />
            </SDisciplineListInputClear>
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
        </SDisciplineListWrapper>
    );
  }
}
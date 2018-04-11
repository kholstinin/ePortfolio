import React from 'react';
import Button from '../../../components/button/Button';

import {
  SDisciplineListWrapper,
  SDisciplineList,
  SDisciplineListItem,
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
            <SDisciplineListInput/>
          </SDisciplineListInputWrapper>
          <SDisciplineList>
            {disciplines && disciplines.map((discipline, index) =>
                <SDisciplineListItem
                    onClick={() => setSelectedDiscipline(discipline.shortName)}
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
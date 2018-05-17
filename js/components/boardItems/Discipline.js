import React from 'react';
import styled from 'styled-components';

import Work from './Work';
import SBoardItem from './BoardItem';

const DisciplineItem = SBoardItem.extend`
  padding-left: 30px;
`;

export default class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  render() {
    const {discipline} = this.props;

    if (discipline.err) {
      return null;
    }

    return <div>
      <DisciplineItem onClick={this.onDisciplineClick}>
        {`${discipline.fullName} ${discipline.numberOfVerifiedWorks}/${discipline.numberOfWorks}`}
      </DisciplineItem>
      {this.state.expanded && Student.renderWorks(discipline.works)}
    </div>;
  }

  onDisciplineClick = () => {
    this.setState({expanded: !this.state.expanded});
  };

  static renderWorks(arr) {
    return arr.map(
        (work, index) => <Work key={index} work={work}/>);
  }
}
import React from 'react';
import styled from 'styled-components';

import Work from './Works';

const DisciplineItem = styled.div`
  font-size: 15px;
  margin-bottom: 2px;
  color: #000;
  padding-left: 30px;
`;

export default class Student extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    };
  }

  render() {
    const {discipline} = this.props;

    return <div>
      <DisciplineItem onClick={this.onDisciplineClick}>
        {discipline.disciplineName}
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
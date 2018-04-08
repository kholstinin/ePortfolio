import React from 'react';

import {
  SList,
  SListItem,
  SGroupWrapper,
  SGroupHeader,
} from './styles';

export default class GroupList extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    };
  }

  render() {
    const {group} = this.props;
    return (
        <SGroupWrapper>
          <SGroupHeader onClick={this.onHeaderClick}>
            {group.name}
            {' '}
            <span onClick={() => this.props.removeGroup(group.name)}>
              remove
            </span>
          </SGroupHeader>
          {this.state.expanded && <SList>
            {group.students.map(
                (student, index) =>
                    <SListItem key={index}>
                      {index + 1}{'. '}{student}
                    </SListItem>)}
          </SList>}
        </SGroupWrapper>);
  }

  onHeaderClick = () => {
    this.setState(prevState => {
      return {expanded: !prevState.expanded};
    });
  };
}
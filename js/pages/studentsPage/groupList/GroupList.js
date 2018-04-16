import React from 'react';
import Button from '../../../components/button/Button';

import {
  SGroupListWrapper,
  SGroupList,
  SGroupListItem,
  SGroupListHeader,
  SGroupListInputWrapper,
  SGroupListInput,
  SGroupButton,
} from './styles';

export default class GroupList extends React.Component {
  render() {

    return (
        <SGroupListWrapper>
          <SGroupListHeader>Список групп</SGroupListHeader>
          <SGroupListInputWrapper>
            <SGroupListInput/>
          </SGroupListInputWrapper>
          <SGroupList>
            {this.props.studentsByGroup.map((group, index) =>
                <SGroupListItem
                    selected={this.props.selectedGroupName === group.name}
                    onClick={() =>
                        this.props.onListItemClick(group.name)} key={index}>
                  {group.name}
                </SGroupListItem>)}
          </SGroupList>
          <SGroupButton>
            <Button onClick={this.props.addGroup} text='Добавить группу'/>
          </SGroupButton>
        </SGroupListWrapper>
    );
  }
}
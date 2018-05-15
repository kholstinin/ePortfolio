import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import {
  SGroupListWrapper,
  SGroupList,
  SGroupListItem,
  SGroupListHeader,
  SGroupListInputWrapper,
  SGroupListInput,
  SGroupListInputClearIcon,
} from './styles';
import {mainColor} from '../../../common/palette';

export default class GroupList extends React.Component {
  render() {

    return (
        <SGroupListWrapper>
          <SGroupListHeader>Список групп</SGroupListHeader>
          <SGroupListInputWrapper>
            <SGroupListInput
                value={this.props.groupInput}
                onChange={(e) => this.props.onInputChange(e.target.value)}/>
            <SGroupListInputClearIcon
                onClick={() => this.props.onInputChange('')}>
              <FontAwesomeIcon
                  icon="times-circle"
                  transform={{size: 15}}
                  color={mainColor}
              />
            </SGroupListInputClearIcon>
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
        </SGroupListWrapper>
    );
  }
}
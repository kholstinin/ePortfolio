import type {TRoute} from '../../typings/Common';
import React from 'react';

type MenuItemProps = {
  active: TRoute,
  setRoute: () => void,
  text: string,
};

import {SMenuItem,} from './styles';

export default class MenuItem extends React.Component<MenuItemProps> {
  render() {
    return (
        <SMenuItem onClick={this.props.setRoute} active={this.props.active}>
          {this.props.text}
        </SMenuItem>
    );
  }
}
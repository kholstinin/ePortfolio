import React from 'react';
import {connect} from 'react-redux';
import {changeRoute, updatePortfolio} from '../../reducers/actions';
import {mainColor} from '../../common/palette';

import MenuItem from './MenuItem';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const menuItems = [
  {name: 'Корневые каталоги', route: 'root'},
  {name: 'Портфолио', route: 'portfolio'},
  {name: 'Ошибки', route: 'error'},
  {name: 'На проверку', route: 'review'},
  {name: 'Статус портфолио', route: 'status'},
  {name: 'Справки для печати', route: 'references'},
  {name: 'Список всех студентов', route: 'students'},
  {name: 'Рабочие программы', route: 'demands'},
];

import {
  SMenu,
  SMenuWrapper,
  SButtonsWrapper,
  SRefreshButton,
} from './styles';

import type {MenuProps} from './typings';

class Menu extends React.Component<MenuProps, {}> {
  render() {
    const {route} = this.props;

    return (
        <SMenu>
          <SButtonsWrapper>
            <SRefreshButton onClick={this.props.updatePortfolio}>
              <FontAwesomeIcon
                  icon="sync"
                  transform={{size: 25, x: 7, y: 7}}
                  color={mainColor}
              />
            </SRefreshButton>
          </SButtonsWrapper>
          <SMenuWrapper>
            {menuItems.map(
                (item, index) =>
                    <MenuItem key={index}
                              setRoute={() => this.props.setRoute(
                                  item.route)}
                              active={route === item.route}
                              text={item.name}
                    />)}
          </SMenuWrapper>
        </SMenu>
    );
  }
}

const mapStateToProps = state => ({
  route: state.router.activeRoute,
});

const mapDispatchToProps = dispatch => ({
  setRoute: route => dispatch(changeRoute(route)),
  updatePortfolio: () => dispatch(updatePortfolio()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
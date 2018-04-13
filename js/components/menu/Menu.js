import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {CHANGE_ROUTE} from '../../reducers/actionTypes';

import {pageColor} from '../../common/palette';

const SMenu = styled.div`
  width: 200px;
  height: 100%;
`;

const SMenuWrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const itemHeight = 50;
const activeColor = '#e8eaf6';
const SMenuItem = styled.li`
  cursor: pointer;
  width: 100%;
  height: ${itemHeight}px;
  line-height: ${itemHeight}px;
  background-color: ${props => props.active ? activeColor : 'transparent'}
  text-align: center;
  
  &:hover {
        background-color: ${activeColor};
      }
`;

const SButtonsWrapper = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: ${pageColor}
`;

const SRefreshButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  
  &:hover {
        background-color: #dedede;
      }
`;

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

type MenuProps = {}

type MenuState = {}

class Menu extends React.Component<MenuProps, MenuState> {
  render() {
    const {route} = this.props;

    return (
        <SMenu>
          <SButtonsWrapper>
            <SRefreshButton onClick={this.props.updatePortfolio}>
              Обн
            </SRefreshButton>
            <SRefreshButton>Син</SRefreshButton>
          </SButtonsWrapper>
          <SMenuWrapper>
            {menuItems.map(
                (item, index) =>
                    <MenuItem key={index}
                              setRoute={() => this.props.changeRoute(
                                  item.route)}
                              active={route === item.route}
                              text={item.name}
                    />)}
          </SMenuWrapper>
        </SMenu>
    );
  }
}

type MenuItemProps = {};

class MenuItem extends React.Component<MenuItemProps> {
  render() {
    return (
        <SMenuItem onClick={this.props.setRoute} active={this.props.active}>
          {this.props.text}
        </SMenuItem>
    );
  }
}

const mapStateToProps = state => ({
  route: state.router.activeRoute,
});

const mapDispatchToProps = dispatch => ({
  changeRoute: route => dispatch(
      {type: CHANGE_ROUTE, payload: route}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
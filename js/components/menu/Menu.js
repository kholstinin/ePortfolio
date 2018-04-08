import React from 'react';
import styled from 'styled-components';

const SMenu = styled.div`
  width: 200px;
  height: 100%;
  border-left: 1px solid #000;
`;

const SMenuWrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const itemHeight = 50;
const SMenuItem = styled.li`
  cursor: pointer;
  width: 100%;
  height: ${itemHeight}px;
  line-height: ${itemHeight}px;
  border-bottom: 1px solid #000;
  text-align: center;
  
  &:hover {
        background-color: #dedede;
      }
`;

const SButtonsWrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #000;
`;

const SRefreshButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background-color: #dedede;
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
];

type MenuProps = {}

type MenuState = {}

export default class Menu extends React.Component<MenuProps, MenuState> {

  render() {
    return <SMenu>
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
                          setRoute={() => this.props.setRoute(
                              item.route)}
                          itemName={item.name}
                />)}
      </SMenuWrapper>
    </SMenu>;
  }
}

type MenuItemProps = {};

class MenuItem extends React.Component<MenuItemProps> {
  render() {
    return <SMenuItem
        onClick={this.props.setRoute}>{this.props.itemName}</SMenuItem>;
  }
}
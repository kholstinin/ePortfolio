import React from 'react';
import styled from 'styled-components';
import {Column} from 'reactackle';

const dirTree = require('directory-tree');

import Portfolio from '../common/classes/portfolio';

import Group from './Group';

const Board = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 5px;
  border: 1px solid #000;
  padding: 20px;
`;

const pathToRootDirectory = '/Портфолио';
// const pathToGroup = pathToRootDirectory + '/ПЕ-41б';
// const pathToStudent = pathToGroup + '/Холстинин Д.А';
// const pathToDiscipline = pathToStudent + '/ООП';

export default class MainBoard extends React.Component {
  constructor() {
    super();
    const tree = dirTree(pathToRootDirectory);
    this.portfolio = new Portfolio(tree);
    console.log(this.portfolio);
  }

  render() {
    return <Column size={{large: 12}}>
      <Board>
        {this.portfolio.groups.map(
            (group, index) => <Group key={index} group={group}/>)}
      </Board>
    </Column>;
  }
}
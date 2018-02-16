import React from 'react';
import Portfolio from '../common/portfolio';

const pathToRootDirectory = './Портфолио';

export default class App extends React.Component {
  constructor() {
    super();
    const portfolio = new Portfolio(pathToRootDirectory);
    console.log(portfolio.getListOfStudentsInGroup('ПЕ-41б'));
  }

  render() {
    return <div>

    </div>
  }

}
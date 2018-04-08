import React from 'react';
import styled from 'styled-components';
import PouchDB from 'pouchdb-browser';
import Menu from './menu/Menu';
import initialisePortfolio from '.././common/initialisePortfolio';

const dirTree = require('directory-tree');
const storage = require('electron-json-storage');

import RouterPage from '../pages/RouterPage';
import {storage_portfolioKey} from '../common/global';
import Portfolio from '../common/classes/portfolio';

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding-top: 15px;
  height: 800px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const SPage = styled.div`
  width: 1000px;
  height: 100%;
`;

export default class Wrapper extends React.Component {
  constructor() {
    super();
    // const dbUrl = 'https://79df10c6-9673-4d5f-afc4-d981ed85f629-bluemix.cloudant.com/portfolio';
    // const db = new PouchDB(dbUrl, {
    //   auth: {
    //     username: 'ificandhossithollinceend',
    //     password: '64fa85bd5e1c39214f067bf24ca344205a8f3a9f',
    //   },
    // });
    // db.info().then(info => console.log(info));

    //const db = new PouchDB('portfolio');

    this.state = {
      loading: true,
      route: 'portfolio',
      portfolio: null,
    };

    this.updatePortfolio();
  }

  render() {
    const {route, portfolio} = this.state;

    return (
        <Container>
          <Row>
            <SPage>
              <RouterPage
                  route={route}
                  portfolio={portfolio}
              />
            </SPage>
            <Menu
                updatePortfolio={this.updatePortfolio}
                setRoute={this.setRoute}
            />
          </Row>
        </Container>
    );
  }

  setRoute = (route: string) => { //Todo add route type
    this.setState({route});
  };

  updatePortfolio = () => {
    storage.get(storage_portfolioKey, (err, data) => {
      const paths = data.paths;

      if (!paths || paths.length === 0) {
        this.setState({portfolio: 'empty'});
      } else {
        const tree = dirTree(paths[0]);
        if (tree) {
          const portfolio = new Portfolio(tree);
          initialisePortfolio(portfolio).then((val) => {
            console.log('end portfolio', portfolio, val);
            this.setState({portfolio: portfolio});
          });
        } else {
          this.setState({portfolio: null});
        }
      }

      this.setState({loading: false});
    });
  }
}
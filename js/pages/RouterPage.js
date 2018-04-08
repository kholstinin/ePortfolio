import React from 'react';
import styled from 'styled-components';

import PortfolioPage from '../pages/portfolioPage/PortfolioPage';
import ChooseRootPage from '../pages/chooseRootPage/chooseRootPage';
import ErrorsPage from '../pages/erorrPage/errorPage';
import ReviewsPage from '../pages/reviewPage/reviewPage';
import StatusPage from '../pages/statusPage/statusPage';
import ReferencePage from './referencePage/referencePage';
import StudentsPage from '../pages/studentsPage/studentsPage';

const Column = styled.div`
  width: 100%;
  height: 100%;
`;

export default class RouterPage extends React.Component {
  render() {
    const {route, portfolio} = this.props;

    return (
        <Column>
          {route === 'portfolio' && <PortfolioPage portfolio={portfolio} />}
          {route === 'root' && <ChooseRootPage/>}
          {route === 'error' && <ErrorsPage/>}
          {route === 'review' && <ReviewsPage/>}
          {route === 'status' && <StatusPage/>}
          {route === 'references' && <ReferencePage/>}
          {route === 'students' && <StudentsPage/>}
        </Column>
    );
  }
}
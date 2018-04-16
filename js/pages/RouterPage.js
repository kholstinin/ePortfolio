import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import PortfolioPage from '../pages/portfolioPage/PortfolioPage';
import ChooseRootPage from '../pages/chooseRootPage/chooseRootPage';
import ErrorsPage from '../pages/erorrPage/errorPage';
import ReviewsPage from '../pages/reviewPage/reviewPage';
import StatusPage from '../pages/statusPage/statusPage';
import ReferencePage from './referencePage/referencePage';
import StudentsPage from '../pages/studentsPage/studentsPage';
import WorkDemandsPage from './workDemandsPage/WorkDemandsPage';

const Column = styled.div`
  width: 100%;
  height: 100%;
`;

class RouterPage extends React.Component {
  render() {
    const {route} = this.props;

    return (
        <Column>
          {route === 'portfolio' && <PortfolioPage/>}
          {route === 'root' && <ChooseRootPage/>}
          {route === 'error' && <ErrorsPage/>}
          {route === 'review' && <ReviewsPage/>}
          {route === 'status' && <StatusPage/>}
          {route === 'references' && <ReferencePage/>}
          {route === 'students' && <StudentsPage/>}
          {route === 'demands' && <WorkDemandsPage/>}
        </Column>
    );
  }
}

const mapStateToProps = state => ({
  route: state.router.activeRoute,
});

export default connect(mapStateToProps)(RouterPage);
import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import Group from '../../components/boardItems/Group';
import {Container, PageHeader, PageWrapper} from '../../components/page/Page';

// const pathToRootDirectory = '/Портфолио';
// const pathToGroup = pathToRootDirectory + '/ПЕ-41б';
// const pathToStudent = pathToGroup + '/Холстинин Д.А';
// const pathToDiscipline = pathToStudent + '/ООП';

const ContentWrapper = styled.div`
  padding-top: 15px;
  height: 650px;
  overflow-y: auto;
`;

class PortfolioPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {portfolio} = this.props;

    return (
        <Container>
          <PageHeader text='Портфолио'/>
          <PageWrapper>
            <ContentWrapper>
              {portfolio === 'empty' ?
                  'Не указан путь до портфолио' :
                  null}
              {portfolio && portfolio !== 'empty' ?
                  portfolio.groups.map(
                      (group, index) => <Group
                          key={index}
                          group={group}
                      />) :
                  null}
            </ContentWrapper>
          </PageWrapper>
        </Container>
    );
  }
}

const mapStateToProps = state => ({
  portfolio: state.portfolio.status,
});

export default connect(mapStateToProps)(PortfolioPage);
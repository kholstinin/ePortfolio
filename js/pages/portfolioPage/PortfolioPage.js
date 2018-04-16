import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import Group from '../../components/boardItems/Group';
import {PageWrapper, PageHeader, PageContent} from '../../components/page/Page';

// const pathToRootDirectory = '/Портфолио';
// const pathToGroup = pathToRootDirectory + '/ПЕ-41б';
// const pathToStudent = pathToGroup + '/Холстинин Д.А';
// const pathToDiscipline = pathToStudent + '/ООП';

const ContentWrapper = styled.div`
  padding-top: 80px;
`;

class PortfolioPage extends React.Component {
  render() {
    const {portfolio} = this.props;

    return (
        <PageWrapper>
          <PageHeader text='Портфолио'/>
          <PageContent>
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
          </PageContent>
        </PageWrapper>
    );
  }
}

const mapStateToProps = state => ({
  portfolio: state.portfolio.status,
});

export default connect(mapStateToProps)(PortfolioPage);
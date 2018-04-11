import React from 'react';
import styled from 'styled-components';

import Group from '../../components/boardItems/Group';
import {PageWrapper, PageHeader, PageContent} from '../../components/page/Page';

// const pathToRootDirectory = '/Портфолио';
// const pathToGroup = pathToRootDirectory + '/ПЕ-41б';
// const pathToStudent = pathToGroup + '/Холстинин Д.А';
// const pathToDiscipline = pathToStudent + '/ООП';

export default class PortfolioPage extends React.Component {
  render() {
    const {portfolio} = this.props;

    return <PageWrapper>
      <PageHeader text='Список потфолио'/>
      <PageContent>
        {portfolio === 'empty' ?
            'Не указан путь до портфолио' :
            null}
        {portfolio && portfolio !== 'empty' ?
            portfolio.groups.map(
                (group, index) => <Group key={index} group={group}/>) :
            null}
      </PageContent>
    </PageWrapper>;
  }
}
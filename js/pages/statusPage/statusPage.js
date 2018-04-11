import React from 'react';
import styled from 'styled-components';

import {PageWrapper, PageHeader, PageContent} from '../../components/page/Page';

export default class StatusPage extends React.Component {
  render() {
    return <PageWrapper>
      <PageHeader text='Статус портфолио'/>
      <PageContent>
        status page
      </PageContent>
    </PageWrapper>;
  }
}
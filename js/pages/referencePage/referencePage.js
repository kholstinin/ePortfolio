import React from 'react';
import styled from 'styled-components';

import {PageWrapper, PageHeader, PageContent} from '../../components/page/Page';

export default class ReferencePage extends React.Component {
  render() {
    return <PageWrapper>
      <PageHeader text='Справки для печати'/>
      <PageContent>
        references for print
      </PageContent>
    </PageWrapper>;
  }
}
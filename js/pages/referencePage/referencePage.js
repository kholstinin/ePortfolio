import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {PageWrapper, PageHeader, PageContent} from '../../components/page/Page';

type TReferencePageProps = {
  portfolio: {},
}

class ReferencePage extends React.Component<TReferencePageProps, {}> {

  render() {
    console.log(this.props.references);

    return <PageWrapper>
      <PageHeader text='Справки для печати'/>
      <PageContent>

      </PageContent>
    </PageWrapper>;
  }
}

const mapStateToProps = state => ({
  references: state.references.disciplines,
});

export default connect(mapStateToProps)(ReferencePage)
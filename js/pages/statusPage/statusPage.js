import React from 'react';
import styled from 'styled-components';
import {portfDB} from '../../common/databases';

import {PageWrapper, PageHeader, PageContent} from '../../components/page/Page';
import {getDocs} from '../../common/utils';

const SColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: 1px solid #000;
`;

const SRow = styled.div`
  width: 100%;
  padding-top: 80px;
  flex-direction: row;
`;

export default class StatusPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolio: null,
      activeGroup: '',
      activeStudent: '',
      activeDiscipline: '',
    };
  }

  componentDidMount() {
    portfDB.allDocs({include_docs: true}).then(result => {
      const portfolio = getDocs(result.rows);

      this.setState({
        portfolio,
      });
    });
  }

  render() {
    const {portfolio, activeGroup, activeStudent, activeDiscipline} = this.state;
    console.log(portfolio);

    return <PageWrapper>
      <PageHeader text='Статус портфолио'/>
      <PageContent>
        <SRow>
          <SColumn>
            {portfolio &&
            portfolio.map((item, index) => <div key={index}>{item.group}</div>)}
          </SColumn>
          <SColumn>

          </SColumn>
        </SRow>
      </PageContent>
    </PageWrapper>;
  }
}
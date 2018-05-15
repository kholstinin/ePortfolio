import React from 'react';
import {connect} from 'react-redux';

const {shell} = require('electron');

import {Container, PageHeader, PageWrapper} from '../../components/page/Page';

import {
  STable,
  StableWrapper,
  STableHeader,
  STableBody,
  STableRow,
  STableCell,
} from '../../components/table/TableStyles';

class ErrorPage extends React.Component {
  render() {
    const {works} = this.props;

    return (
        <Container>
          <PageHeader text='Портфолио с ошибками'/>
          <PageWrapper>
            <StableWrapper>
              <STable>
                {this.renderHeader()}
                <STableBody>
                  {works.map((work, index) =>
                      <STableRow key={index}
                                 onClick={() => shell.showItemInFolder(
                                     work.path)}>
                        <STableCell key={0}>
                          {work.name || work.fullName}
                        </STableCell>
                        <STableCell key={1}>
                          {work.err}
                        </STableCell>
                        <STableCell key={2}>
                          {work.path}
                        </STableCell>
                      </STableRow>)}
                </STableBody>
              </STable>
            </StableWrapper>
          </PageWrapper>
        </Container>
    );
  }

  renderHeader() {
    const titles = ['Название', 'Ошибка', 'Путь'];
    return (
        <STableHeader>
          <STableRow>
            {titles.map(
                (title, index) => <STableCell key={index}>{title}</STableCell>)}
          </STableRow>
        </STableHeader>
    );
  }
}

const mapStateToProps = state => ({
  works: state.works.wrongWorks,
});

export default connect(mapStateToProps)(ErrorPage);
import React from 'react';
import styled from 'styled-components';
import worksHandler from '../../common/worksHandler';

const {shell} = require('electron');

import {PageWrapper, PageHeader, PageContent} from '../../components/page/Page';

import {
  STable,
  STableHeader,
  STableBody,
  STableRow,
  STableCell,
} from '../../components/table/TableStyles';

export default class ErrorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      works: worksHandler.getWrongWorks(),
    };
  }

  render() {
    const {works} = this.state;

    return (
        <PageWrapper>
          <PageHeader text='Портфолио с ошибками'/>
          <PageContent>
            <STable>
              {this.renderHeader()}
              <STableBody>
                {works.map((work, index) =>
                    <STableRow key={index}
                               onClick={() => shell.showItemInFolder(
                                   work.path)}>
                      <STableCell key={0}>
                        {work.name}
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
          </PageContent>
        </PageWrapper>
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
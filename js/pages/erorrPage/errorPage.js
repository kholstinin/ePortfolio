import React from 'react';
import styled from 'styled-components';
import worksHandler from '../../common/worksHandler';

const {shell} = require('electron');

import PageWrapper from '../../components/pageWrapper/PageWrapper';
import PageHeader from '../../components/pageHeader/PageHeader';

import {
  STable,
  STableHeader,
  STableBody,
  STableRow,
  STableCell,
} from '../../components/table/TableStyles';

export default class ErrorPage extends React.Component {
  constructor() {
    super();
    this.state = {
      works: worksHandler.getWrongWorks(),
    };
  }

  render() {
    const {works} = this.state;
    console.log('render', works);

    return (
        <PageWrapper>
          <PageHeader text='Портфолио с ошибками'/>
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
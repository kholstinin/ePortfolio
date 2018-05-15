type TReferencePageProps = {
  portfolio: {},
}

import React from 'react';
import {connect} from 'react-redux';
const fs = require('fs');

import Button from '../../components/button/Button';
import {Container, PageHeader, PageWrapper, SPageControls} from '../../components/page/Page';
import createReference from '../../common/createReference';

import {
  STable,
  STableHeader,
  STableBody,
  STableCell,
  STableRow,
} from '../../components/table/TableStyles';
import {getNameWithInitials} from '../../common/nameSplit';

class ReferencePage extends React.Component<TReferencePageProps, {}> {

  render() {
    return <Container>
      <PageHeader text='Справки для печати'/>
      <PageWrapper>
        <SPageControls>
          <Button text='Напечатать справки' onClick={this.printReference}/>
          <Button text='Добавить все справки в печать' onClick={() => {}}/>
        </SPageControls>
        {this.props.references.length ? <STable>
          {this.renderHeader()}
          {this.renderBody()}
        </STable> : <span>Нет справок на печать</span>}
      </PageWrapper>
    </Container>;
  }

  renderHeader() {
    const titles = ['Группа', 'Студент', 'Дисциплина', 'Добавить в печать'];

    return (
        <STableHeader>
          <STableRow>
            {titles.map(
                (title, index) => <STableCell key={index}>{title}</STableCell>)}
          </STableRow>
        </STableHeader>
    );
  }

  renderBody() {
    const {references} = this.props;

    return (
        <STableBody>
          {references.map(
              (reference, index) => this.renderRow(reference, index))}
        </STableBody>
    );
  }

  renderRow(reference, key) {
    let cellsKey = 0;

    return (
        <STableRow key={key}>
          <STableCell key={++cellsKey}>{reference.groupName}</STableCell>
          <STableCell key={++cellsKey}>{getNameWithInitials(
              reference.studentFullName)}</STableCell>
          <STableCell key={++cellsKey}>{reference.name}</STableCell>
          <STableCell key={++cellsKey}><input type='checkbox'/></STableCell>
        </STableRow>
    );
  }

  printReference = () => {
    const currentPath = process.cwd();
    createReference(this.props.references[0]).then(ref => {
      fs.writeFileSync(currentPath + '/output.docx', ref);
    })
  }
}

const mapStateToProps = state => ({
  references: state.references.disciplines,
});

export default connect(mapStateToProps)(ReferencePage);
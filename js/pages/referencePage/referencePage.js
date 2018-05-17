import CheckboxWithLabel from '../../components/checkbox/CheckboxWithLabel';

type TReferencePageProps = {
  portfolio: {},
}
import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {storage_masterNameKey} from '../../common/global';

const fs = require('fs');
const storage = require('electron-json-storage');
const {shell} = require('electron');

import Button from '../../components/button/Button';
import Checkbox from '../../components/checkbox/Checkbox';
import {
  Container,
  PageHeader,
  PageWrapper,
  SPageControls,
} from '../../components/page/Page';
import createReference from '../../common/createReference';

import {
  STable,
  STableHeader,
  STableBody,
  STableCell,
  STableRow,
} from '../../components/table/TableStyles';

import {getStudentId} from '../../common/getId';
import {endLoading, startLoading} from '../../redux/actions/actions';
import {getNameWithInitials} from '../../common/nameSplit';
import {portfDB} from '../../common/databases';
import difference from 'lodash/difference';

const SHalfTableWrapper = styled.div`
  width: 50%;
  height: 100%;
`;

const STablesWrapper = styled.div`
  width: 100%;
  height: 660px;
  display: flex;
  flex-direction: row;
`;

const STablesControls = styled.div`
  width: 50px;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
`;

const STableHeaderText = styled.div`
  text-align: center;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: bold;
`;

const tableTypes = {
  all: 'all',
  selected: 'selected',
};

class ReferencePage extends React.Component<TReferencePageProps, {}> {
  constructor(props) {
    super(props);

    console.log(props.references);

    this.state = {
      allReferences: props.references,
      selectedReferences: [],
      showUnprinted: false,
      masterName: '',
    };
  }

  componentDidMount() {
    storage.has(storage_masterNameKey, (err, hasKey) => {
      if (hasKey) {
        storage.get(storage_masterNameKey, (err, data) => {
          this.setState({masterName: data.name});
        });
      }
    });
  }

  getUnprintedReferences(references) {
    return references.filter(ref => !ref.referencePrinted);
  }

  render() {
    const {allReferences, selectedReferences} = this.state;
    let referencesForPrint = this.getUnprintedReferences(allReferences);

    if (this.state.showUnprinted) {
      referencesForPrint = allReferences;
    }

    referencesForPrint = difference(referencesForPrint, selectedReferences);

    return <Container>
      <PageHeader text='Справки для печати'/>
      <PageWrapper>
        <SPageControls>
          <Button text='Сформировать справки' onClick={this.printReference}/>
          <Button text='Добавить все справки в печать'
                  onClick={this.addAllReferencesForPrint}/>
          <CheckboxWithLabel
              label='Показывать напечатанные справки'
              value={this.state.showUnprinted}
              onChange={() => this.setState(
                  {showUnprinted: !this.state.showUnprinted})}/>
        </SPageControls>
        <STablesWrapper>
          <SHalfTableWrapper>
            <STableHeaderText>Доступные справки для печати</STableHeaderText>
            {referencesForPrint.length ?
                <STable>
                  {this.renderHeader()}
                  {this.renderBody(referencesForPrint, tableTypes.all)}
                </STable> :
                <div style={{'textAlign': 'center'}}>Нет справок доступных для
                  печати</div>}
          </SHalfTableWrapper>
          <STablesControls/>
          <SHalfTableWrapper>
            <STableHeaderText>Справки на печать</STableHeaderText>
            {selectedReferences.length ?
                <STable>
                  {this.renderHeader()}
                  {this.renderBody(selectedReferences, tableTypes.selected)}
                </STable> :
                <div style={{'textAlign': 'center'}}>Нет справок на
                  печать</div>}
          </SHalfTableWrapper>
        </STablesWrapper>
      </PageWrapper>
    </Container>;
  }

  renderHeader() {
    const titles = ['Группа', 'Студент', 'Дисциплина'];

    return (
        <STableHeader>
          <STableRow>
            {titles.map(
                (title, index) => <STableCell key={index}>{title}</STableCell>)}
          </STableRow>
        </STableHeader>
    );
  }

  renderBody(references, type) {

    return (
        <STableBody>
          {references.map(
              (reference, index) => this.renderRow(reference, index, type))}
        </STableBody>
    );
  }

  addReferenceForPrint(reference) {
    this.setState({
      selectedReferences: this.state.selectedReferences.concat(reference),
    });
  }

  removeReferenceForPrint(reference) {
    const {selectedReferences} = this.state;
    let newReferencesArr = selectedReferences.map(item => item);
    const indexOfRef = newReferencesArr.findIndex(
        item => item.name === reference.name);
    newReferencesArr.splice(indexOfRef, 1);

    this.setState({
      selectedReferences: newReferencesArr,
    });
  }

  addAllReferencesForPrint = () => {
    const {showUnprinted} = this.state;
    if (showUnprinted) {
      this.setState({
        selectedReferences: this.state.allReferences,
      });
    } else {
      this.setState({
        selectedReferences: this.getUnprintedReferences(
            this.state.allReferences),
      });
    }
  };

  renderRow(reference, key, type) {
    let cellsKey = 0;

    const actionOnClick = type === tableTypes.all ?
        () => this.addReferenceForPrint(reference) :
        () => this.removeReferenceForPrint(reference);

    return (
        <STableRow onClick={actionOnClick} key={key}>
          <STableCell key={++cellsKey}>{reference.groupName}</STableCell>
          <STableCell key={++cellsKey}>{getNameWithInitials(
              reference.studentFullName)}</STableCell>
          <STableCell key={++cellsKey}>{reference.name}</STableCell>
        </STableRow>
    );
  }

  printReference = () => {
    const {selectedReferences} = this.state;
    const currentPath = process.cwd();

    console.log(selectedReferences);
    if (selectedReferences && selectedReferences.length) {
      this.props.startLoading();

      createReference(selectedReferences, this.state.masterName).then((buf) => {
        fs.writeFileSync(currentPath + '/output.docx', buf);

        selectedReferences.forEach(ref => {
          const portfolioId = getStudentId(ref.groupName, ref.studentFullName);
          portfDB.get(portfolioId).then(doc => {

            const newPortfolio = doc.portfolio;
            const indexOfDiscpiline = newPortfolio.findIndex(
                item => item.fullName ===
                    selectedReferences.disciplineName);
            newPortfolio[indexOfDiscpiline].referencePrinted = true;

            const newDoc = {
              ...doc,
              portfolio: newPortfolio,
            };

            portfDB.put(newDoc).then(() => {
              shell.openItem(currentPath + '/output.docx');
              this.props.endLoading();
            });

          });
        });

      });
    }
  };
}

const mapStateToProps = state => ({
  references: state.references.disciplines,
});

const mapDispatchToProps = dispatch => ({
  startLoading: () => dispatch(startLoading()),
  endLoading: () => dispatch(endLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReferencePage);
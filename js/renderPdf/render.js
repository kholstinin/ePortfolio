import React from 'react';
import ReactDOM from 'react-dom';
import PDF from 'react-pdf-js';
import {
  Container,
  PdfWrapper,
  BtnBlock,
  Control,
  ControlItem,
  ControlWrapper,
  Title,
  PageControl,
  PageNumber,
  MessageInput,
  ButtonsWrapper
} from './styles';

import Button from '../components/button/Button';

import {getInfoFromFileName} from '../common/nameSplit';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      pageNumber: 1,
      totalPages: null,
    };

    require('electron').ipcRenderer.on('mainChannel', (event, params) => {
      console.log(params);
      this.setState({
        loading: false,
        pathToPdf: params.path[0],
        widthOfPdf: params.widthOfPdf,
      });
    });
  }

  onDocumentComplete = (totalPages) => {
    this.setState({pageNumber: 1, totalPages});
  };

  onPageComplete = (page) => {
    this.setState({page});
  };

  handlePrevious = () => {
    if (this.state.pageNumber > 1) {
      this.setState({pageNumber: this.state.pageNumber - 1});
    }
  };

  handleNext = () => {
    if (this.state.pageNumber < this.state.totalPages) {
      this.setState({pageNumber: this.state.pageNumber + 1});
    }
  };

  render() {
    const {pageNumber, totalPages, pathToPdf, loading, widthOfPdf} = this.state;
    const splitPath = pathToPdf.split('\\');
    const fileName = splitPath[splitPath.length - 1];
    const fileInfo = getInfoFromFileName(fileName);

    return (
        <Container>
          <PdfWrapper width={widthOfPdf}>
            {!loading && <PDF
                file={pathToPdf}
                onDocumentComplete={this.onDocumentComplete}
                onPageComplete={this.onPageComplete}
                page={pageNumber}
                fillWidth
            />}
          </PdfWrapper>
          <Control>
            <Title>Данные о работе</Title>
            <ControlWrapper>
              <ControlItem>
                Работа: {fileInfo.workType} {fileInfo.workNumber}
              </ControlItem>
              <ControlItem>
                Дисциплина: {fileInfo.discipline}
              </ControlItem>
              <ControlItem>
                Группа: {fileInfo.group}
              </ControlItem>
              <ControlItem>
                Студент: {fileInfo.name}
              </ControlItem>
            </ControlWrapper>
            <PageControl>
              <BtnBlock onClick={this.handlePrevious}/>
              <PageNumber>{pageNumber}</PageNumber>
              <BtnBlock onClick={this.handleNext}/>
              <div style={{'margin-left': '5px'}}>{' из ' + totalPages}</div>
            </PageControl>
            <MessageInput/>
            <ButtonsWrapper>
              <Button text='Принять работу'/>
              <Button text='Отклонить работу'/>
            </ButtonsWrapper>
          </Control>
        </Container>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
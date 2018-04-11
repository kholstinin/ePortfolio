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
  ButtonsWrapper,
} from './styles';

const electron = require('electron');
const {BrowserWindow} = electron.remote;

import Button from '../components/button/Button';

import {getInfoFromFileName} from '../common/nameSplit';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      pageNumber: 1,
      totalPages: null,
      currentWorkNumber: 0,
      pathsToPdf: [],
    };

    require('electron').ipcRenderer.on('mainChannel', (event, params) => {
      console.log(params);
      this.setState({
        loading: false,
        widthOfPdf: params.widthOfPdf,
        pathsToPdf: params.paths,
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
    const {
      pageNumber,
      totalPages,
      loading,
      widthOfPdf,
      pathsToPdf,
      currentWorkNumber,
    } = this.state;

    if (loading) {
      return null;
    }

    console.log(pathsToPdf);
    const pathToPdf = pathsToPdf[currentWorkNumber];
    const splitPath = pathToPdf.split('\\');
    const fileName = splitPath[splitPath.length - 1];
    const fileInfo = getInfoFromFileName(fileName);

    return (
        <Container>
          <PdfWrapper width={widthOfPdf}>
            <PDF
                file={pathToPdf}
                onDocumentComplete={this.onDocumentComplete}
                onPageComplete={this.onPageComplete}
                page={pageNumber}
                fillWidth
            />
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
              <div style={{'marginLeft': '5px'}}>{' из ' + totalPages}</div>
            </PageControl>
            <MessageInput/>
            <ButtonsWrapper>
              <Button onClick={this.handleWorkPassClick} text='Принять работу'/>
              <Button onClick={this.handleWorkRejectClick}
                      text='Отклонить работу'/>
            </ButtonsWrapper>
          </Control>
        </Container>
    );
  }

  handleWorkPassClick = () => {
    //TODO add info in db
    this.renderNext();
  };

  handleWorkRejectClick = () => {
    //TODO add info in db
    this.renderNext();
  };

  renderNext() {
    const {currentWorkNumber, pathsToPdf} = this.state;
    const currentWork = pathsToPdf[currentWorkNumber];
    const currentWin = BrowserWindow.getFocusedWindow();

    if (pathsToPdf.length === 1 || currentWorkNumber > pathsToPdf.length) {
      currentWin.close();
    }

    this.setState(prevState => {
      return {...prevState, currentWorkNumber: ++prevState.currentWorkNumber};
    })
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
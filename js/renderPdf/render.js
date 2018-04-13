import React from 'react';
import ReactDOM from 'react-dom';
import PDF from 'react-pdf-js';

const electron = require('electron');
const {BrowserWindow} = electron.remote;

import Button from '../components/button/Button';
import {portfDB} from '../common/databases';

import StudentPortfolioUtil from '../common/portfolioDisciplineUtil';
import {getInfoFromFileName} from '../common/nameSplit';
import {getStudentId} from '../common/getId';

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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      pageNumber: 1,
      totalPages: null,
      currentWorkNumber: 0,
      errorMessage: '',
      pathsToPdf: [],
    };

    require('electron').ipcRenderer.on('mainChannel', (event, params) => {
      this.setState({
        loading: false,
        widthOfPdf: params.widthOfPdf,
        pathsToPdf: params.paths,
        studentsInfoArr: params.studentsInfoArr,
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
      errorMessage,
    } = this.state;

    if (loading) {
      return null;
    }

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
            <MessageInput value={errorMessage}
                          onChange={(e) => this.setState(
                              {errorMessage: e.target.value})}/>
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
    this.renderNext({status: true});
  };

  handleWorkRejectClick = () => {
    //TODO add info in db
    this.renderNext({status: false, error: this.state.errorMessage});
  };

  renderNext(workStatus) {
    this.setState({loading: true});

    const {currentWorkNumber, pathsToPdf} = this.state;
    const currentWorkPath = pathsToPdf[currentWorkNumber];
    const currentWin = BrowserWindow.getFocusedWindow();

    const splitPath = currentWorkPath.split('\\');
    const fileName = splitPath[splitPath.length - 1];
    const studentInfo = getInfoFromFileName(fileName);

    this.putWorkInPortfolio(studentInfo, workStatus).then((res) => {
      if (res.ok) {
        if (pathsToPdf.length === 1 || currentWorkNumber > pathsToPdf.length) {
          currentWin.close();
        }

        this.setState(prevState => {
          return {
            ...prevState,
            currentWorkNumber: ++prevState.currentWorkNumber,
            loading: false,
            errorMessage: '',
          };
        });
      }
    }).catch(err => {
      //todo
    });

  }

  putWorkInPortfolio(fileInfo, workStatus): Promise<{ ok: boolean }> {
    const {studentsInfoArr, currentWorkNumber} = this.state;
    const studentInfo = studentsInfoArr[currentWorkNumber];
    const {discipline, workType, workNumber} = fileInfo;

    const id = getStudentId(studentInfo.groupName, studentInfo.fullName);

    return portfDB.get(id).then((doc) => {
      const studentPortfolio = new StudentPortfolioUtil(doc);
      studentPortfolio.addWork(discipline, workType, workNumber,
          workStatus);
      portfDB.put(studentPortfolio.getPortfolio());
    }).catch(err => {
      console.log(err);
    });
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
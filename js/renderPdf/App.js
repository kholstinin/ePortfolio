import React from 'react';
import PDF from 'react-pdf-js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
const fs = require('fs');

const electron = require('electron');
const {BrowserWindow} = electron.remote;

import Button from '../components/button/Button';
import {portfDB} from '../common/databases';

import StudentPortfolioUtil from '../common/StudentPortfolioUtil';
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
  SErrorBlock,
} from './styles';
import {mainColor} from '../common/palette';
import {convertPluralWorkTypeToSingular} from '../common/utils';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      pageNumber: 1,
      totalPages: null,
      currentWorkNumber: 0,
      errorMessage: '',
      workFiles: [],
      err: '',
    };

    require('electron').ipcRenderer.on('mainChannel', (event, params) => {
      console.log(params);
      this.setState({
        loading: false,
        widthOfPdf: params.widthOfPdf,
        workFiles: params.workFiles,
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
      workFiles,
      currentWorkNumber,
      errorMessage,
    } = this.state;

    if (loading) {
      return null;
    }

    const workFile = workFiles[currentWorkNumber];
    const pathToPdf = workFile.path;
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
                Работа: {convertPluralWorkTypeToSingular(
                  fileInfo.workType)} {fileInfo.workNumber}
              </ControlItem>
              <ControlItem>
                Дисциплина: {workFile.disciplineFullName}
              </ControlItem>
              <ControlItem>
                Группа: {fileInfo.group}
              </ControlItem>
              <ControlItem>
                Студент: {fileInfo.name}
              </ControlItem>
            </ControlWrapper>
            <PageControl>
              <BtnBlock onClick={this.handlePrevious}>
                <FontAwesomeIcon
                    icon="angle-left"
                    transform={{size: 20, y: 1}}
                    color={mainColor}
                />
              </BtnBlock>
              <PageNumber>{pageNumber}</PageNumber>
              <BtnBlock onClick={this.handleNext}>
                <FontAwesomeIcon
                    icon="angle-right"
                    transform={{size: 20, y: 1}}
                    color={mainColor}
                />
              </BtnBlock>
              <div style={{'marginLeft': '5px'}}>{' из ' + totalPages}</div>
            </PageControl>
            <MessageInput value={errorMessage}
                          err={this.state.err}
                          onChange={(e) => this.setState(
                              {
                                errorMessage: e.target.value,
                                err: '',
                              })}/>
            <SErrorBlock>{this.state.err}</SErrorBlock>
            <ButtonsWrapper>
              <Button onClick={this.handleWorkPassClick} text='Принять работу'/>
              <Button color='danger' onClick={this.handleWorkRejectClick}
                      text='Отклонить работу'/>
            </ButtonsWrapper>
          </Control>
        </Container>
    );
  }

  handleWorkPassClick = () => {
    this.renderNext({status: true});
  };

  handleWorkRejectClick = () => {
    if (this.state.errorMessage !== '') {
      const workFile = this.state.workFiles[this.state.currentWorkNumber];
      const pathToPdf = workFile.path;
      const lastModified = fs.statSync(pathToPdf).mtime.toString();
      this.renderNext({status: false, error: this.state.errorMessage, lastModified});
    } else {
      this.setState({err: 'Необходимо указать причину отклонения работы'});
    }
  };

  renderNext(workStatus) {
    this.setState({loading: true});

    const {currentWorkNumber, workFiles} = this.state;
    const workFile = workFiles[currentWorkNumber];
    const currentWin = BrowserWindow.getFocusedWindow();

    const splitPath = workFile.path.split('\\');
    const fileName = splitPath[splitPath.length - 1];
    const studentInfo = getInfoFromFileName(fileName);

    this.putWorkInPortfolio(studentInfo, workStatus).then((res) => {
      if (res.ok) {

        if (workFiles.length === 1 || currentWorkNumber >= workFiles.length -
            1) {
          currentWin.close();
        }

        this.setState(prevState => {
          return {
            ...prevState,
            currentWorkNumber: ++prevState.currentWorkNumber,
            loading: false,
            errorMessage: '',
            err: '',
          };
        });
      }
    }).catch(err => {
      console.log(err);
    });

  }

  putWorkInPortfolio(fileInfo, workStatus): Promise<{ ok: boolean }> {
    const {studentsInfoArr, currentWorkNumber, workFiles} = this.state;

    const studentInfo = studentsInfoArr[currentWorkNumber];
    const disciplineFullName = workFiles[currentWorkNumber].disciplineFullName;

    const {discipline, workType} = fileInfo;
    let workNumber = fileInfo.workNumber;

    if (workNumber === '') {
      workNumber = 1;
    }

    const id = getStudentId(studentInfo.groupName, studentInfo.fullName);

    return portfDB.get(id).then((doc) => {
      const studentPortfolio = new StudentPortfolioUtil(doc);
      studentPortfolio.addWork(
          discipline,
          disciplineFullName,
          workType,
          workNumber,
          workStatus);

      return portfDB.put(studentPortfolio.getPortfolio());
    }).catch(err => {
      //todo
      console.log(err);
    });
  }
}

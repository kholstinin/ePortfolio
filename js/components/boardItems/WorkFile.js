import React from 'react';
import styled from 'styled-components';

const electron = require('electron');
const {BrowserWindow} = electron.remote;
const path = require('path');
const url = require('url');

import SBoardItem from './BoardItem';

const WorkFile = SBoardItem.extend`
  margin-bottom: 2px;
  color: ${props => props.verified ? '#000' : 'red'};
  padding-left: 60px;
`;

export default class WorkType extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    };
  }

  render() {
    const {workFile} = this.props;
    return <div>
      <WorkFile verified={workFile.verified} onClick={this.openWork}>
        {workFile.name}
      </WorkFile>
    </div>;
  }

  openWork = () => {
    const {height} = electron.screen.getPrimaryDisplay().workAreaSize;
    const heightOfWorkWindow = height;
    const widthOfControlPanel = 300;
    const windowPadding = 30;
    const widthOfPdf = Math.floor(height / 1.42);
    const widthOfWindow = widthOfPdf + widthOfControlPanel + windowPadding * 2;

    const win = new BrowserWindow({width: widthOfWindow, height: heightOfWorkWindow});
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'pdfView.html'),
      protocol: 'file:',
    }));
    let contents = win.webContents;

    contents.on('did-finish-load', () => {
      contents.send('mainChannel', {path: [this.props.workFile.path], widthOfPdf});
    });
  };
}
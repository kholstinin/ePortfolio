import type {TStudentFullName} from '../typings/StudentFullName';

const electron = require('electron');
const {BrowserWindow} = electron.remote;
const path = require('path');
const url = require('url');


import store from '../redux/store';
import {updatePortfolio} from '../redux/actions/actions';

export default function openWorks(
    workFiles: Array<{path: string, disciplineFullName: string}>,
    studentsInfoArr: Array<{ fullName: TStudentFullName, groupName: string }>): void {
  const {height} = electron.screen.getPrimaryDisplay().workAreaSize;
  const heightOfWorkWindow = height;
  const widthOfControlPanel = 300;
  const windowPadding = 30;
  const widthOfPdf = Math.floor(height / 1.5);
  const widthOfWindow = widthOfPdf + widthOfControlPanel + windowPadding * 2;

  const parentWin = BrowserWindow.getFocusedWindow();
  const win = new BrowserWindow(
      {
        parent: parentWin,
        modal: true,
        width: widthOfWindow,
        height: heightOfWorkWindow,
        title: 'Проверка работ',
      });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'pdfView.html'),
    protocol: 'file:',
  }));

  let contents = win.webContents;
  contents.on('did-finish-load', () => {
    contents.send('mainChannel',
        {
          workFiles, widthOfPdf, studentsInfoArr,
        });
  });
  contents.on('destroyed', () => {
    store.dispatch(updatePortfolio());
  });
}
import React from 'react';

const {shell} = require('electron');
const storage = require('electron-json-storage');
const {dialog} = require('electron').remote;

import Button from '../../components/button/Button';
import {Container, PageHeader, PageWrapper, SPageControls} from '../../components/page/Page';

import {storage_portfolioKey} from '../../common/global';

import {
  SRemoveBtn,
  SOpenBtn,
  SActionsWrapper,
  SPathsRow,
} from './styles';

import {
  STable,
  STableHeader,
  STableBody,
  STableRow,
  STableCell,
} from '../../components/table/TableStyles';

export default class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    storage.has(storage_portfolioKey, (err, hasKey) => {
      if (hasKey) {
        storage.get(storage_portfolioKey, (err, data) => {
          this.setPathsToState(data.paths);
        });
      }
    });
    this.state = {
      paths: [],
    };
  }

  render() {
    const {paths} = this.state;

    return (
        <Container>
          <PageHeader text='Настройки'/>
          <PageWrapper>
            <SPageControls>
              <Button onClick={this.showDialog}
                      text="Добавить корневой каталог портфолио"/>
            </SPageControls>
            <STable>
              {this.renderHeader()}
              {paths && paths.length ?
                  <STableBody>
                    {paths.map((path, index) =>
                        <SPathsRow key={index}>
                          <STableCell key={0}>{path}</STableCell>
                          {this.renderActions(path)}
                        </SPathsRow>)}
                  </STableBody> : null}
            </STable>
          </PageWrapper>
        </Container>
    );
  }

  renderHeader() {
    const titles = ['Путь до портфолио', 'Действия'];

    return (
        <STableHeader>
          <STableRow>
            {titles.map((title, index) =>
                <STableCell key={index}>{title}</STableCell>,
            )}
          </STableRow>
        </STableHeader>
    );
  }

  renderActions(path) {
    return (
        <STableCell key={1}>
          <SActionsWrapper>
            <SOpenBtn onClick={() => this.openDir(path)}>
              Посмотреть в проводнике
            </SOpenBtn>
            <SRemoveBtn onClick={() => this.removePath(path)}>
              Удалить путь
            </SRemoveBtn>
          </SActionsWrapper>
        </STableCell>
    );
  }

  showDialog = () => {
    dialog.showOpenDialog({
      title: 'Укажите корневой каталог портфолио',
      defaultPath: '/',
      properties: ['openDirectory'],
    }, (paths) => {
      this.addPaths(paths);
    });
  };

  addPaths = (paths: Array<string>) => {
    paths.forEach(path => {
      if (this.state.paths.findIndex(item => item === path) === -1) {
        const newState = [path].concat(this.state.paths);

        storage.set(storage_portfolioKey, {paths: newState}, (err) => {
          if (!err) {
            this.setState({paths: newState});
          } else {
            alert('oops, somehting goes wrong'); //TODO write normal err handler
          }
        });
      }
    });
  };

  openDir = (pathToDir: string) => {
    shell.openItem(pathToDir);
  };

  removePath = (path: string) => {
    const {paths} = this.state;
    const newState = paths.filter(item => item !== path);

    storage.set(storage_portfolioKey, {paths: newState}, (err) => {
      if (!err) {
        this.setState({paths: newState});
      } else {
        alert('oops, something goes wrong'); //TODO write normal err handler
      }
    });
  };

  setPathsToState = (paths: Array<string>): void => {
    this.setState({paths});
  };
}
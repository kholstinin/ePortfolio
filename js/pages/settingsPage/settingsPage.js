import React from 'react';
import {connect} from 'react-redux';

const {shell} = require('electron');
const storage = require('electron-json-storage');
const {dialog} = require('electron').remote;

import Button from '../../components/button/Button';
import {
  Container,
  PageHeader,
  PageWrapper,
  SPageControls,
} from '../../components/page/Page';

import {storage_portfolioKey, storage_masterNameKey} from '../../common/global';

import {
  SRemoveBtn,
  SOpenBtn,
  SActionsWrapper,
  SPathsRow,
  SSettingsHeader,
  SPathsTable,
  SChangeAction,
  SMasterText,
} from './styles';

import {
  STableHeader,
  STableBody,
  STableRow,
  STableCell,
} from '../../components/table/TableStyles';
import EditFieldTemplate
  from '../../components/modals/templates/editFieldTemplate';
import {
  hideModal,
  showModal,
} from '../../redux/actions/actions';

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paths: [],
      masterName: 'Не указано',
    };
  }

  componentDidMount() {
    storage.has(storage_portfolioKey, (err, hasKey) => {
      if (hasKey) {
        storage.get(storage_portfolioKey, (err, data) => {
          this.setPathsToState(data.paths);
        });
      }
    });
    storage.has(storage_masterNameKey, (err, hasKey) => {
      if (hasKey) {
        storage.get(storage_masterNameKey, (err, data) => {
          this.setMasterName(data.name);
        });
      }
    });
  }

  render() {
    const {paths} = this.state;

    return (
        <Container>
          <PageHeader text='Настройки'/>
          <PageWrapper>
            <SPageControls>
              <Button onClick={this.showDialog}
                      text="Изменить корневой каталог портфолио"/>
            </SPageControls>
            <SSettingsHeader>Корневые каталоги:</SSettingsHeader>
            <SPathsTable>
              {this.renderPathTableHeader()}
              {paths && paths.length ?
                  <STableBody>
                    {paths.map((path, index) =>
                        <SPathsRow key={index}>
                          <STableCell key={0}>{path}</STableCell>
                          {this.renderActions(path)}
                        </SPathsRow>)}
                  </STableBody> : null}
            </SPathsTable>
            <SSettingsHeader>Учебный мастер, использующий
              программу:</SSettingsHeader>
            <SMasterText>{this.state.masterName}</SMasterText>
            <SChangeAction>
              <span
                  onClick={this.showEditMasterNameModal}>
                Изменить
              </span>
            </SChangeAction>
          </PageWrapper>
        </Container>
    );
  }

  renderPathTableHeader() {
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
        const newState = [path];

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

  showEditMasterNameModal = () => {
    const info = {
      title: 'Изменить имя учебного мастера',
      content: <EditFieldTemplate
          onSubmit={(newValue) => this.editMasterName(newValue)}
          buttonText='Изменить имя'
          oldValueLabel='Предыдущее имя учебного мастера'
          oldValue={this.state.masterName}
          closeModal={this.props.hideModal}
      />,
    };

    this.props.openModal(info);
  };

  editMasterName = (newName: string) => {
    storage.set(storage_masterNameKey, {name: newName}, (err) => {
      if (!err) {
        this.setMasterName(newName);
      } else {
        alert('oops, somehting goes wrong'); //TODO write normal err handler
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

  setMasterName = (masterName: string): void => {
    this.setState({masterName});
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  openModal: (info) => dispatch(showModal(info)),
  hideModal: () => dispatch(hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
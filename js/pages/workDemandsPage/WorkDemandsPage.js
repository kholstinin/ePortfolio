import React from 'react';
import styled from 'styled-components';
import {PageWrapper, PageHeader, PageContent} from '../../components/page/Page';
import DisciplineModal
  from '../../components/modals/disciplineModal/DisciplineModal';
import Modal from '../../components/modal/Modal';

import DisciplineList from './disciplineList/DisciplineList';
import DisciplineInfo from './disciplineInfo/DisciplineInfo';

import {discDB} from '../../common/databases';

import {getDisciplineId} from '../../common/getId';
import {getDocs} from '../../common/utils';


import type {TDisciplineInfo} from '../../typings/Discipline';

const SPageContent = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  padding-top: 80px;
`;

const modalStyles = {
  content: {
    width: '700px',
    margin: '0 auto',
  },
};

export default class WorkDemandsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disciplineModalVisible: false,
      allDisciplines: [],
      selectedDisciplineName: '',
    };
  }

  componentDidMount() {
    this.fetchDisciplines();
  }

  render() {
    const {allDisciplines} = this.state;

    return (
        <PageWrapper>
          <Modal
              modalVisible={this.state.disciplineModalVisible}
              title='Добавить группу'
              onRequestClose={this.closeDisciplineModal}
              styles={modalStyles}
          >
            <DisciplineModal
                closeModal={this.closeDisciplineModal}
                onAddClick={this.addDiscipline}
            />
          </Modal>
          <PageHeader text='Рабочие программы'/>
          <PageContent noPadding>
            <SPageContent>
              <DisciplineList
                  disciplines={allDisciplines}
                  addDiscipline={this.openDisciplineModal}
                  setSelectedDiscipline={this.setSelectedDiscipline}
              />
              <DisciplineInfo
                  disciplineInfo={this.getSelectedDiscipline()}
                  removeDiscipline={this.removeDiscipline}
                  editDiscipline={this.editDiscipline}
              />
            </SPageContent>
          </PageContent>
        </PageWrapper>
    );
  }

  setSelectedDiscipline = (disciplineName: string) => {
    this.setState({selectedDisciplineName: disciplineName});
  };

  getSelectedDiscipline = () => {
    return this.state.allDisciplines.find(
        discipline => discipline.shortName === this.state.selectedDisciplineName);
  };

  fetchDisciplines() {
    discDB.allDocs({include_docs: true}).then(result => {
      const allDisciplines = getDocs(result.rows);
      console.log(allDisciplines);

      this.setState({
        allDisciplines,
        loading: false,
      });
    });
  }

  addDiscipline = (disciplineInfo: TDisciplineInfo) => {
    const id = getDisciplineId(disciplineInfo.shortName, disciplineInfo.type);
    const doc = {
      _id: id,
      ...disciplineInfo,
    };

    discDB.put(doc).then(res => {
      if (res.ok) {
        this.fetchDisciplines();
      }
    }).catch(err => {
      //TODO
    });
  };

  removeDiscipline = (type: string) => {
    const id = getDisciplineId(this.state.selectedDisciplineName, type);

    discDB.get(id).then((doc) => {
      return discDB.remove(doc);
    }).then(res => {
      if (res.ok) {
        this.fetchDisciplines();
      }
    });
  };

  editDiscipline = (oldDiscipline, newDiscipline) => {

  };

  openDisciplineModal = () => {
    this.setState({disciplineModalVisible: true});
  };

  closeDisciplineModal = () => {
    this.setState({disciplineModalVisible: false});
  };
}

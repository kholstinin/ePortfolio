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
    height: '430px',
    margin: '200px auto 0',
  },
};

export default class WorkDemandsPage extends React.Component {
  constructor(props) {
    console.log('init');
    super(props);

    this.state = {
      disciplineModalVisible: false,
      allDisciplines: [],
      disciplineInput: '',
      selectedDisciplineName: {
        fullName: '',
        shortName: '',
      },
    };
  }

  componentDidMount() {
    this.fetchDisciplines();
  }

  render() {
    const {allDisciplines, disciplineInput} = this.state;

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
                  disciplineInput={disciplineInput}
                  onInputChange={(disciplineInput) => this.setState(
                      {disciplineInput})}
                  selectedDisciplineName={this.state.selectedDisciplineName}
                  disciplines={this.filterDisciplines(allDisciplines)}
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

  filterDisciplines(allDisciplines) {
    const {disciplineInput} = this.state;

    const findDiscipline = (discipline, disciplineInput) => {
      const shortNameInclude = discipline.shortName.toLowerCase().
          includes(disciplineInput.toLowerCase());
      const fullNameInclude = discipline.fullName.toLowerCase().
          includes(disciplineInput.toLowerCase());
      return shortNameInclude || fullNameInclude;
    };

    if (disciplineInput !== '') {
      return allDisciplines.filter(
          discipline => findDiscipline(discipline, disciplineInput));
    }

    return allDisciplines;
  }

  setSelectedDiscipline = (fullName: string, shortName: string) => {
    this.setState({
      selectedDisciplineName: {
        fullName,
        shortName,
      },
    });
  };

  getSelectedDiscipline = () => {
    return this.state.allDisciplines.find(
        discipline => discipline.shortName ===
            this.state.selectedDisciplineName.shortName);
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
    const id = getDisciplineId(disciplineInfo.fullName, disciplineInfo.type);
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
    const id = getDisciplineId(this.state.selectedDisciplineName.fullName,
        type);

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

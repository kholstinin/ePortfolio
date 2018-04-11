import React from 'react';
import styled from 'styled-components';
import {PageWrapper, PageHeader, PageContent} from '../../components/page/Page';
import AddDisciplineModal
  from '../../components/modals/disciplineModal/AddDisciplineModal';
import Modal from '../../components/modal/Modal';

import DisciplineList from './disciplineList/DisciplineList';
import DisciplineInfo from './disciplineInfo/DisciplineInfo';

import {discDB, studDB} from '../../common/databases';

import {getDisciplineId} from '../../common/getId';
import {getDocs} from '../../common/utils';

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
      selectedDiscipline: ',',
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
            <AddDisciplineModal
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
              />
            </SPageContent>
          </PageContent>
        </PageWrapper>
    );
  }

  setSelectedDiscipline = (disciplineName: string) => {
    this.setState({selectedDiscipline: disciplineName});
  };

  getSelectedDiscipline = () => {
    return this.state.allDisciplines.find(
        discipline => discipline.shortName === this.state.selectedDiscipline);
  };

  addDiscipline = (disciplineInfo) => {
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

  openDisciplineModal = () => {
    this.setState({disciplineModalVisible: true});
  };

  closeDisciplineModal = () => {
    this.setState({disciplineModalVisible: false});
  };
}

import type {TDisciplineInfo} from '../../typings/Discipline';
import type {TDisciplinesPageProps, TDisciplinesPageState} from './typings';

import React from 'react';
import {connect} from 'react-redux';

import {
  Container,
  PageHeader,
  PageWrapper,
  SPageContent,
  SPageControls,
} from '../../components/page/Page';
import DisciplineModal
  from '../../components/modals/disciplineModal/DisciplineModal';
import ModalTemplate from '../../components/modalTemplate/ModalTemplate';

import DisciplineList from './disciplineList/DisciplineList';
import DisciplineInfo from './disciplineInfo/DisciplineInfo';
import Button from '../../components/button/Button';

import {discDB} from '../../common/databases';

import {getDisciplineId} from '../../common/getId';
import {getDocs} from '../../common/utils';

import {showWarningModal} from '../../redux/actions/actions';

class DisciplinesPage extends React.Component<TDisciplinesPageProps, TDisciplinesPageState> {
  constructor(props) {
    super(props);

    this.state = {
      disciplineModalVisible: false,
      allDisciplines: [],
      disciplineInput: '',
      selectedDisciplineName: {
        fullName: '',
        shortName: '',
      },
      disciplineInfo: {},
      modalOperation: '',
    };
  }

  componentDidMount() {
    this.fetchDisciplines();
  }

  render() {
    const {allDisciplines, disciplineInput, modalOperation} = this.state;

    return (
        <Container>
          <ModalTemplate
              modalVisible={this.state.disciplineModalVisible}
              title={modalOperation}
              onRequestClose={this.hideDisciplineModal}
          >
            <DisciplineModal
                closeModal={this.hideDisciplineModal}
                clickAction={this.getAction()}
                disciplineInfo={this.state.disciplineInfo}
                modalOperation={modalOperation}
            />
          </ModalTemplate>
          <PageHeader text='Рабочие программы'/>
          <PageWrapper noPadding>
            <SPageControls padding={30}>
              <Button text='Добавить дисциплину'
                      onClick={this.showDisciplineModal}
              />
            </SPageControls>
            <SPageContent>
              <DisciplineList
                  disciplineInput={disciplineInput}
                  onInputChange={(disciplineInput) => this.setState(
                      {disciplineInput})}
                  selectedDisciplineName={this.state.selectedDisciplineName}
                  disciplines={this.filterDisciplines(allDisciplines)}
                  setSelectedDiscipline={this.setSelectedDiscipline}
              />
              <DisciplineInfo
                  disciplineInfo={this.getSelectedDiscipline()}
                  removeDiscipline={this.removeDiscipline}
                  editDiscipline={this.showEditDisciplineModal}
              />
            </SPageContent>
          </PageWrapper>
        </Container>
    );
  }

  getAction() {
    const {modalOperation} = this.state;

    if (modalOperation === 'Добавить дисциплину') {
      return this.addDiscipline;
    } else if (modalOperation === 'Изменить дисциплину') {
      return this.editDiscipline;
    }
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

      this.setState({
        allDisciplines,
        loading: false,
      });
    });
  }

  editDiscipline = (disciplineInfo: TDisciplineInfo) => {
    const oldDiscipline = this.getSelectedDiscipline();
    const newDoc = {
      _id: oldDiscipline._id,
      _rev: oldDiscipline._rev,
      ...disciplineInfo,
    };

    discDB.put(newDoc).then(res => {
      if (res.ok) {
        this.fetchDisciplines();
      }
    }).catch(err => {
      //TODO
      console.log(err);
    });
  };

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
      console.log(err);
    });
  };

  removeDiscipline = (type: string) => {
    this.props.openWarningModal({
      confirmActionText: 'Удалить дисциплину',
      warningText: 'Вы уверены что хотите удалить дисциплину?',

      onConfirmClose: () => {
        const id = getDisciplineId(this.state.selectedDisciplineName.fullName,
            type);

        discDB.get(id).then((doc) => {
          return discDB.remove(doc);
        }).then(res => {
          if (res.ok) {
            this.fetchDisciplines();
          }
        });
      },
    });
  };

  showEditDisciplineModal = () => {
    this.setState({
      modalOperation: 'Изменить дисциплину',
      disciplineInfo: this.getSelectedDiscipline(),
      disciplineModalVisible: true,
    });
  };

  showDisciplineModal = () => {
    this.setState({
      modalOperation: 'Добавить дисциплину',
      disciplineModalVisible: true,
    });
  };

  hideDisciplineModal = () => {
    this.setState({disciplineModalVisible: false});
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  openWarningModal: (modalInfo) => dispatch(showWarningModal(modalInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisciplinesPage);
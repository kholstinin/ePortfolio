import type {TGroupInfo} from '../../typings/Group';
import type {TStudentFullName} from '../../typings/StudentFullName';

import React from 'react';
import {connect} from 'react-redux';

import ModalTemplate from '../../components/modalTemplate/ModalTemplate';
import StudentsModal from '../../components/modals/studentsModal/StudentsModal';
import WarningModal from '../../components/modals/warningModal/WarningModal';
import EditStudentTemplate
  from '../../components/modals/templates/editStudentTemplate';
import EditFieldTemplate
  from '../../components/modals/templates/editFieldTemplate';
import EditStudyTypeTemplate
  from '../../components/modals/templates/editStudyTypeTemplate';
import AddStudentTemplate
  from '../../components/modals/templates/addStudentTemplate';
import GroupList from './groupList/GroupList';
import GroupInfo from './groupInfo/GroupInfo';
import Button from '../../components/button/Button';
import {
  Container,
  PageHeader,
  PageWrapper,
  SPageContent,
  SPageControls,
} from '../../components/page/Page';

import {
  showModal,
  hideModal,
  showWarningModal,
} from '../../redux/actions/actions';

import {
  splitStudent,
  getDocs,
  compareStudents,
  printStudyType,
} from '../../common/utils';
import {portfDB, studDB} from '../../common/databases';
import {getGroupId, getStudentId} from '../../common/getId';
import {getStringFullName, getNameWithInitials} from '../../common/nameSplit';

class StudentsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      studentsByGroup: [],
      groupModalVisible: false,
      studentsModalVisible: false,
      warningModalVisible: false,
      loading: false,
      groupInput: '',
      selectedGroupName: '',
    };
  }

  componentDidMount() {
    this.fetchGroups();
  }

  render() {
    const {studentsByGroup, groupInput, selectedGroupName} = this.state;

    return (
        <Container>
          <WarningModal
              visible={this.state.warningModalVisible}
              onConfirmClick={this.removeGroup}
              warningText='Вы уверены что хотите удалить группу?'
              confirmActionText='Удалить группу'
          />
          <ModalTemplate
              modalVisible={this.state.groupModalVisible}
              title='Добавить группу'
              onRequestClose={this.closeGroupModal}
          >
            <StudentsModal
                closeModal={this.closeGroupModal}
                addGroup={this.addGroup}
            />
          </ModalTemplate>
          <PageHeader text='Список всех студентов'/>
          <PageWrapper noPadding>
            <SPageControls padding={30}>
              <Button text='Добавить группу'
                      onClick={this.openGroupModal}
              />
            </SPageControls>
            <SPageContent>
              <GroupList
                  studentsByGroup={this.filterGroupList(studentsByGroup)}
                  selectedGroupName={selectedGroupName}
                  onListItemClick={this.onListItemClick}
                  groupInput={groupInput}
                  onInputChange={(groupInput) => this.setState({groupInput})}
              />
              <GroupInfo
                  selectedGroupName={selectedGroupName}
                  group={this.getSelectedGroup()}
                  addStudent={this.showAddStudentModal}
                  editStudent={this.showEditStudentModal}
                  removeStudent={this.removeStudent}
                  removeGroup={this.removeGroup}
                  showEditModal={this.showEditModal}
              />
            </SPageContent>
          </PageWrapper>
        </Container>
    );
  }

  filterGroupList(studentsByGroup): void {
    const {groupInput} = this.state;

    if (groupInput !== '') {
      return studentsByGroup.filter(
          group => group.name.toLowerCase().includes(groupInput.toLowerCase()));
    }

    return studentsByGroup;
  }

  onListItemClick = (groupName: string): void => {
    this.setState({
      selectedGroupName: groupName,
    });
  };

  openGroupModal = (): void => {
    this.setState({groupModalVisible: true});
  };

  closeGroupModal = (): void => {
    this.setState({groupModalVisible: false});
  };

  getSelectedGroup = (): void => {
    const {studentsByGroup, selectedGroupName} = this.state;
    return studentsByGroup.find(group => group.name === selectedGroupName);
  };

  fetchGroups = (): void => {
    studDB.allDocs({include_docs: true}).then(result => {
      const studentsByGroup = getDocs(result.rows);

      this.setState({
        studentsByGroup,
        loading: false,
      });
    });
  };

  addGroup = (group: TGroupInfo): void => {
    const id = getGroupId(group.groupName);
    const doc = {
      _id: id,
      name: group.groupName,
      students: group.students,
      profile: group.profile,
      direction: group.direction,
      studyType: group.studyType,
    };

    studDB.put(doc).then(res => {
      console.log(res);
      if (res.ok) {
        this.fetchGroups();
      }
    }).catch(err => {
      //TODO
      console.log(err);
    });
  };

  removeGroup = (): void => {
    const id = getGroupId(this.state.selectedGroupName);

    this.props.openWarningModal({
      confirmActionText: 'Удалить группу',
      warningText: 'Вы уверены что хотите удалить группу?',
      onConfirmClose: () => {
        studDB.get(id).then((doc) => {
          return studDB.remove(doc);
        }).then(res => {
          if (res.ok) {
            this.fetchGroups();
          }
        });
      },
    });
  };

  showAddStudentModal = () => {
    const info = {
      title: 'Добавить студента',
      content: <AddStudentTemplate
          onSubmit={(newStudent) => this.addStudent(newStudent)}
          closeModal={this.props.hideModal}
      />,
    };

    this.props.openModal(info);
  };

  addStudent = (newStudent: TStudentFullName): void => {
    const id = getGroupId(this.state.selectedGroupName);

    studDB.get(id).then((doc) => {
      const oldStudents = doc.students;
      const newStudents = oldStudents.concat(newStudent);
      const newDoc = {...doc, students: newStudents};

      studDB.put(newDoc).then(res => {
        if (res.ok) {
          this.fetchGroups();
        }
      }).catch(err => {
        //TODO
        console.log(err);
      });
    });
  };

  removeStudent = (studentName: string): void => {
    const id = getGroupId(this.state.selectedGroupName);

    this.props.openWarningModal({
      confirmActionText: 'Удалить студента',
      warningText: 'Вы уверены что хотите удалить студента?',
      onConfirmClose: () => {
        studDB.get(id).then((doc) => {
          let newStudents = doc.students.map(item => item);
          const indexOfStudent = doc.students.findIndex(student => {
            return compareStudents(student, studentName);
          });

          newStudents.splice(indexOfStudent, 1);
          const newDoc = {...doc, students: newStudents};

          studDB.put(newDoc).then(res => {
            if (res.ok) {
              this.fetchGroups();
            }
          }).catch(err => {
            //TODO
            console.log(err);
          });
        });
      },
    });
  };

  showEditModal = (fieldName: string) => {
    const {hideModal} = this.props;
    let title = '';
    let content = null;
    const group = this.getSelectedGroup();

    if (fieldName === 'profile') {
      title = 'Изменить профиль';
      content = <EditFieldTemplate
          onSubmit={(newValue) => this.editField(fieldName, newValue)}
          buttonText={title}
          oldValueLabel='Старый профиль'
          oldValue={group.profile}
          closeModal={hideModal}
      />;
    } else if (fieldName === 'direction') {
      title = 'Изменить направление';
      content = <EditFieldTemplate
          onSubmit={(newValue) => this.editField(fieldName, newValue)}
          buttonText={title}
          oldValueLabel='Старое направление'
          oldValue={group.direction}
          closeModal={hideModal}
      />;
    } else if (fieldName === 'studyType') {
      title = 'Изменить тип';
      content = <EditStudyTypeTemplate
          onSubmit={(newValue) => this.editField(fieldName, newValue)}
          buttonText={title}
          oldValueLabel='Старый тип обучения'
          oldValue={group.studyType}
          closeModal={hideModal}
      />;
    }

    const info = {
      title,
      content,
    };

    this.props.openModal(info);
  };

  editField = (fieldName: string, newFieldValue: string): void => {
    const id = getGroupId(this.state.selectedGroupName);

    studDB.get(id).then((doc) => {
      const newDoc = {
        ...doc,
        [fieldName]: newFieldValue,
      };

      studDB.put(newDoc).then(res => {
        if (res.ok) {
          this.fetchGroups();
        }
      }).catch(err => {
        //TODO
        console.log(err);
      });
    });
  };

  editStudent = (oldName: string, newName: string) => {
    const groupName = this.state.selectedGroupName;
    const groupId = getGroupId(groupName);

    studDB.get(groupId).then(doc => {
      const splitOldName = getNameWithInitials(oldName);
      const splitNewName = getNameWithInitials(newName);
      let newStudents = doc.students.map(item => item);

      const indexOfStudent = doc.students.findIndex(student => {
        return compareStudents(student, splitOldName);
      });

      newStudents[indexOfStudent] = splitNewName;
      const newDoc = {...doc, students: newStudents};

      studDB.put(newDoc).then(res => {
        if (res.ok) {
          this.fetchGroups();
        }
      }).catch(err => {
        //TODO
        console.log(err);
      });
    });

    const portfolioId = getStudentId(groupName, oldName);
    portfDB.get(portfolioId).then(doc => {
      portfDB.remove(doc);

      const newStudentId = getStudentId(groupName, newName);
      const newStudentName = splitName(newName);
      const newDoc = {...doc, _id: newStudentId, name: newStudentName};
      delete newDoc['_rev'];

      portfDB.put(newDoc);
    });
  };

  showEditStudentModal = (studName: TStudentFullName): void => {
    const studentName = getStringFullName(studName);

    const info = {
      title: 'Изменить имя студента',
      content: <EditStudentTemplate
          inputValue={studentName}
          onSubmit={(newStudentName: string) => this.editStudent(studentName,
              newStudentName)}
          closeModal={this.props.hideModal}
      />,
    };

    this.props.openModal(info);
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  openWarningModal: (modalInfo) => dispatch(showWarningModal(modalInfo)),
  openModal: (info) => dispatch(showModal(info)),
  hideModal: () => dispatch(hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentsPage);
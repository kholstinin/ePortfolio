import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import Modal from '../../components/modal/Modal';
import StudentsModal from '../../components/modals/studentsModal/StudentsModal';
import WarningModal from '../../components/modals/warningModal/WarningModal';
import GroupList from './groupList/GroupList';
import GroupInfo from './groupInfo/GroupInfo';

import {PageWrapper, PageHeader, PageContent} from '../../components/page/Page';

import {splitStudent, getDocs, compareStudents} from '../../common/utils';
import {studDB} from '../../common/databases';
import {getGroupId} from '../../common/getId';

import type {TGroupInfo} from '../../typings/Group';
import {showWarningModal} from '../../reducers/actions';

const modalStyles = {
  content: {
    width: '700px',
    height: '750px',
    margin: '50px auto 0',
  },
};

const SPageContent = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  padding-top: 80px;
`;

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
        <PageWrapper>
          <WarningModal
              visible={this.state.warningModalVisible}
              onConfirmClick={this.removeGroup}
              warningText='Вы уверены что хотите удалить группу?'
              confirmActionText='Удалить группу'
          />
          <Modal
              modalVisible={this.state.groupModalVisible}
              title='Добавить группу'
              onRequestClose={this.closeGroupModal}
              styles={modalStyles}
          >
            <StudentsModal
                closeModal={this.closeGroupModal}
                addGroup={this.addGroup}
            />
          </Modal>
          <PageHeader text='Список всех студентов'/>
          <PageContent noPadding>
            <SPageContent>
              <GroupList
                  studentsByGroup={this.filterGroupList(studentsByGroup)}
                  selectedGroupName={selectedGroupName}
                  onListItemClick={this.onListItemClick}
                  groupInput={groupInput}
                  onInputChange={(groupInput) => this.setState({groupInput})}
                  addGroup={this.openGroupModal}
              />
              <GroupInfo
                  selectedGroupName={selectedGroupName}
                  group={this.getSelectedGroup()}
                  addStudent={this.addStudent}
                  editStudent={this.editStudent}
                  removeStudent={this.removeStudent}
                  removeGroup={this.removeGroup}
                  changeField={this.changeField}
              />
            </SPageContent>
          </PageContent>
        </PageWrapper>
    );
  }

  filterGroupList(studentsByGroup) {
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

  openGroupModal = () => {
    this.setState({groupModalVisible: true});
  };

  closeGroupModal = () => {
    this.setState({groupModalVisible: false});
  };

  getSelectedGroup = () => {
    const {studentsByGroup, selectedGroupName} = this.state;
    return studentsByGroup.find(group => group.name === selectedGroupName);
  };

  fetchGroups = () => {
    studDB.allDocs({include_docs: true}).then(result => {
      const studentsByGroup = getDocs(result.rows);

      this.setState({
        studentsByGroup,
        loading: false,
      });
    });
  };

  addGroup = (group: TGroupInfo) => {
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

  removeGroup = () => {
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

  addStudent = (newStudent: string) => {
    const id = getGroupId(this.state.selectedGroupName);

    studDB.get(id).then((doc) => {
      const oldStudents = doc.students;
      const newStudents = oldStudents.concat(splitStudent(newStudent));
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

  removeStudent = (studentName: string) => {
    const id = getGroupId(this.state.selectedGroupName);

    this.props.openWarningModal({
      confirmActionText: 'Удалить группу',
      warningText: 'Вы уверены что хотите удалить группу?',
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

  changeField = (fieldName: string, newFieldValue) => {
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

  editStudent = (oldName: string, newName: string, group) => {

  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  openWarningModal: (modalInfo) => dispatch(showWarningModal(modalInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentsPage);
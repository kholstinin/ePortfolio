import React from 'react';
import styled from 'styled-components';
import AddGroupModal from '../../components/modals/groupModal/AddGroupModal';
import Modal from '../../components/modal/Modal';
import GroupList from './groupList/GroupList';
import GroupInfo from './groupInfo/GroupInfo';

import {PageWrapper, PageHeader, PageContent} from '../../components/page/Page';

import {splitStudent, getDocs} from '../../common/utils';
import {studDB} from '../../common/databases';
import {getGroupId} from '../../common/getId';

const modalStyles = {
  content: {
    width: '700px',
    margin: '0 auto',
  },
};

const SPageContent = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  padding-top: 80px;
`;

export default class StudentsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      studentsByGroup: [],
      groupModalVisible: false,
      studentsModalVisible: false,
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
          <Modal
              modalVisible={this.state.groupModalVisible}
              title='Добавить группу'
              onRequestClose={this.closeGroupModal}
              styles={modalStyles}
          >
            <AddGroupModal
                closeModal={this.closeGroupModal}
                addGroup={this.addGroup}
            />
          </Modal>
          <PageHeader text='Список всех студентов'/>
          <PageContent noPadding>
            <SPageContent>
              <GroupList
                  studentsByGroup={studentsByGroup}
                  onListItemClick={this.onListItemClick}
                  groupInput={groupInput}
                  addGroup={this.openGroupModal}
              />
              <GroupInfo
                  selectedGroupName={selectedGroupName}
                  group={this.getSelectedGroup()}
                  addStudent={this.addStudent}
                  removeStudent={this.removeStudent}
                  editStudent={this.editStudent}
                  removeGroup={this.removeGroup}
              />
            </SPageContent>
          </PageContent>
        </PageWrapper>
    );
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

  removeGroup = (groupName) => {
    const id = getGroupId(groupName);

    studDB.get(id).then((doc) => {
      return studDB.remove(doc);
    }).then(res => {
      if (res.ok) {
        this.fetchGroups();
      }
    });
  };

  addGroup = (group) => {
    const id = getGroupId(group.groupName);
    const doc = {
      _id: id,
      name: group.groupName,
      students: group.students,
      profile: group.profile,
      direction: group.direction,
      type: group.type,
    };

    studDB.put(doc).then(res => {
      console.log(res);
      if (res.ok) {
        this.fetchGroups();
      }
    }).catch(err => {
      //TODO
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
      });
    });
  };

  removeStudent = (studentName: string) => {
    const id = getGroupId(this.state.selectedGroupName);

    studDB.get(id).then((doc) => {
      let newStudents = doc.students.map(item => item);
      const indexOfStudent = doc.students.findIndex(student => {
        //TODO add func to compare
        return student.name === studentName.name &&
            student.surname === studentName.surname &&
            student.patronymic === studentName.patronymic;
      });

      newStudents.splice(indexOfStudent, 1);
      console.log(newStudents);
      const newDoc = {...doc, students: newStudents};
      console.log(newDoc);

      studDB.put(newDoc).then(res => {
        console.log(res);
        if (res.ok) {
          this.fetchGroups();
        }
      }).catch(err => {
        //TODO
      });
    });
  };

  editStudent = (oldName: string, newName: string, group) => {

  };
};


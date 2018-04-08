import React from 'react';
import Button from '../../components/button/Button';
import GroupModal from '../../components/groupModal/GroupModal';
import Modal from 'react-modal';

import PageWrapper from '../../components/pageWrapper/PageWrapper';
import PageHeader from '../../components/pageHeader/PageHeader';

import cyrillicToTranslit from 'cyrillic-to-translit-js';
import {studDB} from '../../common/databases';

import {
  SFooter,
} from './styles';
import GroupList from './GroupList';

Modal.setAppElement('#content');

const modalStyles = {
  overlay: {
    left: '200px',
    right: '200px',
  },
};

type TGroupInfo = {
  groupName: string,
  students: Array<string>,
  faculty: string,
  direction: string,
}

export default class StudentsPage extends React.Component {
  constructor() {
    super();

    this.fetchGroups();

    this.state = {
      studentsByGroup: [],
      groupModalVisible: false,
      studentsModalVisible: false,
      loading: false,
    };
  }

  render() {
    const {studentsByGroup} = this.state;
    console.log(studentsByGroup);

    return <PageWrapper>
      <Modal
          isOpen={this.state.groupModalVisible}
          contentLabel='Добавить группу'
          onRequestClose={this.closeGroupModal}
          style={modalStyles}
      >
        <GroupModal
            closeModal={this.closeGroupModal}
            addGroup={this.addGroup}
        />
      </Modal>
      <PageHeader text='Список всех студентов'/>
      {studentsByGroup.length
          ? studentsByGroup.map(
              (group, index) => <GroupList group={group}
                                           removeGroup={this.removeGroup}
                                           key={index}/>) : null}
      <SFooter>
        <Button onClick={this.openGroupModal} text='Добавить группу'/>
      </SFooter>
    </PageWrapper>;
  }

  openGroupModal = () => {
    this.setState({groupModalVisible: true});
  };

  closeGroupModal = () => {
    this.setState({groupModalVisible: false});
  };

  mutateDocs = (arrOfDocs) => {
    return arrOfDocs.map(item => item.doc);
  };

  fetchGroups = () => {
    studDB.allDocs({include_docs: true}).then(result => {
      this.setState({
        studentsByGroup: this.mutateDocs(result.rows),
        loading: false,
      });
    });
  };

  removeGroup = (id) => {
    const _id = cyrillicToTranslit().transform(id);
    studDB.get(_id).then((doc) => {
      return studDB.remove(doc);
    }).then(res => {
      if (res.ok) {
        this.fetchGroups();
      }
    });
  };

  addGroup = (group: TGroupInfo) => {
    this.setState({loading: true});

    const id = cyrillicToTranslit().transform(group.groupName);
    const doc = {
      _id: id,
      name: group.groupName,
      students: group.students,
      faculty: group.faculty,
      direction: group.direction,
    };

    console.log(doc);

    studDB.put(doc).then(res => {
      if (res.ok) {
        this.fetchGroups();
      }
    }).catch(err => {
      console.log(err);
    });
  };
};


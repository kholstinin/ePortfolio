import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

const SModalHeader = styled.div`
  width: 100%;
  height: 30px;
  font-size: 20px;
`;

import ModalTemplate from '../../modalTemplate/ModalTemplate';

import {hideModal} from '../../../redux/actions/actions';

class EditModal extends React.Component {
  render() {
    const title = this.props.info && this.props.info.title || '';

    return (
        <ModalTemplate
            modalVisible={this.props.visible}
            title={title}
            onRequestClose={this.props.closeModal}
        >
          <SModalHeader>{title}</SModalHeader>
          {this.props.info && this.props.info.content}
        </ModalTemplate>
    );
  }
}

const mapStateToProps = state => ({
  info: state.modal.info,
  visible: state.modal.visible,
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditModal)
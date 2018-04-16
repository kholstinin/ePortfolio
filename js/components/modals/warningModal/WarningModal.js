import React from 'react';
import styled from 'styled-components';

import Button from '../../button/Button';
import Modal from '../../modal/Modal';

const modalStyle = {
  content: {
    width: '200px',
    height: '70px',
    margin: '0 auto',
  },
};

type TWarningModalProps = {
  visible: boolean,
  closeModal: () => {},
  warningText: string,
  confirmActionText: string,
}

export default class WarningModal extends React.Component<TWarningModalProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Modal
            modalVisible={this.props.visible}
            title='Предупреждение'
            modalStyle={modalStyle}
        >
          <div>
            {this.props.warningText}
            <Button color='danger' text={this.props.confirmActionText}
                    onClick={() => this.props.closeModal(true)}/>
            <Button color='primary' text='Отмена'
                    onClick={() => this.props.closeModal(false)}/>
          </div>
        </Modal>
    );
  }
}
import React from 'react';
import RModal from 'react-modal';

RModal.setAppElement('#content');

type TModalProps = {
  title: string,
  modalVisible: boolean,
  closeModal: (any) => any,
  modalStyle: {},
};

type TModalState = {

};

export default class Modal extends React.Component<TModalProps, TModalState> {
  render() {
    return (
        <RModal
            isOpen={this.props.modalVisible}
            contentLabel={this.props.title}
            onRequestClose={this.props.onRequestClose}
            style={this.props.styles}
        >
          {this.props.children}
        </RModal>
    );
  }
}
import React from 'react';
import styled from 'styled-components';
import RModal from 'react-modal';

RModal.setAppElement('#content');

type TModalProps = {
  title: string,
  modalVisible: boolean,
  closeModal?: (any) => any,
  modalStyle?: {},
};

type TModalState = {};

const SCloseIconWrapper = styled.div`
  width: 30px;
  height: 30px;
  background-color: #dedede;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;


export default class Modal extends React.Component<TModalProps, TModalState> {
  render() {
    return (
        <RModal
            isOpen={this.props.modalVisible}
            contentLabel={this.props.title}
            onRequestClose={this.props.onRequestClose}
            style={this.props.styles}
        >
          <div>
            <SCloseIconWrapper onClick={this.props.onRequestClose} />
            {this.props.children}
          </div>
        </RModal>
    );
  }
}
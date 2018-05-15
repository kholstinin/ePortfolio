import React from 'react';
import styled from 'styled-components';
import RModal from 'react-modal';
import {dangerColor} from '../../common/palette';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

RModal.setAppElement('#content');

type TModalProps = {
  title: string,
  modalVisible: boolean,
  closeModal?: (any) => any,
};

type TModalState = {};

const SCloseIconWrapper = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

const modalStyles = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    display: 'block',
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
};

export default class ModalTemplate extends React.Component<TModalProps, TModalState> {
  render() {
    return (
        <RModal
            isOpen={this.props.modalVisible}
            contentLabel={this.props.title}
            onRequestClose={this.props.onRequestClose}
            style={modalStyles}
        >
          <div>
            <SCloseIconWrapper onClick={this.props.onRequestClose}>
              <FontAwesomeIcon
                  icon="times"
                  transform={{size: 25, x: 7, y: 7}}
                  color={dangerColor}
              />
            </SCloseIconWrapper>
            {this.props.children}
          </div>
        </RModal>
    );
  }
}
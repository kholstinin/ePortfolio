import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import Button from '../../button/Button';
import Modal from '../../modal/Modal';
import {hideWarningModal} from '../../../reducers/actions';
import type {TWarningModalInfo} from '../../../reducers/warningModalReducer';

const modalStyle = {
  content: {
    top: '30%',
    margin: '0 auto',
    width: '400px',
    height: '170px',
  },
};

const SWarningModalTitle = styled.div`
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
`;

const SWarningModalText = styled.div`
  width: 100%;
  margin: 15px 0;
  font-size: 20px;
`;

const SButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  
  & > * {
    margin-right: 15px;
  }
`;

type TWarningModalProps = {
  warningModalInfo?: TWarningModalInfo,
  visible?: boolean,
}

class WarningModal extends React.Component<TWarningModalProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const {warningModalInfo, visible} = this.props;

    return (
        <Modal
            modalVisible={visible}
            title='Предупреждение'
            styles={modalStyle}
            onRequestClose={warningModalInfo.onClose}
        >
          <div>
            <SWarningModalTitle>Предупреждение</SWarningModalTitle>
            <SWarningModalText>{warningModalInfo.warningText}</SWarningModalText>
            <SButtonsWrapper>
              <Button color='danger' text={warningModalInfo.confirmActionText}
                      onClick={this.onConfirmClose}/>
              <Button color='primary' text='Отмена'
                      onClick={this.props.closeWarningModal}/>
            </SButtonsWrapper>
          </div>
        </Modal>
    );
  }

  onConfirmClose = () => {
    this.props.warningModalInfo.onConfirmClose();
    this.props.closeWarningModal();
  };
}

const mapStateToProps = state => ({
  warningModalInfo: state.warningModal.info,
  visible: state.warningModal.visible,
});

const mapDispatchToProps = dispatch => ({
  closeWarningModal: () => dispatch(hideWarningModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WarningModal)
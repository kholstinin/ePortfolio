import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import Button from '../../button/Button';
import ModalTemplate from '../../modalTemplate/ModalTemplate';
import {hideWarningModal} from '../../../redux/actions/actions';
import type {TWarningModalInfo} from '../../../redux/reducers/warningModalReducer';

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
        <ModalTemplate
            modalVisible={visible}
            title='Предупреждение'
            onRequestClose={this.props.closeWarningModal}
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
        </ModalTemplate>
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
import React from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader';

import WarningModal from '../../components/modals/warningModal/WarningModal';
import RouterPage from '../RouterPage';
import Menu from '../../components/menu/Menu';

import {
  Container,
  Row,
  SPage,
} from './styles';
import {
  updatePortfolio,
} from '../../reducers/actions';

type TWrapperProps = {
  loading: boolean,
  warningModalVisible: boolean,
  beginLoading: () => void,
  endLoading: () => void,
  updatePortfolio: () => void,
}

class Wrapper extends React.Component<TWrapperProps, {}> {
  componentDidMount() {
    this.props.updatePortfolio();
  }

  render() {
    const {warningModalInfo} = this.props;

    return (
        <Container>
          <WarningModal
            confirmActionText={warningModalInfo.confirmActionText}
            closeModal={() => {}}
            visible={this.props.warningModalVisible}
            warningText={warningModalInfo.warningText}
          />
          <Loader loaded={!this.props.loading}
                  color='#5c6bc0'
                  length={0}
                  scale={1.3} />
            <Row>
              <SPage>
                <RouterPage/>
              </SPage>
              <Menu />
            </Row>
        </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading.status,
  warningModalVisible: state.warningModal.visible,
  warningModalInfo: state.warningModal.info,
});

const mapDispatchToProps = dispatch => ({
  updatePortfolio: () => dispatch(updatePortfolio()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
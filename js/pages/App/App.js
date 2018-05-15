import React from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader';

import WarningModal from '../../components/modals/warningModal/WarningModal';
import EditModal from '../../components/modals/editModal/EditModal';
import RouterPage from '../RouterPage';
import Menu from '../../components/menu/Menu';

import {
  Container,
  Row,
  SPage,
} from './styles';
import {
  fullUpdatePortfolio,
} from '../../redux/actions/actions';

type TWrapperProps = {
  loading: boolean,

  warningModalVisible: boolean,
  onConfirmClose: () => void,

  beginLoading: () => void,
  endLoading: () => void,
  updatePortfolio: () => void,
}

class Wrapper extends React.Component<TWrapperProps, {}> {
  componentDidMount() {
    this.props.fullUpdatePortfolio();
  }

  render() {

    return (
        <Container>
          <WarningModal />
          <EditModal />
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
});

const mapDispatchToProps = dispatch => ({
  fullUpdatePortfolio: () => dispatch(fullUpdatePortfolio()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
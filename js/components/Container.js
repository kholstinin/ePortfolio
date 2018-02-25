import React from 'react';
import {Header, Container, Column, Row} from 'reactackle';
import MainBoard from './MainBoard';

export default class Wrapper extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <Container>
          <Header>
            <div style={{height: 100}}/>
          </Header>
          <Column centered={{large: true}}>
            <MainBoard/>
          </Column>
        </Container>
    );
  }
}
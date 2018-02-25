import React from 'react';
import {App} from 'reactackle';
import Wrapper from './Container';

type AppProps = {};
type AppState = {};

export default class Entry extends React.Component<AppProps, AppState> {
  constructor() {
    super();
  }

  render() {
    return (<App>
      <Wrapper/>
    </App>);
  }

}
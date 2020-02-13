import React, {Component} from 'react';
import WebView from 'react-native-webview';
export default class About extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'http://compomus.funtechshow.com/'}}
        style={{marginTop: 0}}
      />
    );
  }
}

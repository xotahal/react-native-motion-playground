import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Toolbar } from './src/components';
import List from './src/screens/List';
import Detail from './src/screens/Detail';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
      position: null,
    };
  }
  onShowDetailRequested = (item, position) => {
    this.setState({
      item,
      position,
    });
  };
  onBackPressed = () => {
    this.setState({
      item: null,
      position: null,
    });
  };
  render() {
    const { item, position } = this.state;

    let detailView = null;

    if (item) {
      detailView = <Detail item={item} startPosition={position} />;
    }
    return (
      <View style={styles.container}>
        {detailView}
        <Toolbar isDetail={!!item} onBackPress={this.onBackPressed} />
        <List
          selected={item && item.name}
          onShowDetailRequest={this.onShowDetailRequested}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

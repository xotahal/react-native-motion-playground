import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Toolbar, ToolbarBackground } from './src/components';
import List from './src/screens/List';
import Detail from './src/screens/Detail';
import Transform from './src/animations/Transform';

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

    let transformView = null;
    let page = null;

    if (item) {
      // transformView = <Transform item={item} startPosition={position} />;
      page = <Detail item={item} />;
    } else {
      page = (
        <List
          selected={item && item.name}
          onShowDetailRequest={this.onShowDetailRequested}
        />
      );
    }

    return (
      <View style={styles.container}>
        {transformView}
        <ToolbarBackground isDetail={!!item} />
        <Toolbar isDetail={!!item} onBackPress={this.onBackPressed} />
        {page}
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

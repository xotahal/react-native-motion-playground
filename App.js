import React from 'react';
import { InteractionManager, StyleSheet, Text, View } from 'react-native';

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
      detailItem: null,
    });
  };
  onTransformEnded = () => {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        item: null,
        detailItem: this.state.item,
      });
    });
  };
  render() {
    const { item, position, detailItem } = this.state;

    let transformView = null;
    let page = null;

    if (item || detailItem) {
      transformView = (
        <Transform
          item={item || detailItem}
          startPosition={position}
          onTransformEnd={this.onTransformEnded}
        />
      );
    }

    if (detailItem) {
      page = <Detail item={detailItem} />;
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
        <ToolbarBackground isDetail={!!detailItem} />
        <Toolbar isDetail={!!detailItem} onBackPress={this.onBackPressed} />
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

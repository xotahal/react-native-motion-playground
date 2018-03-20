import React from 'react';
import { InteractionManager, StyleSheet, Text, View } from 'react-native';

import SharedElementRenderer from './src/animations/SharedElementRenderer';
import List from './src/screens/List/List';
import Detail from './src/screens/Detail/Detail';
import ToolbarBackground from './src/screens/Detail/ToolbarBackground';
import Transform from './src/animations/Transform';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: null,
      position: null,
      // phase of animation
      // phase-0:
      // default
      //
      // phase-1:
      // hide list toolbar, hide list bottom bar, show toolbar background and move item
      //
      // phase-2:
      // show detail toolbar, show detail bottom bar, show details of item
      //
      // phase-3
      // hide details of item
      //
      // phase-4
      // hide detail toolbar, hide detail bootom bar, move item back to scrool view
      phase: 'phase-0',
    };
  }
  onItemPressed = (item, position) => {
    this.setState({
      phase: 'phase-1',
      selectedItem: item,
      position,
    });
  };
  onBackPressed = () => {
    this.setState({
      phase: 'phase-3',
      selectedItem: null,
    });
  };
  onGoDetailAnimationEnded = () => {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        phase: 'phase-2',
      });
    });
  };
  onMoveBackAnimationEnded = () => {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        selectedItem: null,
        position: null,
        phase: 'phase-0',
      });
    });
  };
  renderPage() {
    const { selectedItem, position, detailItem, phase } = this.state;

    let detailPage = null;

    if (selectedItem) {
      return (
        <Detail
          phase={phase}
          selectedItem={selectedItem}
          onBackPress={this.onBackPressed}
          onDetailAnimationEnd={this.onDetailAnimationEnded}
        />
      );
    }

    return (
      <List
        selectedItem={selectedItem}
        onItemPress={this.onItemPressed}
        phase={phase}
      />
    );
  }
  render() {
    const {
      selectedItem,
      goToDetail,
      position,
      detailItem,
      goBackRequested,
      phase,
    } = this.state;

    return (
      <SharedElementRenderer>
        <View style={styles.container}>
          <ToolbarBackground
            isHidden={phase !== 'phase-1' && phase !== 'phase-2'}
          />
          {this.renderPage()}
        </View>
      </SharedElementRenderer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

class ToolbarBackground extends PureComponent {
  render() {
    const { isDetail } = this.props;

    if (!isDetail) {
      return null;
    }

    return <View style={styles.toolbarBackground} />;
  }
}

const styles = StyleSheet.create({
  toolbarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: '#008dff',
  },
});

export default ToolbarBackground;

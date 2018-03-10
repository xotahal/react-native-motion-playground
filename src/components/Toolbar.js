import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

class Toolbar extends PureComponent {
  renderDetail() {
    const { onBackPress } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <TouchableWithoutFeedback onPress={onBackPress}>
          <View style={styles.toolbarContainer}>
            <Text style={styles.titleText}>Back</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
  render() {
    const { isDetail } = this.props;

    if (isDetail) {
      return this.renderDetail();
    }

    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <View style={styles.toolbarContainer}>
          <Text style={styles.titleText}>My Checks</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  toolbarContainer: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  statusBar: {
    height: 24,
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 24,
    fontWeight: '900',
  },
});

export default Toolbar;

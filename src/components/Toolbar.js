import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';

import Row from './Row';

class Toolbar extends PureComponent {
  renderDetail() {
    const { onBackPress } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <TouchableWithoutFeedback onPress={onBackPress}>
          <View>
            <Row style={styles.toolbarContainer}>
              <Row style={styles.backContainer}>
                <Ionicons name="ios-arrow-back" size={24} color="white" />
                <Text style={styles.titleBackText}>Back</Text>
              </Row>
              <View style={styles.menuIconContainer}>
                <Feather name="share" size={24} color="white" />
              </View>
            </Row>
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
        <Row style={styles.toolbarContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>My Checks</Text>
          </View>
          <View style={styles.menuIconContainer}>
            <Ionicons name="md-menu" size={24} color="#008dff" />
          </View>
          <View style={styles.menuIconContainer}>
            <MaterialCommunityIcons
              name="file-document"
              size={24}
              color="#008dff"
            />
          </View>
        </Row>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  toolbarContainer: {
    height: 56,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  titleContainer: {
    flex: 1,
  },
  toolbarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: '#008dff',
  },
  statusBar: {
    height: 24,
    backgroundColor: 'white',
  },
  titleBackText: {
    color: 'white',
    marginLeft: 8,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '900',
  },
  backContainer: {
    flex: 1,
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Toolbar;

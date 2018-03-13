import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Entypo,
  Ionicons,
} from '@expo/vector-icons';

import Row from './Row';
import { getPlatformElevation } from '../utils';

class BottomButtons extends PureComponent {
  render() {
    return (
      <Row style={styles.container}>
        <View style={styles.flexContainer}>
          <View style={[styles.iconContainer, { backgroundColor: '#008dff' }]}>
            <SimpleLineIcons name="present" size={24} color="white" />
          </View>
        </View>
        <View style={styles.flexContainer}>
          <View style={[styles.iconContainer, { backgroundColor: '#ff2d4c' }]}>
            <Entypo name="wallet" size={24} color="white" />
          </View>
        </View>
      </Row>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 112,
    marginHorizontal: 16,
  },
  flexContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomButtons;

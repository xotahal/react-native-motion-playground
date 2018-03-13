import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Entypo,
  Ionicons,
} from '@expo/vector-icons';

import Button from './Button';
import { Row } from '../../components';
import { getPlatformElevation } from '../../utils';

class BottomButtons extends PureComponent {
  render() {
    return (
      <Row style={styles.container}>
        <View style={styles.flexContainer}>
          <Button name="present" backgroundColor="#008dff" />
        </View>
        <View style={styles.flexContainer}>
          <Button name="wallet" backgroundColor="#ff2d4c" delay={125} />
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
});

export default BottomButtons;

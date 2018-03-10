import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Row from '../Row';
import { Avatar } from '../../uikit';

class Header extends PureComponent {
  render() {
    const { name } = this.props;

    return (
      <Row style={styles.container}>
        <Avatar text={name.substring(0, 1)} />
        <View style={styles.nameContainer}>
          <Text>{name}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text>Icon</Text>
        </View>
      </Row>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    alignItems: 'center',
  },
  nameContainer: {
    flex: 1,
    marginLeft: 16,
  },
  rightContainer: {
    width: 48,
    height: 48,
  },
});

export default Header;

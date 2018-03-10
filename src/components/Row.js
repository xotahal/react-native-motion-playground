import React, { PureComponent } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';

class Row extends PureComponent {
  render() {
    const { style, children } = this.props;

    return <View style={[styles.container, style]}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default Row;

import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class Avatar extends PureComponent {
  render() {
    const { text } = this.props;
    return (
      <View style={styles.container}>
        <Text>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Avatar;

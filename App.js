import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import List from './src/screens/List';
import Toolbar from './src/components/Toolbar';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Toolbar />
        <List />
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

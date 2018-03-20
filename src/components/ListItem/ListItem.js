import React, { PureComponent } from 'react';
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { ScaleAndOpacity } from 'react-native-motion';

import Header from './Header';
import Content from './Content';
import { getPlatformElevation } from '../../utils';

class ListItem extends PureComponent {
  onPressed = event => {
    const { onPress, item } = this.props;
    onPress(item, event.nativeEvent);
  };
  render() {
    const { item, isSelected, style, isHidden } = this.props;
    const { name, isReceived, ...rest } = item;

    return (
      // <ScaleAndOpacity isHidden={isHidden} duration={250}>
      <TouchableWithoutFeedback onPress={this.onPressed}>
        <View style={[styles.container, style]} pointerEvents="box-only">
          <Header name={name} isReceived={isReceived} />
          <Content {...rest} />
        </View>
      </TouchableWithoutFeedback>
      // </ScaleAndOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    ...getPlatformElevation(2),
  },
});

export default ListItem;

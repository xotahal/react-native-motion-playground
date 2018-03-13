import React, { PureComponent } from 'react';
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import Header from './Header';
import Content from './Content';
import scaleAndOpacity from '../../animations/scaleAndOpacity';
import { getPlatformElevation } from '../../utils';

class ListItem extends PureComponent {
  onPressed = event => {
    const { onPress, item } = this.props;
    onPress(item, event.nativeEvent);
  };
  render() {
    const { item, isSelected } = this.props;
    const { name, isReceived, ...rest } = item;

    return (
      <TouchableWithoutFeedback onPress={this.onPressed}>
        <View
          style={[styles.container, { opacity: isSelected ? 0 : 1 }]}
          pointerEvents="box-only"
        >
          <Header name={name} isReceived={isReceived} />
          <Content {...rest} />
        </View>
      </TouchableWithoutFeedback>
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

export default scaleAndOpacity(ListItem);

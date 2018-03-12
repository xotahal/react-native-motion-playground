import React, { PureComponent } from 'react';
import { Animated, Text, View, FlatList, StyleSheet } from 'react-native';

import { ListItem, Toolbar } from '../components';
import data from '../data/data';

class Detail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      topValue: new Animated.Value(props.startPosition.pageY),
    };
  }
  componentDidMount() {
    this.moveItemToTop();
  }
  moveItemToTop = () => {
    Animated.timing(this.state.topValue, { toValue: 150 }).start();
  };
  onBackPressed = () => {
    this.setState({ selected: null });
  };
  render() {
    const { topValue } = this.state;
    const { item, startPosition } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.positionContainer,
            {
              top: topValue,
              width: startPosition.width,
            },
          ]}
        >
          <ListItem item={item} onPress={() => {}} />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  positionContainer: {
    position: 'absolute',
  },
});

export default Detail;

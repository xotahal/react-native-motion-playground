import React, { PureComponent } from 'react';
import {
  Easing,
  Animated,
  Text,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';

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
  componentWillReceiveProps(nextProps) {
    if (this.props.phase !== 'phase-3' && nextProps.phase === 'phase-3') {
      this.moveItemBack();
    }
  }
  moveItemToTop = () => {
    const { onMoveDetailAnimationEnd } = this.props;

    Animated.timing(this.state.topValue, {
      easing: Easing.in(Easing.back()),
      toValue: 80,
      duration: 500,
    }).start(onMoveDetailAnimationEnd);
  };
  moveItemBack = () => {
    const { onMoveBackAnimationEnd, startPosition } = this.props;

    Animated.timing(this.state.topValue, {
      easing: Easing.out(Easing.back()),
      toValue: startPosition.pageY,
      duration: 500,
      delay: 250,
    }).start(onMoveBackAnimationEnd);
  };
  onBackPressed = () => {
    this.setState({ selected: null });
  };
  render() {
    const { topValue } = this.state;
    const { selectedItem, startPosition } = this.props;

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
          <ListItem item={selectedItem} onPress={() => {}} />
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

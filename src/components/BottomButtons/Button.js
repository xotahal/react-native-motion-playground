import React from 'react';
import { Animated, View, StyleSheet, InteractionManager } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

class Button extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      translateY: new Animated.Value(112),
    };
  }
  componentDidMount() {
    const { delay } = this.props;

    InteractionManager.runAfterInteractions().then(() => {
      Animated.timing(this.state.translateY, { toValue: 0, delay }).start();
    });
  }
  componentWillUnmount() {
    Animated.timing(this.state.translateY, { toValue: 112 }).start();
  }
  render() {
    const { backgroundColor, name } = this.props;
    const { translateY } = this.state;

    const animationStyle = {
      transform: [{ translateY }],
    };

    return (
      <Animated.View
        style={[styles.iconContainer, { backgroundColor }, animationStyle]}
      >
        <SimpleLineIcons name={name} size={24} color="white" />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Button;

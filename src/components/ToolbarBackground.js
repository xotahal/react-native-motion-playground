import React, { PureComponent } from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

class ToolbarBackground extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      translateY: new Animated.Value(-150),
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.isDetail && nextProps.isDetail) {
      this.showAnimation();
    }
    if (this.props.isDetail && !nextProps.isDetail) {
      this.hideAnimation();
    }
  }
  hideAnimation() {
    Animated.timing(this.state.translateY, {
      toValue: -150,
      useNativeDriver: true,
    }).start();
  }
  showAnimation() {
    Animated.timing(this.state.translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }
  render() {
    const { translateY } = this.state;
    const { isDetail } = this.props;

    const animationStyle = {
      transform: [{ translateY }],
    };

    return <Animated.View style={[styles.toolbarBackground, animationStyle]} />;
  }
}

const styles = StyleSheet.create({
  toolbarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: '#008dff',
  },
});

export default ToolbarBackground;

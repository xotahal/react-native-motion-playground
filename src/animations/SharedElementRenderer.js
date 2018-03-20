import React, { PureComponent } from 'react';
import {
  Easing,
  Animated,
  Text,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const childContextTypes = {
  moveSharedElement: PropTypes.func.isRequired,
};

class SharedElementRenderer extends PureComponent {
  getChildContext() {
    return {
      moveSharedElement: this.moveSharedElement,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      config: null,
    };
  }
  onMoveCompleted = () => {
    const { config } = this.state;
    const { onMoveComplete } = config || {};

    if (onMoveComplete) {
      onMoveComplete();
    }

    this.setState({ config: null });
  };
  // This method will compute animations. Position and scale.
  getAnimations = config => {
    const { sourcePosition, destinationPosition, ...rest } = config;

    const animations = [];

    if (sourcePosition.pageY !== destinationPosition.pageY) {
      this.setState({ topValue: new Animated.Value(sourcePosition.pageY) });

      animations.push(
        Animated.timing(this.state.topValue, {
          toValue: destinationPosition.pageY + 100,
          ...rest,
        })
      );
    }
    if (sourcePosition.pageX !== destinationPosition.pageX) {
      this.setState({ leftValue: new Animated.Value(sourcePosition.pageX) });

      animations.push(
        Animated.timing(this.state.leftValue, {
          toValue: destinationPosition.pageX,
          ...rest,
        })
      );
    }
    if (sourcePosition.width !== destinationPosition.width) {
      this.setState({ scaleValue: new Animated.Value(1) });

      animations.push(
        Animated.timing(this.state.scaleValue, {
          toValue: sourcePosition.width / destinationPosition.width,
          ...rest,
        })
      );
    }

    return animations;
  };
  moveSharedElement = config => {
    const {
      sourcePosition,
      destinationPosition,
      onMoveComplete,
      ...rest
    } = config;

    const animations = this.getAnimations(config);

    this.setState({
      config,
    });

    setTimeout(() => {
      Animated.parallel(animations).start(this.onMoveCompleted);
    }, 0);
  };
  renderSharedElement() {
    const { config, topValue, leftValue, scaleValue } = this.state;
    const { sourcePosition, node } = config || {};
    const { height, width } = sourcePosition || {};

    if (!config) {
      return null;
    }

    const animatedStyle = {
      height,
      width,
    };

    if (topValue) {
      animatedStyle.top = topValue;
    }
    if (leftValue) {
      animated.left = leftValue;
    }
    if (scaleValue) {
      animated.transform = [{ scale: scaleValue }];
    }

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.positionContainer, animatedStyle]}>
          {node}
        </Animated.View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.flexContainer}>
        {this.props.children}
        {this.renderSharedElement()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  positionContainer: {
    position: 'absolute',
  },
});

SharedElementRenderer.childContextTypes = childContextTypes;

export default SharedElementRenderer;

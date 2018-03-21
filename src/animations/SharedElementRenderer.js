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

    this.isRunning = {};
    this.state = {
      config: null,
    };
  }
  onMoveWillStart = () => {
    const { config } = this.state;
    const { onMoveWillStart, element } = config;
    const { id } = element;

    this.isRunning[id] = true;

    if (onMoveWillStart) {
      onMoveWillStart(config);
    }
  };
  onMoveDidComplete = () => {
    const { config } = this.state;
    const { onMoveDidComplete, element } = config;
    const { id } = element;

    this.isRunning[id] = false;

    if (onMoveDidComplete) {
      onMoveDidComplete(config);
    }

    this.reset();
  };
  reset = () => {
    this.setState({ config: null });
  };
  // This method will compute animations. Position and scale.
  getAnimations = config => {
    const { element, animationConfig } = config;
    const { source, destination } = element;

    const animations = [];

    if (source.position.pageY !== destination.position.pageY) {
      const translateYValue = new Animated.Value(source.position.pageY);
      this.setState({ translateYValue });

      animations.push(
        Animated.timing(translateYValue, {
          toValue: destination.position.pageY,
          useNativeDriver: true,
          ...animationConfig,
        })
      );
    }
    // if (sourcePosition.pageX !== destinationPosition.pageX) {
    //   this.setState({
    //     translateXValue: new Animated.Value(sourcePosition.pageX),
    //   });
    //
    //   animations.push(
    //     Animated.timing(this.state.translateXValue, {
    //       toValue: destinationPosition.pageX,
    //       useNativeDriver: true,
    //       ...rest,
    //     })
    //   );
    // }
    // if (sourcePosition.width !== destinationPosition.width) {
    //   this.setState({ scaleValue: new Animated.Value(1) });
    //
    //   animations.push(
    //     Animated.timing(this.state.scaleValue, {
    //       toValue: sourcePosition.width / destinationPosition.width,
    //       useNativeDriver: true,
    //       ...rest,
    //     })
    //   );
    // }

    return animations;
  };
  moveSharedElement = config => {
    const { id } = config.element;
    // animation was already started
    if (this.isRunning[id]) {
      return;
    }

    const animations = this.getAnimations(config);

    this.setState({
      config,
    });

    setTimeout(() => {
      this.onMoveWillStart();
      Animated.parallel(animations).start(this.onMoveDidComplete);
    }, 0);
  };
  renderSharedElement() {
    const { config, translateYValue, translateXValue, scaleValue } = this.state;
    const { element } = config || {};
    const { source, node } = element || {};
    const { position } = source || {};
    const { height, width } = position || {};

    if (!config) {
      return null;
    }

    const transform = [];

    if (translateYValue) {
      transform.push({ translateY: translateYValue });
    }
    // if (translateXValue) {
    //   transform.push({ translateX: translateXValue });
    // }
    // if (scaleValue) {
    //   transform.push({ scale: scaleValue });
    // }

    const animatedStyle = {
      height,
      width,
      transform,
    };

    return (
      <View style={styles.container} pointerEvents="none">
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

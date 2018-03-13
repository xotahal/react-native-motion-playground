import React, { PureComponent } from 'react';
import { Animated } from 'react-native';

const scaleAndOpacity = Wrapped => {
  return class ScaleAndOpacity extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        opacityValue: new Animated.Value(1),
        scaleValue: new Animated.Value(1),
      };
    }
    componentWillReceiveProps(nextProps) {
      if (!this.props.isHidden && nextProps.isHidden) {
        this.hideAnimation();
      }
      if (this.props.isHidden && !nextProps.isHidden) {
        this.showAnimation();
      }
    }
    hideAnimation = () => {
      Animated.parallel([
        Animated.timing(this.state.scaleValue, {
          toValue: 0.8,
          useNativeDriver: true,
          duration: 250,
        }),
        Animated.timing(this.state.opacityValue, {
          toValue: 0,
          useNativeDriver: true,
          duration: 250,
        }),
      ]).start();
    };
    showAnimation = () => {
      Animated.parallel([
        Animated.timing(this.state.scaleValue, { toValue: 1 }),
        Animated.timing(this.state.opacityValue, { toValue: 1 }),
      ]).start();
    };
    render() {
      const { opacityValue, scaleValue } = this.state;

      return (
        <Animated.View
          style={[
            {
              opacity: opacityValue,
              transform: [
                {
                  scale: scaleValue,
                },
              ],
            },
          ]}
        >
          <Wrapped {...this.props} />
        </Animated.View>
      );
    }
  };
};

export default scaleAndOpacity;

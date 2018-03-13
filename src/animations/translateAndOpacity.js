import React, { PureComponent } from 'react';
import { Animated, InteractionManager } from 'react-native';

const translateAndOpacity = Wrapped => {
  return class TranslateAndOpacity extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        opacityValue: new Animated.Value(0),
        translateY: new Animated.Value(-4),
      };
    }
    componentDidMount() {
      InteractionManager.runAfterInteractions().then(() => {
        this.showAnimation();
      });
    }
    showAnimation() {
      const { delay } = this.props;

      Animated.parallel([
        Animated.timing(this.state.opacityValue, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
          delay,
        }),
        Animated.timing(this.state.translateY, {
          toValue: 0,
          useNativeDriver: true,
          duration: 500,
          delay,
        }),
      ]).start();
    }
    render() {
      const { opacityValue, translateY } = this.state;

      return (
        <Animated.View
          style={[
            {
              opacity: opacityValue,
              transform: [{ translateY }],
            },
          ]}
        >
          <Wrapped {...this.props} />
        </Animated.View>
      );
    }
  };
};

export default translateAndOpacity;

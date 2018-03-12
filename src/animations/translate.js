import React, { PureComponent } from 'react';
import { Animated } from 'react-native';

const translate = Wrapped => {
  return class Translate extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        translateValue: new Animated.Value(100),
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
        Animated.timing(this.state.translateValue, { toValue: 50 }),
      ]).start();
    };
    showAnimation = () => {
      Animated.parallel([
        Animated.timing(this.state.translateValue, { toValue: 100 }),
      ]).start();
    };
    render() {
      const { translateValue } = this.state;

      return (
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateY: translateValue,
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

export default translate;

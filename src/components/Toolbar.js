import React, { PureComponent } from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';

import Row from './Row';

class Toolbar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isDetail: false,
      translateY: new Animated.Value(0),
      opacityValue: new Animated.Value(1),
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.isDetail !== nextProps.isDetail) {
      this.animate();
    }
  }
  animate() {
    Animated.parallel([
      Animated.timing(this.state.opacityValue, {
        toValue: 0,
        useNativeDriver: true,
        duration: 250,
      }),
      Animated.timing(this.state.translateY, {
        toValue: -8,
        useNativeDriver: true,
        duration: 250,
      }),
    ]).start(() => {
      this.setState({ isDetail: !this.state.isDetail });

      Animated.parallel([
        Animated.timing(this.state.opacityValue, {
          toValue: 1,
          useNativeDriver: true,
          duration: 250,
        }),
        Animated.timing(this.state.translateY, {
          toValue: 0,
          useNativeDriver: true,
          duration: 250,
        }),
      ]).start();
    });
  }
  renderDetail() {
    const { opacityValue, translateY } = this.state;
    const { onBackPress } = this.props;

    const animationStyle = {
      opacity: opacityValue,
      transform: [{ translateY }],
    };

    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <TouchableWithoutFeedback onPress={onBackPress}>
          <Animated.View style={animationStyle}>
            <Row style={styles.toolbarContainer}>
              <Row style={styles.backContainer}>
                <Ionicons name="ios-arrow-back" size={24} color="white" />
                <Text style={styles.titleBackText}>Back</Text>
              </Row>
              <View style={styles.menuIconContainer}>
                <Feather name="share" size={24} color="white" />
              </View>
            </Row>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
  render() {
    const { isDetail, opacityValue, translateY } = this.state;

    if (isDetail) {
      return this.renderDetail();
    }

    const animationStyle = {
      opacity: opacityValue,
      transform: [{ translateY }],
    };

    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <Animated.View style={animationStyle}>
          <Row style={styles.toolbarContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>My Checks</Text>
            </View>
            <View style={styles.menuIconContainer}>
              <Ionicons name="md-menu" size={24} color="#008dff" />
            </View>
            <View style={styles.menuIconContainer}>
              <MaterialCommunityIcons
                name="file-document"
                size={24}
                color="#008dff"
              />
            </View>
          </Row>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  toolbarContainer: {
    height: 56,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  titleContainer: {
    flex: 1,
  },
  toolbarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: '#008dff',
  },
  statusBar: {
    height: 24,
    backgroundColor: 'white',
  },
  titleBackText: {
    color: 'white',
    marginLeft: 8,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '900',
  },
  backContainer: {
    flex: 1,
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Toolbar;

import React, { PureComponent } from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Entypo,
  Ionicons,
} from '@expo/vector-icons';

import { Row } from '../../components';
import { getPlatformElevation } from '../../utils';

class BottomBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      translateY: new Animated.Value(0),
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
  hideAnimation() {
    Animated.timing(this.state.translateY, {
      toValue: 56,
      useNativeDriver: true,
      duration: 250,
    }).start();
  }
  showAnimation() {
    Animated.timing(this.state.translateY, {
      toValue: 0,
      useNativeDriver: true,
      duration: 250,
    }).start();
  }
  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateY: this.state.translateY,
              },
            ],
          },
        ]}
      >
        <Row style={styles.barContainer}>
          <View style={styles.iconContainer}>
            <SimpleLineIcons name="present" size={24} color="#ddd" />
          </View>
          <View style={styles.iconContainer}>
            <Entypo name="wallet" size={24} color="#008dff" />
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name="md-qr-scanner" size={32} color="#ddd" />
          </View>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="message" size={24} color="#ddd" />
          </View>
          <View style={styles.iconContainer}>
            <MaterialIcons name="person" size={24} color="#ddd" />
          </View>
        </Row>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    ...getPlatformElevation(4),
    height: 56,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  barContainer: {},
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  menuIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomBar;

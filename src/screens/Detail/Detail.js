import React, { PureComponent } from 'react';
import {
  Easing,
  InteractionManager,
  Animated,
  Text,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';

import { TranslateYAndOpacity } from 'react-native-motion';
import SharedElement from '../../animations/SharedElement';

import data from '../../data/data';
import { ListItem, Row } from '../../components';
import Toolbar from './Toolbar';
import BottomBar from './BottomBar';

class Detail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      opacityOfDestinationItem: 0,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.phase === 'phase-2' && nextProps.phase === 'phase-3') {
      this.sharedElementRef.moveToSource();
    }
  }
  onMoveToDestinationDidComplete = () => {
    this.setState({ opacityOfDestinationItem: 1 });
    this.props.onSharedElementMovedToDestination();
  };
  onMoveToSourceWillStart = () => {
    this.setState({ opacityOfDestinationItem: 0 });
  };
  renderItem = ({ item, index }) => {
    const { phase, selectedItem } = this.props;

    let delay = index;
    // we need it to go from the end
    if (phase === 'phase-3') {
      delay = selectedItem.items.length - index;
    }

    delay = 56 * delay;

    return (
      <TranslateYAndOpacity isHidden={phase === 'phase-3'} delay={56 * delay}>
        <View style={styles.itemContainer}>
          <Row style={styles.rowContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{item.name}</Text>
            </View>
            <Text style={styles.amountText}>{item.amount}</Text>
          </Row>
          <Text style={styles.vatText}>
            {`${item.amount} X1 (Including VAT 10%)`}
          </Text>
        </View>
      </TranslateYAndOpacity>
    );
  };
  render() {
    const {
      selectedItem,
      startPosition,
      phase,
      onBackPress,
      onSharedElementMovedToSource,
    } = this.props;
    const { opacityOfDestinationItem } = this.state;

    const { items = [] } = selectedItem || {};

    if (!selectedItem) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Toolbar isHidden={phase === 'phase-3'} onBackPress={onBackPress} />
        <SharedElement
          ref={node => (this.sharedElementRef = node)}
          sourceId={selectedItem.name}
          easing={Easing.in(Easing.back())}
          onMoveToDestinationDidComplete={this.onMoveToDestinationDidComplete}
          onMoveToSourceWillStart={this.onMoveToSourceWillStart}
          onMoveToSourceDidComplete={onSharedElementMovedToSource}
        >
          <View
            style={{
              opacity: opacityOfDestinationItem,
              backgroundColor: 'transparent',
            }}
          >
            <ListItem
              item={selectedItem}
              onPress={() => {}}
              animateOnDidMount={false}
              isHidden={false}
            />
          </View>
        </SharedElement>
        {/* <FlatList
          data={items}
          dataExtra={phase}
          keyExtractor={item => item.amount}
          renderItem={this.renderItem}
        /> */}
        <BottomBar isHidden={phase === 'phase-3'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  titleContainer: {
    flex: 1,
  },
  itemContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  rowContainer: {
    alignItems: 'center',
  },
  titleText: {},
  amountText: {
    fontSize: 18,
    fontWeight: '900',
  },
  vatText: {
    fontSize: 10,
    color: 'gray',
  },
});

export default Detail;

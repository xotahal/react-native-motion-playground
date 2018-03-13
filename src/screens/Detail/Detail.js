import React, { PureComponent } from 'react';
import {
  InteractionManager,
  Animated,
  Text,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';

import data from '../../data/data';
import { ListItem, Row } from '../../components';
import Toolbar from './Toolbar';
import BottomBar from './BottomBar';
import DetailListItem from './DetailListItem';

class Detail extends PureComponent {
  onHideAnimationEnded = ({ index }) => {
    if (index === 0) {
      this.props.onDetailAnimationEnd();
    }
  };
  renderItem = ({ item, index }) => {
    const { phase, selectedItem } = this.props;

    let delay = index;
    // we need it to go from the end
    if (phase === 'phase-3') {
      delay = selectedItem.items.length - index;
    }

    return (
      <DetailListItem
        isHidden={phase === 'phase-3'}
        item={item}
        index={index}
        delay={56 * delay}
      />
    );
  };
  render() {
    const { selectedItem, startPosition, phase, onBackPress } = this.props;
    const { items = [] } = selectedItem || {};

    if (!selectedItem) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Toolbar isHidden={phase === 'phase-3'} onBackPress={onBackPress} />
        <ListItem
          item={selectedItem}
          isSelected={phase === 'phase-3'}
          onPress={() => {}}
        />
        <FlatList
          data={items}
          dataExtra={phase}
          keyExtractor={item => item.amount}
          renderItem={this.renderItem}
        />
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

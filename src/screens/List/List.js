import React, { PureComponent } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

import SharedElement from '../../animations/SharedElement';

import Toolbar from './Toolbar';
import BottomBar from './BottomBar';
import { ListItem } from '../../components';
import data from '../../data/data';

class List extends PureComponent {
  constructor(props) {
    super(props);

    this.itemRefs = {};
  }
  onListItemPressed = item => {
    const { onItemPress } = this.props;
    onItemPress(item);

    // this.itemRefs[item.name].measure((x, y, width, height, pageX, pageY) => {
    //   onItemPress(item, { width, pageX, pageY });
    // });
  };
  renderItem = ({ item }) => {
    const { selectedItem } = this.props;

    const isHidden = selectedItem && selectedItem.name !== item.name;
    const isSelected = selectedItem && selectedItem.name === item.name;

    return (
      <SharedElement id={item.name}>
        <View style={{ backgroundColor: 'transparent' }}>
          <ListItem
            item={item}
            onPress={this.onListItemPressed}
            isHidden={isHidden}
            isSelected={isSelected}
          />
        </View>
      </SharedElement>
    );
  };
  render() {
    const { selectedItem, phase } = this.props;

    return (
      <View style={styles.container}>
        <Toolbar
          isHidden={phase !== 'phase-0'}
          onBackPress={this.onBackPressed}
        />
        <FlatList
          data={data}
          dataExtra={phase}
          keyExtractor={item => item.name}
          renderItem={this.renderItem}
        />
        <BottomBar isHidden={phase !== 'phase-0'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default List;

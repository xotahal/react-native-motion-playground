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

const contextTypes = {
  moveSharedElement: PropTypes.func.isRequired,
};
// To registrate elements
let elements = {};

class SharedElement extends PureComponent {
  constructor(props) {
    super(props);

    const { id, sourceOf } = props;

    if (id) {
      elements = {
        ...elements,
        [id]: {
          sourceOf,
        },
      };
    }

    this.state = {
      destinationOpacity: 0,
    };
  }
  componentDidMount() {
    const { sourceId, children } = this.props;
    // destination component
    if (sourceId) {
      // we will animate this node
      elements[sourceId].node = React.cloneElement(children);
    }
  }
  storeRef = node => {
    const { id, sourceId, children } = this.props;

    if (id) {
      // Keep reference for us
      elements[id].sourceRef = node;
    } else if (sourceId) {
      // Keep reference for us
      elements[sourceId].destinationRef = node;
    }

    // Call the original ref, if there is any
    const { ref } = children;
    if (typeof ref === 'function') {
      ref(node);
    }
  };
  onMoveCompleted = () => {
    const { onMoveComplete } = this.props;

    this.setState({
      destinationOpacity: 1,
    });

    if (onMoveComplete) {
      onMoveComplete();
    }
  };
  onSourceLayout = data => {
    const { children, id } = this.props;

    const { sourceRef } = elements[id];

    if (sourceRef) {
      sourceRef.measure((x, y, width, height, pageX, pageY) => {
        const position = { x, y, width, height, pageX, pageY };
        elements[id].sourcePosition = position;
      });
    }

    // Call original if any
    const { onLayout } = children;
    if (typeof onLayout === 'function') {
      onLayout(data);
    }
  };
  onDestinationLayout = data => {
    const { moveSharedElement } = this.context;
    const { children, sourceId, onMoveComplete, ...rest } = this.props;

    const { sourceRef, destinationRef } = elements[sourceId];

    if (sourceRef) {
      sourceRef.measure((x, y, width, height, pageX, pageY) => {
        const position = { x, y, width, height, pageX, pageY };
        elements[sourceId].sourcePosition = position;

        destinationRef.measure((x, y, width, height, pageX, pageY) => {
          const position = { x, y, width, height, pageX, pageY };
          elements[sourceId].destinationPosition = position;

          moveSharedElement({
            ...elements[sourceId],
            ...rest,
            onMoveComplete: this.onMoveCompleted,
          });

          sourceRef.setNativeProps({ opacity: 0 });
        });
      });
    }

    destinationRef.measure((x, y, width, height, pageX, pageY) => {
      const position = { x, y, width, height, pageX, pageY };
      elements[sourceId].destinationPosition = position;

      moveSharedElement({
        ...elements[sourceId],
        ...rest,
        onMoveComplete: this.onMoveCompleted,
      });
    });

    // Call original if any
    const { onLayout } = children;
    if (typeof onLayout === 'function') {
      onLayout(data);
    }
  };
  renderSource() {
    const { children, id } = this.props;

    return React.cloneElement(this.props.children, {
      ref: this.storeRef,
      onLayout: this.onSourceLayout,
    });
  }
  renderDestination() {
    const { children } = this.props;
    const { sourcePosition, topValue, destinationOpacity } = this.state;
    const { height, width } = sourcePosition || {};

    return React.cloneElement(children, {
      ref: this.storeRef,
      onLayout: this.onDestinationLayout,
      style: { opacity: destinationOpacity },
    });
  }
  render() {
    const { sourceId } = this.props;

    if (!sourceId) {
      return this.renderSource();
    }

    return this.renderDestination();
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  positionContainer: {
    position: 'absolute',
  },
});

SharedElement.contextTypes = contextTypes;

export default SharedElement;

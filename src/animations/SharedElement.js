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
      startPosition: null,
    };
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
  onLayout = data => {
    const { moveSharedElement } = this.context;
    const { children, id, sourceId } = this.props;
    const key = id || sourceId;

    if (key) {
      const { sourceRef, destinationRef } = elements[key];
      const ref = sourceRef || destinationRef;

      if (ref) {
        ref.measure((x, y, width, height, pageX, pageY) => {
          const position = {
            x,
            y,
            width,
            height,
            pageX,
            pageY,
          };

          if (sourceRef) {
            elements[key].sourcePosition = position;
          } else if (destinationRef) {
            elements[key].destinationPosition = position;

            moveSharedElement({
              ...elements[key],
              ...this.props,
              node: children,
            });
          }
        });
      }
    }

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
      onLayout: this.onLayout,
    });
  }
  renderDestination() {
    const { children } = this.props;
    const { sourcePosition, topValue } = this.state;
    const { height, width } = sourcePosition || {};

    return React.cloneElement(children, {
      ref: this.storeRef,
      onLayout: this.onLayout,
      style: {
        opacity: 0.2,
      },
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

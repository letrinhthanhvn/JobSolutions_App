/**
* Created by nghinv on Mon Jul 23 2018
* Copyright (c) 2018 nghinv
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-material-kit/lib/mdl';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  }
});

class ButtonIcon extends PureComponent<Props> {
  render() {
    let {
      iconName,
      onPress,
      style,
      backgroundColor,
      iconColor,
      size,
    } = this.props;

    return (
      <Button
        style={[
          styles.container,
          backgroundColor ? { backgroundColor } : undefined,
          { width: size + 16, height: size + 16, borderRadius: (size + 16)/2  },
          style
        ]}
        onPress={onPress}
      >
        <Icon name={iconName} size={size} color={iconColor} />
      </Button>
    );
  }
}

ButtonIcon.defaultProps = {
  size: 26,
  iconColor: '#fff',
  backgroundColor: 'transparent',
  materialButton: true
}

ButtonIcon.propTypes = {
  iconName: PropTypes.string,
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
  backgroundColor: PropTypes.string,
  iconColor: PropTypes.string,
  size: PropTypes.number,
  materialButton: PropTypes.bool
}

interface Props {
  /**
   * material icon name
   */
  iconName: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  iconColor?: string;
  /**
   * default icon size = 26
   */
  size?: number;
  /**
   * use material button when true and TouchableOpacity when false
   */
  materialButton?: boolean
}

export default ButtonIcon;

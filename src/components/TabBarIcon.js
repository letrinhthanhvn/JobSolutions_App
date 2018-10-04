import React, { Component } from 'react';

import {
   View,
   Text
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class TabBarIcon extends Component {
   render() {
      var color = this.props.selected ? 'white' : 'rgba(255, 255, 255, 0.4)';

      return (
         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Icon style={{ color: color }} name={this.props.iconName || "circle"} size={24} />
         </View>
      );
   }
}

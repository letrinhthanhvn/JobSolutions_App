import React, { PureComponent } from 'react';
import {
   View,
   Text,
   StyleSheet,
   Dimensions
} from 'react-native';
import ButtonIcon from '../components/ButtonIcon';
import { Actions } from 'react-native-router-flux';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Header extends PureComponent {
   render() {

      const { title, rightIcon } = this.props

      return (
         <View style={styles.container}>
            <ButtonIcon iconName='arrow-back' size={24} color='white'
               onPress={() => Actions.pop()}
            />
            <Text style={styles.textStyle}>{title}</Text>
            {
               rightIcon ? <ButtonIcon iconName={rightIcon} size={24} color='white'
                  style={{ position: 'absolute', right: 10, }}
               /> : <View></View>
            }
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      width: SCREEN_WIDTH,
      height: 50,
      backgroundColor: '#242843',
      flexDirection: 'row',
      alignItems: 'center',
   },

   textStyle: {
      color: 'white',
      fontSize: 18,

   }
})
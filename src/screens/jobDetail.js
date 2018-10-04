import React, { PureComponent } from 'react';

import {
   View,
   Text,
   FlatList,
   TouchableOpacity,
   StyleSheet
} from 'react-native';

import { connect } from 'react-redux';
import ButtonIcon from '../components/ButtonIcon';
import { Actions } from 'react-native-router-flux';

class JobDetail extends PureComponent {

   renderTop = () => {
      return (
         <View style={styles.headerTop}>
            <ButtonIcon
               iconName='arrow-back'
               size={24}
               onPress={() => Actions.pop()}
            />
            <Text style={styles.textPerField}>{this.props.fieldName}</Text>
            <ButtonIcon
               iconName='search'
               size={24}
               // onPress={() => Actions.pop()}
            />
         </View>

      )
   }

   render() {
      return (
         <View style={styles.container}>
            {
               this.renderTop()
            }
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   },

   headerTop: {
      width: '100%',
      height: 50,
      backgroundColor: '#242843',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
})

const mapStateToProps = (state) => {
   return {

   }
} 

export default connect(mapStateToProps)(JobDetail)
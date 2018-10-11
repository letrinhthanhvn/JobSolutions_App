import React, { PureComponent } from 'react';

import {
   View,
   StyleSheet,
   Platform,
   Dimensions,
   Text
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-material-kit/lib/mdl';
import _ from 'lodash';
import Modal from 'react-native-modal';
import Drawer from './Drawer';

const width = Dimensions.get('window').width;

export default class HeaderMain extends PureComponent {

   constructor(props) {
      super(props)

      this.state = {
         text: '',
         showDrawer: false
      }
      this.search = React.createRef()
   }

   render() {

      return (
         <View style={styles.headerView}>
            <Button style={styles.leftIconHeader}
               onPress={this.openDrawer}
            >
               <Icon name="menu" size={24} color='white' />
            </Button>
            <Text style={{ color: 'white', fontSize: 18 }}>{this.props.title}</Text>
            <View style={styles.viewRight}>
               
            </View>

            <Modal
               isVisible={this.state.showDrawer}
               animationIn={"slideInLeft"}
               animationOut={"slideOutLeft"}
               backdropColor="black"
               backdropOpacity={0.8}
               swipeDirection={"left"}
               onBackdropPress={this._hideModal}
               style={styles.viewDrawer}
               onSwipe={this._hideModal}
               hideModalContentWhileAnimating
            >
               <Drawer closeMenu={this._hideModal} />
            </Modal>
         </View>
      )
   }

   _hideModal = () => {
      this.setState({
         showDrawer: false
      })
   }

   openDrawer = () => {
      this.setState({
         showDrawer: true
      })
   }

}


const styles = StyleSheet.create({
   headerView: {
      height: 50,
      width,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#9AC230'
   },

   leftIconHeader: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden', marginLeft: 6
   },

   viewRight: {
      width: 40,
      height: 40
      // position: 'absolute',
      // right: 15
   },

   search: {
      width: 40,
      height: 40,
      borderRadius: 20,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 0
   },

   iconRight: {
      width: 40,
      height: 40,
      borderRadius: 20,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: -10
   },

   viewDrawer: {
      flex: 1,
      padding: 0,
      margin: 0
   },
})
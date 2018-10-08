import React, { PureComponent } from 'react';

import {
   View,
   Text,
   TouchableOpacity,
   Platform
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import IconFont from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';

class RowDrawer extends PureComponent {
   render() {

      const { nameIcon, textTitle, fontAwesome } = this.props

      return (
         <TouchableOpacity style={{ paddingLeft: 52, flexDirection: 'row', alignItems: 'center', height: 50, marginTop: 10 }}

            onPress={() => this.props.onPress && this.props.onPress()}
         >
            {
               fontAwesome ? <IconFont name={nameIcon} size={24} color='white' /> : <Icon name={nameIcon} size={24} color='white' />
            }
            <Text style={{ fontSize: 18, color: 'white', marginLeft: 20, fontWeight: '600' }}>{textTitle}</Text>
         </TouchableOpacity>
      )
   }
}

export default class DrawerMenu extends PureComponent {
   render() {
      return (
         // <Body>
         <View style={{ width: 300, flex: 1, backgroundColor: Platform.OS === 'android' ? '#174E91' : '#174E91' }}>
            {/* <LinearGradient
          start={{ x: 0.0, y: 0.0 }} end={{ x: 0.5, y: 0.5 }}
          locations={[0, 1]}
          colors={['#174E91', '#323656']}
          style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, zIndex: 100 }}>
          
        </LinearGradient> */}
            {/* <BlurView
          style={{position: "absolute", left: 0, right: 0, top: 0, bottom: 0, zIndex: 150}}
          // viewRef={this.state.viewRef}
          blurType="light"
          blurAmount={5}
        /> */}
            {/* <View style={{ marginTop: 100, zIndex: 100, height: 360, width: '100%', zIndex: 200 }}>
               <View style={{ flex: 6, }}>
                  <Text style={{ fontSize: 20, color: 'white', paddingLeft: 40, fontWeight: '600' }}>Online</Text>
                  <View style={{ height: 300, }}>
                     <RowDrawer nameIcon='playlist-add' textTitle='My playlist' onPress={this.onPressMyPlayList} />
                     <RowDrawer nameIcon='music' textTitle='Discovery' onPress={this.onPressDiscovery} fontAwesome={true} />
                     <RowDrawer nameIcon='download' textTitle='Download' fontAwesome={true} />
                  </View>
               </View>
               <View style={{ flex: 4, marginTop: 20 }}>
                  <Text style={{ fontSize: 20, color: 'white', paddingLeft: 40, fontWeight: '600', }}>Local</Text>
                  <View style={{ height: 200, }}>
                     <RowDrawer nameIcon='usb' textTitle='USB' onPress={this.onPressLocal} />
                     <RowDrawer nameIcon='favorite-border' textTitle='Favorite' onPress={this.onPressFavoriteSongs} />
                  </View>
               </View>
            </View> */}
         </View>
         // </Body>
      )
   }
   // onPressLocal = () => {
   //    this.props.closeMenu && this.props.closeMenu()
   //    Actions.localMusic()
   // }

   // onPressDiscovery = () => {
   //    this.props.closeMenu && this.props.closeMenu()
   // }

   // onPressFavoriteSongs = () => {
   //    this.props.closeMenu && this.props.closeMenu()
   //    Actions.favoriteLocalMusic()
   // }

   // onPressMyPlayList = () => {
   //    this.props.closeMenu && this.props.closeMenu()
   //    Actions.myPlayListOnLine()
   // }

}
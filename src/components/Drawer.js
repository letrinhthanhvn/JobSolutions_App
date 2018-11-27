import React, { PureComponent } from 'react';

import {
   View,
   Text,
   TouchableOpacity,
   Platform,
   StyleSheet,
   AsyncStorage,
   ScrollView,
   Image
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import IconFont from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { mainColor, fontFamily } from '../common/colorBG';

class DrawerMenu extends PureComponent {

   render() {
      return (
         // <Body>

         <View style={{ width: 300, height: '100%', backgroundColor: "white" }}>
            <View style={{ height: 180, width: '100%', alignItems: 'center', flexDirection: 'row', paddingLeft: 20 }}>
               <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: mainColor, marginRight: 20 }}>
                  {/* <Image source={require('')}/> */}
               </View>
               <Text style={{ fontSize: 18, color: 'gray', fontWeight: '500', fontFamily: fontFamily }}>Thanh Le</Text>
            </View>
            <ScrollView style={{ flex: 1, width: 300, height: '100%' }}>
               <TouchableOpacity style={styles.perRow}
                  onPress={this.jobsCategories}
               >
                  <Icon name='view-list' size={24} color={mainColor} />
                  <Text style={{ fontSize: 18, color: 'gray', marginLeft: 20, fontWeight: '500', fontFamily: fontFamily }}>Jobs Categories</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.perRow}
                  onPress={this.savedJobs}
               >
                  <Icon name='save' size={24} color={mainColor} />
                  <Text style={{ fontSize: 18, color: 'gray', marginLeft: 20, fontWeight: '500', fontFamily: fontFamily, }}>Saved Jobs</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.perRow}
                  onPress={this.savedCompany}
               >
                  <Icon name='account-balance' size={24} color={mainColor} />
                  <Text style={{ fontSize: 18, color: 'gray', marginLeft: 20, fontWeight: '500', fontFamily: fontFamily, }}>Saved Company</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.perRow}
                  onPress={this.userInfor}
               >
                  <Icon name='person' size={24} color={mainColor} />
                  <Text style={{ fontSize: 18, color: 'gray', marginLeft: 20, fontWeight: '500', fontFamily: fontFamily, }}>User Information</Text>
               </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderTopColor: 'gray' }}
               onPress={this.userLogout}>
               <Text style={{ fontSize: 18, color: 'gray', marginLeft: 20, fontWeight: '500', fontFamily: fontFamily, }}>Log out</Text>
            </TouchableOpacity>
         </View>
         // </Body>
      )
   }

   userLogout = async () => {
      try {
         await AsyncStorage.removeItem('candidate_id');
         // Alert.alert('Logout Success!');
         this.props.closeMenu()
         Actions.loginSelector();
      } catch (error) {
         console.log('AsyncStorage error: ' + error.message);
      }
   }

   // logOut = () => {
   //    if (this.props.candidate_id) {

   //       Actions.loginSelector()
   //    } else {
   //       this.props.closeMenu()
   //       Actions.loginSelector()
   //    }
   // }

   savedCompany = () => {
      if (this.props.user.candidate_id !== null) {
         this.props.closeMenu()
         Actions.savedCompany()
      } else {
         alert('Bạn chưa đăng nhập!')
      }
   }

   jobsCategories = () => {
      this.props.closeMenu()
   }

   savedJobs = () => {
      if (this.props.user.candidate_id !== null) {
         this.props.closeMenu()
         Actions.savedJobs()
      } else {
         alert('Bạn chưa đăng nhập!')
      }
   }

   userInfor = () => {
      if (this.props.user.candidate_id !== null) {
         this.props.closeMenu()
         Actions.userInfor()
      } else {
         alert('Bạn chưa đăng nhập!')
      }
   }

}

const styles = StyleSheet.create({
   perRow: {
      paddingLeft: 35,
      flexDirection: 'row',
      alignItems: 'center',
      height: 50, marginTop: 10
   }
})

const mapStateToProps = (state, props) => {
   return {
      user: state.jobSolutions.user
   }
}

export default connect(mapStateToProps)(DrawerMenu)
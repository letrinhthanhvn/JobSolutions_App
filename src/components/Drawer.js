import React, { PureComponent } from 'react';

import {
   View,
   Text,
   TouchableOpacity,
   Platform,
   StyleSheet
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import IconFont from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

class DrawerMenu extends PureComponent {

   render() {
      return (
         // <Body>
         <View style={{ width: 300, flex: 1, backgroundColor: '#9AC230', borderTopEndRadius: 23, borderBottomEndRadius: 23 }}>
            <View style={{ height: 250, width: '100%' }}>

            </View>
            <TouchableOpacity style={styles.perRow}
               onPress={this.jobsCategories}
            >
               <Icon name='view-list' size={24} color='white' />
               <Text style={{ fontSize: 18, color: 'white', marginLeft: 20, }}>Jobs Categories</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.perRow}
               onPress={this.savedJobs}
            >
               <Icon name='save' size={24} color='white' />
               <Text style={{ fontSize: 18, color: 'white', marginLeft: 20, }}>Saved Jobs</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.perRow}
               onPress={this.savedCompany}
            >
               <Icon name='account-balance' size={24} color='white' />
               <Text style={{ fontSize: 18, color: 'white', marginLeft: 20, }}>Saved Company</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.perRow}>
               <Icon name='search' size={24} color='white' />
               <Text style={{ fontSize: 18, color: 'white', marginLeft: 20, }}>Search Jobs</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.perRow}
               onPress={this.userInfor}
            >
               <Icon name='person' size={24} color='white' />
               <Text style={{ fontSize: 18, color: 'white', marginLeft: 20, }}>User Information</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.perRow}
               onPress={this.logOut}>
               <Icon name='forward' size={24} color='white' />
               <Text style={{ fontSize: 18, color: 'white', marginLeft: 20, }}>{this.props.userName ? 'Log out' : 'Log in'}</Text>
            </TouchableOpacity>
         </View>
         // </Body>
      )
   }

   logOut = () => {
      if (this.props.userName) {
         this.props.closeMenu()
         Actions.loginSelector()
      } else {
         this.props.closeMenu()
         Actions.loginSelector()
      }
      // Actions.reset('login')
   }

   savedCompany = () => {
      this.props.closeMenu()
      Actions.savedCompany()
   }

   jobsCategories = () => {
      this.props.closeMenu()
   }

   savedJobs = () => {
      this.props.closeMenu()
      Actions.savedJobs()
   }

   searchJobs = () => {
      this.props.closeMenu()
   }

   userInfor = () => {
      this.props.closeMenu()
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
      userName: state.jobSolutions.userName
   }
}

export default  connect(mapStateToProps)(DrawerMenu)
import React, { PureComponent } from 'react';
import { Scene, Router, Tabs, Stack, Actions } from 'react-native-router-flux';
import { transitionConfig, getSceneStyle } from '../common/transitionConfig';
import { connect } from 'react-redux';
import ListField from '../screens/listField';
import ListJobs from '../screens/listJobs';
import JobDetail from '../screens/jobDetail';
import {
   View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Drawer from '../components/Drawer';
import LoginSelector from '../container/jobSolutions/index';
import SavedCompany from '../screens/savedCompany';
import CompanyDetail from '../screens/companyDetail';
import SavedJobs from '../screens/savedJobs';

const TabBarIcon = ({ isFocused, iconName }) => {
   var color = isFocused ? 'white' : 'rgba(255, 255, 255, 0.4)';
   return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Icon style={{ color: color }} name={iconName} size={24} />
      </View>
   );
}

const MenuIcon = () => {
   return (
      <Icon color='black' name='menu' size={24} />
   );
}

class NavigatorMobile extends PureComponent {
   render() {
      return (
         <Router getSceneStyle={getSceneStyle}>
            <Scene
               key='root'
               transitionConfig={transitionConfig}
            >
               <Scene
                  key="tab1"
                  hideNavBar
                  transitionConfig={transitionConfig}
                  initial
               // drawer
               // drawerIcon={MenuIcon}
               // contentComponent={Drawer}
               // drawerWidth={300}
               >
                  <Scene
                     key='loginSelector'
                     component={LoginSelector}
                     swipeEnabled={false}
                     panHandlers={null}
                     // initial
                  />
                  <Scene
                     key='listField'
                     title='Categories'
                     component={ListField}
                     swipeEnabled={false}
                     panHandlers={null}
                     initial
                  />
                  <Scene
                     key='listJobs'
                     component={ListJobs}
                     swipeEnabled={false}
                     panHandlers={null}
                     hideNavBar
                  />
                  <Scene
                     key='jobDetail'
                     component={JobDetail}
                     swipeEnabled={false}
                     panHandlers={null}
                  // initial
                  />
                  <Scene
                     key='savedCompany'
                     component={SavedCompany}
                     swipeEnabled={false}
                     panHandlers={null}
                  // initial
                  />
                  <Scene
                     key='companyDetail'
                     component={CompanyDetail}
                     swipeEnabled={false}
                     panHandlers={null}
                  //    initial
                  />
                  <Scene
                     key='savedJobs'
                     component={SavedJobs}
                     swipeEnabled={false}
                     panHandlers={null}
                  //    initßial
                  />
               </Scene>
            </Scene>
         </Router>
      )
   }
}

export default connect(undefined)(NavigatorMobile);

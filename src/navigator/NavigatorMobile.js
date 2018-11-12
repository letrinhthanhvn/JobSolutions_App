import React, { PureComponent } from 'react';
import { Scene, Router, Tabs, Stack, Actions } from 'react-native-router-flux';
import { transitionConfig, getSceneStyle } from '../common/transitionConfig';
import { connect } from 'react-redux';
import ListField from '../screens/listField';
import ListJobs from '../screens/listJobs';
import JobDetail from '../screens/jobDetail';
import {
   View,
   ActivityIndicator,
   AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoginSelector from '../container/jobSolutions/index';
import SavedCompany from '../screens/savedCompany';
import CompanyDetail from '../screens/companyDetail';
import SavedJobs from '../screens/savedJobs';
import UserInfor from '../screens/userInfor';
import { getCandidateIdLocal } from '../redux/actions/jobSolutions';
import ResultSearch from '../screens/resultSearch';

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

   constructor(props) {
      super(props)

      this.state = {
         hasCandidate_id: false,
         isLoaded: false
      }
   }

   componentWillMount() {
      AsyncStorage.getItem('candidate_id').then((candidate_id) => {
         this.setState({ hasCandidate_id: candidate_id !== null, isLoaded: true })
         // this.props.getCandidateIdLocal()
      });
   }

   render() {
      if (!this.state.isLoaded) {
         return (
            <ActivityIndicator />
         )
      } else {
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
                        initial={!this.state.hasCandidate_id}
                     />
                     <Scene
                        key='listField'
                        title='Categories'
                        component={ListField}
                        swipeEnabled={false}
                        panHandlers={null}
                        initial={this.state.hasCandidate_id}
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
                     <Scene
                        key='userInfor'
                        component={UserInfor}
                        swipeEnabled={false}
                        panHandlers={null}
                     // initial
                     />
                     <Scene
                        key='resultSearch'
                        component={ResultSearch}
                        swipeEnabled={false}
                        panHandlers={null}
                     // initial
                     />
                  </Scene>
               </Scene>
            </Router>
         )
      }
   }
}

const mapDispatchToProps = {
   // getCandidateIdLocal
}

const mapStateToProps = (state) => {
   return {

   }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigatorMobile);

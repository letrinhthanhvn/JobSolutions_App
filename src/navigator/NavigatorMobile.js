import React, { PureComponent } from 'react';
import { Scene, Router, Tabs, Stack, Actions } from 'react-native-router-flux';
import { transitionConfig, getSceneStyle } from '../common/transitionConfig';
import { connect } from 'react-redux';
import ListField from '../screens/listField';
import TabBarIcon from '../components/TabBarIcon';
import ListJobs from '../screens/listJobs';
class NavigatorMobile extends PureComponent {
   render() {
      return (
         <Router getSceneStyle={getSceneStyle}>
            <Tabs
               key='root'
               transitionConfig={transitionConfig}
               // tabs={true} 
               showLabel={false}
               activeBackgroundColor='#242843'
               inactiveBackgroundColor='#242843'
               activeTintColor='white'
               inactiveTintColor='rgba(255, 255, 255, 0.4)'
            >

               {/* <Tabs
                  key="tabbar"
                  showLabel
                  hideNavBar
                  tabBarPosition="bottom"
                  tabBarComponent={(props) => {
                     return (
                        <TabBar
                           {...props}
                           backgroundColor='#242843'
                           colorIconActive='#fff'
                           colorIconInactive="rgba(255, 255, 255, 0.4)"
                        />
                     )
                  }
                  }
                  activeTintColor='#fff'
                  inactiveTintColor="rgba(255, 255, 255, 0.4)"
                  transitionConfig={transitionConfig}
                  swipeEnabled={false}
                  panHandlers={null}
               > */}

               <Stack
                  key="Home"
                  hideNavBar
                  transitionConfig={transitionConfig}
                  iconName="home"
                  icon={TabBarIcon}
               >
                  <Scene
                     key='listField'
                     component={ListField}
                     swipeEnabled={false}
                     panHandlers={null}
                  />
                  <Scene
                     key='listJobs'
                     component={ListJobs}
                     swipeEnabled={false}
                     panHandlers={null}
                  />
               </Stack>

               <Stack
                  key="tab_2"
                  title='Hello'
                  hideNavBar
                  transitionConfig={transitionConfig}
                  iconName="save"
                  icon={TabBarIcon}
               >
                  <Scene
                     key='listField'
                     component={ListField}
                     swipeEnabled={false}
                     panHandlers={null}
                  />
               </Stack>
               {/* </Tabs> */}
            </Tabs>
         </Router>
      )
   }
}

export default connect(undefined)(NavigatorMobile);

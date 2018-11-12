import React, { PureComponent } from 'react';

import {
   View,
   StatusBar,
   ActivityIndicator
} from 'react-native';

import { Provider } from 'react-redux';
import App from '../App';
import { store, persistor, configureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react';

export default class Setup extends PureComponent {
   constructor(props) {
      super(props);

      this.state = {
         // isLoading: true,
         // store: configureStore(() => {

         // })
      }
   }

   renderLoading = () => {
      return (
         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size='large' />
         </View>
      )
   }

   render() {
      // let { isLoading, store } = this.state;

      // if (isLoading) {
      //    return (
      //       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      //          <ActivityIndicator size='large' />
      //       </View>
      //    )
      // }

      return (
         <View style={{ flex: 1 }}>
            <StatusBar hidden />
            <Provider store={store}>
               <PersistGate persistor={persistor} loading={this.renderLoading()}>
                  <App />
               </PersistGate>
            </Provider>
         </View>
      );
   }
}
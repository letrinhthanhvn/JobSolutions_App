import React, { PureComponent } from 'react';

import {
   View,
   StatusBar
} from 'react-native';

import { Provider } from 'react-redux';
import App from '../App';
import configureStore from './redux/configureStore';

export default class Setup extends PureComponent {
   constructor(props) {
      super(props);

      this.state = {
         // isLoading: true,
         store: configureStore(() => {
            
         })
      }
   }

   render() {
      let { isLoading, store } = this.state;

      // if (isLoading) {
      //    return <Loading backgroundColor={common().BACKGROUND_GRADIENT1} colorIndicator={common().COLOR_INDICATOR} />
      // }

      return (
         <View style={{ flex: 1 }}>
            <StatusBar hidden/>
            <Provider store={store}>
               <App />
            </Provider>
         </View>
      );
   }
}
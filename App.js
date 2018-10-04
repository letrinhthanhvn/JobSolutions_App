/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import NavigatorMobile from './src/navigator/NavigatorMobile';
import { connect } from 'react-redux';

class App extends Component {
   render() {
      return (
         <View style={styles.container}>
            <NavigatorMobile />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   },
   welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
   },
   instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
   },
});

const mapDispatchToProps = {
};

const mapStateToProps = (state) => {
   return {

   }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)

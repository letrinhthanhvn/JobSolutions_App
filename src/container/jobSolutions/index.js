/**
* Created by nghinv on Sat Jul 14 2018
* Copyright (c) 2018 nghinv
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import SpeakerLandscape from '../../screens/speaker/index-landscape';
// import SpeakerPortrait from '../../screens/speaker/index-portrait';
// import { Body } from '../../components';
import Login from '../../screens/login';

class LoginSelector extends PureComponent {
   render() {
      return (
         <Login />
      )
   }
}

const mapDispathToProps = {

}

const mapStateToProps = (state) => {
   return {
      // language: state.config.language,
      // theme: state.config.theme,
      // orientation: state.config.orientation,
   }
}

export default connect(mapStateToProps, mapDispathToProps)(LoginSelector);

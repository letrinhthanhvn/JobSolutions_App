import React, { PureComponent } from 'react';
import {
   View,
   Text,
   FlatList,
   TouchableOpacity,
   StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderMain from '../components/headerMain';
import { fetchIndustry } from '../redux/actions/jobSolutions';
import { mainColor } from '../common/colorBG';

class ListField extends PureComponent {

   constructor(props) {
      super(props)

      this.state = {
         industryList: []
      }
   }

   async componentDidMount() {
      let res = await fetch('http://localhost:3000/industry/get_industry_list').then((res) => res.json());
      if (res.status == 'SUCCESS') {
         this.setState({
            industryList: res.results
         })
      } else {

      }
   }

   renderField = ({ item, index }) => {
      return (
         // <View style={{
         //    paddingLeft: 15,
         //    width: '100%',
         //    height: 45,
         //    justifyContent: 'center',
         //    shadowOffset: { width: 0, height: 2 },
         //    shadowOpacity: 0.8,
         //    shadowRadius: 2,
         //    elevation: 1,
         //    marginLeft: 5,
         //    marginRight: 5,
         //    marginTop: 10,
         // }}>
            <TouchableOpacity style={styles.btnStyle}
               onPress={() => Actions.listJobs({ id: item.industry_id, fieldName: item.name })}
            >
               <Text style={styles.textPerField}>{item.name}</Text>
            </TouchableOpacity>
         // </View>
      )
   }

   render() {
      const { industryList } = this.state
      return (
         <View style={{ flex: 1 }}>
            <HeaderMain title='Categories' />
            <FlatList
               data={industryList}
               renderItem={this.renderField}
               keyExtractor={(item, index) => String(index)}
            />
         </View>
      )
   }
}

const styles = StyleSheet.create({
   headerTop: {
      width: '100%',
      height: 50,
      backgroundColor: mainColor,
      alignItems: 'center',
      justifyContent: 'center'
   },

   textPerField: {
      fontSize: 20,
      color: '#e89519'
   },

   btnStyle: {
      width: '100%', height: 45,
      paddingLeft: 10,
      paddingTop: 3,
      backgroundColor: 'white',
      marginBottom: 8,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
   }
})

const mapDispatchToProps = {
   fetchIndustry
}

const mapStateToProps = (state, props) => {
   return {

   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListField)
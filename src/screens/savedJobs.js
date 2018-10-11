import React, { PureComponent } from 'react';
import {
   View,
   Text,
   FlatList,
   TouchableOpacity,
   StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import ButtonIcon from '../components/ButtonIcon';
import { Actions } from 'react-native-router-flux';

class SavedJobs extends PureComponent {

   constructor(props) {
      super(props)
   }

   renderField = ({ item, index }) => {
      return (
         <TouchableOpacity style={styles.rowStyle}
            onPress={() => Actions.jobDetail()}
         >
            <View>
               <Text style={[styles.textPerField, { color: '#429ef4', fontWeight: 'bold', width: '75%' }]} numberOfLines={1}>{item.jobName}</Text>
            </View>
            <View style={{ marginTop: 5 }}>
               <Text style={[styles.textPerField, { color: 'rgba(0, 0, 0, 0.7)', fontWeight: 'bold', fontSize: 18 }]}>{item.companyName}</Text>
            </View>
            <View style={{ marginTop: 5 }}>
               <Text style={[styles.textPerField, { color: 'rgba(0, 0, 0, 0.5)', width: '75%', fontSize: 18 }]} numberOfLines={1}>{item.address}</Text>
            </View>
            <View style={styles.viewSalary}>
               <Text style={[styles.textPerField, { color: 'rgba(0, 0, 0, 0.5)', fontSize: 18 }]}>Salary: {item.address}</Text>
               <Text style={[styles.textPerField, { color: 'rgba(0, 0, 0, 0.5)', fontSize: 18 }]}>Posted: {item.posted}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
               <Text style={[styles.textPerField, { color: 'rgba(0, 0, 0, 1)', fontSize: 18 }]}>Danh gia: 4.7/5</Text>
            </View>
         </TouchableOpacity>
      )
   }

   renderTop = () => {
      return (
         <View style={styles.headerTop}>
            <ButtonIcon
               iconName='arrow-back'
               size={24}
               onPress={() => Actions.pop()}
            />
            <Text style={styles.textPerField}>Saved Jobs</Text>
            <View style={{ width: 45, height: 45 }}></View>
         </View>

      )
   }

   render() {
      return (
         <View style={{ flex: 1 }}>
            {
               this.renderTop()
            }
            <FlatList
               data={data[1].infor}
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
      backgroundColor: '#9AC230',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   textPerField: {
      fontSize: 20,
      color: 'white'
   },
   rowStyle: {
      width: '100%', height: 160,
      paddingLeft: 10,
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
      borderBottomWidth: 8, paddingTop: 3
   },
   viewSalary: {
      width: '100%',
      height: 40,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingRight: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0, 0, 0, 0.1)'
   }
})

const mapStateToProps = (state, props) => {

   return {

   }
}

export default connect(mapStateToProps)(SavedJobs)

const data = [
   {
      id: 1,
      infor: [
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },

      ]
   }
   ,
   {
      id: 2, infor: [
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'Web Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'Android Developers', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: '.Net/C# Developers', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'Mobile Developers', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'Front-end Developers', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'React-Native Developers', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },

      ]
   },
   {
      id: 3, infor: [
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },

      ]
   },
   {
      id: 4, infor: [
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },

      ]
   },
   {
      id: 5, infor: [
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },

      ]
   },
   {
      id: 6, infor: [
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },

      ]
   },
   {
      id: 7, infor: [
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },

      ]
   },
   {
      id: 8, infor: [
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },

      ]
   },
   {
      id: 9, infor: [
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },
         { id: 1, jobName: 'IOS Engineer', companyName: 'Cty Co phan Luci', salary: '', posted: '20/10/2018', address: 'Ha Noi' },

      ]
   },
]

 // Swift Engineer  Android Developers  Web Developers   Back-end Developers  Front-end Developers   PHP Engineer      .NET/C# Developer        Winform Developers   
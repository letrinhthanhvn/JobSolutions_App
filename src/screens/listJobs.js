import React, { PureComponent } from 'react';
import {
   View,
   Text,
   FlatList,
   TouchableOpacity,
   StyleSheet,
   Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import ButtonIcon from '../components/ButtonIcon';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { mainColor } from '../common/colorBG';
import StarRating from 'react-native-star-rating';
import Search from 'react-native-search-box';
import _ from 'lodash';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

var radio_props = [
   { label: 'Tên Job', value: 0 },
   { label: 'Tên công ty', value: 1 },
   { label: 'Địa điểm', value: 2 }
];

const SCREEN_WIDTH = Dimensions.get('window').width;
class ListJobs extends PureComponent {

   constructor(props) {
      super(props)

      this.state = {
         listJobs: [],
         isRefresh: false,
         typeSearch: 0
      }
   }

   async componentDidMount() {
      let res = await fetch('http://localhost:3000/recruitment/get_by_industry_id/' + this.props.id).then((res) => res.json());
      // console.log('res:::::::ListJobs', res)
      if (res.status == 'SUCCESS') {
         this.setState({
            listJobs: res.results
         })
      } else {

      }
   }

   renderField = ({ item, index }) => {
      return (
         <TouchableOpacity style={styles.rowStyle}
            onPress={() => this.onPressJob(item)}
         >
            <View>
               <Text style={[styles.textPerField, { color: '#429ef4', fontWeight: 'bold', width: '75%' }]} numberOfLines={1}>{item.work_name}</Text>
            </View>
            <View style={{ marginTop: 5 }}>
               <Text style={[styles.textPerField, { color: 'rgba(0, 0, 0, 0.5)', width: '75%', fontSize: 18 }]} numberOfLines={1}>{item.location}</Text>
            </View>
            <View style={styles.viewSalary}>
               <Text style={[styles.textPerField, { color: 'rgba(0, 0, 0, 0.5)', fontSize: 18 }]}>Salary: {item.min_salary}$ - {item.max_salary}$</Text>
            </View>
            <View style={[styles.textPerField, { marginTop: 2 }]}>
               <Text style={[styles.textPerField, styles.deadline]}>OutOfDate: {moment(item.deadline).format('YYYY-MM-DD')}</Text>
            </View>
            {/* <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
               <Text style={[styles.textPerField, { color: 'rgba(0, 0, 0, 1)', fontSize: 18 }]}>Danh gia: 4.7/5</Text>
               <StarRating
                  disabled={false}
                  maxStars={5}
                  emptyStar={'ios-star-outline'}
                  fullStar={'ios-star'}
                  halfStar={'ios-star-half'}
                  iconSet={'Ionicons'}
                  rating={4}
                  fullStarColor={mainColor}
               selectedStar={(rating) => this.onStarRatingPress(rating)}
               />
            </View> */}
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
            <Text style={styles.textPerField}>{this.props.fieldName}</Text>
            <View style={{ width: 45, height: 45 }}></View>
         </View>
      )
   }

   render() {
      const { listJobs } = this.state
      console.log('this.props', this.props)
      return (
         <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
            {
               this.renderTop()
            }
            <View style={{ width: '100%', height: 50, alignItems: "center", justifyContent: 'center' }}>
               <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  formHorizontal={true}
                  labelHorizontal={true}
                  buttonColor={'#2196f3'}
                  animation={true}
                  onPress={(value) => { this.setState({ typeSearch: value }) }}
               />
            </View>
            <Search
               ref="search_box"
               onChangeText={(text) => this.onChangeText(text)}
               onSearch={(text) => {
                  this.state.typeSearch == 0 ? this.searchByJobName(text) : this.state.typeSearch == 1 ? this.searchByCompanyName(text) : this.searchByAddressName(text)
               }}
            />
            <FlatList
               data={listJobs}
               renderItem={this.renderField}
               keyExtractor={(item, index) => String(index)}
               onRefresh={this.onRefresh}
               refreshing={this.state.isRefresh}
            />
         </View>
      )
   }

   onRefresh = async () => {
      this.setState({
         isRefresh: true
      })
      let res = await fetch('http://localhost:3000/recruitment/get_by_industry_id/' + this.props.id).then((res) => res.json());
      setTimeout(() => {
         this.setState({
            isRefresh: false,
            listJobs: res.results
         })
      }, 500)
   }

   onPressJob = (item) => {
      // if (this.props.userName) {
      Actions.jobDetail({ job: item, industry_id: this.props.id })
      // } else {
      // alert('Ban chua dang nhap')
      // }
   }

   // renderRow = (item, sectionId, index) => {
   //    return (
   //      <TouchableHightLight
   //        style={{
   //          height: rowHeight,
   //          justifyContent: 'center',
   //          alignItems: 'center'}}
   //      >
   //        <Text>{item.name}</Text>
   //      </TouchableHightLight>
   //    );
   //  }

   // Important: You must return a Promise
   beforeFocus = () => {
      return new Promise((resolve, reject) => {
         console.log('beforeFocus');
         resolve();
      });
   }

   // Important: You must return a Promise
   onFocus = (text) => {
      return new Promise((resolve, reject) => {
         console.log('onFocus', text);
         resolve();
      });
   }

   // Important: You must return a Promise
   afterFocus = () => {
      return new Promise((resolve, reject) => {
         console.log('afterFocus');
         resolve();
      });
   }

   // onchangeText
   onChangeText = (text) => {
      console.log('text', text)
   }

   // search
   searchByJobName = async (text) => {
      // let jobs =  this.state.listJobs.filter(job => job.work_name.toLowerCase().includes(text.toLowerCase()))
      // setTimeout(() => {
      //    // console.log('jobsSearch,::::::', jobs)
      //    if (jobs.length > 0) {
      //       Actions.resultSearch({ listJobsSearch: jobs })
      //    } else {
      //       alert('Khong tim thay cong viec can tim!')
      //    }
      // }, 200)
      let res = await fetch('http://localhost:3000/recruitment/search?industry_id=' + this.props.id + '&work_name=' + text, {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         }
      }).then((res) => res.json())
      if (res.status == 'SUCCESS') {
         Actions.resultSearch({ listJobsSearch: res.results })
      } else {
         alert("Khong co ket qua tim kiem!")
      }
   }

   searchByCompanyName = async (text) => {
      let res = await fetch('http://localhost:3000/recruitment/search?industry_id=' + this.props.id + '&company_name=' + text + '&limit=5&offset=0', {
         // method: 'GET',
         // headers: {
         //    'Accept': 'application/json',
         //    'Content-Type': 'application/json'
         // }
      }).then((res) => res.json())
      if (res.status == 'SUCCESS') {
         Actions.resultSearch({ listJobsSearch: res.results })
      } else {
         alert("Khong co ket qua tim kiem!")
      }
   }

   searchByAddressName = async (text) => {
      // http://localhost:3000/recruitment/search?industry_id=' this.props.id + '&location=' + text + '%20noi&limit=5&offset=0'

      let res = await fetch('http://localhost:3000/recruitment/search?industry_id=' + this.props.id + '&location=' + text + '&limit=5&offset=0', {
         // method: 'GET',
         // headers: {
         //    'Accept': 'application/json',
         //    'Content-Type': 'application/json'
         // }
      }).then((res) => res.json())
      if (res.status == 'SUCCESS') {
         Actions.resultSearch({ listJobsSearch: res.results })
      } else {
         alert("Khong co ket qua tim kiem!")
      }
   }

}

const styles = StyleSheet.create({
   headerTop: {
      width: '100%',
      height: 50,
      backgroundColor: mainColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },

   textPerField: {
      fontSize: 20,
      color: 'white'
   },

   rowStyle: {
      width: '100%', height: 150,
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
      marginTop: 10,
   },

   viewSalary: {
      width: '100%',
      height: 40,
      alignItems: 'center',
      flexDirection: 'row',
      paddingRight: 10,
   },
   deadline: {
      color: 'rgba(0, 0, 0, 0.5)',
      fontSize: 18,
   }
})

const mapStateToProps = (state, props) => {

   return {
      // userName: state.jobSolutions.userName
   }
}

export default connect(mapStateToProps)(ListJobs)

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
import React, { PureComponent } from 'react';
import {
   View,
   Text,
   FlatList,
   TouchableOpacity,
   StyleSheet,
   Alert,
   Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import ButtonIcon from '../components/ButtonIcon';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { savedJob } from '../redux/actions/jobSolutions';
import { mainColor } from '../common/colorBG';

const SCREEN_WIDTH = Dimensions.get('window').width;
class SavedJobs extends PureComponent {

   constructor(props) {
      super(props)

      this.state = {
         listSavedJobs: [],
         job: {}
      }
   }

   async componentDidMount() {
      // const { user, savedJobs } = this.props
      // let res = await fetch('http://localhost:3000/users/get_rec_by_candidate/' + user.candidate_id).then((res) => res.json())
      // console.log('res', res)
      // if (res.status == "SUCCESS") {
      //    this.setState({
      //       listSavedJobs: res.list_jobs
      //    })
      // } else {
      //    console.log('fetch failed')
      // }

   }

   renderField = ({ item, index }) => {
      return (
         <TouchableOpacity style={styles.rowStyle}
            onPress={() => this.detailJob(item)}
         >
            <View style={styles.nameJobDelete}>
               <Text style={[styles.textPerField, { color: '#429ef4', fontWeight: 'bold', width: '75%' }]} numberOfLines={1}>{item.work_name}</Text>
               <ButtonIcon iconName='delete' iconColor='gray'
                  onPress={() => this.deleteSavedJob(item)}
               />
            </View>
            <View style={[styles.viewSalary, { marginTop: 5 }]}>
               <Text style={[styles.textPerField, { color: 'rgba(0, 0, 0, 0.5)', width: '25%', fontSize: 18 }]} numberOfLines={1}>{item.location}</Text>
               <Text style={[styles.textPerField, { color: 'rgba(0, 0, 0, 0.5)', fontSize: 18 }]}>Posted: {moment(item.deadline).format('YYYY-MM-DD')}</Text>
            </View>
            {/* <View style={styles.viewSalary}>

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
            {
               this.props.savedJobs.length != 0 ?
                  <FlatList
                     data={this.props.savedJobs}
                     renderItem={this.renderField}
                     keyExtractor={(item, index) => String(index)}
                  />
                  :
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                     <Text style={{ fontSize: 24, color: 'black' }}>Bạn chưa lưu công việc nào!</Text>
                  </View>
            }
         </View>
      )
   }

   detailJob = async (job) => {
      let res = await fetch('http://localhost:3000/recruitment/get_by_industry_id/' + job.industry_id).then((res) => res.json());
      // console.log('res:::::::ListJobs', res)
      if (res.status == 'SUCCESS') {
         this.setState({
            job: res.results.find(e => e.recruitment_id == job.recruitment_id)
         })
         setTimeout(() => {
            Actions.jobDetail({ job: this.state.job, industry_id: this.props.id })
         }, 200)
      } else {

      }
   }

   deleteSavedJob = (job) => {
      Alert.alert(
         'Notice!',
         'Are you sure delete this job?',
         [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => this.props.savedJob({ candidate_id: this.props.user.candidate_id, job: job }) },
         ],
         { cancelable: false }
      )
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
      width: SCREEN_WIDTH - 10, height: 100,
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
   },
   viewSalary: {
      width: '100%',
      height: 40,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingRight: 10,
   },
   nameJobDelete: {
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: 'center'
   }
})

const mapDispatchToProps = {
   savedJob
}

const mapStateToProps = (state, props) => {

   let savedJobs = state.jobSolutions.savedJobs
   let candidate_id = state.jobSolutions.user.candidate_id
   let savedJobsList = []

   if (savedJobs && candidate_id != null) {
      savedJobsList = savedJobs[candidate_id]
   }

   return {
      user: state.jobSolutions.user,
      savedJobs: savedJobsList || []
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedJobs)



 // Swift Engineer  Android Developers  Web Developers   Back-end Developers  Front-end Developers   PHP Engineer      .NET/C# Developer        Winform Developers   
import React, { PureComponent } from 'react';

import {
   View,
   Text,
   StyleSheet,
   ScrollView,
   Dimensions,
   Alert,
   ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';
import ButtonIcon from '../components/ButtonIcon';
import { Actions } from 'react-native-router-flux';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-material-kit/lib/mdl';
import moment from 'moment';
import { savedJob, savedCompanyFunc, sendRating } from '../redux/actions/jobSolutions';
import { mainColor } from '../common/colorBG';
import StarRating from 'react-native-star-rating';
import _ from 'lodash';

const SCREEN_WIDTH = Dimensions.get('window').width;

class JobDetail extends PureComponent {

   constructor(props) {
      super(props)

      this.state = {
         isFollowed: false,
         companyInfor: {},
         companyUser: [],
         // isSaved: false
         ratingAll: null,
         ratingUser: 0,
         isLoading: true
      }
   }

   async componentDidMount() {
      setTimeout(() => this.setState({
         isLoading: false,

      }), 500)
      console.log('componenDidMountJobDetail')
      let res = await fetch('http://localhost:3000/company/get_by_id/' + this.props.job.company_id_fk).then((res) => res.json());
      let resRank = await fetch('http://localhost:3000/recruitment/average_rating_point', {
         method: "POST",
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            recruitment_id: this.props.job.recruitment_id
         })
      }).then((res) => res.json())
      if (resRank.status == "SUCCESS") {
         console.log('SUCCESS')
         this.setState({
            companyInfor: res.company,
            companyUser: res.company_user,
            ratingAll: Math.round(resRank.result)
         })
         console.log('company', res.company, 'companyUser', res.company_user)
      } else {
         console.log('fetch failed')
      }
      // this.checkSavedJob()
   }

   componentWillReceiveProps(nextProps) {
      if (this.props.savedJobsList != nextProps.savedJobsList) {
         console.log('componentWillReceiveProps')
      }
   }

   // checkSavedJob = () => {
   //    const { recruitment_id } = this.props.job
   //    if (_.includes(this.props.savedJobsList, recruitment_id)) {
   //       this.setState({
   //          isSaved: true
   //       })
   //    }
   // }

   // renderTop = () => {
   //    return (
   //       <View style={styles.headerTop}>
   //          <ButtonIcon
   //             iconName='arrow-back'
   //             size={24}
   //             onPress={() => Actions.pop()}
   //          />
   //          <Text style={styles.textPerField}>{this.props.fieldName}</Text>
   //          <ButtonIcon
   //             iconName='search'
   //             size={24}
   //             // onPress={() => Actions.pop()}
   //          />
   //       </View>
   //    )
   // }

   renderJobName = () => {
      const { job } = this.props
      const { companyInfor } = this.state
      return (
         <View style={{ width: SCREEN_WIDTH - 10, height: 120, borderColor: 'rgba(0, 0, 0, 0.3)', borderWidth: 1, paddingLeft: 10, borderRadius: 5,
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
         }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
               <Text style={{ fontSize: 20, fontWeight: '600', color: '#429ef4' }}>{job.work_name}</Text>
               <ButtonIcon iconName={this.props.savedJobs.length == 0 ? 'favorite-border' : this.props.savedJobs.find(e => e.recruitment_id == job.recruitment_id) ? 'favorite' : 'favorite-border'}
                  iconColor={this.props.savedJobs.length == 0 ? 'gray' : this.props.savedJobs.find(e => e.recruitment_id == job.recruitment_id) ? 'rgb(244, 66, 98)' : 'gray'}
                  onPress={() => this.savedJob(job)}
               />
            </View>
            <View style={{ marginTop: 10 }}>
               <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>{companyInfor.company_name}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
               {
                  this.state.ratingAll == null
                     ?
                     <Text>Bai dang nay chua co danh gia nao</Text>
                     :
                     <StarRating
                        disabled={true}
                        maxStars={5}
                        emptyStar={'ios-star-outline'}
                        fullStar={'ios-star'}
                        halfStar={'ios-star-half'}
                        iconSet={'Ionicons'}
                        rating={this.state.ratingAll}
                        fullStarColor={mainColor}
                     // selectedStar={(rating) => this.onStarRatingPress(rating)}
                     />
               }
            </View>
         </View>
      )
   }

   renderBelowJobName = () => {
      const { job } = this.props
      return (
         <View style={{ width: SCREEN_WIDTH - 10, paddingLeft: 7, borderColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 5, 
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
         }}>
            <View style={styles.rowInBelowJobName}>
               <Icon name='location-on' size={24} color='gray' />
               <Text style={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.7)', paddingLeft: 10 }}>{job.location}</Text>
            </View>
            <View style={styles.rowInBelowJobName}>
               <Icon name='attach-money' size={24} color='gray' />
               <Text style={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.7)', paddingLeft: 10 }}>Min: {job.min_salary}$</Text>
            </View>
            <View style={styles.rowInBelowJobName}>
               <Icon name='attach-money' size={24} color='gray' />
               <Text style={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.7)', paddingLeft: 10 }}>Max: {job.max_salary}$</Text>
            </View>
            <View style={styles.rowInBelowJobName}>
               <Icon name='date-range' size={24} color='gray' />
               <Text style={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.7)', paddingLeft: 10 }}>{moment(job.deadline).format('YYYY-MM-DD')}</Text>
            </View>
         </View>
      )
   }

   renderRating = () => {
      return (
         <View style={{ height: 50, flexDirection: 'row', width: SCREEN_WIDTH - 20, justifyContent: 'space-around', margin: 10, alignItems: 'center' }}>
            {
               this.props.ratingJob.length == 0 ?
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                     <StarRating
                        disabled={false}
                        maxStars={5}
                        emptyStar={'ios-star-outline'}
                        fullStar={'ios-star'}
                        halfStar={'ios-star-half'}
                        iconSet={'Ionicons'}
                        rating={this.state.ratingUser}
                        fullStarColor={mainColor}
                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                     />
                     <Button style={{ height: 50, width: 50, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                        onPress={this.sendRating}
                     >
                        <Text>Send</Text>
                     </Button>
                  </View>
                  :
                  this.props.rating.filter((e) => e.recruitment_id == this.props.job.recruitment_id).length == 1 ?
                     <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <StarRating
                           disabled={true}
                           maxStars={5}
                           emptyStar={'ios-star-outline'}
                           fullStar={'ios-star'}
                           halfStar={'ios-star-half'}
                           iconSet={'Ionicons'}
                           rating={Math.round(this.props.rating.filter((e) => e.recruitment_id == this.props.job.recruitment_id)['point'])}
                           fullStarColor={mainColor}
                           selectedStar={(rating) => this.onStarRatingPress(rating)}
                        />
                        <Button style={{ height: 50, width: 50, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                           onPress={this.sendRating}
                        >
                           <Text>Sended</Text>
                        </Button>
                     </View>
                     :

                     <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <StarRating
                           disabled={false}
                           maxStars={5}
                           emptyStar={'ios-star-outline'}
                           fullStar={'ios-star'}
                           halfStar={'ios-star-half'}
                           iconSet={'Ionicons'}
                           rating={this.state.ratingUser}
                           fullStarColor={mainColor}
                           selectedStar={(rating) => this.onStarRatingPress(rating)}
                        />
                        <Button style={{ height: 50, width: 50, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                           onPress={this.sendRating}
                        >
                           <Text>Send</Text>
                        </Button>
                     </View>
            }
         </View>
      )
   }

   renderJobDescription = () => {
      const { job } = this.props
      return (
         <View style={{ padding: 10, borderColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 5,
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
         }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black' }}>Job Description</Text>
            <View style={{ marginTop: 10 }}>
               <Text style={{ fontSize: 18, color: 'black' }}>{job.description}</Text>
            </View>
         </View>
      )
   }

   renderJobRequirement = () => {
      const { job } = this.props
      return (
         <View style={{ borderColor: 'rgba(0, 0, 0, 0.3)', borderWidth: 1, borderRadius: 5, 
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
         }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', paddingLeft: 10 }}>Job Requirement</Text>
            <View style={{ marginTop: 10, paddingLeft: 10 }}>
               <Text style={{ fontSize: 18, color: 'black' }}>{job.requirement}</Text>
            </View>
         </View>
      )
   }

   renderMoreInfor = () => {
      const { job } = this.props
      return (
         <View style={{ borderColor: 'rgba(0, 0, 0, 0.3)', borderWidth: 1, borderRadius: 5,
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
         }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', paddingLeft: 10 }}>More Informations:</Text>
            <View style={{ flexDirection: 'row', width: '100%', height: 40, alignItems: 'center', marginTop: 10 }}>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, fontWeight: '500' }}>Degree: </Text>
               <Text style={{ fontSize: 18, color: 'gray', paddingLeft: 10 }}>{data.address}</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', height: 40, alignItems: 'center' }}>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, fontWeight: '500' }}>Age: </Text>
               <Text style={{ fontSize: 18, color: 'gray', paddingLeft: 10 }}>{job.min_age} - {job.max_age}</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', height: 40, alignItems: 'center' }}>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, fontWeight: '500' }}>Gender: </Text>
               <Text style={{ fontSize: 18, color: 'gray', paddingLeft: 10 }}>{job.gender_requirement == 2 ? 'Nam - Nữ' : job.gender_requirement == 1 ? 'Nữ' : 'Nam'}</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', height: 40, alignItems: 'center' }}>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, fontWeight: '500' }}>Working Type: </Text>
               <Text style={{ fontSize: 18, color: 'gray', paddingLeft: 10 }}>{job.type_candidate == 4 ? 'Intern' : job.type_candidate == 3 ? 'Freelance' : job.type_candidate == 2 ? 'Part time' : 'Offical'}</Text>
            </View>

         </View>
      )
   }

   renderCompanyInfor = () => {
      const { companyInfor } = this.state
      const companyUserContact = this.state.companyUser.length > 0 ? this.state.companyUser[0] : {}
      const { job, savedCompany } = this.props
      // console.log('companyUserContact', this.state.companyUser || this.)
      return (
         <View style={{ borderColor: 'rgba(0, 0, 0, 0.3)', borderWidth: 1, borderRadius: 5, 
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
         }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', paddingLeft: 10 }}>More Company Informations:</Text>
            <View style={{ marginTop: 15 }}>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, fontWeight: '500' }}>{companyInfor.company_name}</Text>
               <View style={{ width: '100%', height: 60, alignItems: 'center', justifyContent: 'center', marginTop: 10, }}>
                  <Button style={{ width: 100, height: 50, backgroundColor: savedCompany.find(e => e.company_id == job.company_id_fk) ? mainColor : 'rgba(0, 0, 0, 0.2)', alignItems: 'center', justifyContent: 'center', borderWidth: this.state.isFollowed ? 2 : 0, borderColor: this.state.isFollowed ? '#429ef4' : null, borderRadius: 5 }}
                     onPress={this.savedCompanyAct}
                  >
                     <Text style={{ fontSize: 18, color: savedCompany.find(e => e.company_id == job.company_id_fk) ? 'white' : "black" }}>{savedCompany.find(e => e.company_id == job.company_id_fk) ? ' Followed' : '+ Follow'}</Text>
                  </Button>
               </View>
            </View>
            <View style={{ width: '100%', height: 50, flexDirection: 'row', marginTop: 10 }}>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, fontWeight: '500' }}>Address: </Text>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, flex: 1 }}>{companyUserContact.address}</Text>
            </View>

            <View style={{ width: '100%', height: 40, flexDirection: 'row', marginTop: 5 }}>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, fontWeight: '500' }}>Contact Person: </Text>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, flex: 1 }}>{companyUserContact.first_name} {companyUserContact.last_name}</Text>
            </View>

            <View style={{ width: '100%', marginTop: 15 }}>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, fontWeight: 'bold' }}>About Company: </Text>
               <View style={{ width: '100%', height: 10 }}></View>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, flex: 1 }}>{companyInfor.intro}</Text>
            </View>
            <View style={{ height: 15, width: '100%' }}></View>
         </View>
      )
   }

   render() {
      return (
         <View style={styles.container}>
            <Header title='Job Detail' viewRight={true} />
            {
               this.state.isLoading ?
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                     <ActivityIndicator size="large" color="green" />
                  </View>
                  :
                  <ScrollView style={{ flex: 1 }}>
                     {
                        this.renderJobName()
                     }
                     {
                        this.renderBelowJobName()
                     }
                     {
                        this.renderRating()
                     }
                     {
                        this.renderJobDescription()
                     }
                     {
                        this.renderJobRequirement()
                     }
                     {
                        this.renderMoreInfor()
                     }
                     {
                        this.renderCompanyInfor()
                     }
                  </ScrollView>
            }
         </View>
      )
   }

   savedCompanyAct = () => {
      const { company_id_fk } = this.props.job
      const { candidate_id } = this.props.user
      if (this.props.user.candidate_id != null) {
         this.props.savedCompanyFunc({ candidate_id: candidate_id, company: { company_id: company_id_fk, nameCompany: this.state.companyInfor.company_name } })
      } else {
         alert('Bạn chưa đăng nhập!')
      }
   }

   savedJob = (job) => {
      const { candidate_id } = this.props.user

      if (this.props.user.candidate_id != '') {
         this.props.savedJob({ candidate_id: candidate_id, job: { recruitment_id: job.recruitment_id, work_name: job.work_name, location: job.location, industry_id: this.props.industry_id, deadline: moment(job.deadline).format('YYYY-MM-DD') } })
         console.log('savedJobs', this.props.savedJobs)
      } else {
         alert('Bạn chưa đăng nhập!')
      }
   }

   sendRating = () => {
      let checkRating = this.props.rating.filter((e) => e.recruitment_id == this.props.job.recruitment_id)
      console.log('checkRating', checkRating)
      if (checkRating.length > 0) {
         alert('Ban da danh gia bai dang nay!')
      } else {
         Alert.alert(
            'Notice!',
            'Do you want to send your rating?',
            [
               { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
               { text: 'OK', onPress: () => this.props.sendRating({ candidate_id: this.props.user.candidate_id, point: this.state.ratingUser, recruitment_id: this.props.job.recruitment_id }) },
            ],
            { cancelable: false }
         )
      }

   }

   onStarRatingPress = (point) => {
      this.setState({
         ratingUser: point
      })
   }
}

const data = {
   id: 1,
   nameJob: 'Lap Trinh Vien',
   nameCompany: 'Cong Ty CP Cong Nghe Tin Hoc H.T.L',
   address: 'Ha Noi',
   fieldJob: 'IT - Software',
   experienced: 'Non-Manager',
   salary: '700 $',
   date: '31/10/2018',
   jobDescription: '1. Tổ chức sắp xếp hệ thống bộ máy kế toán của khối văn phòng công ty một cách khoa học, tiết kiệm, hiệu quả.\n2. Phân công nghiêp vụ cho từng nhân viên trong bộ phận và hướng dẫn các kế toán viên thực hiện các nghiệp vụ thuộc phần hành của mình.',
   jobRequirement: '1. Nắm vững cách hoạch toán tất cả các nghiệp vụ kinh tế phát sinh, nắm vững các quy định về thuế, tài chính, các chính sách chế độ khác hiện hành..\n2. Có chứng chỉ kế toán trưởng.',
   detailAddress: 'Tang 11 toa nha CMC so 11 Duy Tan, Cau Giay, Ha Noi',
   contactPerson: 'Phong Nhan Su',
   companyDes: `Mytour Vietnam Company Limited was established and officially came into the OTA market since 08/2012. As an online travel agent, Mytour Vietnam specializes in providing hotel booking services, flight booking services, and tour booking services with extremely attractive rates, easy and flexible payment methods. 
   What makes the difference of Mytour Vietnam brand is from the dedicated, professional, well-trained team and 24/24 online booking support. In addition, with many useful features on the website such as: Search vacancies, Find hotels with promotions, Find cheap hotels ... Mytour helps the customers to plan their trip in the most convenient and fastest way.
   During the 5 years journey of establishment and development, Mytour.vn brand increasingly has become more and more a reputable brand, has been proved to be one of the best OTA in Vietnam tourism market. \n
   With the guiding principle of “quality and trust as the foundation”, Mytour.vn will surely reach even further in the future to become the leading brand in the e-travel industry in Vietnam.\n
   If you are an enthusiastic person who have a passion for work and have a clear career objective, Mytour is an ideal environment for you to pursue your dream and develop your career.`
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   },
   headerTop: {
      width: '100%',
      height: 50,
      backgroundColor: '#9AC230',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   rowInBelowJobName: {
      alignItems: 'center',
      width: '100%',
      height: 40,
      flexDirection: 'row'
   }
})

const mapDispatchToProps = {
   savedJob, savedCompanyFunc, sendRating
}

const mapStateToProps = (state, props) => {
   let savedJobsList = []
   let savedCompanyList = []
   let savedJobs = state.jobSolutions.savedJobs
   let savedCompany = state.jobSolutions.savedCompany
   let candidate_id = state.jobSolutions.user.candidate_id
   // let ratingJob = state.jobSolutions.rating[candidate_id]
   // if (ratingJob) {
   //    if (rating.length == 0) {
   //       ratingCurrentJob = 0
   //    } else if (ratingJob.filter((e) =>  e.recruitment_id == props.job.recruitment_id).length > 0) {
   //       ratingCurrentJob = ratingJob.filter((e) =>  e.recruitment_id == props.job.recruitment_id).point
   //    }
   // } else {
   //    ratingCurrentJob 
   // }
   if (savedJobs && candidate_id != null) {
      // console.log('savedJobs[candidate_id]', savedJobs[candidate_id])
      savedJobsList = savedJobs[candidate_id]
   }
   if (savedCompany && candidate_id != null) {
      savedCompanyList = savedCompany[String(candidate_id)]
   }
   return {
      user: state.jobSolutions.user,
      savedJobs: savedJobsList || [],
      savedCompany: savedCompanyList || [],
      rating: state.jobSolutions.rating[candidate_id] || [],
      ratingJob: state.jobSolutions.rating[candidate_id] || []
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDetail)
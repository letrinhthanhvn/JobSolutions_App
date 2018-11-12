import React, { PureComponent } from 'react';

import {
   View,
   Text,
   StyleSheet,
   ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import ButtonIcon from '../components/ButtonIcon';
import { Actions } from 'react-native-router-flux';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-material-kit/lib/mdl';
import moment from 'moment';
import { savedJob, savedCompanyFunc } from '../redux/actions/jobSolutions';
import _ from 'lodash';
import { mainColor } from '../common/colorBG';

class JobDetail extends PureComponent {

   constructor(props) {
      super(props)

      this.state = {
         isFollowed: false,
         companyInfor: {},
         companyUser: [],
         // isSaved: false
      }
   }

   async componentDidMount() {
      console.log('componenDidMountJobDetail')
      let res = await fetch('http://localhost:3000/company/get_by_id/' + this.props.job.company_id_fk).then((res) => res.json());
      if (res.status == 'SUCCESS') {
         console.log('SUCCESS')
         this.setState({
            companyInfor: res.company,
            companyUser: res.company_user
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
         <View style={{ width: '100%', height: 85, borderBottomColor: 'rgba(0, 0, 0, 0.3)', borderBottomWidth: 1, paddingLeft: 10 }}>
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
         </View>
      )
   }

   renderBelowJobName = () => {
      const { job } = this.props
      return (
         <View style={{ width: '100%', paddingLeft: 7, borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 10 }}>
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

   renderJobDescription = () => {
      const { job } = this.props
      return (
         <View style={{ paddingLeft: 10, marginTop: 10, }}>
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
         <View style={{ marginTop: 10, }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', paddingLeft: 10 }}>Job Requirement</Text>
            <View style={{ marginTop: 10, paddingLeft: 10 }}>
               <Text style={{ fontSize: 18, color: 'black' }}>{job.requirement}</Text>
            </View>
            <View style={{ height: 10, marginTop: 10, width: '100%', backgroundColor: "rgba(0, 0, 0, 0.1)" }}></View>
         </View>
      )
   }

   renderMoreInfor = () => {
      const { job } = this.props
      return (
         <View style={{ marginTop: 10, }}>
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
            <View style={{ height: 10, marginTop: 10, width: '100%', backgroundColor: "rgba(0, 0, 0, 0.1)" }}></View>
         </View>
      )
   }

   renderCompanyInfor = () => {
      const { companyInfor } = this.state
      const companyUserContact = this.state.companyUser.length > 0 ? this.state.companyUser[0] : {}
      const { job, savedCompany } = this.props
      // console.log('companyUserContact', this.state.companyUser || this.)
      return (
         <View style={{ marginTop: 10 }}>
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
      // console.log('jobDetail:::::', this.state.companyInfor, this.state.companyUser[0])
      console.log('savedJobs::::++++++++', this.props.savedJobs)
      return (
         <View style={styles.container}>
            <Header title='Job Detail' viewRight={true} />
            <ScrollView style={{ flex: 1 }}>
               {
                  this.renderJobName()
               }
               {
                  this.renderBelowJobName()
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
   savedJob, savedCompanyFunc
}

const mapStateToProps = (state) => {
   let savedJobsList = []
   let savedCompanyList = []
   let savedJobs = state.jobSolutions.savedJobs
   let savedCompany = state.jobSolutions.savedCompany
   let candidate_id = state.jobSolutions.user.candidate_id
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
      savedCompany: savedCompanyList || []
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDetail)
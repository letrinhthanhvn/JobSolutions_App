import React, { PureComponent } from 'react';

import {
   View,
   Text,
   FlatList,
   TouchableOpacity,
   StyleSheet,
   ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import ButtonIcon from '../components/ButtonIcon';
import { Actions } from 'react-native-router-flux';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-material-kit/lib/mdl'

class JobDetail extends PureComponent {

   constructor(props) {
      super(props)

      this.state = {
         isFollowed: false
      }
   }

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
      return (
         <View style={{ width: '100%', height: 85, borderBottomColor: 'rgba(0, 0, 0, 0.3)', borderBottomWidth: 1, paddingLeft: 10 }}>
            <View style={{ marginTop: 20 }}>
               <Text style={{ fontSize: 20, fontWeight: '600', color: '#429ef4' }}>{data.nameJob}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
               <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>{data.nameCompany}</Text>
            </View>
         </View>
      )
   }

   renderBelowJobName = () => {
      return (
         <View style={{ width: '100%', paddingLeft: 7, borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 10 }}>
            <View style={styles.rowInBelowJobName}>
               <Icon name='location-on' size={24} color='gray' />
               <Text style={{ fontSize: 18, color: 'gray', paddingLeft: 10 }}>{data.address}</Text>
            </View>
            <View style={styles.rowInBelowJobName}>
               <Icon name='receipt' size={24} color='gray' />
               <Text style={{ fontSize: 18, color: 'gray', paddingLeft: 10 }}>{data.fieldJob}</Text>
            </View>
            <View style={styles.rowInBelowJobName}>
               <Icon name='explore' size={24} color='gray' />
               <Text style={{ fontSize: 18, color: 'gray', paddingLeft: 10 }}>{data.experienced}</Text>
            </View>
            <View style={styles.rowInBelowJobName}>
               <Icon name='attach-money' size={24} color='gray' />
               <Text style={{ fontSize: 18, color: 'gray', paddingLeft: 10 }}>{data.salary}</Text>
            </View>
            <View style={styles.rowInBelowJobName}>
               <Icon name='date-range' size={24} color='gray' />
               <Text style={{ fontSize: 18, color: 'gray', paddingLeft: 10 }}>{data.date}</Text>
            </View>
         </View>
      )
   }

   renderJobDescription = () => {
      return (
         <View style={{ paddingLeft: 10, marginTop: 10, }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black' }}>Job Description</Text>
            <View style={{ marginTop: 10 }}>
               <Text style={{ fontSize: 18, color: 'black' }}>{data.jobDescription}</Text>
            </View>
         </View>
      )
   }

   renderJobRequirement = () => {
      return (
         <View style={{ marginTop: 10, }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', paddingLeft: 10 }}>Job Requirement</Text>
            <View style={{ marginTop: 10, paddingLeft: 10 }}>
               <Text style={{ fontSize: 18, color: 'black' }}>{data.jobRequirement}</Text>
            </View>
            <View style={{ height: 10, marginTop: 10, width: '100%', backgroundColor: "rgba(0, 0, 0, 0.1)" }}></View>
         </View>
      )
   }

   renderMoreInfor = () => {
      return (
         <View style={{ marginTop: 10, }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', paddingLeft: 10 }}>More Informations:</Text>
            <View style={{ flexDirection: 'row', width: '100%', height: 40, alignItems: 'center', marginTop: 10 }}>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, fontWeight: '500' }}>Degree: </Text>
               <Text style={{ fontSize: 18, color: 'gray', paddingLeft: 10 }}>{data.address}</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', height: 40, alignItems: 'center' }}>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, fontWeight: '500' }}>Age: </Text>
               <Text style={{ fontSize: 18, color: 'gray', paddingLeft: 10 }}>{data.address}</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', height: 40, alignItems: 'center' }}>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, fontWeight: '500' }}>Gender: </Text>
               <Text style={{ fontSize: 18, color: 'gray', paddingLeft: 10 }}>{data.address}</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', height: 40, alignItems: 'center' }}>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, fontWeight: '500' }}>Working Type: </Text>
               <Text style={{ fontSize: 18, color: 'gray', paddingLeft: 10 }}>{data.address}</Text>
            </View>
            <View style={{ height: 10, marginTop: 10, width: '100%', backgroundColor: "rgba(0, 0, 0, 0.1)" }}></View>
         </View>
      )
   }

   renderCompanyInfor = () => {
      return (
         <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', paddingLeft: 10 }}>More Informations:</Text>
            <View style={{ marginTop: 15 }}>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, fontWeight: '500' }}>{data.nameCompany}</Text>
               <View style={{ width: '100%', height: 60, alignItems: 'center', justifyContent: 'center', marginTop: 10,  }}>
                  <Button style={{ width: 100, height: 50, backgroundColor: 'rgba(0, 0, 0, 0.2)', alignItems: 'center', justifyContent: 'center', borderWidth: this.state.isFollowed ? 2 : 0, borderColor: this.state.isFollowed ? '#429ef4' : null, borderRadius: 5 }}
                     onPress={this.clickFollow}
                  >
                     <Text style={{ fontSize: 18, color: this.state.isFollowed ? '#429ef4' : "white" }}>{this.state.isFollowed ? ' Followed' : '+ Follow'}</Text>
                  </Button>
               </View>
            </View>
            <View style={{ width: '100%', height: 50, flexDirection: 'row', marginTop: 10 }}>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, fontWeight: '500' }}>Address: </Text>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, flex: 1 }}>{data.detailAddress}</Text>
            </View>

            <View style={{ width: '100%', height: 40, flexDirection: 'row', marginTop: 5 }}>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, fontWeight: '500' }}>Contact Person: </Text>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, flex: 1 }}>{data.contactPerson}</Text>
            </View>

            <View style={{ width: '100%', marginTop: 15 }}>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, fontWeight: 'bold' }}>About Company: </Text>
               <View style={{ width: '100%', height: 10 }}></View>
               <Text style={{ fontSize: 18, color: 'black', paddingLeft: 10, flex: 1 }}>{data.companyDes}</Text>
            </View>
            <View style={{ height: 15, width: '100%' }}></View>
         </View>
      )
   }

   render() {
      return (
         <View style={styles.container}>
            <Header title='Job Detail' />
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

   clickFollow = () => {
      this.setState({
         isFollowed: !this.state.isFollowed
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
      backgroundColor: '#242843',
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

const mapStateToProps = (state) => {
   return {

   }
}

export default connect(mapStateToProps)(JobDetail)
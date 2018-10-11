import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import SavedCompanyComponent from '../../screens/SavedCompany';
import {
   View,
   Text,
   StyleSheet,
   FlatList,
   TouchableOpacity
} from 'react-native';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ButtonIcon from '../components/ButtonIcon';
import { Actions } from 'react-native-router-flux';

class SavedCompany extends PureComponent {


   renderCompany = ({ item, index }) => {
      return (
         <TouchableOpacity style={styles.companyRow}
            onPress={() => this.clickCompany(item)}
         >
            <View style={{ marginTop: 5, paddingLeft: 10 }}>
               <Text style={[styles.text, { color: '#429ef4', fontWeight: '500' }]}>{item.nameCompany}</Text>
            </View>
            <View style={{ marginTop: 5, paddingLeft: 10 }}>
               <Text style={[styles.text, { fontSize: 18 }]}>{item.address}</Text>
            </View>
            <View style={{ paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
               <Text style={[styles.text, { fontSize: 18 }]}>Job Posting: 25</Text>
               <ButtonIcon
                  iconName='delete'
                  iconColor='gray'
                  size={24}
               />
            </View>
            <View style={{ height: 5, backgroundColor: 'rgba(0, 0, 0, 0.1)', position: "absolute", bottom: 0, left: 0, right: 0 }}></View>
         </TouchableOpacity>
      )
   }

   render() {
      return (
         <View style={styles.container}>
            <Header title='Companies' viewRight={true}/>
            <FlatList
               data={data}
               renderItem={this.renderCompany}
               keyExtractor={(item, index) => String(index)}
            />
         </View>
      )
   }

   clickCompany = (company) => {
      console.log('company', company)
      Actions.companyDetail({ companyDetail: company })
   }
}

const data = [
   {
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
      companyDes: `Mytour Vietnam Company Limited was established and officially came into the OTA market since 08/2012. As an online travel agent, Mytour Vietnam specializes in providing hotel booking services, flight booking services, and tour booking services with extremely attractive rates, easy and flexible payment methods. What makes the difference of Mytour Vietnam brand is from the dedicated, professional, well-trained team and 24/24 online booking support. In addition, with many useful features on the website such as: Search vacancies, Find hotels with promotions, Find cheap hotels ... Mytour helps the customers to plan their trip in the most convenient and fastest way.
   During the 5 years journey of establishment and development, Mytour.vn brand increasingly has become more and more a reputable brand, has been proved to be one of the best OTA in Vietnam tourism market. \n
   With the guiding principle of “quality and trust as the foundation”, Mytour.vn will surely reach even further in the future to become the leading brand in the e-travel industry in Vietnam.\n
   If you are an enthusiastic person who have a passion for work and have a clear career objective, Mytour is an ideal environment for you to pursue your dream and develop your career.
   Mytour Vietnam Company Limited was established and officially came into the OTA market since 08/2012. As an online travel agent, Mytour Vietnam specializes in providing hotel booking services, flight booking services, and tour booking services with extremely attractive rates, easy and flexible payment methods. 
   What makes the difference of Mytour Vietnam brand is from the dedicated, professional, well-trained team and 24/24 online booking support. In addition, with many useful features on the website such as: Search vacancies, Find hotels with promotions, Find cheap hotels ... Mytour helps the customers to plan their trip in the most convenient and fastest way.
   During the 5 years journey of establishment and development, Mytour.vn brand increasingly has become more and more a reputable brand, has been proved to be one of the best OTA in Vietnam tourism market. \n
   With the guiding principle of “quality and trust as the foundation”, Mytour.vn will surely reach even further in the future to become the leading brand in the e-travel industry in Vietnam.\n
   If you are an enthusiastic person who have a passion for work and have a clear career objective, Mytour is an ideal environment for you to pursue your dream and develop your career. :::::::`},
   {
      id: 2,
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
      If you are an enthusiastic person who have a passion for work and have a clear career objective, Mytour is an ideal environment for you to pursue your dream and develop your career.`},
   {
      id: 3,
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
         If you are an enthusiastic person who have a passion for work and have a clear career objective, Mytour is an ideal environment for you to pursue your dream and develop your career.`}
]

const styles = StyleSheet.create({
   container: {
      flex: 1
   },

   companyRow: {
      height: 95,
      width: '100%',
   },

   text: {
      fontSize: 20,
      color: 'rgba(0, 0, 0, 0.5)'
   }
})

const mapDispathToProps = {

}

const mapStateToProps = (state) => {
   return {
      // language: state.config.language
   }
}

export default connect(mapStateToProps, mapDispathToProps)(SavedCompany);

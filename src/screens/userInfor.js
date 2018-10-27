import React, { PureComponent } from 'react';
import {
   StyleSheet,
   View,
   Text,
   ScrollView,
   Dimensions,
   TouchableOpacity
} from 'react-native';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFont from 'react-native-vector-icons/FontAwesome';

const SCEEN_WIDTH = Dimensions.get('window').width;

class UserInfor extends PureComponent {

   renderHeader = () => {
      return (
         <View style={styles.containerHeader}>
            <View style={styles.imagaAvatar}>
               <Icon name='perm-identity' size={60} color='gray' />
            </View>
            <View style={styles.containerText}>
               <Text style={styles.nameUser}>Thanh Le Trinh</Text>
            </View>
         </View>
      )
   }

   renderSalary = () => {
      return (
         <TouchableOpacity style={[styles.containerSalary, styles.border]}>
            <Text style={styles.headerText}>Mức lương:</Text>
            <View style={styles.containerSalaryText}>
               <Text style={styles.contentText}>Min-salary: 500$</Text>
               <Text style={styles.contentText}>Max-salary: 1000$</Text>
            </View>
         </TouchableOpacity>
      )
   }

   renderEmailPhone = () => {
      return (
         <View style={styles.containerEmailPhone}>
            <TouchableOpacity style={[styles.emailOrPhone, styles.border]}>
               <Icon name='email' size={50} color='#9AC230' />
               <Text style={styles.headerText}>Email</Text>
               <Text style={[styles.contentText, { color: 'rgba(0, 0, 0, 0.7)' }]}>letrinhthanh45@gmail.com</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.emailOrPhone, styles.border]}>
               <Icon name='phone' size={50} color='#9AC230' />
               <Text style={styles.headerText}>Phone</Text>
               <Text style={[styles.contentText, { color: 'rgba(0, 0, 0, 0.7)' }]}>0966618558</Text>
            </TouchableOpacity>
         </View>
      )
   }

   renderDegreeAddress = () => {
      return (
         <View style={styles.containerEmailPhone}>
            <TouchableOpacity style={[styles.emailOrPhone, styles.border]}>
               <IconFont name='book' size={50} color='#9AC230' />
               <Text style={styles.headerText}>Trình độ học vấn</Text>
               <Text style={[styles.contentText, { color: 'rgba(0, 0, 0, 0.7)' }]}>Dai hoc</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.emailOrPhone, styles.border]}>
               <Icon name='home' size={50} color='#9AC230' />
               <Text style={styles.headerText}>Địa chỉ</Text>
               <Text style={[styles.contentText, { color: 'rgba(0, 0, 0, 0.7)' }]}>Hà Nội</Text>
            </TouchableOpacity>
         </View>
      )
   }

   renderIntroduce = () => {
      return (
         <TouchableOpacity style={[styles.containerIntroduce, { padding: 10 }]}>
            <Text style={[styles.headerText]}>Giới thiệu bản thân</Text>
         </TouchableOpacity>
      )
   }

   renderJobSalaryNow = () => {
      return (
         <View style={styles.containerEmailPhone}>
            <TouchableOpacity style={[styles.emailOrPhone, styles.border]}>
               <Icon name='work' size={50} color='#9AC230' />
               <Text style={styles.headerText}>Công việc hiện tại</Text>
               <Text style={[styles.contentText, { color: 'rgba(0, 0, 0, 0.7)' }]}>Front-end</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.emailOrPhone, styles.border]}>
               <Icon name='monetization-on' size={50} color='#9AC230' />
               <Text style={styles.headerText}>Mức lương hiện tại</Text>
               <Text style={[styles.contentText, { color: 'rgba(0, 0, 0, 0.7)' }]}>10 000 000</Text>
            </TouchableOpacity>
         </View>
      )
   }

   render() {
      return (
         <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
            <Header title='User informations' viewRight={true} />
            <ScrollView style={styles.container}>
               {
                  this.renderHeader()
               }
               {
                  this.renderSalary()
               }
               {
                  this.renderEmailPhone()
               }
               {
                  this.renderDegreeAddress()
               }
               {
                  this.renderIntroduce()
               }
               {
                  this.renderJobSalaryNow()
               }
            </ScrollView>
         </View>

      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      // justifyContent: 'center',
      // alignItems: 'center'
   },
   containerHeader: {
      height: 200,
      width: '100%',
      alignItems: "center",
      backgroundColor: 'rgba(0, 0, 0, 0.1)'
   },
   imagaAvatar: {
      width: 110,
      height: 110,
      borderRadius: 55,
      borderWidth: 2,
      borderColor: '#9AC230',
      marginTop: 20,
      alignItems: 'center',
      justifyContent: "center"
   },
   containerText: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
   },
   nameUser: {
      fontSize: 16,
      fontWeight: '500'
   },
   border: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.3)',
   },
   containerSalary: {
      marginTop: 10,
      height: 100,
      padding: 15,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      marginLeft: 10,
      marginRight: 10
   },
   headerText: {
      fontWeight: '600',
      fontSize: 18
   },
   contentText: {
      fontSize: 14,
   },
   containerSalaryText: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   containerEmailPhone: {
      height: 150,
      margin: 10,
      justifyContent: 'space-between',
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      flexDirection: "row"
   },
   emailOrPhone: {
      width: (SCEEN_WIDTH - 30) / 2,
      height: '100%',
      alignItems: "center",
      paddingTop: 25,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
   },
   containerIntroduce: {
      height: 100,
      margin: 10,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
   }
});

export default UserInfor;

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import CompanyDetailComponent from '../../screens/CompanyDetail';
import {
   View,
   StyleSheet,
   Image,
   ScrollView,
   Animated,
   Text,
   TouchableOpacity
} from 'react-native';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/MaterialIcons';


class CompanyDetail extends PureComponent {

   constructor(props) {
      super(props)

      this.scrollY = new Animated.Value(0)
   }

   renderNameCompany = (companyDetail) => {
      return (
         <View style={styles.containerNameComp}>
            <View style={styles.logoNameComp}>
               <Image source={require('../assets/bachkhoa_logo.jpg')} 
                  style={styles.imageLogo} 
                  resizeMode='cover' 
               />
            </View>
            <View>
               <View style={styles.textHeaderStyle}>
                  <Text style={styles.textNameComp}>{companyDetail.nameCompany}</Text>
               </View>
               <View style={[styles.textHeaderStyle, { height: 30 }]}>
                  <Text style={styles.textFieldJob}>{companyDetail.fieldJob}</Text> 
               </View>
            </View>
         </View>
      )
   }

   renderDecribeComp = (companyDetail) => {
      return (
         <View style={styles.describeComp}>
            <View style={styles.viewCompDes}>
               <Text style={styles.textCompDes} numberOfLines={7}>{companyDetail.companyDes}</Text>
            </View>
            <TouchableOpacity style={styles.readMore}>
               <Icon name='more-horiz' size={28} color='black' />
            </TouchableOpacity>
         </View>
      )
   }

   renderAddress = (companyDetail) => {
      return (
         <View style={styles.addressStyle}>
            <Text style={styles.textAddress}>Địa chỉ văn phòng chính:</Text>
            <TouchableOpacity style={styles.viewDetailAddress}>
               <Text style={styles.textDetaliAddress}>{companyDetail.detailAddress}</Text>
               <Icon name='chevron-right' size={28} color='rgba(0, 0, 0, 0.3)' />
            </TouchableOpacity>
         </View>
      )
   }

   renderContactInfor = () => {
      return (
         <View style={styles.viewContact}>
            <Text style={styles.textInforContact}>Thông tin liên hệ</Text>
            <TouchableOpacity style={[styles.rowContact, { marginTop: 10 }]}>
               <Icon name='home' size={24} color='gray' />
               <Text style={{ color: 'black', fontSize: 16, paddingLeft: 15 }}>facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rowContact}>
               <Icon name='home' size={24} color='gray' />
               <Text style={{ color: 'black', fontSize: 16, paddingLeft: 15 }}>email</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowContact}>
               <Icon name='home' size={24} color='gray' />
               <Text style={{ color: 'black', fontSize: 16, paddingLeft: 15 }}>email</Text>
            </TouchableOpacity>

         </View>
      )
   }

   renderNumberMember = () => {
      return (
         <View style={styles.viewNumberMems}>
            <View style={styles.iconMems}>
               <Icon name='people' size={70} color='#9AC230'/>
            </View>
            <Text style={styles.textMems}>25-30 nhan vien</Text>
         </View>
      )
   }

   render() {

      const { companyDetail } = this.props

      return (
         <View style={styles.container}>
            <Header title='Company Detail' viewRight={true}/>
            <Animated.View style={[styles.imageHeader]}>
               <Image source={require('../assets/tqb.jpg')}
                  style={{ height: 200, width: '100%' }}
                  resizeMode='cover'
               />
               <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}></View>
            </Animated.View>
            <Animated.ScrollView
               onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
                  {
                     useNativeDriver: true,
                  }
               )}
               style={{ zIndex: 200, flex: 1, }}
               decelerationRate={0.7}
            >
               <View style={{ height: 200, width: '100%', }}>

               </View>
               <View style={{ backgroundColor: 'rgb(206, 206, 206)' }}>

               {
                  this.renderNameCompany(companyDetail)
               }
               {
                  this.renderDecribeComp(companyDetail)
               }
               {
                  this.renderAddress(companyDetail)
               }
               {
                  this.renderNumberMember()
               }
               {
                  this.renderContactInfor()
               }
               </View>
            </Animated.ScrollView>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   },
   imageHeader: {
      flex: 1,
      position: 'absolute',
      top: 50, left: 0, right: 0, height: '100%',
      zIndex: 100
   },
   textHeaderStyle: {
      width: '100%',
      height: 30,
      alignItems: 'center',
      justifyContent: 'center'
   },
   describeComp: {
      height: 180,
      backgroundColor: "white",
      marginTop: 10
   },
   readMore: {
      height: 20, width: '100%',
      alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'rgb(232, 232, 232)'
   },
   addressStyle: {
      height: 100, paddingTop: 5, paddingLeft: 5, paddingRight: 5,
      backgroundColor: "white",
      marginTop: 10
   },
   rowContact: {
      height: 45,
      width: '100%',
      flexDirection: 'row',
      borderBottomColor: 'rgb(232, 232, 232)', borderBottomWidth: 1,
      alignItems: 'center', 
      paddingLeft: 10
   },
   containerNameComp: {
      height: 150, width: '100%', marginTop: -60
   },
   logoNameComp: {
      height: 80, 
      width: '100%', 
      alignItems: 'center', 
      justifyContent: 'center'
   },
   imageLogo: {
      flex: 1, 
      height: 80,
      width: 80, 
      borderRadius: 40
   },
   textNameComp: {
      color: 'black', 
      fontSize: 20, 
      fontWeight: '500'
   },
   textFieldJob: {
      color: 'rgba(0, 0, 0, 0.8)', fontSize: 18,
   },
   viewCompDes: {
      height: 160, 
      paddingLeft: 10, 
      paddingRight: 10, 
      paddingTop: 10,
   },
   textCompDes: {
      color: 'black', 
      fontSize: 16, 
      textAlign: 'justify'
   },
   textAddress: {
      color: 'black', 
      fontSize: 18, 
      fontWeight: '500'
   },
   viewDetailAddress: {
      marginTop: 10, 
      justifyContent: 'space-between', 
      flexDirection: 'row'
   }, 
   textDetaliAddress: {
      width: '80%', 
      height: '100%', 
      fontSize: 16
   },
   viewContact: {
      width: '100%', 
      height: 180, 
      backgroundColor: "white", 
      paddingTop: 10,
      marginTop: 10
   },
   textInforContact: {
      color: 'black', 
      fontWeight: '500', 
      fontSize: 18, 
      paddingLeft: 10 
   },
   viewNumberMems: {
      width: '100%', 
      height: 100, 
      backgroundColor: 'white', 
      alignItems: 'center', 
      paddingLeft: 20, 
      flexDirection: 'row', 
      marginTop: 10
   },
   iconMems: {
      width: 80, height: 80, 
      borderRadius: 40, alignItems: 'center', 
      justifyContent: 'center', borderWidth: 1, 
      borderColor: 'black'
   },
   textMems: {
      color: 'black', 
      fontSize: 16, 
      paddingLeft: 20
   }
})

const mapDispathToProps = {

}

const mapStateToProps = (state) => {
   return {
      // language: state.config.language
   }
}

export default connect(mapStateToProps, mapDispathToProps)(CompanyDetail);

import React, { PureComponent } from 'react';
import {
   StyleSheet,
   View,
   Text,
   ScrollView,
   Dimensions,
   TouchableOpacity,
   TextInput,
   Alert
} from 'react-native';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { savedUserIntro } from '../redux/actions/jobSolutions';
import { Button } from 'react-native-material-kit/lib/mdl';
import { connect } from 'react-redux';
import KeyboardScroll from '../components/KeyboardScroll';


const SCEEN_WIDTH = Dimensions.get('window').width;

class UserInfor extends PureComponent {

   constructor(props) {
      super(props)

      this.state = {
         email: null,
         phone: null,
         degree: null,
         address: null,
         jobIntroduce: null,
         isEdited: false
      }
   }

   componentDidMount() {
      if (this.props.userIntroCurrent) {
         this.setState({
            email: this.props.userIntroCurrent.email,
            phone: this.props.userIntroCurrent.phone,
            degree: this.props.userIntroCurrent.degree,
            address: this.props.userIntroCurrent.address,
            jobIntroduce: this.props.userIntroCurrent.career_goal,
         })
      }
   }

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
      // console.log('email change', this.props.userIntroCurrent.email)
      const { userIntroCurrent } = this.props
      return (
         <View style={styles.containerEmailPhone}>
            <TouchableOpacity style={[styles.emailOrPhone, styles.border]}>
               {
                  this.state.isEdited ?
                     <View style={{ position: 'absolute', top: 5, right: 5, width: 20, height: 20, }}>
                        <Icon name='edit' color='green' size={18} />
                     </View>
                     :
                     null
               }
               <Icon name='email' size={50} color='#9AC230' />
               <Text style={styles.headerText}>Email</Text>
               {/* <Text style={[styles.contentText, { color: 'rgba(0, 0, 0, 0.7)' }]}>letrinhthanh45@gmail.com</Text> */}
               {
                  !this.state.isEdited ?
                     <Text
                        style={{ height: 45, width: '75%', paddingLeft: 10, color: 'black', paddingTop: 10 }}
                     // onChangeText={(text) => this.setState({ email: text })}
                     // value="hello"
                     // value={userIntroCurrent['email']}
                     // style={styles.typeMusicText}
                     // returnKeyType='done'
                     // autoCorrect={false}
                     // selectionColor='black'
                     // underlineColorAndroid='transparent'
                     >{userIntroCurrent['email']}</Text> :
                     <TextInput
                        style={{ height: 45, width: '75%', paddingLeft: 10, color: 'black' }}
                        placeholder='Email'
                        placeholderTextColor='gray'
                        onChangeText={(text) => this.setState({ email: text })}
                        value={this.state.email}
                        // style={styles.typeMusicText}
                        returnKeyType='done'
                        autoCorrect={false}
                        selectionColor='black'
                        underlineColorAndroid='transparent'
                     // onSubmitEditing={() => {
                     //    if (this.state.text === '') {
                     //       //  alert('Vui lòng nhập tên thiết bị!')
                     //    }
                     //    else {
                     //       WifiAudio.rename(this.props.ip, this.state.text)
                     //       this.props.onBack(this.state.text)
                     //       Actions.pop()
                     //    }
                     // }}
                     // maxLength={20}
                     />
               }
            </TouchableOpacity>
            <TouchableOpacity style={[styles.emailOrPhone, styles.border]}>
               {
                  this.state.isEdited ?
                     <View style={{ position: 'absolute', top: 5, right: 5, width: 20, height: 20, }}>
                        <Icon name='edit' color='green' size={18} />
                     </View>
                     :
                     null
               }
               <Icon name='phone' size={50} color='#9AC230' />
               <Text style={styles.headerText}>Phone</Text>
               {/* <Text style={[styles.contentText, { color: 'rgba(0, 0, 0, 0.7)' }]}>0966618558</Text> */}
               {
                  !this.state.isEdited ?
                     <Text
                        style={{ height: 45, width: '75%', paddingLeft: 10, color: 'black', paddingTop: 10 }}
                     // onChangeText={(text) => this.setState({ email: text })}
                     // value="hello"
                     // value={userIntroCurrent['email']}
                     // style={styles.typeMusicText}
                     // returnKeyType='done'
                     // autoCorrect={false}
                     // selectionColor='black'
                     // underlineColorAndroid='transparent'
                     >{userIntroCurrent['phone']}</Text> :
                     <TextInput
                        style={{ height: 45, width: '75%', paddingLeft: 10, color: 'black' }}
                        placeholder='Phone'
                        placeholderTextColor='gray'
                        onChangeText={(text) => this.setState({ phone: text })}
                        value={this.state.phone}
                        // style={styles.typeMusicText}
                        returnKeyType='done'
                        autoCorrect={false}
                        selectionColor='black'
                        underlineColorAndroid='transparent'
                        // onSubmitEditing={() => {
                        //    if (this.state.text === '') {
                        //       //  alert('Vui lòng nhập tên thiết bị!')
                        //    }
                        //    else {
                        //       WifiAudio.rename(this.props.ip, this.state.text)
                        //       this.props.onBack(this.state.text)
                        //       Actions.pop()
                        //    }
                        // }}
                        maxLength={11}
                     />
               }

            </TouchableOpacity>
         </View>
      )
   }

   renderDegreeAddress = () => {
      const { userIntroCurrent } = this.props
      return (
         <View style={styles.containerEmailPhone}>
            <TouchableOpacity style={[styles.emailOrPhone, styles.border]}>
               {
                  this.state.isEdited ?
                     <View style={{ position: 'absolute', top: 5, right: 5, width: 20, height: 20, }}>
                        <Icon name='edit' color='green' size={18} />
                     </View>
                     :
                     null
               }
               <IconFont name='book' size={50} color='#9AC230' />
               <Text style={styles.headerText}>Trình độ học vấn</Text>
               {/* <Text style={[styles.contentText, { color: 'rgba(0, 0, 0, 0.7)' }]}>Dai hoc</Text> */}
               {
                  !this.state.isEdited ?
                     <Text
                        style={{ height: 45, width: '75%', paddingLeft: 10, color: 'black', paddingTop: 10 }}
                     // onChangeText={(text) => this.setState({ email: text })}
                     // value="hello"
                     // value={userIntroCurrent['email']}
                     // style={styles.typeMusicText}
                     // returnKeyType='done'
                     // autoCorrect={false}
                     // selectionColor='black'
                     // underlineColorAndroid='transparent'
                     >{userIntroCurrent['degree']}</Text> :
                     <TextInput
                        style={{ height: 45, width: '75%', paddingLeft: 10, color: 'black' }}
                        placeholder='Degree'
                        placeholderTextColor='gray'
                        onChangeText={(text) => this.setState({ degree: text })}
                        value={this.state.degree}
                        // style={styles.typeMusicText}
                        returnKeyType='done'
                        autoCorrect={false}
                        selectionColor='black'
                        underlineColorAndroid='transparent'
                        // onSubmitEditing={() => {
                        //    if (this.state.text === '') {
                        //       //  alert('Vui lòng nhập tên thiết bị!')
                        //    }
                        //    else {
                        //       WifiAudio.rename(this.props.ip, this.state.text)
                        //       this.props.onBack(this.state.text)
                        //       Actions.pop()
                        //    }
                        // }}
                        maxLength={20}
                     />
               }
            </TouchableOpacity>
            <TouchableOpacity style={[styles.emailOrPhone, styles.border]}>
               {
                  this.state.isEdited ?
                     <View style={{ position: 'absolute', top: 5, right: 5, width: 20, height: 20, }}>
                        <Icon name='edit' color='green' size={18} />
                     </View>
                     :
                     null
               }
               <Icon name='home' size={50} color='#9AC230' />
               <Text style={styles.headerText}>Địa chỉ</Text>
               {/* <Text style={[styles.contentText, { color: 'rgba(0, 0, 0, 0.7)' }]}>Hà Nội</Text> */}
               {
                  !this.state.isEdited ?
                     <Text
                        style={{ height: 45, width: '75%', paddingLeft: 10, color: 'black', paddingTop: 10 }}
                     // onChangeText={(text) => this.setState({ email: text })}
                     // value="hello"
                     // value={userIntroCurrent['email']}
                     // style={styles.typeMusicText}
                     // returnKeyType='done'
                     // autoCorrect={false}
                     // selectionColor='black'
                     // underlineColorAndroid='transparent'
                     >{userIntroCurrent['address']}</Text> :
                     <TextInput
                        style={{ height: 45, width: '75%', paddingLeft: 10, color: 'black' }}
                        placeholder='Address'
                        placeholderTextColor='gray'
                        onChangeText={(text) => this.setState({ address: text })}
                        value={this.state.address}
                        // style={styles.typeMusicText}
                        returnKeyType='done'
                        autoCorrect={false}
                        selectionColor='black'
                        underlineColorAndroid='transparent'
                        // onSubmitEditing={() => {
                        //    if (this.state.text === '') {
                        //       //  alert('Vui lòng nhập tên thiết bị!')
                        //    }
                        //    else {
                        //       WifiAudio.rename(this.props.ip, this.state.text)
                        //       this.props.onBack(this.state.text)
                        //       Actions.pop()
                        //    }
                        // }}
                        maxLength={20}
                     />
               }
            </TouchableOpacity>
         </View>
      )
   }

   renderIntroduce = () => {
      const { userIntroCurrent } = this.props
      return (
         <TouchableOpacity style={[styles.containerIntroduce, { padding: 10 }]}>
            <Text style={[styles.headerText]}>Giới thiệu bản thân</Text>
            {
               !this.state.isEdited ?
                  <Text
                     style={{ height: 45, width: '75%', paddingLeft: 10, color: 'black', paddingTop: 10 }}
                  // onChangeText={(text) => this.setState({ email: text })}
                  // value="hello"
                  // value={userIntroCurrent['email']}
                  // style={styles.typeMusicText}
                  // returnKeyType='done'
                  // autoCorrect={false}
                  // selectionColor='black'
                  // underlineColorAndroid='transparent'
                  >{userIntroCurrent['career_goal']}</Text> :
                  <TextInput
                     style={{ height: 45, width: '75%', paddingLeft: 10, color: 'black' }}
                     placeholder='Introduce'
                     placeholderTextColor='gray'
                     onChangeText={(text) => this.setState({ jobIntroduce: text })}
                     value={this.state.jobIntroduce}
                     // style={styles.typeMusicText}
                     returnKeyType='done'
                     autoCorrect={false}
                     selectionColor='black'
                     underlineColorAndroid='transparent'
                  // onSubmitEditing={() => {
                  //    if (this.state.text === '') {
                  //       //  alert('Vui lòng nhập tên thiết bị!')
                  //    }
                  //    else {
                  //       WifiAudio.rename(this.props.ip, this.state.text)
                  //       this.props.onBack(this.state.text)
                  //       Actions.pop()
                  //    }
                  // }}
                  // maxLength={20}
                  />
            }
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
            <KeyboardScroll style={{ flex: 1, }}>
               <ScrollView style={styles.container}>
                  {
                     this.renderHeader()
                  }
                  {
                     // this.renderSalary()
                  }
                  <View style={styles.sendUserIntro}>
                     <Button style={styles.sendUserIntroBtn}
                        onPress={this.updateInfor}
                     >
                        {
                           this.state.isEdited ? <Text style={{ color: 'white' }}>Cập nhật thông tin</Text> : <Text style={{ color: 'white' }}>Sửa thông tin</Text>
                        }

                     </Button>
                  </View>
                  {
                     this.renderEmailPhone()
                  }
                  {
                     this.renderDegreeAddress()
                  }
                  {
                     this.renderIntroduce()
                  }
               </ScrollView>
            </KeyboardScroll>
         </View>
      );
   }

   updateInfor = () => {
      if (!this.state.isEdited) {
         this.setState({
            isEdited: true
         })
      } else {
         Alert.alert(
            'Notice!',
            'Are you sure update your informations?',
            [
               {
                  text: 'Cancel',
                  onPress: () => {
                     this.setState({
                        isEdited: false
                     })
                  }, style: 'cancel'
               },
               {
                  text: 'OK',
                  onPress: () => {
                     this.props.savedUserIntro({ candidate_id: this.props.candidate_id, phone: this.state.phone, career_goal: this.state.jobIntroduce, email: this.state.email, degree: this.state.degree, address: this.state.address })
                     this.setState({
                        isEdited: false
                     })
                  }
               },
            ],
            { cancelable: false }
         )
      }
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
   },
   sendUserIntro: {
      width: '100%',
      height: 75,
      alignItems: "center",
      justifyContent: 'center'
   },
   sendUserIntroBtn: {
      width: 140,
      height: 50,
      backgroundColor: "#9AC230",
      borderRadius: 23,
      alignItems: "center",
      justifyContent: 'center',
      overflow: 'hidden'
   }
});

const mapDispatchToProps = {
   savedUserIntro
}

const mapStateToProps = (state, props) => {

   let candidate_id = state.jobSolutions.user.candidate_id
   let userIntroCurrent = {}
   if (candidate_id && state.jobSolutions.userIntro[candidate_id]) {
      console.log('candidate_id && state.jobSolutions.userIntro[candidate_id]', candidate_id, state.jobSolutions.userIntro[candidate_id])
      userIntroCurrent = state.jobSolutions.userIntro[candidate_id]
   }

   return {
      candidate_id: state.jobSolutions.user.candidate_id || null,
      userIntroCurrent: userIntroCurrent
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfor);

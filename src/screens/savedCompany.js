import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import SavedCompanyComponent from '../../screens/SavedCompany';
import {
   View,
   Text,
   StyleSheet,
   FlatList,
   TouchableOpacity,
   Alert
} from 'react-native';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ButtonIcon from '../components/ButtonIcon';
import { Actions } from 'react-native-router-flux';
import { savedCompanyFunc } from '../redux/actions/jobSolutions';

class SavedCompany extends PureComponent {

   constructor(props) {
      super(props)

      this.state = {
         listSavedCompany: []
      }
   }

   async componentDidMount() {
      // let res = await fetch('http://localhost:3000/comcan/get_com_by_can_id/' + this.props.user.candidate_id).then((res) => res.json())
      // console.log('resCompany', res)
      // if (res.status == 'SUCCESS') {
      //    this.setState({
      //       listSavedCompany: res.list_company
      //    })
      // } else {
      //    console.log('fetch failed')
      // }
   }

   renderCompany = ({ item, index }) => {
      return (
         <TouchableOpacity style={styles.companyRow}
            onPress={() => this.clickCompany(item)}
         >
            <View style={{ marginTop: 5, paddingLeft: 10 }}>
               <Text style={[styles.text, { color: '#429ef4', fontWeight: '500' }]}>{item.nameCompany}</Text>
            </View>
            <View style={{ marginTop: 5, paddingLeft: 10 }}>
               <Text style={[styles.text, { fontSize: 18 }]}>{item.location}</Text>
            </View>
            <View style={{ paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
               <Text style={[styles.text, { fontSize: 18 }]}>Job Posting: 25</Text>
               <ButtonIcon
                  iconName='delete'
                  iconColor='gray'
                  size={24}
                  onPress={() => this.deleteSavedJob(item)}
               />
            </View>
            <View style={{ height: 5, backgroundColor: 'rgba(0, 0, 0, 0.1)', position: "absolute", bottom: 0, left: 0, right: 0 }}></View>
         </TouchableOpacity>
      )
   }

   render() {
      return (
         <View style={styles.container}>
            <Header title='Companies' viewRight={true} />
            {
               this.props.savedCompany.length != 0 ?
                  <FlatList
                     data={this.props.savedCompany}
                     renderItem={this.renderCompany}
                     keyExtractor={(item, index) => String(index)}
                  />
                  :
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                     <Text style={{ fontSize: 24, color: 'black' }}>Bạn chưa lưu công ty nào!</Text>
                  </View>
            }

         </View>
      )
   }

   clickCompany = (company) => {
      Actions.companyDetail({ company_id: company.company_id })
   }

   deleteSavedJob = (company) => {
      Alert.alert(
         'Notice!',
         'Are you sure delete this company?',
         [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => this.props.savedCompanyFunc({ username: this.props.user.username, company: company }) },
         ],
         { cancelable: false }
      )
   }
}
const styles = StyleSheet.create({
   container: {
      flex: 1
   },

   companyRow: {
      height: 105,
      width: '100%',
   },

   text: {
      fontSize: 20,
      color: 'rgba(0, 0, 0, 0.5)'
   }
})

const mapDispathToProps = {
   savedCompanyFunc
}

const mapStateToProps = (state) => {
   let savedCompanyList = []
   let username = state.jobSolutions.user.username
   if (username != '') {
      savedCompanyList = state.jobSolutions.savedCompany[username]
   }
   return {
      user: state.jobSolutions.user,
      savedCompany: savedCompanyList || []
   }
}

export default connect(mapStateToProps, mapDispathToProps)(SavedCompany);

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import SavedCompanyComponent from '../../screens/SavedCompany';
import {
   View,
   Text,
   StyleSheet,
   FlatList,
   TouchableOpacity,
   Alert,
   Dimensions
} from 'react-native';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ButtonIcon from '../components/ButtonIcon';
import { Actions } from 'react-native-router-flux';
import { savedCompanyFunc } from '../redux/actions/jobSolutions';
const SCREEN_WIDTH = Dimensions.get('window').width;

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
            { text: 'OK', onPress: () => this.props.savedCompanyFunc({ candidate_id: this.props.user.candidate_id, company: company }) },
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
      width: SCREEN_WIDTH - 10,
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
   let candidate_id = state.jobSolutions.user.candidate_id
   if (candidate_id != null) {
      savedCompanyList = state.jobSolutions.savedCompany[candidate_id]
   }
   return {
      user: state.jobSolutions.user,
      savedCompany: savedCompanyList || []
   }
}

export default connect(mapStateToProps, mapDispathToProps)(SavedCompany);

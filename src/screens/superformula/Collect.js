import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
  } from 'react-native';
import React, {useEffect, useState,useRef} from 'react';
import Modal from 'react-native-modal';
import { connect, useSelector } from 'react-redux';
import PeriodDatePicker from '../../components/PeriodDatePicker';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getCarById } from '../../redux/actions/carActions';
import AlertModal from '../../components/AlertModal';
import { addCollect } from '../../redux/actions/carActions';
import moment from 'moment';
import { fetchCars } from '../../redux/actions/carActions';
import { getCollectDataById, addCheckData, getCheckDataById } from '../../redux/actions/checkActions';
import { cancelCollect } from '../../redux/actions/cancelAction';

const Collect = (props) => {
  const barcode1Ref = useRef(null)
  const barcode2Ref = useRef(null)
  const barcode3Ref = useRef(null)
  const barcode4Ref = useRef(null)
  const {deviceNo} = props.route.params;
  const [carIdArray, setCarIdArray] = useState([])
  const [firstbarcord, setFirstBarcord] = useState('')
  const [secondbarcord, setSecondBarcord] = useState('')
  const [thirdbarcord, setThirdBarcord] = useState('')
  const [fourthbarcord, setFourthBarcord] = useState('')
  const [visible, setVisible] = useState(false);
  const [selectedRange, setRange] = useState({});
  const [carNumber, setCarNumber] = useState('')
  const [dateText, setDateText] = useState('')
  const [team, setTeam] = useState('')
  const [showAlert, setShowAlert] = useState(false);
  const {car = {}} = props
  const [isLiked, setIsLiked] = useState([
    { id: 1, value: false, name: "SOFT", selected: false },
    { id: 2, value: false, name: "MED", selected: false },
    { id: 3, value: false, name: "WET", selected: false }
  ]);
  const [valistyle1, setValistyle1] = useState({})
  const [valistyle2, setValistyle2] = useState({})
  const [valistyle3, setValistyle3] = useState({})
  const [valistyle4, setValistyle4] = useState({})
  const [checkData, setcheckData] = useState([])

  const [alertStatus, setAlertStatus] = useState('')
  const [barDate1, setBarDate1] = useState('')
  const [barDate2, setBarDate2] = useState('')
  const [barDate3, setBarDate3] = useState('')
  const [barDate4, setBarDate4] = useState('')
  const [dateDisplayed, setDateDisplayed] = useState(false)
  const [typealidation, setTypeValidation] = useState(false)
  const selectedChecks = useSelector(({check}) => check.checks)
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  
  
  useEffect(()=>{
    if(selectedStartDate != null){
      const fdate = moment(selectedStartDate,'YYYY-MM-DD');
      setStartDate(fdate.toString().substring(4,15))
    }
  },[selectedStartDate])
  
  useEffect(()=>{
    if(selectedEndDate != null){
      const sdate = moment(selectedEndDate,'YYYY-MM-DD');
      setEndDate(sdate.toString().substring(4,15))
    }
  },[selectedEndDate])

  useEffect(() => {
    props.fetchCars();
  }, []);
  
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Text style={{color:'white', fontSize:25}}>{deviceNo}</Text>
      )
    })
  }, [deviceNo, props]);

  useEffect(() => {
    let carIdArray = [];
    props.cars.map((item) => {
      carIdArray.push(item.name.toString())
    })
    setCarIdArray(carIdArray)
  }, [props.cars]);

  useEffect(() => {
    let text =  `${startDate}  -  ${endDate}` ;
    setDateText(text)
    const checks = selectedChecks.filter(item => moment(item.Created, 'YYYY-MM-DD') >= selectedStartDate && moment(item.Created, 'YYYY-MM-DD') <= selectedEndDate)
    setcheckData(checks);
  }, [visible]);
  
  useEffect(() => {
    setTeam(car.team)
  }, [props.car]);

  useEffect(() => {
    setValistyle1((firstbarcord.length < 10 && firstbarcord.length >=1)  ? {backgroundColor:'yellow'} :  {backgroundColor:'#d1d1e0', borderWidth:2})
    setValistyle2((secondbarcord.length < 10 && secondbarcord.length >=1)  ? {backgroundColor:'yellow'} :  {backgroundColor:'#d1d1e0', borderWidth:2})
    setValistyle3((thirdbarcord.length < 10 && thirdbarcord.length >=1)  ? {backgroundColor:'yellow'} :  {backgroundColor:'#d1d1e0', borderWidth:2})
    setValistyle4((fourthbarcord.length < 10 && fourthbarcord.length >=1)  ? {backgroundColor:'yellow'} :  {backgroundColor:'#d1d1e0', borderWidth:2})
  },[firstbarcord, secondbarcord, thirdbarcord, fourthbarcord ])

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
    }
  };

  function barcodeMatch(num) {
    for(let i = 0; i < props.collects.length; i++){
      console.log(typeof(moment(props.collects[i].Created, 'YYYY-MM-DD')))

      console.log(startDate)
      let st_date = new Date(selectedStartDate)
      let new_st_date = new Date(st_date.getFullYear(), st_date.getMonth(), st_date.getDate())
      
      let ed_date = new Date(selectedEndDate)
      ed_date.setDate(ed_date.getDate()+1)
      let new_ed_date = new Date(ed_date.getFullYear(), ed_date.getMonth(), ed_date.getDate())
      let cur_date = moment(props.collects[i].Created, "YYYY-MM-DD")

      console.log("================neweddate===", new_ed_date)
      console.log("================newstdate===", new_st_date)
      console.log("=====compare1====", cur_date<= new_ed_date)
      console.log("=====compare1====", cur_date>= new_st_date)

      console.log(new_st_date, cur_date, new_ed_date)
      if((num == props.collects[i].Barcode1 || num == props.collects[i].Barcode2 || num == props.collects[i].Barcode3 || num == props.collects[i].Barcode4) &&  cur_date >= new_st_date &&  cur_date<= new_ed_date){
        return true;
      } 
    }
    return false;
  }

  const onRadioBtnClick = (item) => {
    let updatedState = isLiked.map((isLikedItem) =>
      isLikedItem.id === item.id
        ? { ...isLikedItem, selected: true }
        : { ...isLikedItem, selected: false }
    );
    setIsLiked(updatedState);
    setTypeValidation(false)
  };

  const showModal = () =>{
    setVisible(true);
  }

  const hideModal = () => {
    setVisible(false);
  }

  const clearHistory = () => {
    let clearedState = isLiked.map((isLikedItem) => ({...isLikedItem, selected: false}));
    setDateText('');
    setRange({});
    setCarNumber('')
    setIsLiked(clearedState);
    setFirstBarcord('');
    setSecondBarcord('');
    setThirdBarcord('');
    setFourthBarcord('');
    setTeam('');
    setValistyle1({})
    setValistyle2({})
    setValistyle3({})
    setValistyle4({});
    setBarDate1('')
    setBarDate2('')
    setBarDate3('')
    setBarDate4('')
  }

  const submitCarId = () => {
    if(!carIdArray.find(element => element === carNumber)){
      setTeam("No registered car. Input CarNo again");
      setAlertStatus("No registered car. Input CarNo again");
    }else{
      if(props.route.name === 'Check'){
        props.getCarById(carNumber)
        props.getCollectDataById(carNumber);
        props.getCheckDataById(carNumber);
      }else{props.getCarById(carNumber)}
      setAlertStatus("");
    }
  }

  const submitCollectData = () => {
    if(alertStatus !== ""){
      setShowAlert(true)
    }else{
      if(isLiked.filter(item => item.selected == true).length == 0 ) {
        setTypeValidation(true);
        return;
      }else{
        const type = isLiked.filter(item => item.selected == true)[0].name;
        const data = {
          Name: car.name,
          Team: car.team,
          Organization: car.organization,
          Barcode1: firstbarcord,
          Barcode2: secondbarcord,
          Barcode3: thirdbarcord,
          Barcode4: fourthbarcord,
          Type: type,
          Device: deviceNo
        }
        if(props.route.name === 'Collect'){
          props.addCollect(data)
          setValistyle1((firstbarcord.length < 10 && firstbarcord.length >=1)  ? {backgroundColor:'yellow'} :  {backgroundColor:'#d1d1e0', borderWidth:2})
          setValistyle2((secondbarcord.length < 10 && secondbarcord.length >=1)  ? {backgroundColor:'yellow'} :  {backgroundColor:'#d1d1e0', borderWidth:2})
          setValistyle3((thirdbarcord.length < 10 && thirdbarcord.length >=1)  ? {backgroundColor:'yellow'} :  {backgroundColor:'#d1d1e0', borderWidth:2})
          setValistyle4((fourthbarcord.length < 10 && fourthbarcord.length >=1)  ? {backgroundColor:'yellow'} :  {backgroundColor:'#d1d1e0', borderWidth:2})
          setShowAlert(true)
          // clearHistory();
        } else if(props.route.name === 'Check'){
          const checkData = {
            ...data,
            1:  barcodeMatch(firstbarcord) ? "Barcode1 matched":"Barcode1 mismatch",
            2:  barcodeMatch(secondbarcord)  ? "Barcode2 matched":"Barcode2 mismatch",
            3:  barcodeMatch(thirdbarcord)  ? "Barcode3 matched":"Barcode3 mismatch",
            4:  barcodeMatch(fourthbarcord)  ? "Barcode4 matched":"Barcode4 mismatch",
            StartDate: selectedRange.firstDate,
            EndDate: selectedRange.secondDate,
          }
          props.addCheckData(checkData)
          setValistyle1(barcodeMatch(firstbarcord)  ?  {backgroundColor:'#d1d1e0', borderWidth:2}:{backgroundColor:'red'})
          setValistyle2(barcodeMatch(secondbarcord)  ? {backgroundColor:'#d1d1e0', borderWidth:2}:{backgroundColor:'red'})
          setValistyle3(barcodeMatch(thirdbarcord)  ? {backgroundColor:'#d1d1e0', borderWidth:2}:{backgroundColor:'red'})
          setValistyle4(barcodeMatch(fourthbarcord)  ? {backgroundColor:'#d1d1e0', borderWidth:2}:{backgroundColor:'red'})
          
        } else if(props.route.name === 'Cancel'){
            props.cancelCollect(data);
          }
          setBarDate1(generateDate(firstbarcord))
          setBarDate2(generateDate(secondbarcord))
          setBarDate3(generateDate(thirdbarcord))
          setBarDate4(generateDate(fourthbarcord))
          setDateDisplayed(true)
        }
        setShowAlert(true)
    }
  }

  const generateDate = (num) => {
    const aaaa = props.route.name === 'Check' && checkData.filter(item => item.Barcode1 == num || item.Barcode2 == num || item.Barcode3 == num || item.Barcode4 == num)
    const bbbb = props.collects.filter(item => item.Barcode1 == num || item.Barcode2 == num || item.Barcode3 == num || item.Barcode4 == num)
    if(bbbb.length !==0){
      console.log("---------------------", bbbb)
      const createData = bbbb.pop().Created
      console.log("ooooooooooooo", createData)
      return createData.split('T')[0]
    }
    else return 'new';
  }

  const handleFirstBarcord = (text) => {
    setFirstBarcord(text);
    if (text.length >= 10) {
      barcode2Ref.current.focus()
    }
  }

  const handleSecondBarcord = (text) => {
    setSecondBarcord(text);
    if (text.length >= 10) {
      barcode3Ref.current.focus()
    }
  }

  const handleThirdBarcord = (text) => {
    setThirdBarcord(text);
    if (text.length >= 10) {
      barcode4Ref.current.focus()
    }
  }

  const handleFourthBarcord = (text) => {
    setFourthBarcord(text);
  }

  return (
    <ScrollView style={{backgroundColor: 'white', padding:20,}}>
      <View style={{ flex: 1, flexDirection:"row", marginTop:10}}>
        <View style={{flex: 6}}>
          <TextInput
              style={[styles.input]}
              value={carNumber}
              onChangeText={(newText) => setCarNumber(newText)}
              placeholderTextColor="grey"
              keyboardType='numeric'
          />
        </View>
        <View style={{ flex:2}}>
          <View style={[styles.box]}>
            <TouchableOpacity
                style={styles.carBtn}
                onPress={() => submitCarId()}
            >
              <Text style={styles.carBtnText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{marginTop:20}}>
        <TextInput
          style={styles.input}
          value={team}
          placeholderTextColor="grey"
        />
      </View>
      {
        props.route.name == 'Check' &&
        <View style={{backgroundColor:'white', marginRight:20, marginTop:20, flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
          <View style={{flex:11}}>
            <TextInput
              style={[styles.input, {textAlign:'center'}]}
              value={dateText}
              placeholderTextColor="grey"
            />
          </View>
          <View style={{flex:1, marginLeft:20}}>
            <Ionicons
              testID="nextButton"
              name="calendar"
              color="grey"
              size={40}
              style={{backgroundColor: 'transparent'}}
              onPress={showModal}
            />
          </View>
        </View>
      }
      <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', marginTop:20,}}>
        {isLiked.map((item, index) => {
          let btnStyle = item.selected == true ? {backgroundColor: 'grey'}: {}
            return (<View key={index} style={{width:"30%"}}>
              <TouchableOpacity
                style={[styles.softness, btnStyle]}
                onPress={() => onRadioBtnClick(item)}
              >
                <Text style={styles.softText}>{item.name}</Text>
              </TouchableOpacity>
          </View>)
        })}
      </View>
      {typealidation && <Text style={{color:'red'}}>Select Type!</Text>}
      <View style={{flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', paddingRight:30, paddingLeft:30}}>
        <View style={{width:'70%', height:"100%"}}>
          <View style={{marginTop:20}}>
            <TextInput
              style={[styles.input, valistyle1]}
              ref={barcode1Ref}
              value={firstbarcord}
              onChangeText={(newText) => handleFirstBarcord(newText)}
              placeholderTextColor="grey"
              keyboardType='numeric'
            />
          </View>
          { dateDisplayed && props.route.name !== 'Cancel' &&
            <View>
              <Text style={{alignSelf:'flex-end', fontSize:20}}>{barDate1}</Text>
            </View>
          }
          <View style={{marginTop:20}}>
            <TextInput
                style={[styles.input, valistyle2]}
                ref={barcode2Ref}
                value={secondbarcord}
                onChangeText={(newText) => handleSecondBarcord(newText)}
                placeholderTextColor="grey"
                keyboardType='numeric'
            />
          </View>
          { dateDisplayed && props.route.name !== 'Cancel' &&
            <View>
              <Text style={{alignSelf:'flex-end', fontSize:20}}>{barDate2}</Text>
            </View>
          }
          <View style={{marginTop:20}}>
            <TextInput
                style={[styles.input, valistyle3]}
                ref={barcode3Ref}
                value={thirdbarcord}
                onChangeText={(newText) => handleThirdBarcord(newText)}
                placeholderTextColor="grey"
                keyboardType='numeric'
            />
          </View>
          { dateDisplayed && props.route.name !== 'Cancel' &&
            <View>
              <Text style={{alignSelf:'flex-end', fontSize:20}}>{barDate3}</Text>
            </View>
          }
          <View style={{marginTop:20}}>
            <TextInput
                style={[styles.input, valistyle4]}
                value={fourthbarcord}
                ref={barcode4Ref}
                onChangeText={(newText) => handleFourthBarcord(newText)}
                placeholderTextColor="grey"
                keyboardType='numeric'
            />
          </View>
          { dateDisplayed && props.route.name !== 'Cancel' &&
            <View>
              <Text style={{alignSelf:'flex-end', fontSize:20}}>{barDate4}</Text>
            </View>
          }
        </View>
        <View style={{width: '20%', justifyContent:'center'}}>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => submitCollectData()}
          >
            <Text style={styles.carBtnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[{marginTop:10, width:"60%", height:50, alignSelf:'center'}]}>
        <TouchableOpacity
            style={styles.submitButton}
            onPress={clearHistory}
        >
          <Text style={styles.carBtnText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <View style={[{marginTop:30, width:"60%", height:50, alignSelf:'center'}]}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => props.navigation.navigate('History')}
        >
          <Text style={styles.carBtnText}>Sent History</Text>
        </TouchableOpacity>
      </View>
      <Modal
        style={{margin:0}}
        animationType="slide"
        transparent={true}
        backdropOpacity={0.5}
        backdropColor={'rgba(0, 0, 0, 0.8)'}
        visible={visible}
        onRequestClose={hideModal}>
        <PeriodDatePicker hideModal={hideModal} startDate={startDate} endDate={endDate} onDateChange={onDateChange} />
      </Modal>
      { showAlert && <AlertModal alertStatuss={alertStatus} hideModal = {() => {setShowAlert(false)}} clearHistory={clearHistory} /> }
    </ScrollView>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getCarById: (id) => dispatch(getCarById(id)),
    addCollect: (data) => dispatch(addCollect(data)),
    getCollectDataById: (id) => dispatch(getCollectDataById(id)),
    addCheckData: (data) => dispatch(addCheckData(data)),
    cancelCollect: (data) => dispatch(cancelCollect(data)),
    getCheckDataById: (id) => dispatch(getCheckDataById(id)),
    fetchCars: () => dispatch(fetchCars()),
  };
};

const mapStateToProps = (state) => {
  return { 
    car: state.cars.car, 
    cars: state.cars.cars, 
    collects: state.collect.collects,
    checks: state.check.ckecks
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Collect);
  
  const styles = StyleSheet.create({
    box:{
      width:"100%",
    },
    softText:{
      fontSize:20,
      color:'black'
    },
    carBtn: {
      backgroundColor: '#3399ff',
      width:"90%",
      height:'100%',
      marginLeft: 'auto',
      justifyContent: 'center',
      alignItems: 'center'
    },
    softness:{
      padding:10,
      backgroundColor: 'white',
      borderWidth:2,
      borderColor:'black',
      width:"100%",
      height:'100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    carBtnText:{
      fontSize:20,
      color:'white'
    },
    sendButton: {
      backgroundColor: '#3399ff',
      height:'60%',
      borderRadius:7,
      justifyContent: 'center',
      alignItems: 'center'
    },
    input:{
      alignSelf:'center',
      width: '100%',
      backgroundColor: 'white',
      color: 'black',
      paddingHorizontal: 10,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: 'gray', 
      fontSize:20
    },
    submitButton:{
      backgroundColor: '#3399ff',
      height:'100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:10,
      borderColor:'grey',
      borderWidth:2
    },
    radioButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 45
    },
    radioButton: {
      height: 20,
      width: 20,
      backgroundColor: "#F8F8F8",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#E6E6E6",
      alignItems: "center",
      justifyContent: "center"
    },
    radioButtonIcon: {
      height: 14,
      width: 14,
      borderRadius: 7,
      backgroundColor: "#98CFB6"
    },
    radioButtonText: {
      fontSize: 16,
      marginLeft: 16
    },
    alert: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
    },
    alertTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    alertMessage: {
      fontSize: 16,
      marginBottom: 10,
    },
  });
  
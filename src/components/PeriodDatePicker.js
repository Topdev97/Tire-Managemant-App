

import React from 'react';

import { StyleSheet, View, Text,Dimensions, TextInput,TouchableOpacity } from 'react-native';

import CalendarPicker from 'react-native-calendar-picker';
import Ionicons from 'react-native-vector-icons/Ionicons'

const PeriodDatePicker = (props) => {
  const handleDateRangeSelection = (date) => {
    props.hideModal()
  };

  const calendarWidth = Dimensions.get('window').width * 0.8
  return (
      <View style={styles.container}>
        <View style={{height:'10%', backgroundColor:'grey', }}>
            <Ionicons
              name="close"
              color="white"
              size={40}
              style={{backgroundColor: 'transparent'}}
            />
        </View>
        <View style={{ flexDirection:"row", marginTop:10, padding:20}}>
        
          <View style={{flex: 5}}>
            <TextInput
              style={[styles.input]}
              value={props.startDate}
              placeholderTextColor="grey"
            />
          </View>
          <View style={{flex: 2, alignItems:'center'}}>
            <Text style={{fontSize:40}}>-</Text>
          </View>
          <View style={{flex: 5}}>
            <TextInput
              style={[styles.input]}
              value={props.endDate}
              placeholderTextColor="grey"
            />
          </View>
        </View>
        <View style={{marginTop:10}}>
          <CalendarPicker 
            width={calendarWidth}
            startFromMonday={true}
            allowRangeSelection={true}
            minDate={new Date(2018, 1, 1)}
            maxDate={new Date(2050, 6, 3)}
            weekdays={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
            months={[
              'January',
              'Febraury',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ]}
            styling={styles.calendar}
            previousTitle="Previous"
            nextTitle="Next"
            todayBackgroundColor="#e6ffe6"
            selectedDayColor="#66ff33"
            selectedDayTextColor="#000000"
            scaleFactor={375} 
            textStyle={{
              fontFamily: 'Cochin',
              color: '#000000',
            }}
            onDateChange={props.onDateChange}
          />
        </View>
        <View style={styles.textStyle}>
          <View style={[{marginTop:10, width:"50%", height:50, alignSelf:'center'}]}>
            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleDateRangeSelection}
            >
              <Text style={styles.carBtnText}>OK</Text>
            </TouchableOpacity>
        </View>
        </View>
      </View>
    // </SafeAreaView>
  );
};
export default PeriodDatePicker;

const styles = StyleSheet.create({
  container: {
    // padding:40,
    // width:'90%',
    alignSelf:'center',
    backgroundColor:'white', 
    marginLeft:70, 
    marginRight:70, 
    borderColor:'black', 
    borderWidth:1
  },
  textStyle: {
    marginTop: 10,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
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
    fontSize:20,
    textAlign:'center'
  },
  submitButton:{
    backgroundColor: 'grey',
    height:'100%',
    borderRadius:5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:'grey',
    borderWidth:2
  },
  carBtnText:{
    fontSize:20,
    color:'white'
  },
});


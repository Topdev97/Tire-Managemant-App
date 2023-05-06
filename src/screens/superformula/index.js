import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import React from 'react';

const SuperFormula = ({navigation, route}) => {
  const {deviceNo} = route.params;
  return (
    <View style={{ flex: 1, flexDirection:"column", backgroundColor: 'white'}}>
      <View style={{flex: 2}}>
        <Image style={[styles.image]} source={require('../../assets/images/1.jpg')} />
      </View>
      <View style={{ flex:6}}>
        <View style={[styles.box]}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => navigation.navigate('Collect',{deviceNo})}
          >
            <Text style={styles.saveButtonText}>Collect</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.box]}>
          <TouchableOpacity
            style={[styles.saveButton]}
            onPress={() => navigation.navigate('Check', {deviceNo})}
          >
            <Text style={styles.saveButtonText}>Check</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.box]}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => navigation.navigate('Cancel', {deviceNo})}
          >
            <Text style={styles.saveButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SuperFormula;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },
  box:{
    width:"60%",
    marginTop: 80,
    marginRight: 'auto',
    marginLeft: 'auto'
    
  },
  button: {
    height: '100%',
  },
  image:{
    alignSelf:'center',
    marginTop: 'auto',
  },
  headingText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
    letterSpacing: 0.19,
    color: 'black',
    textAlign: 'center',
    marginTop: 70
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  saveButton: {
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: '#3399ff',
    height: 56,
    width:"100%",
    alignSelf: 'center',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
},
  saveButtonText: {
    color: 'white',
    fontSize: 20
  }
});

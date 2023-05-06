import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useLayoutEffect, useEffect, useState} from 'react';
import ImageButton from '../../components/ImageButton';
import VisibilityModal from '../../components/VisibilityModal';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { getCarById } from '../../redux/actions/carActions';
const Home = (props) => {
  const [visible, setVisible] = useState(false)
  const [deviceNo, setDeviceNo] = useState('')

  useEffect(() => {
    props.getCarinfo();
  }, []);
  
  const navSuper = () => {
    props.navigation.navigate('Menu',{deviceNo})
  }

  const navTcr = () => {
    props.navigation.navigate('Menu',{deviceNo})
  }

  const navOther = () => {
    props.navigation.navigate('Menu',{deviceNo})
  }

  const showModal = () => {
    setVisible(true);
  }

  const hideModal = () => {
    setVisible(false);
  }

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={{backgroundColor:'white', marginRight:20, marginTop:50, flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
        <IonIcons onPress={showModal} style={{}} name="settings" size={30} color="#000" />
      </View>
      <Text style={[styles.headingText]}>
        Tire Control System
      </Text>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginStart: 3, marginTop: 36 }}>
        <ImageButton onPress={navSuper} imageSource={require('../../assets/images/1.jpg')} style={styles.firstButton} />
      </View>
        
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginStart: 3, marginTop: 36 }}>
        <ImageButton onPress={navTcr} imageSource={require('../../assets/images/2.jpg')} style={styles.firstButton} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginStart: 3, marginTop: 36 }}>
        <ImageButton onPress={navOther} imageSource={require('../../assets/images/3.jpg')} style={styles.firstButton} />
      </View>
      <View>
        <VisibilityModal visible = {visible} showModal={showModal} hideModal = {hideModal} setDeviceNo={setDeviceNo} />
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getCarinfo: () => dispatch(getCarById())
  };
};

const mapStateToProps = (state, props) => {
  return { cars: state.cars.cars };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },
  circle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderColor: '#99888B',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
  firstButton: {
    marginRight:20,
    marginLeft:20,
    marginTop: 60,
    height: 100
  },
  headingText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 40,
    letterSpacing: 0.19,
    color: 'black',
    textAlign: 'center',
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
});

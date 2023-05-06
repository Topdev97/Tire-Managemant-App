import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal';
import { Button, Icon } from 'react-native-elements';
import { TextInput } from 'react-native';
import { VERSION } from 'lodash';
const VisibilityModal = (props) => {
    const [text, setText] = useState('')
    
    const submitButton = () => {
        props.setDeviceNo(text)
        props.hideModal()
    }
    return (
        <View style={[styles.container]}>
        <Modal
            style={{margin:0}}
            animationType="slide"
            transparent={true}
            backdropOpacity={0.5}
            backdropColor={'rgba(0, 0, 0, 0.2)'}
            visible={props.visible}
            onRequestClose={() => {
                props.hideModal();
            }}>
            <TouchableWithoutFeedback //this touchable closes modal
            style={{ height:'100%', width:'100%'}}
                    onPress={() => {
                        props.hideModal();
                    }}>
                <View style={[styles.container]}>
                    <View onPress={() => props.showModal()} style={[styles.settingwindow]}>
                        <Text style={[styles.settingText]}>Set Device No.</Text>
                        <Text style={[styles.settingText,{fontSize:20, marginLeft:15}]}>Device No. = </Text>
                        <TextInput
                            style={styles.input}
                            value={text}
                            onChangeText={(newText) => setText(newText)}
                            placeholderTextColor="grey"
                        />
                        <View style={[styles.btnwindow]}>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <View style={{flex:4, justifyContent: 'center', alignItems: 'center',}}>
                                    {/* <Button title='ok' style={[styles.modalBtn]}/> */}
                                    <TouchableOpacity onPress={submitButton} style={[styles.modalBtn]}>
                                        <Text style={styles.buttonText}>ok</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex:4,justifyContent: 'center', alignItems: 'center',}}>
                                    <TouchableOpacity style={[styles.modalBtn]} onPress={props.hideModal}>
                                        <Text style={styles.buttonText}>キャンセル</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        
                    </View>
                    
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    </View>
    )
}

export default VisibilityModal
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
      },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    settingwindow:{
        backgroundColor:'rgba(0, 0, 0, 0.8)', 
        width:'60%', 
        borderColor:'white',
        borderWidth: 1, // add border width
        borderRadius: 5, // add border radius to round the edges
    },
    settingText:{
        marginTop:10,
        marginLeft:10,
        color:'white', 
        fontSize:24
    },
    settingButton:{

    },
    input:{
        marginTop:10,
        alignSelf:'center',
        width: '98%',
        backgroundColor: 'white', // set the background color to white
        color: 'black', // set the color to black
        paddingHorizontal: 10,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'gray', 
    },
    btnwindow:{
        marginTop:5,
        width: "100%",
        height:70,
        backgroundColor:'grey',
        paddingLeft:5,
        paddingRight:5,
        padding:5
     
    },
    modalBtn:{
        backgroundColor: 'white',
        borderRadius: 1,
        padding: 10, 
        borderWidth:2,
        borderColor:'gray',
        width:'100%',
        alignItems:'center'
    },
    buttonText:{
        fontSize:20,
        color: 'black',
    }

  });
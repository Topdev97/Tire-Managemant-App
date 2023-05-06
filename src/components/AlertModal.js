import { StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
const AlertModal = (props) => {
	const submitSuccess = () => {
		props.hideModal();
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
			<TouchableWithoutFeedback
			style={{ height:'100%', width:'100%'}}
					onPress={() => {
						props.hideModal();
					}}>
				<View style={[styles.container]}>
					<View onPress={() => props.showModal()} style={[styles.settingwindow]}>
						{
							props.alertStatuss === '' ? <Text style={[styles.settingText]}>Submit Success.</Text>
							: <Text style={[styles.settingText]}>{props.alertStatuss}</Text>
						}
						
						<View style={[styles.btnwindow]}>
							<View style={{flex:1, flexDirection:'row'}}>
								<View style={{flex:4, justifyContent: 'center', alignItems: 'center',}}>
									<TouchableOpacity onPress={() => submitSuccess()} style={[styles.modalBtn]}>
										<Text style={styles.buttonText}>OK</Text>
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

export default AlertModal
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.8)'
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
		width:'50%',
		alignItems:'center'
	},
	buttonText:{
		fontSize:20,
		color: 'black',
	}
  });
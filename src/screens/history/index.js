import React, {useEffect, useState}from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getCollectData } from '../../redux/actions/carActions';
import { Table, Row } from 'react-native-table-component';

const History = (props) =>  {
  const [tableHead, setTableHead] = useState([]);
  const [tableData, setTableData] = useState([]);
  const widthArr = [50, 80, 70, 90, 80, 140, 140, 140, 140, 120]

  useEffect(() => {
    props.getCollects();
  },[])

  useEffect(() => {
    if(props.collects.length !== 0){
      setTableHead(Object.keys(props.collects[0]))
    }
  },[props.collects])

  useEffect(() => {
    if(props.collects.length !== 0){
      const tableData = [];
      const sortedData = props.collects.sort((a, b) => new Date(b.Created) - new Date(a.Created));
      sortedData.map((item, index) => {
        tableData.push(Object.values(item))
      })
      setTableData(tableData);
    }
  },[props.collects])

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
            <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text}/>
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
              {
                tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={widthArr}
                    style={[styles.row, {backgroundColor: '#ffffff'}]}
                    textStyle={styles.bodyText}
                  />
                ))
              }
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1,  paddingTop: 5, backgroundColor: '#ffffff' },
  header: { height: 50,  backgroundColor: '#5353c6' },
  text: { textAlign: 'center', fontWeight: '300',color:'white' },
  bodyText: { textAlign: 'center', fontWeight: '250',color:'black' },
  dataWrapper: {  },
  row: { height: 40, backgroundColor: '#ffffff', color:'black' }
});

const mapDispatchToProps = dispatch => {
  return {
    getCollects: () => dispatch(getCollectData()),
  };
};

const mapStateToProps = (state, props) => {
  return { collects: state.collect.collects };
}

export default connect(mapStateToProps, mapDispatchToProps)(History);



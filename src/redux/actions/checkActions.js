import * as types from "../actionTypes";
import {baseFormula} from '../api'

export const getCollectDataById = (carNumber) => (dispatch) => {
    baseFormula('Collect').select({
        view: "Grid view"
    }).firstPage((err, records) => {
    if (err) {
      console.error(err);
      return;
    }
    const collects = records.map((record) => {
      return {
          Barcode1: record.get('Barcode1'),
          Barcode2: record.get('Barcode2'),
          Barcode3: record.get('Barcode3'),
          Barcode4: record.get('Barcode4'),
          Name: record.get('Name'),
          Created: record.get('Created')
      };
    });
    const collectsById = collects.filter(item => item.Name == carNumber )
    dispatch(
      {
        type:types.GET_COLLECTSBYID_SUCCESS,
        payload: collectsById
      }
    );
  });
};

export const getCheckDataById = (carNumber) => (dispatch) => {
    baseFormula('Check').select({
        view: "Grid view"
    }).firstPage((err, records) => {
    if (err) {
      console.error(err);
      return;
    }
    const checks = records.map((record) => {
      return {
        Barcode1: record.get('Barcode1'),
        Barcode2: record.get('Barcode2'),
        Barcode3: record.get('Barcode3'),
        Barcode4: record.get('Barcode4'),
        Name: record.get('Name'),
        Created: record.get('Created')
      };
    });
    const checkById = checks.filter(item => item.Name == carNumber )
    dispatch(
      {
        type:types.GET_CHECKDATA_SUCCESS,
        payload: checkById
      }
    );
  });
};

export const addCheckData = (checkData) => (dispatch) => {
    baseFormula('Check').create(checkData, (err, record) => {
        if (err) {
          console.log(err);
        } else {
          console.log(record)
        }
      });
 
};


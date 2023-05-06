import * as types from "../actionTypes";
import {baseFormula} from '../api'

export const receiveCars = (Cars) => {
  return {type: 'GET_CARINFO_SUCCESS', Cars};
};



export const editCar = (id, car) => (dispatch) => {
  baseFormula('Car').replace(id, car, (err, record) => {
    if (err) {
      console.log(err);
    } else {
      dispatch(fetchCars());
    }
  });
};

export const deleteCar = (id) => (dispatch) => {
  baseFormula('Car').destroy(id, (err, record) => {
    if (err) {
      console.log(err);
    } else {
      dispatch(fetchCars());
    }
  });
};

export const fetchCars = () => (dispatch) => {
  baseFormula('Car').select({
    view: "Grid view"
  }).firstPage((err, records) => {
    if (err) {
      console.error(err);
      return;
    }
    const cars = records.map((record) => {
      return {
        id: record.get('CarId'),
        name: record.get('Name'),
        team: record.get('Team'),
        organization: record.get('Organization')
      };
    });
    dispatch(
      {
        type:types.GET_CARSINFO_SUCCESS,
        payload: cars
      }
    );
  });
};

export const getCarById = (id) => (dispatch) => {
  console.log("=================", id)
  baseFormula('Car').select({
    view: "Grid view"
  }).firstPage((err, records) => {
    if (err) {
      console.error(err);
      return;
    }
    
    const cars = records.map((record) => {
      return {
        id: record.get('CarId'),
        name: record.get('Name'),
        team: record.get('Team'),
        organization:record.get('Organization'),
        Created: record.get('Created')
      };
    });
    const car = cars.filter(car => car.name == id)[0]
    dispatch(
      {
        type:types.GET_CARINFO_SUCCESS,
        payload: car
      }
    );
  });
}

export const addCollect = (data) => (dispatch) => {
  baseFormula('Collect').create(data, (err, record) => {
    if (err) {
      console.log(err);
    } else {
      console.log(record)
    }
  });
};

export const getCollectData = () => (dispatch) => {
  baseFormula('Collect').select({
    view: "Grid view"
  }).firstPage((err, records) => {
    if (err) {
      console.error(err);
      return;
    }
    const collects = records.map((record) => {
      return {
        Name: record.get('Name'),
        Team: record.get('Team'),
        DeviceNo: record.get('Device'),
        Organization: record.get('Organization'),
        Type: record.get('Type'),
        Barcode1: record.get('Barcode1'),
        Barcode2: record.get('Barcode2'),
        Barcode3: record.get('Barcode3'),
        Barcode4: record.get('Barcode4'),
        Created: record.get('Created'),
      };
    });
    dispatch(
      {
        type:types.GET_COLLECTS_SUCCESS,
        payload: collects
      }
    );
  });
};


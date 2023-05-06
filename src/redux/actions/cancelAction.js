import { ta } from "date-fns/locale";
import * as types from "../actionTypes";
import {baseFormula} from '../api'


export const cancelCollect = (cancelData) => (dispatch) => {
  baseFormula('Cancel').create(cancelData, (err, record) => {
    if (err) {
      console.log(err);
    } else {
          updateField(cancelData)
        }
      });
    };
    function updateField(cancelData) {
    const cancelBarCode = cancelData.Barcode1;

  findFieldname(cancelBarCode)
}

function findFieldname(containedValue){
  const table = baseFormula('Collect');
  table
  .select({
    filterByFormula: `FIND('${containedValue}', CONCATENATE({Barcode1}, {Barcode2}, {Barcode3}, {Barcode4})) > 0`,
  })
  .eachPage((records, fetchNextPage) => {
    records.forEach((record) => {
      const fieldNames = Object.keys(record.fields);
      const matchingFieldName = fieldNames.find((name) => {
        const fieldValue = record.fields[name];
        if(containedValue == fieldValue) return name;
      });
      console.log(`The name of the field that contains ${containedValue} is ${matchingFieldName}`);
      table.select({ filterByFormula: `{${matchingFieldName}} = '${containedValue}'` }).firstPage((err, record) => {
        if(err){
          console.error(err);
          return;
        }
        const recordId = record[0]._rawJson.id
        table.update(`${recordId}`, {[matchingFieldName] : ""}, (err, record) => {
          if(err){
            console.error(err);
            return;
          }
        })
      });

      return matchingFieldName;
    });
    fetchNextPage();
  }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}
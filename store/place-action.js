import * as FileSystem from 'expo-file-system'

export const ADD_PLACE = 'ADD_PLACE';
export const FETCH_PLACES = 'FETCH_PLACES';
export const DELETE_PLACES = 'DELETE_PLACES';

import { insertValue , fetchValue, deleteValue} from '../helper/db';

export const addPlace =( title, image, lat, lng) => {
  return async dispatch => {
    const name = image.split('/').pop();
    const newPath = FileSystem.documentDirectory+name;
    try{
      await FileSystem.moveAsync({
        from: image,
        to: newPath
    });
    const dbResults = await insertValue(title, newPath, 'abcd', lat, lng);
    dispatch ({ type: ADD_PLACE, placeData: { id: dbResults.insertId, title: title, image:newPath, lat: lat, lng: lng } });
    }catch(err){
      console.log(err);
      throw err;
    }
 
  };
};

export const fetchPlaces =()=>{
  return async dispatch => {
      const fetchResults = await fetchValue();
      dispatch({type: FETCH_PLACES, place : fetchResults.rows._array});
   };
};



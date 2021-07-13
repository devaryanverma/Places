import { ADD_PLACE, FETCH_PLACES} from './place-action';
import Place from '../model/place';

const initialState = {
  places: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLACES:
      return {
        places: action.place.map(pl=>new Place(pl.id.toString(),pl.title,pl.image,pl.lat, pl.lng ) )
      };
    case ADD_PLACE:
      const newPlace = new Place(action.placeData.id.toString(), 
      action.placeData.title, action.placeData.image, action.placeData.lat, action.placeData.lng);
      return {
        places: state.places.concat(newPlace)
      };
   
    default:
      return state;
  }
};

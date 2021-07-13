import React , {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import  MapView ,{ Marker}from 'react-native-maps';
import  Colors  from '../constants/Colors';


const MapScreen = props => {

  const [pickedLocation, setPickedLocation] = useState();

  const mapRegion = {
    latitude: 28.34,
    longitude:79.39,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const locationSelector = event =>{
    setPickedLocation({
      lat:event.nativeEvent.coordinate.latitude,
      lng:event.nativeEvent.coordinate.longitude
    });
  };

  const saveHandler = useCallback( () =>{
    if(!pickedLocation)
    {
      return;
    }
    props.navigation.navigate('NewPlace', {locationValue: pickedLocation});
  }, [pickedLocation]);

  useEffect (()=>{
    props.navigation.setParams({savedLocation: saveHandler})}
  ,[saveHandler]);
   

  let markerCordinates;

  if(pickedLocation)
 
  {
    markerCordinates={
      latitude: pickedLocation.lat,
      longitude: pickedLocation.lng
    };
  }
  return (
    <MapView region={mapRegion} style={styles.screen} onPress={locationSelector}> 
    { markerCordinates && <Marker title = 'Picked Location' coordinate = {markerCordinates}></Marker>}
    </MapView>
  );
};

MapScreen.navigationOptions = navData=>{
  const location = navData.navigation.getParam('savedLocation')
    return{
      headerRight: (<TouchableOpacity style={styles.button} onPress={location}>
        <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity> 
      )
    };
};

const styles = StyleSheet.create({
  screen:{
    flex:1
  },
  button:{},
  buttonText:{
    marginHorizontal: 10,
    color : 'white',
    fontSize:18,
    fontWeight:'bold'
  }
});

export default MapScreen;

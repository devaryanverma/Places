import React from 'react';
import { View, Text, StyleSheet, Image,Alert, TouchableOpacity } from 'react-native';
import  MapView,{Marker} from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';

const PlaceDetailScreen = props => {
  const img = props.navigation.getParam('placeImg');
  const lat = props.navigation.getParam('placeLat');
  const lng = props.navigation.getParam('placeLng');

  
  
  
  return (
    <View style={styles.screen}>
      <Text style={{...styles.text,marginTop:10}}>IMAGE</Text>
      <View style={styles.imageOuter}>
      <Image source={{ uri: img }} style={styles.image} />
      </View>
      <Text style={styles.text}>MAP</Text>
      <Text style={styles.midText}>latitude : {lat} , longitude : {lng}</Text>
      <View style={styles.mapImageOuter}>
      <MapView region={{ latitude: lat, longitude: lng, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }} style={styles.mapImage}>
        <Marker title='Picked Location' coordinate={{ latitude: lat, longitude: lng }}></Marker></MapView>
    </View>
    </View>
  );
};

PlaceDetailScreen.navigationOptions = navData => {
  const del = navData.navigation.getParam('delFunction');
  return {
    headerTitle: navData.navigation.getParam('placeTitle'),
   
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10
  },
  adjust:{
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center'
},
  midText:{
    textAlign:'center',
    fontSize:16,
    fontStyle:'italic'
  },
  mapImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,

  },
  text:{
    textAlign:'center',
    fontSize:20,
    fontWeight:"bold",
    fontStyle:"italic"
  },
  imageOuter:{
    marginTop: 10,
    marginBottom:20,
    marginHorizontal:20
  },
  mapImageOuter:{
    margin: 20,
    borderColor:'black',
    borderWidth:2
  },
  screen: {
    flex:1
  }
});

export default PlaceDetailScreen;

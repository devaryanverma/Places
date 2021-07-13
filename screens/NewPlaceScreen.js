import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Button,
  Text,
  Image,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native';
import  MapView,{Marker} from 'react-native-maps';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Permission from 'expo-permissions';

import Colors from '../constants/Colors';
import * as placesActions from '../store/place-action';

const NewPlaceScreen = props => {
  const [titleValue, setTitleValue] = useState('');
  const [imageFinal, setImageFinal] = useState();
  const [locationData, setLoactionData] = useState();
  const [indicator, setIndicator] = useState(false);
  const [latitude, setLatitute]=useState(0.00);
  const [longitude, setLongitude]= useState(0.00);

  const mapPickedData = props.navigation.getParam('locationValue');

  const dispatch = useDispatch();

  const titleChangeHandler = text => {
    setTitleValue(text);
  };

  useEffect(() => {
    if (mapPickedData) {
      setLoactionData(mapPickedData);
    }
  }, [mapPickedData]);

  const imageHandler = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    setImageFinal(result.uri);
  }

  const permissionHandler = async () => {
    const permission = await Permission.askAsync(Permission.LOCATION);
    if (permission.status !== 'granted') {
      return false;
    }
    return true;
  };

  const locationHandler = async () => {
    const access = permissionHandler();
    setIndicator(true);
    if (!access) {
      return;
    }
    try {
      const lfinal = await Location.getCurrentPositionAsync({ timeout: 5000 });
      console.log(lfinal);
      setLoactionData({ lat: lfinal.coords.latitude, lng: lfinal.coords.longitude });
    } catch (err) {
      Alert(alert("Error Please try again later",'try again',[{text:'Okay', style: 'cancle'}]));
      throw (err);
    }
    setIndicator(false);
  };

  const pickedLocationHandler = () => {
    props.navigation.navigate('Map');
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue, imageFinal, locationData.lat, locationData.lng));
    props.navigation.goBack();
  };

  useEffect(() => {
  if(locationData)
  {
  setLatitute( locationData.lat);
  setLongitude(locationData.lng);
  }
},[locationData]);
  
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <View style={styles.imageSize}>
          {!imageFinal ? <Text style={styles.text}>No image picked yet</Text> :
            <Image source={{ uri: imageFinal }} style={{ width: '100%', height: '100%' }} />}
        </View>
        <View style={{  alignItems:'center'}}>
      <View style={{width : '35%'}}>
      <Button title='Take Photo' color={Colors.primary} onPress={imageHandler} />
      </View>
      </View>
        
        <View style={styles.main}>
        {indicator ? <ActivityIndicator size='large' color={Colors.primary} />:<Text></Text>}
          <View style={styles.imageSize}>
            {locationData ? <MapView region={{ latitude: latitude, longitude: longitude, latitudeDelta: 0.0922,longitudeDelta: 0.0421  }} style={{flex:1}}>
               <Marker title = 'Picked Location' coordinate = {{latitude: latitude, longitude: longitude}}></Marker></MapView>
            : <Text style={styles.text}>No Location Selected</Text>}
          </View>
          <View style={styles.button}>
            <Button title='Find Location' color={Colors.primary} onPress={locationHandler} />
            <Button title='Select on Map' color={Colors.primary} onPress={pickedLocationHandler} />
          </View>
        </View>
        <View style={{  alignItems:'center'}}>
      <View style={{width : '35%'}}>
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
      </View>
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place'
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  text: {
    fontSize: 15,
    textAlign: 'center'
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  main: {
    marginTop: 10,
    marginBottom: 20,
    flex: 1
  },
  imageSize: {
    height: 200,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: 'center'
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold'
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewPlaceScreen;

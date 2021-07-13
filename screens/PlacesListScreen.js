import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Platform, FlatList, Alert, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import PlaceItem from '../Components/PlaceItem';
import Colors from '../constants/Colors';
import * as fetchActions from '../store/place-action';

const PlacesListScreen = props => {
  const places = useSelector(state => state.places.places);

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchActions.fetchPlaces());
  },[dispatch]);
  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <View style={styles.icon}>
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={null}
          lat={itemData.item.lat}
          lng={itemData.item.lng}
          onSelect={() => {
            props.navigation.navigate('PlaceDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
              placeImg:itemData.item.imageUri,
              placeLat:itemData.item.lat,
              placeLng:itemData.item.lng
            });
          }}
        />
       
        </View>
      )}
    />
  );
};

PlacesListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Places',
    headerRight: ()=>(
        <Ionicons name="md-add" size={24} color= {Platform.OS==='android'?'white':Colors.primary} style={{paddingRight: 15}}
          onPress={() => {
            navData.navigation.navigate('NewPlace');
          }}
        />
    )
  };
};

const styles = StyleSheet.create({
  icon:{
    flexDirection:'row',
    justifyContent:'space-around'
    },
  adjust:{
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      paddingVertical: 15,
      paddingHorizontal: 30,
      flexDirection: 'row',
      alignItems: 'center'
  }
});

export default PlacesListScreen;

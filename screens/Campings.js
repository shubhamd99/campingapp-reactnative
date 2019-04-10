import React from 'react';
import {
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ImageBackground
} from 'react-native';
import { MapView } from 'expo';
import { Ionicons, FontAwesome, Foundation, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');
const { Marker } = MapView;

const campings = [
  {
      id: 1,
      type: 'rv',
      name: 'Himachal Paradise',
      discription: 'Popular spot for trekkers.',
      rating: 4.9,
      distance: 2.65,
      price: 'Free',
      image: require("../assets/images/tabimage1.jpg"),
      latlng: {
        latitude: 15.4929,
        longitude: 73.8278,
      }

  },
  {
      id: 2,
      type: 'tent',
      name: 'Punjab Places',
      discription: 'Popular spot for Snow.',
      rating: 4.2,
      distance: 14.0,
      price: 'Paid',
      image: require("../assets/images/tabimage2.jpg"),
      latlng: {
        latitude: 15.4829,
        longitude: 73.8378,
      }

  },
]

const myLocation = {
  latitude: 15.2829,
  longitude: 73.8368,
}

export default class Campings extends React.Component {
  static navigationOptions = {
    header: null,
  };

state = {
   active: 'all',
   campings: campings,
}

handleTab = (tabKey) => {
  let newCampings = campings
  if (tabKey !== 'all') {
    newCampings = campings.filter(camping => camping.type === tabKey);
  }
  this.setState({ active: tabKey, campings: newCampings })
}

renderHeader(){
    return(
    <View style={styles.headerContainer}>
        <View style={styles.header}>
            <View style={{flex: 2, flexDirection: 'row'}}>
            <View style={styles.settings}>
                <View style={styles.location}>
                        <FontAwesome name="location-arrow" size={14} color="white" />
                </View>
            </View>
                <View style={styles.options}>
                    <Text style={{ fontSize: 12, color: '#A5A5A5', marginBottom: 5 }}>
                        Detected Location
                    </Text>
                    <Text style={{ fontSize: 14, fontWeight: '300' }}>Northern Islands</Text>
                </View>
            </View>
            <View style={styles.settings}>
               <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
                  <Ionicons name="ios-settings" size={24} color="black" />
               </TouchableOpacity>
            </View>
        </View>
        {this.renderTabs()}
    </View>
    )
}

renderMap(){
  const campingMarker = ({type}) => (
    <View style={[styles.marker, styles[`${type}Marker`]]}>
        { type === 'rv' 
          ? <FontAwesome name="truck" size={18} color="#fff" />
          : <Foundation name="mountains" size={18} color="#fff" />
        }
    </View>
  )
    return(
        <View style={styles.map}>
            <MapView
                style={{ flex: 1, height: height * 0.5, width }}
                showsMyLocationButton
                initialRegion={{
                latitude: 15.4909,
                longitude: 73.8278,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            >
              {
                    this.state.campings.map(marker => (
                      <Marker key={`marker-${marker.id}`} coordinate={marker.latlng}>
                        {campingMarker(marker)}
                      </Marker>
                    ))
              }
            </MapView>
        </View>
    )
}

renderTabs(){
    const { active } = this.state;
    return(
        <View style={styles.tabs}>
            <View style={ [styles.tab, active === 'all' ? styles.activeTab : null] }>
                <Text style={ [styles.tabTitle, active === 'all' ? styles.activeTabTitle : null] } onPress={() => this.handleTab('all')} >All Spots</Text>
            </View>
            <View style={ [styles.tab, active === 'tent' ? styles.activeTab : null] }>
                <Text style={ [styles.tabTitle, active === 'tent' ? styles.activeTabTitle : null] } onPress={() => this.handleTab('tent')} >Tentings</Text>
            </View>
            <View style={ [styles.tab, active === 'rv' ? styles.activeTab : null] }>
                <Text style={ [styles.tabTitle, active === 'rv' ? styles.activeTabTitle : null] } onPress={() => this.handleTab('rv')} >RV Camping</Text>
            </View>
        </View>
    )
}


renderList(){
    return this.state.campings.map(camping => {
              return (
                <View key={`camping-${camping.id}`} style={styles.camping}>

                  <ImageBackground 
                    style={ styles.campingImage }
                    imageStyle={ styles.campingImage } 
                    source={ camping.image } 
                  />

                <View style={styles.campingDetails}>
                  <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{ camping.name }</Text>
                    <Text style={{ fontSize: 12, color: '#A5A5A5', paddingTop: 5 }}>{ camping.discription }</Text>
                  </View>
                  <View style={{flex: 2, flexDirection: 'row'}}>
                    <View style={styles.campingInfo}>
                      <FontAwesome name="star" color="#FFBA5A" size={12} />
                        <Text style={{ marginLeft: 4, color: '#FFBA5A' }}>{ camping.rating }</Text>
                    </View>
                    <View style={styles.campingInfo}>
                        <FontAwesome name="location-arrow" color="#FF7657" size={12} />
                        <Text style={{ marginLeft: 4, color: '#FF7657' }}>{ camping.distance }</Text>
                    </View>
                    <View style={styles.campingInfo}>
                        <Ionicons name="md-pricetag" color="black" size={12} />
                        <Text style={{ marginLeft: 4, color: 'black' }}>{ camping.price }</Text>
                    </View>
                  </View>
                </View>
                <View style={{flex: 0.2, justifyContent: 'center'}}>
                    <SimpleLineIcons name="options-vertical" color="#A5A5A5" size={22} />
                </View> 
            </View>
            )
      })
}

  render() {
    return (
    <SafeAreaView style={styles.container}>
         {this.renderHeader()}
        <ScrollView style={styles.container}>
          {this.renderMap()}
          {this.renderList()}
        </ScrollView>
     </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    top:0,
    height: height * 0.15,
    width: width,
    marginTop: 40
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.15,
    paddingHorizontal: 14,
    // backgroundColor: 'yellow'
  },
  location: {
    height: 24,
    width: 24,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFBA5A',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff'
  },
  rvMarker: {
    backgroundColor: '#FFBA5A'
  },
  tentMarker: {
    backgroundColor: '#FF7657'
  },
  settings: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  options: {
    flex: 1,
    paddingHorizontal: 14,
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  tab: {
    paddingHorizontal: 14,
    marginHorizontal: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabTitle: {
    fontWeight: '200',
    fontSize: 14,
    marginBottom: 10,
  },
  activeTab: {
    borderBottomColor: '#FFBA5A',
    borderBottomWidth: 3,
  },
  activeTabTitle: {
    color: '#FFBA5A',
  },
  map: {
    flex: 1
  },
  camping: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#A5A5A5',
    borderBottomWidth: 0.5,
    padding: 20,
  },
  campingDetails: {
    flex: 2,
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  campingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
  campingImage: {
    width: width * 0.30,
    height: width * 0.25,
    borderRadius: 7,
  }
});

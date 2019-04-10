import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  Switch
} from 'react-native';
import { Ionicons, Foundation, FontAwesome } from '@expo/vector-icons';


const { width, height } = Dimensions.get('screen');

export default class Settings extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    sort: 'distance',
    type: 'all',
    price: 'free',
    option_full: true,
    option_rated: true,
    option_free: false
  }

  renderHeader(){
    return(
      <View style={styles.header}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Campings')}>
             <Ionicons name="md-arrow-back" size={24} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.title}>Filter</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Campings')}>
          <Ionicons name="ios-search" size={24} />
        </TouchableOpacity>
        </View>
      </View>
    )
  }

 
  render() {
    const { sort, type, price, option_free, option_full, option_rated } = this.state;
    const activeType = (key) => type === key;

      return(
        <SafeAreaView style={styles.container}>
           {this.renderHeader()}
           <ScrollView style={styles.container}>
              <View style={styles.section}>
                <View>
                  <Text style={styles.title}>Sort By</Text>
                </View>
                <View style={styles.prices}>
                    <TouchableOpacity style={[styles.button, styles.first, sort === 'distance' ? styles.active: null]} onPress={ () => this.setState({sort: 'distance'}) }>
                        <Text style={[styles.buttonText,  sort === 'distance' ? styles.activeText : null ]}>Distance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, sort === 'ratings' ? styles.active: null]} onPress={ () => this.setState({sort: 'ratings'}) }>
                        <Text style={[styles.buttonText,  sort === 'ratings' ? styles.activeText : null ]}>Ratings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.last, sort === 'reviews' ? styles.active: null]} onPress={ () => this.setState({sort: 'reviews'}) }>
                        <Text style={[styles.buttonText,  sort === 'reviews' ? styles.activeText : null ]}>Reviews</Text>
                    </TouchableOpacity>
                </View>
              </View>

              <View style={styles.section}>
                <View>
                  <Text style={styles.title}>Type</Text>
                </View>
                <View style={styles.prices}>
                    <TouchableOpacity style={[styles.button, styles.first, type === 'all' ? styles.active: null]} onPress={ () => this.setState({type: 'all'}) }>
                        <View style={{flexDirection: 'row'}}>
                          <Foundation name="mountains" size={24} color={ type === 'all' ? "#fff" : "#FF7657" } />
                          <FontAwesome name="truck" size={24} color={ type === 'all' ? "#fff" : "#FFBA5A" } />
                        </View>
                        <Text style={[styles.buttonText,  type === 'all' ? styles.activeText : null ]}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, type === 'tenting' ? styles.active: null]} onPress={ () => this.setState({type: 'tenting'}) }>
                        <Foundation name="mountains" size={24} color={ type === 'tenting' ? "#fff" : "#FF7657" } />
                        <Text style={[styles.buttonText,  type === 'tenting' ? styles.activeText : null ]}>Tenting</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.last, type === 'rv' ? styles.active: null]} onPress={ () => this.setState({type: 'rv'}) }>
                         <FontAwesome name="truck" size={24} color={ type === 'rv' ? "#fff" : "#FFBA5A" } />
                        <Text style={[styles.buttonText,  type === 'rv' ? styles.activeText : null ]}>RV Camping</Text>
                    </TouchableOpacity>
                </View>
              </View>

              <View style={styles.section}>
                <View>
                  <Text style={styles.title}>Price</Text>
                </View>
                <View style={styles.prices}>
                   <TouchableOpacity style={[styles.button, styles.first, price === 'free' ? styles.active: null]} onPress={ () => this.setState({price: 'free'}) }>
                        <Text style={[styles.buttonText,  price === 'free' ? styles.activeText : null ]}>Free</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, price === '$$' ? styles.active: null]} onPress={ () => this.setState({price: '$$'}) }>
                        <Text style={[styles.buttonText,  price === '$$' ? styles.activeText : null ]}>$$</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, price === '$$$' ? styles.active: null]} onPress={ () => this.setState({price: '$$$'}) }>
                        <Text style={[styles.buttonText,  price === '$$$' ? styles.activeText : null ]}>$$$</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.last, price === '$$$$' ? styles.active: null]} onPress={ () => this.setState({price: '$$$$'}) }>
                        <Text style={[styles.buttonText, price === '$$$$' ? styles.activeText : null ]}>$$$$</Text>
                    </TouchableOpacity>
                </View>
              </View>

              <View style={styles.section}>
                <View>
                  <Text style={styles.title}>More Options</Text>
                </View>
                <View>
                   <View style={styles.option}>
                      <Text style={styles.optionText}>Show spots that are full</Text>
                      <Switch 
                        value={this.state.option_full}
                        thumbColor="#EAEAED"   
                        trackColor={{ false: "#EAEAED", true: "#FF7657"}}  
                        onValueChange={() => this.setState({option_full: !option_full})}
                      />
                   </View>
                   <View style={styles.option}>
                      <Text style={styles.optionText}>Show only highly rated spots</Text>
                      <Switch 
                        value={this.state.option_rated}
                        thumbColor="#EAEAED" 
                        trackColor={{ false: "#EAEAED", true: "#FF7657"}}  
                        onValueChange={() => this.setState({option_rated: !option_rated})} 
                      />
                   </View>
                   <View style={styles.option}>
                      <Text style={styles.optionText}>Show only free spots</Text>
                      <Switch 
                        value={this.state.option_free}
                        thumbColor="#EAEAED"   
                        trackColor={{ false: "#EAEAED", true: "#FF7657"}} 
                        onValueChange={() => this.setState({option_free: !option_free})} 
                      />
                   </View>
                </View>
              </View>

           </ScrollView>
        </SafeAreaView>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.15,
    width: width,
    paddingHorizontal: 14,
  },
  section: {
    flexDirection: 'column',
    paddingHorizontal: 14,
    marginBottom: 14,
    paddingBottom: 24,
    borderBottomColor: '#A5A5A5',
    borderBottomWidth: 0.5,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  title: {
    fontSize: 18,
    marginVertical: 14,
  },
  prices: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FF7657',
    justifyContent: 'space-between',
    // overflow: 'hidden'
  },
  button: {
    flex: 1,
    padding: 14,
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '400'
  },
  active: {
    backgroundColor: '#FF7657',
  },
  activeText: {
    color: '#fff'
  },
  first: {
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
  },
  last: {
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    alignItems: 'center'
  },
  optionText: {
    fontWeight: '400',
  }
})

import React from 'react';
import {Dimensions, TouchableOpacity, Image, View} from 'react-native';
import {Layout, Text, Spinner} from '@ui-kitten/components';
import {blue, green} from '../helpers/constant';
const global = require('../styles/global');
const width = Dimensions.get('window').width;

export const TopupComponent = ({token, coin, navigation}) => {
  return (
    <Layout style={{marginHorizontal: width * 0.02}}>
      <Image
        source={require('./../assets/topup-background.jpeg')}
        resizeMode="cover"
        style={{
          width: width * 0.95,
          height: width * 0.35,
          borderRadius: width * 0.08,
          position: 'relative',
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          marginVertical: width * 0.05,
          marginLeft: width * 0.05,
        }}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            width: width * 0.45,
            height: width * 0.25,
            borderRadius: width * 0.02,
          }}>
          <Layout style={{flexDirection: 'row', padding: 5}}>
            <Image
              source={require('./../assets/dompet.png')}
              resizeMode="cover"
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Text style={[global.captionFont, {paddingLeft: 2}]} category="c2">
              Sebis Koin
            </Text>
          </Layout>
          <Text style={{paddingLeft: 5, fontWeight: 'bold'}} category="h5">
            {token ? coin : 0}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            paddingLeft: width * 0.012,
            width: width * 0.35,
            height: width * 0.25,
          }}>
          <TouchableOpacity
            onPress={() =>
              token ? navigation.navigate('Coin') : navigation.navigate('Login')
            }
            style={{
              backgroundColor: '#FFFFFF',
              width: width * 0.1,
              height: width * 0.1,
              marginLeft: width * 0.12,
              borderRadius: width * 0.03,
            }}>
            <Text
              category="h5"
              style={{textAlign: 'center', justifyContent: 'center'}}>
              +
            </Text>
          </TouchableOpacity>
          <Text category="h5" style={{textAlign: 'center', color: '#ffffff'}}>
            Top Up
          </Text>
          <Text
            style={[
              global.captionFont,
              {
                paddingLeft: 2,
                fontSize: 10,
                textAlign: 'center',
                color: '#ffffff',
              },
            ]}
            category="c2">
            Beli Sebis Koin dulu untuk beli Les
          </Text>
        </View>
      </View>
    </Layout>
  );
};

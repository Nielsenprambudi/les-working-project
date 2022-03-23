import React from 'react';
import {Dimensions, TouchableOpacity, Image, View} from 'react-native';
import {Layout, Text, Spinner} from '@ui-kitten/components';
import {blue, green} from '../helpers/constant';
const global = require('../styles/global');
const width = Dimensions.get('window').width;

export const PromoComponent = () => {
  return (
    <Layout
      style={{
        paddingTop: width * 0.01,
        paddingBottom: width * 0.1,
      }}>
      <TouchableOpacity>
        <Layout style={global.carouselHeaderDefault}>
          <Image
            source={require('./../assets/sebby-pegang-buku2.png')}
            style={{width: width * 0.5, height: width * 0.5}}
            resizeMode="cover"
          />
          <View style={{width: width * 0.5, flexDirection: 'column'}}>
            <Text
              category="p2"
              style={[
                global.titleFont,
                {color: '#ffffff', paddingTop: width * 0.05},
              ]}>
              Sekarang ngerjain PR udah nggak susah lagi dengan Sebis Les!
            </Text>
            <Text
              category="p2"
              style={[
                global.titleFont,
                {color: '#ffffff', paddingTop: width * 0.05},
              ]}>
              Yuk Les Yuk! Bisa Yuk!
            </Text>
          </View>
        </Layout>
        <Layout
          style={{
            marginHorizontal: width * 0.02,
            padding: width * 0.02,
            borderColor: '#e2e2e2',
            borderBottomWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderRadius: width * 0.02,
            elevation: 2,
            position: 'relative',
            top: -(width * 0.02),
          }}>
          <Text category="p1" style={global.titleFont}>
            Coba Sebis Les Sekarang!
          </Text>
          <Text category="c1" style={global.captionFont}>
            Ngerjain PR jadi tambah gampang dan anti ribet!
          </Text>
        </Layout>
      </TouchableOpacity>
    </Layout>
  );
};

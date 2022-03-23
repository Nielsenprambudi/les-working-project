import React from 'react';
import {Dimensions, TouchableOpacity, Image, View} from 'react-native';
import {Layout, Text, Icon} from '@ui-kitten/components';
import {blue, green} from '../helpers/constant';
const global = require('../styles/global');
const width = Dimensions.get('window').width;

export const ReferralComponent = ({status, code, share}) => {
  return (
    <Layout style={{marginHorizontal: width * 0.02, marginTop: width * 0.02}}>
      <Image
        source={require('./../assets/background_share.jpeg')}
        resizeMode="contain"
        style={{
          width: width,
          height: width * 0.35,
          borderRadius: width * 0.01,
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
        <Image
          source={require('./../assets/gajah_coin.png')}
          resizeMode="cover"
          style={{
            width: width * 0.22,
            height: width * 0.22,
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            width: width * 0.55,
          }}>
          <Text category="c1" style={[global.normalFont]}>
            Ayo, ajak teman ikutan Les, dapatkan koin tambahan
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text category="c1" style={global.normalFont}>
              Kode Referral :
            </Text>
            <Text
              category="p1"
              style={[
                global.normalFont,
                {
                  color: green,
                  paddingLeft: width * 0.02,
                  fontWeight: 'bold',
                },
              ]}>
              {status && code}
            </Text>
          </View>
        </View>
        <View style={{paddingLeft: width * 0.02}}>
          <TouchableOpacity onPress={() => share}>
            <Icon
              name="share"
              fill={blue}
              style={{width: width * 0.1, height: width * 0.1}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

import React, {useRef, useState, useEffect} from 'react';
import {View, Dimensions, TouchableOpacity, Text} from 'react-native';
import {Icon} from '@ui-kitten/components';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const HeaderComponent = ({auth, setTab}) => {
  const shakeNotif = useRef();
  const [touch, setTouchNumber] = useState(0);

  useEffect(() => {
    shakeNotif.current.startAnimation();
  });
  return (
    <View
      style={{
        backgroundColor: '#193C58',
        height: width * 0.25,
        flexDirection: 'row',
      }}>
      <View
        style={{
          backgroundColor: '#112A3E',
          borderWidth: 0,
          width: width * 0.75,
          height: height * 0.065,
          marginVertical: width * 0.065,
          marginLeft: width * 0.02,
          borderRadius: width * 0.4,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: touch == 0 ? '#FFFFFF' : '#112A3E',
            borderWidth: 0,
            borderRadius: width * 0.4,
            width: width * 0.25,
          }}
          onPress={() => {
            setTouchNumber(0);
            setTab(0);
          }}>
          <Text
            style={[
              global.normalFont,
              {
                color: touch == 0 ? 'black' : '#FFFFFF',
                paddingVertical: width * 0.03,
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: width * 0.02,
              },
            ]}>
            Beranda
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: touch == 1 ? '#FFFFFF' : '#112A3E',
            borderWidth: 0,
            borderRadius: width * 0.4,
            width: width * 0.25,
          }}
          onPress={() => {
            setTouchNumber(1);
            setTab(1);
          }}>
          <Text
            style={[
              global.normalFont,
              {
                color: touch == 1 ? 'black' : '#FFFFFF',
                paddingVertical: width * 0.04,
                paddingHorizontal: width * 0.02,
                textAlign: 'center',
                alignItems: 'center',
              },
            ]}>
            Promo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: touch == 2 ? '#FFFFFF' : '#112A3E',
            borderWidth: 0,
            borderRadius: width * 0.4,
            width: width * 0.25,
          }}
          onPress={() => {
            setTouchNumber(2);
            setTab(2);
          }}>
          <Text
            style={[
              global.normalFont,
              {
                color: touch == 2 ? 'black' : '#FFFFFF',
                paddingVertical: width * 0.04,
                textAlign: 'center',
                alignItems: 'center',
                paddingHorizontal: width * 0.02,
              },
            ]}>
            Pesanan
          </Text>
        </TouchableOpacity>
      </View>
      <Icon
        ref={shakeNotif}
        animation="shake"
        name="bell"
        fill="#e4c44c"
        animationConfig={{cycles: Infinity}}
        style={{
          width: 32,
          height: 32,
          marginTop: width * 0.1,
          marginLeft: width * 0.09,
        }}
      />
    </View>
  );
};

import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Layout, Text, CheckBox, Spinner} from '@ui-kitten/components';
import {blue, grey} from '../helpers/constant';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const ConfirmModalComponent = ({cancel, yes, loading}) => {
  const [reason, setReason] = useState('');
  const reasons = [
    {check: false, value: 'Saya menunggu konfirmasi tutor terlalu lama'},
    {check: false, value: 'Saya ingin mengganti jadwal'},
    {check: false, value: 'Saya sudah memilih tutor yang lain'},
    {check: false, value: 'Lainnya'},
  ];
  const [reasons1, setReasons1] = useState(reasons);

  const checkReason = (item, i) => {
    setReason(item?.value);
    reasons.forEach((val, y) => {
      if (y === i) {
        val.check = true;
      } else {
        val.check = false;
      }
    });
    setReasons1(reasons);
  };
  return (
    <ScrollView>
      <Layout>
        <Image
          source={require('./../assets/gadjah.png')}
          resizeMode="center"
          style={{
            width: width * 0.5,
            height: width * 0.5,
            marginHorizontal: width * 0.25,
          }}
        />
        <Text
          category="p1"
          style={[global.titleFont, {color: blue, textAlign: 'center'}]}>
          Beri Alasan Pembatalan
        </Text>
      </Layout>
      <Layout
        style={{
          marginVertical: width * 0.03,
        }}>
        {reasons1.map((item, i) => (
          <Layout
            key={i}
            style={[
              global.marginHorizontalDefault,
              {marginVertical: width * 0.05},
            ]}>
            <CheckBox
              checked={item?.check}
              onChange={() => checkReason(item, i)}>
              {item?.value}
            </CheckBox>
          </Layout>
        ))}
      </Layout>
      {loading ? (
        <Layout style={{marginHorizontal: width * 0.25}}>
          <Spinner size="large" />
        </Layout>
      ) : (
        <TouchableOpacity
          onPress={() => yes(reason)}
          style={[
            global.defaultButton,
            {
              borderColor: blue,
              backgroundColor: '#FFFFFF',
              borderWidth: 2,
              marginBottom: width * 0.05,
            },
          ]}>
          <Text
            category="p1"
            style={[
              global.normalFont,
              {fontWeight: 'bold', color: blue, textAlign: 'center'},
            ]}>
            Batalkan Saja
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

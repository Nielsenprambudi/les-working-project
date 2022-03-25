import React, {useRef, useState, useEffect} from 'react';
import {View, Dimensions, TouchableOpacity, Image, Modal} from 'react-native';
import {
  Layout,
  Text,
  Card,
  Input,
  Divider,
  Icon,
  Avatar,
} from '@ui-kitten/components';
import riwayatAction from '../redux/actions/riwayat';
import {blue, grey, greydark, FORMATPRICE, CURRENCY} from '../helpers/constant';
import {useDispatch, useSelector} from 'react-redux';
import publicUrl from '../publicUrl';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const DetailCoinHistoryComponent = ({
  visible,
  idHistoryCoin,
  dismiss,
}) => {
  const dispatch = useDispatch();
  const {dataRiwayatCoinDetail} = useSelector(state => state.riwayat);

  useEffect(() => {
    dispatch(riwayatAction.clearCoinDetail());
    dispatch(riwayatAction.getRiwayatDetailCoin(idHistoryCoin));
  }, [dispatch, idHistoryCoin]);

  return (
    <Modal visible={visible} animationType="slide">
      <TouchableOpacity onPress={() => dismiss()}>
        <Text
          style={[
            global.marginHorizontalDefault,
            {textAlign: 'right', padding: width * 0.05},
          ]}>
          X
        </Text>
      </TouchableOpacity>
      <Layout
        style={[
          global.marginHorizontalDefault,
          {flexDirection: 'row', paddingVertical: width * 0.05},
        ]}>
        <Avatar size="large" source={require('./../assets/coin.png')} />
        <Layout style={{paddingLeft: width * 0.03, flexDirection: 'column'}}>
          <Text
            category="p1"
            style={[global.normalFont, {fontWeight: 'bold', color: blue}]}>
            {dataRiwayatCoinDetail?.name}
          </Text>
          <Text
            category="c1"
            style={[global.captionFont, {color: greydark, width: width * 0.8}]}>
            Berlaku untuk semua tutor dan semua mata pelajaran
          </Text>
          <Layout style={{flexDirection: 'row', paddingVertical: width * 0.02}}>
            <Text
              category="p1"
              style={[global.normalFont, {fontWeight: 'bold', color: blue}]}>
              {dataRiwayatCoinDetail?.coin}
            </Text>
            <Text
              category="p1"
              style={[
                global.normalFont,
                {
                  fontWeight: 'bold',
                  color: greydark,
                  paddingLeft: width * 0.55,
                },
              ]}>
              x1
            </Text>
          </Layout>
        </Layout>
      </Layout>
      <Layout style={{paddingHorizontal: width * 0.05}}>
        <Divider />
        <Layout style={{flexDirection: 'row', paddingVertical: width * 0.05}}>
          <Text category="c1" style={[global.normalFont]}>
            Total Pesanan
          </Text>
          <Text
            category="c1"
            style={[
              global.normalFont,
              {fontWeight: 'bold', paddingLeft: width * 0.42},
            ]}>
            {CURRENCY + FORMATPRICE(dataRiwayatCoinDetail?.price)}
          </Text>
        </Layout>
        <Divider />
        <Layout style={{paddingLeft: width * 0.08}}>
          <Text
            category="c1"
            style={[global.normalFont, {paddingVertical: width * 0.08}]}>
            Rincian Pembayaran
          </Text>
          <Layout style={{flexDirection: 'row'}}>
            <Text category="c1" style={[global.normalFont]}>
              Subtotal untuk produk
            </Text>
            <Text
              category="c1"
              style={[global.normalFont, {paddingLeft: width * 0.1}]}>
              {CURRENCY + FORMATPRICE(dataRiwayatCoinDetail?.subtotal)}
            </Text>
          </Layout>
          <Layout style={{flexDirection: 'row'}}>
            <Text
              category="p1"
              style={[global.normalFont, {fontWeight: 'bold'}]}>
              Total Pembayaran
            </Text>
            <Text
              category="p1"
              style={[
                global.normalFont,
                {paddingLeft: width * 0.15, fontWeight: 'bold'},
              ]}>
              {CURRENCY + FORMATPRICE(dataRiwayatCoinDetail?.total)}
            </Text>
          </Layout>
        </Layout>
      </Layout>
    </Modal>
  );
};

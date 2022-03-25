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
import {blue, grey, greydark} from '../helpers/constant';
import {useDispatch, useSelector} from 'react-redux';
import publicUrl from '../publicUrl';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const DetailLesHistoryComponent = ({
  visible,
  idHistoryLes,
  dismiss,
  navigateHelp,
}) => {
  const dispatch = useDispatch();
  const {dataRiwayatDetail} = useSelector(state => state.riwayat);

  useEffect(() => {
    dispatch(riwayatAction.clearLesDetail());
    dispatch(riwayatAction.getRiwayatDetail(idHistoryLes));
  }, [dispatch, idHistoryLes]);

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
        {dataRiwayatDetail?.teacher?.profile ? (
          <Avatar
            size="large"
            source={{
              uri: publicUrl.API_URL + dataRiwayatDetail?.teacher.profile,
            }}
          />
        ) : (
          <Avatar size="large" source={require('./../assets/login.png')} />
        )}
        <Layout style={{paddingLeft: width * 0.03, flexDirection: 'column'}}>
          <Text
            category="p1"
            style={[global.normalFont, {fontWeight: 'bold', color: blue}]}>
            {dataRiwayatDetail?.teacher?.name}
          </Text>
          <Text
            category="c1"
            style={[global.captionFont, {color: greydark, width: width * 0.8}]}>
            {dataRiwayatDetail?.teacher?.aboutTeacher}
          </Text>
        </Layout>
      </Layout>
      <Layout style={{paddingHorizontal: width * 0.05}}>
        <Text
          category="p1"
          style={[
            global.normalFont,
            {fontWeight: 'bold', color: grey, paddingVertical: width * 0.02},
          ]}>
          Detail
        </Text>
        <Layout style={{paddingLeft: width * 0.05}}>
          <Text category="c1" style={[global.normalFont, {fontWeight: 'bold'}]}>
            {dataRiwayatDetail?.les?.date}
          </Text>
          <Text category="c1" style={[global.normalFont]}>
            {dataRiwayatDetail?.les?.subject}
          </Text>
          <Text category="c1" style={[global.normalFont]}>
            Kelas : {dataRiwayatDetail?.les?.typeClass}
          </Text>
          <Text category="c1" style={[global.normalFont]}>
            Materi : {dataRiwayatDetail?.les?.material}
          </Text>
        </Layout>
      </Layout>
      <Layout style={{paddingHorizontal: width * 0.05}}>
        <Text
          category="p1"
          style={[
            global.normalFont,
            {fontWeight: 'bold', color: grey, paddingVertical: width * 0.02},
          ]}>
          Status :
        </Text>
      </Layout>
      <TouchableOpacity
        onPress={() => navigateHelp}
        style={[
          global.defaultButton,
          {
            backgroundColor: '#FFFFFF',
            borderWidth: 2,
            borderColor: blue,
            borderRadius: width * 0.04,
            marginVertical: width * 0.1,
            marginHorizontal: width * 0.1,
          },
        ]}>
        <Text
          category="p1"
          style={[
            global.normalFont,
            global.blueFontColor,
            {fontWeight: 'bold', textAlign: 'center', padding: width * 0.02},
          ]}>
          Bantuan
        </Text>
      </TouchableOpacity>
    </Modal>
  );
};

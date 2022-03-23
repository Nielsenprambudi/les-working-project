import React, {useEffect, useState, Fragment, Profiler} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  SafeAreaView,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Linking,
} from 'react-native';
import {
  Button,
  Divider,
  Layout,
  Input,
  Icon,
  Avatar,
  Text,
  Card,
  Spinner,
  TopNavigation,
  TopNavigationAction,
  Select,
  SelectItem,
} from '@ui-kitten/components';
import publicUrl from '../publicUrl';
import {
  CURRENCY,
  FORMATPRICE,
  FORMATDATE,
  MONTH,
  TYPE,
  orange,
  green,
  blue,
  grey,
  yellow,
} from '../helpers/constant';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const HelpScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const {data} = useSelector(state => state?.student);
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackIcon = props => (
    <Icon {...props} name="arrow-back" fill="#FFFFFF" />
  );
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <TopNavigation
        style={{backgroundColor: blue}}
        accessoryLeft={BackAction}
        title={evaprops => (
          <Text
            {...evaprops}
            category="p1"
            style={[global.normalFont, {color: '#FFFFFF'}]}>
            Bantuan
          </Text>
        )}
      />
      <Layout style={{paddingVertical: width * 0.05}}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'whatsapp://send?text=Halo SEBIS Les, saya membutuhkan bantuan&phone=+6281990312187',
            )
          }
          style={[
            global.marginHorizontalDefault,
            {flexDirection: 'row', marginVertical: width * 0.05},
          ]}>
          <Icon
            name="message-circle"
            style={{
              width: width * 0.08,
              height: width * 0.08,
            }}
            fill={green}
          />
          <Text
            category="p1"
            style={[
              global.normalFont,
              {paddingLeft: width * 0.02, fontWeight: 'bold'},
            ]}>
            Chat Sebis les sekarang
          </Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'mailto:official.sebisles@sebis.co.id?subject=SEBIS Les - pusat bantuan tutor &body=',
            )
          }
          style={[
            global.marginHorizontalDefault,
            {flexDirection: 'row', marginVertical: width * 0.05},
          ]}>
          <Icon
            name="email"
            style={{
              width: width * 0.08,
              height: width * 0.08,
            }}
            fill={orange}
          />
          <Layout style={{flexDirection: 'column'}}>
            <Text
              category="p1"
              style={[
                global.normalFont,
                {paddingLeft: width * 0.02, fontWeight: 'bold'},
              ]}>
              Email
            </Text>
            <Text
              category="c1"
              style={[global.captionFont, {paddingLeft: width * 0.02}]}>
              Tulis pertanyaanmu sekarang!
            </Text>
          </Layout>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          onPress={() => Linking.openURL('tel:+623151163565')}
          style={[
            global.marginHorizontalDefault,
            {flexDirection: 'row', marginVertical: width * 0.05},
          ]}>
          <Icon
            name="phone-call"
            style={{
              width: width * 0.08,
              height: width * 0.08,
            }}
            fill={yellow}
          />
          <Layout style={{flexDirection: 'column'}}>
            <Text
              category="p1"
              style={[
                global.normalFont,
                {paddingLeft: width * 0.02, fontWeight: 'bold'},
              ]}>
              Telepon
            </Text>
            <Text
              category="c1"
              style={[global.captionFont, {paddingLeft: width * 0.02}]}>
              031-51163565
            </Text>
          </Layout>
        </TouchableOpacity>
        <Divider />
      </Layout>
    </SafeAreaView>
  );
};

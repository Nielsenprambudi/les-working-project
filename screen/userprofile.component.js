import React, {useEffect, useState, Fragment, Profiler} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  SafeAreaView,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
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
} from '../helpers/constant';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const UserProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const {data} = useSelector(state => state?.student);
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackIcon = props => <Icon {...props} name="arrow-back" />;
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <TopNavigation
        accessoryLeft={BackAction}
        title={evaprops => (
          <Text {...evaprops} category="p1" style={global.normalFont}>
            Profilku
          </Text>
        )}
      />
      <Layout
        style={{
          flexDirection: 'row',
          marginHorizontal: width * 0.02,
          marginVertical: width * 0.02,
        }}>
        {data?.profile ? (
          <Avatar
            size="giant"
            shape="square"
            style={{
              width: width * 0.32,
              height: width * 0.32,
            }}
            source={{uri: publicUrl.API_URL + data?.profile}}
          />
        ) : (
          <Image
            source={require('./../assets/login.png')}
            width={width * 0.2}
            height={width * 0.2}
            resizeMode="cover"
          />
        )}
        <Layout
          style={{
            flexDirection: 'column',
            paddingBottom: width * 0.02,
            paddingHorizontal: width * 0.02,
          }}>
          <Layout style={{flexDirection: 'row'}}>
            <Text category="h5" style={[global.titleFont]}>
              {data?.firstName + ' ' + data?.lastName}
            </Text>
            <TouchableOpacity
              style={{paddingLeft: width * 0.2}}
              onPress={() => navigation.navigate('EditUserProfile')}>
              <Icon
                name="edit-outline"
                fill={blue}
                style={{width: width * 0.1, height: width * 0.1}}
              />
            </TouchableOpacity>
          </Layout>
          <Text
            category="c2"
            style={[global.captionFont, {paddingBottom: width * 0.02}]}>
            {data?.phoneNumber}
          </Text>
          <Text
            category="c2"
            style={[global.captionFont, {paddingBottom: width * 0.02}]}>
            {data?.email}
          </Text>
        </Layout>
      </Layout>
      <Layout style={{paddingVertical: width * 0.05}}>
        <Text style={global.marginHorizontalDefault}>Info Lainnya</Text>
        <Divider />
        <TouchableOpacity
          onPress={() => navigation.navigate('Help')}
          style={[
            global.marginHorizontalDefault,
            {flexDirection: 'row', marginVertical: width * 0.02},
          ]}>
          <Icon
            name="bookmark-outline"
            style={{
              width: width * 0.08,
              height: width * 0.08,
            }}
            fill={blue}
          />
          <Text
            category="p1"
            style={[global.normalFont, {paddingLeft: width * 0.02}]}>
            Bantuan
          </Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={[
            global.marginHorizontalDefault,
            {flexDirection: 'row', marginVertical: width * 0.02},
          ]}>
          <Icon
            name="people-outline"
            style={{
              width: width * 0.08,
              height: width * 0.08,
            }}
            fill={blue}
          />
          <Text
            category="p1"
            style={[global.normalFont, {paddingLeft: width * 0.02}]}>
            Kebijakan Privasi
          </Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={[
            global.marginHorizontalDefault,
            {flexDirection: 'row', marginVertical: width * 0.02},
          ]}>
          <Icon
            name="people-outline"
            style={{
              width: width * 0.08,
              height: width * 0.08,
            }}
            fill={blue}
          />
          <Text
            category="p1"
            style={[global.normalFont, {paddingLeft: width * 0.02}]}>
            Syarat dan Ketentuan
          </Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={[
            global.marginHorizontalDefault,
            {flexDirection: 'row', marginVertical: width * 0.02},
          ]}>
          <Icon
            name="people-outline"
            style={{
              width: width * 0.08,
              height: width * 0.08,
            }}
            fill={blue}
          />
          <Text
            category="p1"
            style={[global.normalFont, {paddingLeft: width * 0.02}]}>
            Beri Rating
          </Text>
        </TouchableOpacity>
        <Layout style={{top: width * 0.8, marginHorizontal: width * 0.25}}>
          <TouchableOpacity style={global.defaultButton}>
            <Text
              category="p2"
              style={[
                global.normalFont,
                {color: '#FFFFFF', textAlign: 'center', padding: width * 0.02},
              ]}>
              Logout
            </Text>
          </TouchableOpacity>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

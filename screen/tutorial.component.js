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
  ScrollView,
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
import Video from 'react-native-video';
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

export const TutorialScreen = ({navigation}) => {
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
            Video Tutorial
          </Text>
        )}
      />
      <ScrollView style={[global.marginHorizontalDefault]}>
        <View style={{flexDirection: 'column'}}>
          <Text
            category="p1"
            style={[global.titleFont, {marginVertical: width * 0.02}]}>
            Tutorial Pesan Jadwal
          </Text>
          <View style={{height: width * 0.7}}>
            <Video
              source={{
                uri: publicUrl.API_URL + 'static/video/our-promo-v4.mp4',
              }}
              style={{
                height: width * 0.7,
                backgroundColor: '#101d25',
                marginBottom: 10,
                borderRadius: width * 0.08,
              }}
              controls
              resizeMode="contain"
              paused
            />
          </View>
          <Text
            category="p1"
            style={[global.titleFont, {marginVertical: width * 0.02}]}>
            Tutorial Beli Koin
          </Text>
          <View style={{height: width * 0.7}}>
            <Video
              source={{
                uri: publicUrl.API_URL + 'static/video/our-promo-v4.mp4',
              }}
              style={{
                height: width * 0.7,
                backgroundColor: '#101d25',
                marginBottom: 10,
                borderRadius: width * 0.08,
              }}
              controls
              resizeMode="contain"
              paused
            />
          </View>
          <Text
            category="p1"
            style={[global.titleFont, {marginVertical: width * 0.02}]}>
            Sebis Les
          </Text>
          <View style={{height: width * 0.7}}>
            <Video
              source={{
                uri: publicUrl.API_URL + 'static/video/our-promo-v4.mp4',
              }}
              style={{
                height: width * 0.7,
                backgroundColor: '#101d25',
                marginBottom: 10,
                borderRadius: width * 0.08,
              }}
              controls
              resizeMode="contain"
              paused
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

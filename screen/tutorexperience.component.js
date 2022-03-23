import React, {useEffect, useState, Fragment} from 'react';
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
import {ModalComponent} from '../component/modal.component';
import {DaysNavigator} from '../component/days.component';
import {SubjectsNavigator} from '../component/subjects.component';
import Carousel from 'react-native-snap-carousel';
import berandaAction from '../redux/actions/beranda';
import publicAction from '../redux/actions/public';
import cartAction from '../redux/actions/cart';
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
} from '../helpers/constant';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const TutorExperiencesScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [month, setMonth] = useState(0);
  const [monthName, setMonthName] = useState(0);
  const [type, setType] = useState('private');
  const {detailTutor, isErrorFav, isLoadingFav, isFav, alertMsgErr} =
    useSelector(state => state?.publicBeranda);
  const [favourite, setFavourite] = useState(false);
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackIcon = props => <Icon {...props} name="arrow-back" />;
  const StarIcon = props => (
    <Icon
      {...props}
      name={!favourite ? 'star-outline' : 'star'}
      fill={!favourite ? '#193c58' : '#e4c44c'}
    />
  );
  const CartIcon = props => (
    <Icon {...props} name={'shopping-cart'} fill={orange} />
  );
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const favTutor = () => {
    dispatch(publicAction.favouriteTutor(detailTutor?.id));
  };

  const dismissModal = () => {
    if (isFav) {
      setFavourite(true);
    } else {
      setFavourite(false);
    }
    dispatch(publicAction.clearFavourite());
  };

  const RightAction = () => (
    <Fragment>
      <TopNavigationAction icon={CartIcon} onPress={navigateBack} />
      <TopNavigationAction icon={StarIcon} onPress={() => favTutor()} />
    </Fragment>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <ModalComponent
        visible={isErrorFav}
        dismiss={() => dismissModal()}
        msg={alertMsgErr}
      />
      <TopNavigation accessoryLeft={BackAction} accessoryRight={RightAction} />
      <Divider />
      <Layout
        style={{
          flexDirection: 'row',
          marginHorizontal: width * 0.02,
          marginVertical: width * 0.02,
        }}>
        <Layout style={{flexDirection: 'column'}}>
          <TouchableOpacity>
            <Image
              source={
                detailTutor?.profile
                  ? {uri: `${publicUrl.API_URL + detailTutor?.profile}`}
                  : require('./../assets/login.png')
              }
              style={{
                width: width * 0.3,
                height: width * 0.3,
                marginLeft: 'auto',
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Layout>
        <Layout
          style={{
            flexDirection: 'column',
            paddingBottom: width * 0.02,
            paddingRight: width * 0.03,
          }}>
          <Text category="h5" style={global.titleFont}>
            {detailTutor?.firstName}
          </Text>
          <Text
            category="c2"
            style={[
              global.captionFont,
              {fontStyle: 'italic', paddingBottom: width * 0.02},
            ]}>
            {detailTutor?.note}
          </Text>
          <Layout style={{flexDirection: 'row'}}>
            <Layout
              style={{flexDirection: 'column', paddingRight: width * 0.02}}>
              <Text
                category="c2"
                style={[global.captionFont, {fontSize: width * 0.025}]}>
                Tutor Andalan
              </Text>
            </Layout>
            <TouchableOpacity>
              <Text
                category="c1"
                style={[
                  global.captionFont,
                  {
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    padding: width * 0.015,
                    backgroundColor: '#de723f',
                    borderRadius: width * 0.2,
                  },
                ]}>
                Lihat Video Tutor
              </Text>
            </TouchableOpacity>
          </Layout>
        </Layout>
      </Layout>
      <Text
        category="c1"
        style={[
          global.titleFont,
          global.marginHorizontalDefault,
          {marginVertical: width * 0.02},
        ]}>
        Riwayat Pendidikan
      </Text>
    </SafeAreaView>
  );
};

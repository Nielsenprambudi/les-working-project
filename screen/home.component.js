import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  SafeAreaView,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Share,
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
  Tooltip,
} from '@ui-kitten/components';
import {HeaderComponent} from '../component/header.component';
import {PromoComponent} from '../component/promo.component';
import {TopupComponent} from '../component/topup.component';
import Carousel from 'react-native-snap-carousel';
import {FloatingAction} from 'react-native-floating-action';
import {FORMATPRICE} from '../helpers/constant';
import berandaAction from './../redux/actions/beranda';
import studentAction from './../redux/actions/student';
import AsyncStorage from '@react-native-async-storage/async-storage';
import http from '../helpers/http';
import {blue, green} from '../helpers/constant';
import publicUrl from '../publicUrl';
import {ReferralComponent} from '../component/referral.component';
const global = require('./../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {firstWalk, dataSlider} = useSelector(state => state.beranda);
  const auth = useSelector(state => state.auth);
  const {data, isStudent} = useSelector(state => state.student);
  const [tabBar, setTabBar] = useState(0);
  const navigateDetails = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    dispatch(berandaAction.getSliders());
    if (auth?.token) {
      http.defaults.headers.common.Authorization = 'Bearer ' + auth?.token;
      dispatch(studentAction.getStudent());
      dispatch(studentAction.getStudentDetail());
    }
    if (firstWalk === null) {
      dispatch(berandaAction.setWalkthrough(true));
    }
  }, [dispatch, auth, firstWalk]);

  const renderSearchIcon = props => (
    <Icon {...props} name="search" color="#e2e2e2" />
  );

  const shareCode = async () => {
    try {
      await Share.share({
        message: `Yukk, gabung di Sebis Les dan gunakan kode ${data?.referralCode.toUpperCase()} untuk mendapatkan diskon khusus`,
      });
    } catch (error) {
      console.log('error share', error);
    }
  };

  const renderSliderItem = ({item, index}) => (
    <Layout>
      {item?.picture != null ? (
        <Image
          source={{uri: `${publicUrl.API_URL + item?.picture}`}}
          resizeMode="cover"
          style={{
            width: width,
            height: width * 0.5,
            borderRadius: width * 0.02,
          }}
        />
      ) : (
        <Layout
          style={{
            width: width,
            height: width * 0.5,
            backgroundColor: '#ffffff',
            borderColor: '#e2e2e2',
            borderWidth: 1,
            borderRadius: width * 0.02,
            elevation: 2,
          }}>
          <Text
            category="p1"
            style={[
              global.normalFont,
              {textAlign: 'center', paddingVertical: width * 0.2},
            ]}>
            Gambar Belum Tersedia
          </Text>
        </Layout>
      )}
    </Layout>
  );

  const RenderButtonTutorial = () => (
    <TouchableOpacity onPress={() => navigation.navigate('Tutorial')}>
      <Layout
        style={{
          flexDirection: 'column',
          marginHorizontal: width * 0.028,
        }}>
        <Layout style={global.backgroundIcon}>
          <Image
            source={require('./../assets/tutorial.png')}
            style={{
              width: width * 0.25,
              height: width * 0.25,
            }}
            resizeMode="cover"
          />
        </Layout>
        <Text style={[global.normalFont, {textAlign: 'center'}]} category="c1">
          Tutorial
        </Text>
      </Layout>
    </TouchableOpacity>
  );

  const setBar = e => {
    setTabBar(e);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderComponent auth={'login'} setTab={e => setBar(e)} />
      <Divider />
      {tabBar === 0 && (
        <ScrollView
          style={{
            height: height,
            backgroundColor: '#FFFFFF',
          }}>
          <Layout
            style={{
              flexDirection: 'row',
              height: width * 0.2,
              marginBottom: 5,
            }}>
            <Input
              placeholder={`Hai ${
                auth?.token ? data?.firstName : ''
              }, mau les apa hari ini?`}
              accessoryLeft={renderSearchIcon}
              size="large"
              style={{
                marginTop: width * 0.03,
                borderRadius: width * 0.1,
                marginLeft: width * 0.02,
                marginRight: width * 0.02,
                borderColor: '#e2e2e2',
                width: width * 0.78,
              }}
              textStyle={global.captionFont}
              onFocus={() => navigation.navigate('Filter', {typeParam: ''})}
            />
            <TouchableOpacity
              onPress={() =>
                auth?.token
                  ? navigation.navigate('UserProfile')
                  : navigateDetails()
              }>
              <View style={{flexDirection: 'column'}}>
                {auth?.token ? (
                  data?.profile ? (
                    <Avatar
                      size="large"
                      source={{uri: publicUrl.API_URL + data?.profile}}
                    />
                  ) : (
                    <Avatar
                      size="large"
                      source={require('./../assets/login.png')}
                    />
                  )
                ) : (
                  <Avatar
                    size="large"
                    source={require('./../assets/login.png')}
                  />
                )}

                <Text
                  style={[global.normalFont, {textAlign: 'center'}]}
                  category="c1">
                  {auth?.token ? data?.firstName : 'Login'}
                </Text>
              </View>
            </TouchableOpacity>
          </Layout>
          <TopupComponent
            token={auth?.token}
            coin={FORMATPRICE(data?.coin)}
            navigation={navigation}
          />
          <Layout
            style={{flexDirection: 'row', marginHorizontal: width * 0.02}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Les', {
                  typeParam: '',
                  qcurricullum: '',
                  qgrade: '',
                  qsubject: '',
                })
              }>
              <Layout
                style={{
                  flexDirection: 'column',
                  marginHorizontal: width * 0.028,
                }}>
                <Layout style={global.backgroundIcon}>
                  <Image
                    source={require('./../assets/sebby-laptop.png')}
                    style={{
                      width: width * 0.25,
                      height: width * 0.25,
                    }}
                    resizeMode="cover"
                  />
                </Layout>
                <Text
                  style={[global.normalFont, {textAlign: 'center'}]}
                  category="c1">
                  Les
                </Text>
              </Layout>
            </TouchableOpacity>
            <TouchableOpacity>
              <Layout
                style={{
                  flexDirection: 'column',
                  marginHorizontal: width * 0.028,
                }}>
                <Layout style={global.backgroundIcon}>
                  <Image
                    source={require('./../assets/report.png')}
                    style={{
                      width: width * 0.25,
                      height: width * 0.25,
                    }}
                    resizeMode="cover"
                  />
                </Layout>
                <Text
                  style={[global.normalFont, {textAlign: 'center'}]}
                  category="c1">
                  Reportku
                </Text>
              </Layout>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                auth?.token
                  ? navigation.navigate('FavTutor')
                  : navigateDetails()
              }>
              <Layout
                style={{
                  flexDirection: 'column',
                  marginHorizontal: width * 0.028,
                }}>
                <Layout style={global.backgroundIcon}>
                  <Image
                    source={require('./../assets/tutor-favorit.png')}
                    style={{
                      width: width * 0.25,
                      height: width * 0.25,
                    }}
                    resizeMode="cover"
                  />
                </Layout>
                <Text
                  style={[global.normalFont, {textAlign: 'center'}]}
                  category="c1">
                  Tutor Favoritku
                </Text>
              </Layout>
            </TouchableOpacity>
          </Layout>
          <Layout
            style={{flexDirection: 'row', marginHorizontal: width * 0.02}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Les', {
                  typeParam: 'bahasa',
                  qcurricullum: '',
                  qgrade: '',
                  qsubject: '',
                })
              }>
              <Layout
                style={{
                  flexDirection: 'column',
                  marginHorizontal: width * 0.028,
                }}>
                <Layout style={global.backgroundIcon}>
                  <Image
                    source={require('./../assets/bahasa_1.png')}
                    style={{
                      width: width * 0.25,
                      height: width * 0.25,
                    }}
                    resizeMode="cover"
                  />
                </Layout>
                <Text
                  style={[global.normalFont, {textAlign: 'center'}]}
                  category="c1">
                  Les Bahasa
                </Text>
              </Layout>
            </TouchableOpacity>
            <Tooltip
              anchor={RenderButtonTutorial}
              visible={firstWalk}
              style={{backgroundColor: '#FFFFFF'}}
              backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
              onBackdropPress={() => {
                dispatch(berandaAction.setWalkthrough(false));
              }}>
              {evaprops => (
                <Layout {...evaprops} style={{padding: width * 0.02}}>
                  <Text category="c2" style={global.captionFont}>
                    Yukk, intip tutorial Sebis Les!
                  </Text>
                </Layout>
              )}
            </Tooltip>
          </Layout>
          {auth?.token && (
            <ReferralComponent
              status={isStudent}
              code={data?.referralCode.toUpperCase()}
              share={() => shareCode()}
            />
          )}
          <PromoComponent />
        </ScrollView>
      )}
      {tabBar === 1 && (
        <ScrollView
          style={{
            height: height,
            backgroundColor: '#FFFFFF',
          }}>
          <Layout>
            <Carousel
              data={dataSlider}
              renderItem={renderSliderItem}
              sliderWidth={width}
              itemWidth={width}
              autoplay={true}
              autoplayDelay={500}
              loop
            />
          </Layout>
          <PromoComponent />
          <PromoComponent />
        </ScrollView>
      )}

      {auth?.token && (
        <FloatingAction
          color="#FFFFFF"
          floatingIcon={require('./../assets/keranjang.png')}
          iconWidth={30}
          iconHeight={30}
          onPressMain={() => navigation.navigate('Cart')}
        />
      )}
    </SafeAreaView>
  );
};

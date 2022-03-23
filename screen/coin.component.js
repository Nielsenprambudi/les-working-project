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
} from '@ui-kitten/components';
import {orange, blue, green, CURRENCY, FORMATPRICE} from '../helpers/constant';
import {ModalComponent} from '../component/modal.component';
import transaksiAction from '../redux/actions/transaksi';
import publicUrl from '../publicUrl';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const CoinScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const auth = useSelector(state => state.auth);
  const {isLoadingGetCoin, isErrorGetCoin, isGetCoin, dataCoin, alertMsgError} =
    useSelector(state => state.transaksi);
  const navigateDetails = () => {
    if (auth?.token) {
      navigation.navigate('Cart');
    } else {
      navigation.navigate('Login');
    }
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const CartIcon = props => (
    <Icon {...props} name={'shopping-cart'} fill={orange} />
  );

  const HelpIcon = props => (
    <Icon {...props} name={'question-mark-circle'} fill={green} />
  );

  const BackIcon = props => (
    <Icon {...props} name="arrow-back" fill="#000000" />
  );

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const setCoin = item => {
    console.log('check set coin', item);
    navigation.navigate('CoinCheckout', {
      idCoin: item,
    });
  };

  const renderCoin = ({item}) => (
    <Layout
      style={{
        width: width * 0.95,
        padding: width * 0.02,
        marginVertical: width * 0.05,
        marginHorizontal: width * 0.02,
        borderColor: '#e2e2e2',
        borderRadius: width * 0.02,
        borderWidth: 1,
        elevation: 2,
      }}
      key={item.id}>
      <Layout style={{flexDirection: 'row'}}>
        <Image
          source={require('./../assets/coin.png')}
          style={{
            width: width * 0.05,
            height: width * 0.05,
            marginVertical: width * 0.02,
          }}
          resizeMode="cover"
        />
        <Text style={[global.normalFont, {paddingHorizontal: width * 0.02}]}>
          {FORMATPRICE(item?.coin) + ' Sebis Koin'}
        </Text>
      </Layout>
      <Layout style={[{flexDirection: 'column', padding: width * 0.05}]}>
        <Layout style={{flexDirection: 'row'}}>
          <Icon
            name="stop-circle"
            fill={blue}
            style={{width: width * 0.052, height: width * 0.052}}
          />
          <Text
            category="c2"
            style={[
              global.captionFont,
              {fontSize: width * 0.035, paddingLeft: width * 0.02},
            ]}>
            Berlaku untuk semua tutor dan mata pelajaran
          </Text>
        </Layout>
        <Layout style={{flexDirection: 'row'}}>
          <Icon
            name="stop-circle"
            fill={blue}
            style={{width: width * 0.055, height: width * 0.055}}
          />
          <Text
            category="c2"
            style={[
              global.captionFont,
              {fontSize: width * 0.035, paddingLeft: width * 0.02},
            ]}>
            Masa Berlaku 3 bulan
          </Text>
        </Layout>
      </Layout>
      <Divider />
      <Layout style={{flexDirection: 'row', paddingVertical: width * 0.05}}>
        <Text category="p1" style={[global.titleFont, {fontWeight: 'bold'}]}>
          {CURRENCY + FORMATPRICE(item?.coin)}
        </Text>
        <TouchableOpacity
          onPress={() => setCoin(item?.id)}
          style={[
            global.cardButton,
            {
              padding: width * 0.02,
              borderRadius: width * 0.05,
              borderColor: '#000000',
              marginLeft: width * 0.3,
            },
          ]}>
          <Text
            category="p2"
            style={[global.captionFont, {textAlign: 'center'}]}>
            Beli Sekarang
          </Text>
        </TouchableOpacity>
      </Layout>
    </Layout>
  );

  const doRefresh = () => {
    setRefresh(true);
    dispatch(transaksiAction.clearGetCoin());
    dispatch(transaksiAction.getCoin());
  };

  const dismissModal = () => {
    dispatch(transaksiAction.clearGetCoin());
  };

  useEffect(() => {
    dispatch(transaksiAction.clearGetCoin());
    dispatch(transaksiAction.getCoin());
  }, [dispatch]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <ModalComponent
        visible={isErrorGetCoin}
        dismiss={() => dismissModal()}
        msg={alertMsgError}
      />
      <TopNavigation
        style={{backgroundColor: '#FFFFFF'}}
        title={evaprops => (
          <Text
            {...evaprops}
            category="h6"
            style={[global.titleFont, {color: 'black'}]}>
            Top Up Sebis Koin
          </Text>
        )}
        accessoryLeft={BackAction}
      />
      <Layout
        style={[
          global.marginHorizontalDefault,
          {marginVertical: width * 0.05},
        ]}>
        <Text category="p1" style={[global.normalFont, {fontWeight: 'bold'}]}>
          Sebis Koin
        </Text>
        <Layout
          style={{
            flexDirection: 'row',
            marginHorizontal: width * 0.02,
            marginVertical: width * 0.02,
          }}>
          <Avatar
            size="giant"
            shape="square"
            style={{
              width: width * 0.25,
              height: width * 0.25,
            }}
            source={require('./../assets/teropong.png')}
          />

          <Layout
            style={{
              paddingBottom: width * 0.02,
              paddingHorizontal: width * 0.02,
              flexDirection: 'column',
            }}>
            <Text
              category="c1"
              style={[global.normalFont, {fontWeight: 'bold'}]}>
              Kamu belum punya sebis koin nih!
            </Text>
            <Text
              category="c2"
              style={[
                global.captionFont,
                {paddingTop: width * 0.05, width: width * 0.6},
              ]}>
              Beli sebis koin dulu, yuk! agar kamu bisa belajar online dan mudah
              mengerjakan PR bersama dengan tutor favorit pilihanmu
            </Text>
          </Layout>
        </Layout>
      </Layout>
      <FlatList
        data={dataCoin}
        renderItem={renderCoin}
        onEndReachedThreshold={0.2}
        onRefresh={doRefresh}
        refreshing={false}
        ListHeaderComponent={() => (
          <Text
            category="p2"
            style={[
              global.normalFont,
              global.marginHorizontalDefault,
              {fontWeight: 'bold'},
            ]}>
            Pilihan Top Up
          </Text>
        )}
        ListFooterComponent={
          isLoadingGetCoin && (
            <Layout
              style={{
                marginHorizontal: width * 0.5,
                marginVertical: width * 0.25,
              }}>
              <Spinner size="large" />
            </Layout>
          )
        }
        ListEmptyComponent={
          !isLoadingGetCoin && (
            <Layout style={{flexDirection: 'column', marginVertical: width}}>
              <Text
                category="h5"
                style={[global.titleFont, {textAlign: 'center'}]}>
                Koin belum terdaftar
              </Text>
            </Layout>
          )
        }
      />
    </SafeAreaView>
  );
};

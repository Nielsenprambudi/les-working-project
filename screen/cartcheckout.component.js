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
  Modal,
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
  greydark,
  MIDTRANS_CLIENT_KEY_DEV,
} from '../helpers/constant';
import transaksiAction from '../redux/actions/transaksi';
import studentAction from '../redux/actions/student';
import {WebView} from 'react-native-webview';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const CartCheckoutScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {idCoin} = route.params;
  const auth = useSelector(state => state.auth);
  const {
    isLoadingGetCoinDetail,
    isErrorGetCoinDetail,
    isGetCoinDetail,
    isTopupCoin,
    isErrorTopupCoin,
    isLoadingTopupCoin,
    dataTopup,
    dataCoinDetail,
    alertMsgError,
  } = useSelector(state => state.transaksi);
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackIcon = props => (
    <Icon {...props} name="arrow-back" fill="#FFFFFF" />
  );
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const RightAction = () => (
    <Fragment>
      <TopNavigationAction
        icon={evaprops => (
          <Layout
            {...evaprops}
            style={{
              flexDirection: 'column',
              margin: width * 0.02,
              backgroundColor: blue,
            }}>
            <Image
              source={require('./../assets/chat.png')}
              style={{
                width: width * 0.1,
                height: width * 0.1,
              }}
              resizeMode="cover"
            />
            <Text
              category="c1"
              style={[
                global.captionFont,
                {textAlign: 'center', color: '#FFFFFF'},
              ]}>
              Chat
            </Text>
          </Layout>
        )}
        onPress={() =>
          Linking.openURL(
            'whatsapp://send?text=Halo SEBIS Les, saya membutuhkan bantuan&phone=+6281990312187',
          )
        }
      />
    </Fragment>
  );

  const payNow = () => {
    console.log('data detail coin', dataCoinDetail[0].id);
    dispatch(transaksiAction.topupCoin({coinId: dataCoinDetail[0]?.id}));
  };

  const setClearSuccess = () => {
    dispatch(transaksiAction.clearTopup());
    dispatch(studentAction.getStudent());
    dispatch(studentAction.getStudentDetail());
  };

  useEffect(() => {
    if (idCoin) {
      dispatch(transaksiAction.getCoinDetail(idCoin));
    }
  }, [dispatch, idCoin]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Modal visible={isTopupCoin} animationType="slide" transparent>
        <Layout style={{flex: 1}}>
          <Layout
            style={{
              width: width,
              height: width * 0.15,
              flexDirection: 'row',
              backgroundColor: blue,
            }}>
            <Text
              category="h6"
              style={[
                global.normalFont,
                {fontWeight: 'bold', color: '#FFFFFF', padding: width * 0.02},
              ]}>
              Halaman Pembayaran
            </Text>
            <TouchableOpacity onPress={() => setClearSuccess()}>
              <Text
                category="h6"
                style={[
                  global.normalFont,
                  {
                    textAlign: 'right',
                    color: '#FFFFFF',
                    padding: width * 0.02,
                    marginLeft: width * 0.28,
                  },
                ]}>
                X
              </Text>
            </TouchableOpacity>
          </Layout>
          <WebView source={{uri: dataTopup?.redirect_url}} />
        </Layout>
      </Modal>
      <TopNavigation
        style={{backgroundColor: blue}}
        accessoryLeft={BackAction}
        title={evaprops => (
          <Text
            {...evaprops}
            category="h6"
            style={[global.titleFont, {color: '#FFFFFF'}]}>
            Pembayaran
          </Text>
        )}
        accessoryRight={RightAction}
      />
      <Layout>
        <Layout
          style={[
            global.marginHorizontalDefault,
            {flexDirection: 'row', paddingVertical: width * 0.05},
          ]}>
          <Text category="c1" style={[global.normalFont]}>
            Total Pesanan
          </Text>
          <Text
            category="p1"
            style={[global.titleFont, {paddingLeft: width * 0.4}]}>
            {CURRENCY + FORMATPRICE(dataCoinDetail[0]?.coin)}
          </Text>
        </Layout>
        <Divider />
        <Layout style={{margin: width * 0.05}}>
          <Text style={global.normalFont}>
            Subtotal untuk produk{' '}
            {CURRENCY + FORMATPRICE(dataCoinDetail[0]?.coin)}
          </Text>
          <Layout style={{flexDirection: 'row'}}>
            <Text
              category="h6"
              style={[global.titleFont, {fontWeight: 'bold'}]}>
              Total Pembayaran
            </Text>
            <Text
              category="h6"
              style={[
                global.titleFont,
                {fontWeight: 'bold', paddingLeft: width * 0.1},
              ]}>
              {CURRENCY + FORMATPRICE(dataCoinDetail[0]?.coin)}
            </Text>
          </Layout>
        </Layout>
      </Layout>
      <Layout style={{flexDirection: 'row'}}>
        <Layout style={{padding: width * 0.05, backgroundColor: grey}}>
          <Layout style={{flexDirection: 'row', backgroundColor: grey}}>
            <Text
              category="h6"
              style={[global.titleFont, {fontWeight: 'bold'}]}>
              Total
            </Text>
            <Text
              category="h6"
              style={[
                global.titleFont,
                {fontWeight: 'bold', paddingLeft: width * 0.1, color: blue},
              ]}>
              {CURRENCY + FORMATPRICE(dataCoinDetail[0]?.coin)}
            </Text>
          </Layout>
        </Layout>
        <TouchableOpacity
          onPress={() => payNow()}
          style={[
            global.defaultButton,
            {
              marginHorizontal: 0,
              marginBottom: 0,
              borderRadius: 0,
              width: width * 0.38,
            },
          ]}>
          <Text
            category="p1"
            style={[
              global.normalFont,
              {color: '#FFFFFF', textAlign: 'center', padding: width * 0.03},
            ]}>
            Bayar Sekarang
          </Text>
        </TouchableOpacity>
      </Layout>
    </SafeAreaView>
  );
};

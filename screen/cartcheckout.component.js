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
import cartAction from '../redux/actions/cart';
import {WebView} from 'react-native-webview';
import {ModalComponent} from '../component/modal.component';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const CartCheckoutScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [dataConfirm, setDataConfirm] = useState([]);
  const {data} = useSelector(state => state.student);
  const {
    subtotal,
    dataConfirmList,
    isLoadingAddSchedule,
    isErrorAddSchedule,
    isAddSchedule,
    alertMsgError,
    alertMsgSuccess,
  } = useSelector(state => state.cart);
  const {isTopupCoin, dataTopup} = useSelector(state => state.transaksi);
  const navigateBack = () => {
    dispatch(cartAction.clearConfirmCart());
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
    let reduceId = [];
    dataConfirm.forEach((dc, i) => {
      reduceId.push(dc.cartItemId);
    });
    dispatch(cartAction.addSchedule(reduceId));
  };

  const setClearSuccess = () => {
    dispatch(transaksiAction.clearTopup());
    dispatch(studentAction.getStudent());
    dispatch(studentAction.getStudentDetail());
  };

  useEffect(() => {
    if (dataConfirmList.length > 0) {
      let datapush = [];
      dataConfirmList.forEach((item, i) => {
        item.cartItems.forEach((cart, y) => {
          if (cart.check === true) {
            datapush.push(cart);
          }
        });
      });
      setDataConfirm(datapush);
    }
  }, [dataConfirmList]);

  const navigateToDetails = cart => {
    // dispatch(publicAction.setDetailLes(cart));
    navigation.navigate('DetailLes', {
      subid: cart?.subjectId,
      sub: JSON.stringify(cart),
      lesType: cart?.type,
      cartId: cart?.cartItemId,
      teacher: cart?.teacher,
    });
  };

  const RenderCartConfirm = ({item}) => (
    <Layout>
      <Layout
        style={{
          flexDirection: 'row',
          marginHorizontal: width * 0.02,
          marginVertical: width * 0.02,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Layout
            style={{
              flexDirection: 'column',
              paddingBottom: width * 0.02,
              paddingRight: width * 0.03,
            }}>
            <Text category="h5" style={global.titleFont}>
              {item?.teacher}{' '}
              <Icon
                name="arrow-ios-forward-outline"
                fill="black"
                style={{width: width * 0.05, height: width * 0.05}}
              />
            </Text>
          </Layout>
        </TouchableOpacity>
      </Layout>
      <Layout>
        <Layout
          style={[global.marginHorizontalDefault, {flexDirection: 'row'}]}>
          <Image
            source={require('./../assets/sebis_les.png')}
            style={{
              width: width * 0.15,
              height: width * 0.15,
            }}
            resizeMode="cover"
          />
          <Layout style={{flexDirection: 'column', paddingLeft: width * 0.02}}>
            <Layout>
              <Text
                category="c1"
                style={[global.captionFont, {color: greydark}]}>
                {item?.subject}
              </Text>
              <Text
                category="c1"
                style={[global.captionFont, {color: greydark}]}>
                {item?.type === 'private' ? 'Kelas Privat' : 'Kelas Grup'}
              </Text>
            </Layout>
            <Text category="p1" style={global.normalFont}>
              {item?.date}
            </Text>
            <Text category="c1" style={global.normalFont}>
              {item?.time}
            </Text>
            <Text
              category="h6"
              style={[global.normalFont, {fontWeight: 'bold'}]}>
              {FORMATPRICE(item?.price)}
            </Text>
            {item?.requestMaterial === null || item?.imageMaterial === null ? (
              <Layout>
                <TouchableOpacity
                  onPress={() => navigateToDetails(item)}
                  disabled={item?.status == 'expire'}
                  style={{
                    padding: 2,
                    borderColor: item?.status == 'expire' ? grey : green,
                    borderWidth: 1,
                  }}>
                  <Text
                    category="c1"
                    style={
                      item?.status == 'expire'
                        ? [
                            global.captionFont,
                            {color: grey, textAlign: 'center'},
                          ]
                        : [
                            global.captionFont,
                            {color: green, textAlign: 'center'},
                          ]
                    }>
                    Request Materi
                  </Text>
                </TouchableOpacity>
              </Layout>
            ) : (
              <Layout>
                <Layout
                  style={{
                    padding: 2,
                    borderColor: green,
                    borderWidth: 1,
                  }}>
                  <Text
                    category="c1"
                    style={[
                      global.captionFont,
                      {color: green, textAlign: 'center'},
                    ]}>
                    Request Materi :
                  </Text>
                </Layout>
                <Text
                  category="c1"
                  style={[
                    global.greenFontColor,
                    {paddingVertical: width * 0.02},
                  ]}>
                  {item?.requestMaterial}
                </Text>
                <Layout
                  style={{
                    padding: 2,
                    borderColor: green,
                    borderWidth: 1,
                  }}>
                  <Text
                    category="c1"
                    style={[
                      global.captionFont,
                      {color: green, textAlign: 'center'},
                    ]}>
                    Dokumen / foto :{' '}
                    {item?.imageMaterial == null
                      ? 'Tidak tersedia'
                      : 'Tersedia'}
                  </Text>
                </Layout>
              </Layout>
            )}
          </Layout>
        </Layout>
      </Layout>
      <Divider />
    </Layout>
  );

  const dismissError = () => {
    dispatch(cartAction.clearAddSchedule());
  };

  const dismissSuccess = () => {
    dispatch(cartAction.clear());
    dispatch(cartAction.getCart(1, 10));
    dispatch(studentAction.getStudent());
    dispatch(studentAction.getStudentDetail());
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <ModalComponent
        visible={isErrorAddSchedule}
        dismiss={() => dismissError()}
        msg={alertMsgError}
      />
      <ModalComponent
        visible={isAddSchedule}
        dismiss={() => dismissSuccess()}
        msg={alertMsgSuccess}
      />
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
      {dataConfirm.length > 0 && (
        <FlatList
          data={dataConfirm}
          renderItem={RenderCartConfirm}
          keyExtractor={(item, index) => index}
        />
      )}

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
            {FORMATPRICE(subtotal)}
          </Text>
        </Layout>
        <Divider />
        <Layout
          style={{
            flexDirection: 'row',
            paddingVertical: width * 0.02,
          }}>
          <Image
            source={require('./../assets/coin.png')}
            style={{
              width: width * 0.06,
              height: width * 0.06,
              paddingRight: width * 0.02,
            }}
            resizeMode="cover"
          />
          <Text
            category="c1"
            style={[
              global.normalFont,
              {color: 'black', paddingLeft: width * 0.02},
            ]}>{`${FORMATPRICE(data?.coin)} Sebis Koin dapat digunakan`}</Text>
        </Layout>
        <Layout style={{margin: width * 0.05}}>
          <Layout style={{flexDirection: 'row'}}>
            <Text style={[global.normalFont]}>Subtotal untuk produk</Text>
            <Text
              style={[
                global.normalFont,
                {
                  paddingLeft: width * 0.05,
                },
              ]}>
              {FORMATPRICE(subtotal)}
            </Text>
          </Layout>
          <Layout style={{flexDirection: 'row'}}>
            <Text style={global.normalFont}>Sebis Koin</Text>
            <Text style={[global.normalFont, {paddingLeft: width * 0.33}]}>
              {'- ' + FORMATPRICE(subtotal)}
            </Text>
          </Layout>
        </Layout>
      </Layout>
      {isLoadingAddSchedule ? (
        <Layout
          style={{
            paddingHorizontal: width * 0.5,
            paddingVertical: width * 0.05,
          }}>
          <Spinner size="large" />
        </Layout>
      ) : (
        <Layout style={{flexDirection: 'row'}}>
          <Layout style={{padding: width * 0.05, backgroundColor: grey}}>
            <Layout style={{flexDirection: 'row', backgroundColor: grey}}>
              <Text category="p1" style={[global.normalFont]}>
                Sisa Koin
              </Text>
              <Text
                category="p1"
                style={[
                  global.normalFont,
                  {paddingLeft: width * 0.18, color: blue},
                ]}>
                {FORMATPRICE(data?.coin - subtotal)}
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
      )}
    </SafeAreaView>
  );
};

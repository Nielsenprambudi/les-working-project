import React, {useEffect, useState, Fragment, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  SafeAreaView,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
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
  Tab,
  TabView,
  CheckBox,
} from '@ui-kitten/components';
import {ModalComponent} from '../component/modal.component';
import {ConfirmModalComponent} from '../component/confirmmodal.component';
import {DaysNavigator} from '../component/days.component';
import {SubjectsNavigator} from '../component/subjects.component';
import Carousel from 'react-native-snap-carousel';
import berandaAction from '../redux/actions/beranda';
import publicAction from '../redux/actions/public';
import cartAction from '../redux/actions/cart';
import RBSheet from 'react-native-raw-bottom-sheet';
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
import DocumentPicker, {
  DocumentPickerOptions,
  DirectoryPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const CartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const auth = useSelector(state => state.auth);
  const student = useSelector(state => state.student);
  const [month, setMonth] = useState(0);
  const [cartId, setCartId] = useState('');
  const [selectTab, setSelectedTab] = useState(0);
  const [dataCheckout, setDataCheckout] = useState([]);
  const [monthName, setMonthName] = useState(0);
  const {
    wishlist,
    isErrorWish,
    isLoadingWish,
    isWish,
    alertMsgErrWish,
    currentPageWish,
    nextPageWish,
    limitWish,
    totalDataWish,
  } = useSelector(state => state?.publicBeranda);
  const {
    isErrorCartAdd,
    isLoadingCartAdd,
    isCartAdd,
    alertMsgError,
    alertMsgSuccess,
    isLoadingCart,
    isErrorCart,
    isCart,
    data,
    limit,
    totalData,
    currentPage,
    nextPage,
    subtotal,
    isErrorCartDelete,
    isLoadingCartDelete,
    isCartDelete,
    isAddSchedule,
    isLoadingAddSchedule,
    isErrorAddSchedule,
  } = useSelector(state => state?.cart);
  const navigateBack = () => {
    navigation.goBack();
  };
  const [cardSubjectId, setCardSubjectId] = useState('');
  const [subjects, setSubjects] = useState([]);

  const BackIcon = props => (
    <Icon {...props} name="arrow-back" fill="#ffffff" />
  );
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const dismissModal = () => {
    if (!isErrorCartDelete || !isErrorAddSchedule) {
      dispatch(cartAction.clear());
      dispatch(cartAction.getCart(1, 10));
    } else {
      dispatch(cartAction.clearDelete());
    }
  };

  useEffect(() => {
    dispatch(publicAction.clearWishlist());
    dispatch(cartAction.clear());
    dispatch(publicAction.getWishlist(1, 10));
    dispatch(cartAction.getCart(1, 10));
  }, [dispatch]);

  const doRefresh = () => {
    dispatch(publicAction.clearWishlist());
    dispatch(publicAction.getWishlist(1, 10));
  };

  const loadMore = () => {
    if (wishlist && wishlist.length < totalDataWish) {
      dispatch(publicAction.getWishlist(nextPageWish, limitWish));
    }
  };

  const doRefreshCart = () => {
    dispatch(cartAction.clear());
    dispatch(cartAction.getCart(1, 10));
  };

  const loadMoreCart = () => {
    if (data && data.length < totalData) {
      dispatch(cartAction.getCart(nextPage, limit));
    }
  };

  const navigateToDetails = (cart, item) => {
    // dispatch(publicAction.setDetailLes(cart));
    navigation.navigate('DetailLes', {
      subid: cart?.subjectId,
      sub: JSON.stringify(cart),
      lesType: cart?.type,
      cartId: item?.cartId,
      teacher: item?.teacher,
    });
  };

  const cancelCart = (cartId, val) => {
    const canceledReason = {
      cartItemId: cartId,
      category: 'cart',
      reason: val,
    };
    dispatch(cartAction.deleteCart(canceledReason));
  };

  const cancelConfirm = () => {
    setCartId('');
  };

  const yesConfirm = val => {
    refRBSheet.current.close();
    cancelCart(cartId, val);
  };

  const showingConfirm = (cart, item) => {
    refRBSheet.current.open();
    setCartId(cart?.cartItemId);
  };

  const chooseItem = (index, status, teacher) => {
    let dataCart = data;
    let dataSetCheckoutSum = [];
    let dataConfirm = [];
    dataCart[index].check = status === false ? true : false;
    dataCart[index]?.cartItems.forEach((item, i) => {
      if (item?.status === 'accept') {
        item.check = status === false ? true : false;
        item.teacher = teacher;
        dataConfirmCartList.push(item);
        dataSetCheckoutSum.push(item?.price);
      }
    });
    let filterParent = dataCart.filter(x => x.cartItems === true);
    console.log('check filter parent', filterParent);
    let dataConfirmCartList = dataCart[index].cartItems.filter(
      x => x.check === true,
    );
    dispatch(cartAction.cartConfirmAdd(dataConfirmCartList));
    dispatch(cartAction.cartCheck(dataCart));
    dispatch(cartAction.cartSum(dataSetCheckoutSum));
  };

  const chooseItemCart = (cartIndex, index, status, teacher) => {
    let dataCart = data;
    let dataSetCheckoutSum = [];
    let carts = dataCart[index].cartItems;
    carts.forEach((val, i) => {
      if (i === cartIndex) {
        if (status === true) {
          val.check = false;
        } else {
          val.check = true;
          val.teacher = teacher;
          // dataSetCheckout.push(val?.cartItemId);
          // dataSetCheckoutSum.push(val?.price);
        }
      }
    });
    // setDataCheckout(dataSetCheckout);
    dispatch(cartAction.cartCheck(dataCart));
    dispatch(cartAction.cartSum(dataSetCheckoutSum));
  };

  const renderCart = ({item, index}) => (
    <Layout key={index} style={{flexDirection: 'column'}}>
      <Layout style={global.marginHorizontalDefault}>
        <CheckBox
          checked={item?.check}
          onChange={() => chooseItem(index, item?.check, item?.teacher)}>
          {evaprops => (
            <Layout {...evaprops} style={{flexDirection: 'row'}}>
              <Text
                category="h5"
                style={[
                  global.normalFont,
                  global.marginHorizontalDefault,
                  {fontWeight: 'bold'},
                ]}>
                {item?.teacher}{' '}
                <Icon
                  name="arrow-ios-forward-outline"
                  style={{width: width * 0.05, height: width * 0.05}}
                  fill={blue}
                />
              </Text>
            </Layout>
          )}
        </CheckBox>
      </Layout>
      <Divider style={[global.marginHorizontalDefault]} />
      <Layout>
        {item?.cartItems.length > 0 &&
          item?.cartItems.map(
            (cart, y) =>
              cart.status !== 'delete' && (
                <Layout style={{marginHorizontal: width * 0.02}} key={y}>
                  <CheckBox
                    checked={cart?.check}
                    disabled={cart?.status !== 'accept'}
                    onChange={() =>
                      chooseItemCart(y, index, cart?.check, item?.teacher)
                    }>
                    {evaprops => (
                      <Layout {...evaprops} style={{flexDirection: 'row'}}>
                        <Layout
                          style={[
                            global.marginHorizontalDefault,
                            {
                              flexDirection: 'column',
                            },
                          ]}>
                          <Text category="p1" style={global.normalFont}>
                            {cart?.date}
                          </Text>
                          <Text category="c2" style={global.captionFont}>
                            {cart?.time}
                          </Text>
                          <Text
                            category="p1"
                            style={[
                              global.normalFont,
                              {fontWeight: 'bold', paddingBottom: width * 0.02},
                            ]}>
                            {CURRENCY + FORMATPRICE(cart?.price)}
                          </Text>
                          {cart?.requestMaterial == null ||
                          cart?.imageMaterial == null ? (
                            <Layout>
                              <TouchableOpacity
                                onPress={() => navigateToDetails(cart, item)}
                                disabled={cart?.status == 'expire'}
                                style={{
                                  padding: 2,
                                  borderColor:
                                    cart?.status == 'expire' ? grey : green,
                                  borderWidth: 1,
                                }}>
                                <Text
                                  category="c1"
                                  style={
                                    cart?.status == 'expire'
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
                                {cart?.requestMaterial}
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
                                  {cart?.imageMaterial == null
                                    ? 'Tidak tersedia'
                                    : 'Tersedia'}
                                </Text>
                              </Layout>
                            </Layout>
                          )}
                        </Layout>
                        <Layout
                          style={{
                            flexDirection: 'column',
                            paddingLeft: width * 0.02,
                          }}>
                          <Text
                            category="c2"
                            style={[global.captionFont, {textAlign: 'right'}]}>
                            {cart?.subject.toLowerCase()}
                          </Text>
                          <Text
                            category="c2"
                            style={[global.captionFont, {textAlign: 'right'}]}>
                            {cart?.grade.toLowerCase()}
                          </Text>
                          <Text
                            category="c2"
                            style={[global.captionFont, {textAlign: 'right'}]}>
                            {cart?.type}
                          </Text>
                        </Layout>
                      </Layout>
                    )}
                  </CheckBox>
                  <Layout
                    style={{
                      marginVertical: width * 0.04,
                    }}>
                    <TouchableOpacity
                      onPress={() => showingConfirm(cart, item)}
                      style={[
                        {
                          borderRadius: width * 0.05,
                          paddingHorizontal: width * 0.05,
                          paddingVertical: width * 0.02,
                          borderWidth: 1,
                          borderColor: green,
                          marginLeft: width * 0.5,
                        },
                      ]}>
                      <Text
                        category="c2"
                        style={[
                          global.captionFont,
                          global.greenFontColor,
                          {fontSize: width * 0.03, textAlign: 'center'},
                        ]}>
                        Batalkan Pesanan
                      </Text>
                    </TouchableOpacity>
                  </Layout>
                  <Divider style={[global.marginHorizontalDefault]} />
                </Layout>
              ),
          )}
      </Layout>
    </Layout>
  );

  const renderJadwal = ({item}) => (
    <TouchableOpacity>
      <Divider style={[global.marginHorizontalDefault]} />
      <Layout
        style={[
          global.marginHorizontalDefault,
          {paddingVertical: width * 0.02, flexDirection: 'row'},
        ]}>
        <Layout>
          <Text category="h6" style={[global.normalFont, {fontWeight: 'bold'}]}>
            {FORMATDATE(item?.date)}
          </Text>
          <Text category="c2" style={[global.captionFont]}>
            {item?.timeStart + ' - ' + item?.timeEnd}
          </Text>
        </Layout>
        <Layout style={{marginLeft: width * 0.3}}>
          <Icon
            name="heart-outline"
            fill={orange}
            style={{width: width * 0.05, height: width * 0.05}}
          />
        </Layout>
      </Layout>
      <Layout style={{flexDirection: 'row'}}>
        <Icon
          name="heart"
          fill="red"
          style={{width: 15, height: 15, margin: width * 0.02}}
        />
        <Text category="c2" style={[global.captionFont]}>
          4 orang menambahkan ini ke wishlist
        </Text>
      </Layout>
      <Layout
        style={[
          global.marginHorizontalDefault,
          {flexDirection: 'row', marginVertical: width * 0.02},
        ]}>
        <TouchableOpacity
          // onPress={() => addCart(item)}
          disabled={cardSubjectId == ''}
          style={[
            global.cardButton,
            {
              borderRadius: width * 0.05,
              paddingHorizontal: width * 0.08,
            },
          ]}>
          <Text
            category="c2"
            style={[
              global.captionFont,
              global.greenFontColor,
              {fontSize: width * 0.03},
            ]}>
            <Icon
              name="shopping-cart"
              fill="#459c8e"
              style={{width: width * 0.04, height: width * 0.04}}
            />{' '}
            Beli Kelas
          </Text>
        </TouchableOpacity>
      </Layout>
    </TouchableOpacity>
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
                marginLeft: width * 0.07,
              }}
              resizeMode="cover"
            />
            <Text
              category="c1"
              style={[
                global.captionFont,
                {textAlign: 'center', color: '#ffffff'},
              ]}>
              Chat Tutor
            </Text>
          </Layout>
        )}
        onPress={() => console.log('chat tutor')}
      />
    </Fragment>
  );

  const addSchedule = () => {
    dispatch(cartAction.addSchedule(dataCheckout));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <ModalComponent
        visible={isErrorCartAdd || isErrorAddSchedule}
        dismiss={() => dismissModal()}
        msg={alertMsgError}
      />
      <ModalComponent
        visible={isErrorCartDelete}
        dismiss={() => dismissModal()}
        msg={alertMsgError}
      />
      <ModalComponent
        visible={isCartDelete || isAddSchedule}
        dismiss={() => dismissModal()}
        msg={alertMsgSuccess}
      />
      <TopNavigation
        style={{backgroundColor: blue}}
        accessoryLeft={BackAction}
        accessoryRight={RightAction}
        title={evaprops => (
          <Text
            {...evaprops}
            category="h6"
            style={[global.titleFont, {color: '#FFFFFF'}]}>
            Keranjang Saya
          </Text>
        )}
      />
      <Layout
        style={{
          flexDirection: 'column',
          backgroundColor: green,
          padding: width * 0.02,
          color: '#ffffff',
          elevation: 2,
        }}>
        <Text
          category="c1"
          style={[global.captionFont, {fontWeight: 'bold', color: '#ffffff'}]}>
          Cara Pemesanan
        </Text>
        <Text category="c2" style={[global.captionFont, {color: '#ffffff'}]}>
          1. Beli Sebis Koin
        </Text>
        <Text category="c2" style={[global.captionFont, {color: '#ffffff'}]}>
          2. Klik “Beli Kelas”. Yukk “Chat” Tutor terlebih dahulu untuk
          memastikan jadwal tutor tersedia.{' '}
        </Text>
        <Text category="c2" style={[global.captionFont, {color: '#ffffff'}]}>
          3. Kilk “Checkout” dan “Buat Pesanan”. Lakukan pembayaran dengan Sebis
          Koin,{' '}
        </Text>
        <Text category="c2" style={[global.captionFont, {color: '#ffffff'}]}>
          4. Pastikan sudah upload request materi yang menjadi kesulitan
          belajarmu{' '}
        </Text>
      </Layout>
      <Layout>
        <TabView
          selectedIndex={selectTab}
          onSelect={index => setSelectedTab(index)}
          style={{paddingVertical: width * 0.05}}>
          <Tab
            title={evaprops => (
              <Text
                {...evaprops}
                category="p1"
                style={[
                  global.normalFont,
                  {fontWeight: 'bold', color: 'black'},
                ]}>
                {`Wishlist (${wishlist.length})`}
              </Text>
            )}>
            <FlatList
              data={wishlist}
              renderItem={renderJadwal}
              keyExtractor={(item, index) => index}
              onEndReachedThreshold={0.2}
              onEndReached={loadMore}
              onRefresh={doRefresh}
              refreshing={false}
              ListFooterComponent={
                isLoadingWish && (
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
                !isLoadingWish && (
                  <Layout>
                    <Text
                      category="h5"
                      style={[
                        global.titleFont,
                        {textAlign: 'center', fontWeight: 'bold'},
                      ]}>
                      Wishlist kamu kosong, nih!
                    </Text>
                    <Text
                      category="c2"
                      style={[global.captionFont, {textAlign: 'center'}]}>
                      Tambahkan jadwal Tutor kesayanganmu pada wishlist.
                    </Text>
                  </Layout>
                )
              }
            />
          </Tab>
          <Tab
            title={evaprops => (
              <Text
                {...evaprops}
                category="p1"
                style={[
                  global.normalFont,
                  {fontWeight: 'bold', color: 'black'},
                ]}>
                {`Bayar (${data.length})`}
              </Text>
            )}>
            <FlatList
              data={data}
              renderItem={renderCart}
              keyExtractor={(item, index) => index}
              onEndReachedThreshold={0.2}
              onEndReached={loadMoreCart}
              onRefresh={doRefreshCart}
              refreshing={false}
              contentContainerStyle={{paddingBottom: width * 0.9}}
              ListFooterComponent={
                isLoadingCart ? (
                  <Layout
                    style={{
                      marginHorizontal: width * 0.5,
                      marginVertical: width * 0.25,
                    }}>
                    <Spinner size="large" />
                  </Layout>
                ) : (
                  data.length > 0 && (
                    <Layout
                      style={[
                        global.marginHorizontalDefault,
                        {
                          marginBottom: width * 0.04,
                          marginTop: width * 0.02,
                          flexDirection: 'column',
                        },
                      ]}>
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
                            {color: 'black'},
                          ]}>{`${FORMATPRICE(
                          student?.data?.coin,
                        )} Sebis Koin dapat digunakan`}</Text>
                      </Layout>
                      <Divider />
                      <Layout
                        style={{
                          flexDirection: 'row',
                          paddingVertical: width * 0.05,
                        }}>
                        <CheckBox>Semua</CheckBox>
                        <Text
                          category="p1"
                          style={[
                            global.normalFont,
                            {
                              fontWeight: 'bold',
                              paddingVertical: width * 0.04,
                              paddingLeft: width * 0.04,
                            },
                          ]}>
                          Total {FORMATPRICE(subtotal)}
                        </Text>
                        <TouchableOpacity
                          disabled={dataCheckout.length === 0}
                          style={
                            dataCheckout.length > 0
                              ? [
                                  global.cartButton,
                                  {borderRadius: width * 0.02},
                                ]
                              : [
                                  global.defaultDisabledButton,
                                  {borderRadius: width * 0.02},
                                ]
                          }
                          onPress={() => addSchedule()}>
                          <Text
                            category="p1"
                            style={
                              dataCheckout.length > 0
                                ? [global.normalFont, {color: '#FFFFFF'}]
                                : [
                                    global.normalFont,
                                    {color: '#FFFFFF', padding: width * 0.02},
                                  ]
                            }>
                            Checkout
                          </Text>
                        </TouchableOpacity>
                      </Layout>
                    </Layout>
                  )
                )
              }
              ListEmptyComponent={
                !isLoadingCart && (
                  <Layout>
                    <Text
                      category="h5"
                      style={[
                        global.titleFont,
                        {textAlign: 'center', fontWeight: 'bold'},
                      ]}>
                      Keranjang kamu kosong, nih!
                    </Text>
                    <Text
                      category="c2"
                      style={[global.captionFont, {textAlign: 'center'}]}>
                      Tambahkan jadwal Tutor kesayanganmu pada keranjang.
                    </Text>
                  </Layout>
                )
              }
            />
            <Divider />
          </Tab>
        </TabView>
      </Layout>
      <RBSheet
        ref={refRBSheet}
        height={height * 0.5}
        closeOnDragDown={true}
        closeOnPressMask={false}
        onClose={() => cancelConfirm()}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
            borderTopEndRadius: width * 0.2,
            borderTopStartRadius: width * 0.2,
          },
          draggableIcon: {
            backgroundColor: grey,
          },
        }}>
        <ConfirmModalComponent
          cancel={() => cancelConfirm()}
          yes={val => yesConfirm(val)}
          loading={isLoadingCartDelete}
        />
      </RBSheet>
    </SafeAreaView>
  );
};

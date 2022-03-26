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
  Tooltip,
  Tab,
  TabView,
  TabBar,
  Spinner,
} from '@ui-kitten/components';
import {HeaderComponent} from '../component/header.component';
import {PromoComponent} from '../component/promo.component';
import {TopupComponent} from '../component/topup.component';
import Carousel from 'react-native-snap-carousel';
import {FloatingAction} from 'react-native-floating-action';
import {FORMATPRICE, grey, greydark} from '../helpers/constant';
import berandaAction from './../redux/actions/beranda';
import studentAction from './../redux/actions/student';
import riwayatAction from './../redux/actions/riwayat';
import leskuAction from '../redux/actions/lesku';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DetailLesHistoryComponent} from '../component/detailLesHistory.component';
import {DetailCoinHistoryComponent} from '../component/detailCoinHistory.component';
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
  const {
    isLoadingRiwayat,
    dataRiwayat,
    limit,
    totalData,
    nextPage,
    isLoadingRiwayatCoin,
    dataRiwayatCoin,
    limitCoin,
    totalDataCoin,
    nextPageCoin,
  } = useSelector(state => state.riwayat);
  const {
    isLoadingSchedule,
    dataSchedule,
    limitSchedule,
    totalDataSchedule,
    nextPageSchedule,
  } = useSelector(state => state.lesku);
  const auth = useSelector(state => state.auth);
  const {data, isStudent} = useSelector(state => state.student);
  const [tabBar, setTabBar] = useState(0);
  const [orderIndex, setOrderIndex] = useState(0);
  const [idHistoryLes, setIdHistoryLes] = useState('');
  const [idHistoryCoin, setIdHistoryCoin] = useState('');
  const [visibleHistoryLes, setVisibleHistoryLes] = useState(false);
  const [visibleHistoryCoin, setVisibleHistoryCoin] = useState(false);
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
    if (firstWalk === true) {
      dispatch(berandaAction.setWalkthrough(false));
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

  const shareLinkLes = async (subject, tutor, date, time, link) => {
    try {
      await Share.share({
        message: `${subject}\n${tutor}\n${date}\n${time}\n\n${link}`,
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
    if (e === 2 && auth?.token) {
      dispatch(riwayatAction.clearLes());
      dispatch(riwayatAction.getRiwayat(1, 10));
      dispatch(riwayatAction.clearCoin());
      dispatch(riwayatAction.getRiwayatCoin(1, 10));
      dispatch(leskuAction.clearSchedule());
      dispatch(leskuAction.getSchedule(1, 10));
    }
  };

  const setTheOrder = i => {
    setOrderIndex(i);
  };

  const doRefreshRiwayat = () => {
    dispatch(riwayatAction.clearLes());
    dispatch(riwayatAction.getRiwayat(1, 10));
  };

  const loadMoreRiwayat = () => {
    if (dataRiwayat && dataRiwayat.length < totalData) {
      dispatch(riwayatAction.getRiwayat(nextPage, limit));
    }
  };

  const doRefreshRiwayatCoin = () => {
    dispatch(riwayatAction.clearCoin());
    dispatch(riwayatAction.getRiwayatCoin(1, 10));
  };

  const loadMoreRiwayatCoin = () => {
    if (dataRiwayatCoin && dataRiwayatCoin.length < totalDataCoin) {
      dispatch(riwayatAction.getRiwayatCoin(nextPageCoin, limitCoin));
    }
  };

  const doRefreshSchedule = () => {
    dispatch(leskuAction.clearSchedule());
    dispatch(leskuAction.getSchedule(1, 10));
  };

  const loadMoreSchedule = () => {
    if (dataSchedule && dataSchedule.length < totalDataSchedule) {
      dispatch(leskuAction.getSchedule(nextPageSchedule, limitSchedule));
    }
  };

  const RenderSchedule = ({item}) => (
    <Layout>
      <Layout
        style={[
          global.marginHorizontalDefault,
          {flexDirection: 'row', paddingVertical: width * 0.03},
        ]}>
        <Image
          source={require('./../assets/sebis_les.png')}
          style={{
            width: width * 0.2,
            height: width * 0.2,
          }}
          resizeMode="cover"
        />
        <Layout style={{paddingLeft: width * 0.05}}>
          <Text
            category="p1"
            style={[global.normalFont, {fontWeight: 'bold', color: blue}]}>
            {item?.subject}
          </Text>
          <Text category="c1" style={[global.normalFont, {color: greydark}]}>
            {item?.date}
          </Text>
          <Text
            category="c2"
            style={[global.captionFont, {color: greydark, fontWeight: 'bold'}]}>
            {item?.time}
          </Text>
          <Text category="p2" style={[global.normalFont]}>
            {item?.teacher}
          </Text>
          {item?.requestMaterial == null || item?.imageMaterial == null ? (
            <TouchableOpacity
              // onPress={() => navigateToDetails(cart, item)}
              disabled={item?.convertStatus == 'expire'}
              style={{
                borderColor: item?.convertStatus == 'expire' ? grey : green,
                borderWidth: 1,
              }}>
              <Text
                category="c1"
                style={
                  item?.convertStatus == 'expire'
                    ? [global.captionFont, {color: grey, textAlign: 'center'}]
                    : [global.captionFont, {color: green, textAlign: 'center'}]
                }>
                Request Materi
              </Text>
            </TouchableOpacity>
          ) : (
            <Layout>
              <Text category="c1" style={[global.captionFont]}>
                Request Materi :
              </Text>
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
                }}>
                <Text category="c1" style={[global.captionFont]}>
                  Dokumen / foto :
                </Text>
                <Text
                  category="c1"
                  style={[global.captionFont, {color: green}]}>
                  {item?.imageMaterial == null ? 'Tidak tersedia' : 'Tersedia'}
                </Text>
              </Layout>
              <Avatar
                size="large"
                source={{uri: publicUrl.API_URL + item?.imageMaterial}}
                shape="square"
              />
            </Layout>
          )}
        </Layout>
        <Layout style={{paddingLeft: width * 0.05, maxWidth: width * 0.3}}>
          <Text
            category="c2"
            style={[
              global.captionFont,
              {color: greydark, paddingBottom: width * 0.03},
            ]}>
            {item?.convertStatus}
          </Text>
          <Text category="c2" style={[global.captionFont, {color: greydark}]}>
            {item?.grade}
          </Text>
          <Text category="c2" style={[global.captionFont, {color: greydark}]}>
            {item?.type}
          </Text>
        </Layout>
      </Layout>
      {item?.roomIsActive === false ? (
        <TouchableOpacity
          // onPress={() => navigation.navigate('LesRoom', {link: item?.roomLink})}
          style={[
            global.cardButton,
            {
              borderRadius: width * 0.02,
              borderColor: greydark,
              backgroundColor: greydark,
              borderWidth: 1,
              marginHorizontal: width * 0.2,
              marginVertical: width * 0.02,
            },
          ]}>
          <Text
            category="c1"
            style={[
              global.normalFont,
              {
                color: '#FFFFFF',
                textAlign: 'center',
              },
            ]}>
            Kelas Belum Dimulai
          </Text>
        </TouchableOpacity>
      ) : (
        <Layout style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('LesRoom', {link: item?.roomLink})
            }
            style={[
              global.cardButton,
              {
                borderRadius: width * 0.02,
                borderColor: green,
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                marginVertical: width * 0.02,
                marginLeft: width * 0.02,
                marginRight: width * 0.01,
                width: width * 0.8,
              },
            ]}>
            <Text
              category="c1"
              style={[
                global.normalFont,
                {
                  color: green,
                  textAlign: 'center',
                },
              ]}>
              Klik untuk mulai kelas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              shareLinkLes(
                item?.subject,
                'tutor',
                item?.date,
                item?.time,
                item?.roomLink,
              )
            }
            style={{
              marginVertical: width * 0.02,
            }}>
            <Icon
              name="share"
              fill={green}
              style={{width: width * 0.08, height: width * 0.08}}
            />
          </TouchableOpacity>
        </Layout>
      )}
      <Text
        category="c2"
        style={[
          global.captionFont,
          {color: greydark, textAlign: 'center', paddingBottom: width * 0.05},
        ]}>
        Link terbuka 15 menit sebelum les dimulai, siswa harus masuk kelas tepat
        waktu, tidak ada perpanjangan waktu{' '}
      </Text>
      <Divider />
    </Layout>
  );

  const RenderRiwayatCoin = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setIdHistoryCoin(item?.transactionId);
        setVisibleHistoryCoin(true);
      }}
      style={[
        global.marginHorizontalDefault,
        {flexDirection: 'row', paddingVertical: width * 0.03},
      ]}>
      <Image
        source={require('./../assets/coin.png')}
        style={{
          width: width * 0.2,
          height: width * 0.2,
        }}
        resizeMode="cover"
      />
      <Layout style={{paddingLeft: width * 0.05, width: width * 0.7}}>
        <Text
          category="p1"
          style={[global.normalFont, {fontWeight: 'bold', color: blue}]}>
          ID transaksi : {item?.transactionId}
        </Text>
        <Text category="c1" style={[global.normalFont, {color: greydark}]}>
          Status Transaksi : {item?.status}
        </Text>
        <Text category="c1" style={[global.normalFont, {color: grey}]}>
          Hari ini
        </Text>
      </Layout>
    </TouchableOpacity>
  );

  const RenderRiwayat = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setIdHistoryLes(item?.scheduleId);
        setVisibleHistoryLes(true);
      }}
      style={[
        global.marginHorizontalDefault,
        {flexDirection: 'row', paddingVertical: width * 0.03},
      ]}>
      <Image
        source={require('./../assets/sebis_les.png')}
        style={{
          width: width * 0.2,
          height: width * 0.2,
        }}
        resizeMode="cover"
      />
      <Layout style={{paddingLeft: width * 0.05}}>
        <Text
          category="p1"
          style={[global.normalFont, {fontWeight: 'bold', color: blue}]}>
          {item?.name}
        </Text>
        <Text category="c1" style={[global.normalFont, {color: greydark}]}>
          {item?.lesStatus}
        </Text>
        {/* <Text category="c1" style={[global.normalFont, {color: grey}]}>
          {item?.date}
        </Text> */}
      </Layout>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <DetailLesHistoryComponent
        visible={visibleHistoryLes}
        idHistoryLes={idHistoryLes}
        dismiss={() => {
          setIdHistoryLes('');
          setVisibleHistoryLes(false);
          dispatch(riwayatAction.clearLesDetail());
        }}
        navigateHelp={() => {
          navigation.navigate('Help');
          setIdHistoryLes('');
          setVisibleHistoryLes(false);
          dispatch(riwayatAction.clearLesDetail());
        }}
      />
      <DetailCoinHistoryComponent
        visible={visibleHistoryCoin}
        idHistoryCoin={idHistoryCoin}
        dismiss={() => {
          setIdHistoryCoin('');
          setVisibleHistoryCoin(false);
          dispatch(riwayatAction.clearCoinDetail());
        }}
      />
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
      {tabBar == 2 &&
        (auth?.token ? (
          <Layout>
            <TabBar
              selectedIndex={orderIndex}
              onSelect={index => setTheOrder(index)}
              indicatorStyle={{backgroundColor: blue}}>
              <Tab
                title={evaprops => (
                  <Text
                    {...evaprops}
                    category="c1"
                    style={[
                      global.normalFont,
                      {color: orderIndex === 0 ? blue : greydark},
                    ]}>
                    Riwayat Les
                  </Text>
                )}
              />
              <Tab
                title={evaprops => (
                  <Text
                    {...evaprops}
                    category="c1"
                    style={[
                      global.normalFont,
                      {color: orderIndex === 1 ? blue : greydark},
                    ]}>
                    Riwayat Transaksi
                  </Text>
                )}
              />
              <Tab
                title={evaprops => (
                  <Text
                    {...evaprops}
                    category="c1"
                    style={[
                      global.normalFont,
                      {color: orderIndex === 2 ? blue : greydark},
                    ]}>
                    Dalam Proses
                  </Text>
                )}
              />
            </TabBar>
            {orderIndex === 0 && (
              <Layout style={{height: height, paddingTop: width * 0.05}}>
                <FlatList
                  data={dataRiwayat}
                  renderItem={RenderRiwayat}
                  keyExtractor={(item, index) => index}
                  onEndReachedThreshold={0.2}
                  onEndReached={loadMoreRiwayat}
                  onRefresh={doRefreshRiwayat}
                  refreshing={false}
                  ListFooterComponent={
                    isLoadingRiwayat && (
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
                    !isLoadingRiwayat && (
                      <Layout>
                        <Image
                          source={require('./../assets/sebby-laptop.png')}
                          style={{
                            width: width * 0.5,
                            height: width * 0.5,
                            marginHorizontal: width * 0.25,
                            marginTop: width * 0.25,
                          }}
                          resizeMode="cover"
                        />
                        <Text
                          category="h5"
                          style={[
                            global.titleFont,
                            {textAlign: 'center', fontWeight: 'bold'},
                          ]}>
                          Pesan Les, Yukk!
                        </Text>
                      </Layout>
                    )
                  }
                />
              </Layout>
            )}
            {orderIndex === 1 && (
              <Layout style={{height: height, paddingTop: width * 0.05}}>
                <FlatList
                  data={dataRiwayatCoin}
                  renderItem={RenderRiwayatCoin}
                  keyExtractor={(item, index) => index}
                  onEndReachedThreshold={0.2}
                  onEndReached={loadMoreRiwayatCoin}
                  onRefresh={doRefreshRiwayatCoin}
                  refreshing={false}
                  ListFooterComponent={
                    isLoadingRiwayatCoin && (
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
                    !isLoadingRiwayatCoin && (
                      <Layout>
                        <Image
                          source={require('./../assets/sebby-laptop.png')}
                          style={{
                            width: width * 0.5,
                            height: width * 0.5,
                            marginHorizontal: width * 0.25,
                            marginTop: width * 0.25,
                          }}
                          resizeMode="cover"
                        />
                        <Text
                          category="h5"
                          style={[
                            global.titleFont,
                            {textAlign: 'center', fontWeight: 'bold'},
                          ]}>
                          Pesan Les, Yukk!
                        </Text>
                      </Layout>
                    )
                  }
                />
              </Layout>
            )}
            {orderIndex === 2 && (
              <Layout style={{height: height, paddingTop: width * 0.05}}>
                <FlatList
                  data={dataSchedule}
                  renderItem={RenderSchedule}
                  keyExtractor={(item, index) => index}
                  onEndReachedThreshold={0.2}
                  onEndReached={loadMoreSchedule}
                  onRefresh={doRefreshSchedule}
                  contentContainerStyle={{paddingBottom: width * 0.5}}
                  refreshing={false}
                  ListFooterComponent={
                    isLoadingSchedule && (
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
                    !isLoadingSchedule && (
                      <Layout>
                        <Image
                          source={require('./../assets/sebby-laptop.png')}
                          style={{
                            width: width * 0.5,
                            height: width * 0.5,
                            marginHorizontal: width * 0.25,
                            marginTop: width * 0.25,
                          }}
                          resizeMode="cover"
                        />
                        <Text
                          category="h5"
                          style={[
                            global.titleFont,
                            {textAlign: 'center', fontWeight: 'bold'},
                          ]}>
                          Pesan Les, Yukk!
                        </Text>
                      </Layout>
                    )
                  }
                />
              </Layout>
            )}
          </Layout>
        ) : (
          <Layout>
            <Image
              source={require('./../assets/sebby-laptop.png')}
              style={{
                width: width * 0.5,
                height: width * 0.5,
                marginHorizontal: width * 0.25,
                marginTop: width * 0.25,
              }}
              resizeMode="cover"
            />
            <Text
              category="h5"
              style={[
                global.titleFont,
                {textAlign: 'center', fontWeight: 'bold'},
              ]}>
              Login terlebih dahulu untuk mendapatkan fitur les
            </Text>
          </Layout>
        ))}

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

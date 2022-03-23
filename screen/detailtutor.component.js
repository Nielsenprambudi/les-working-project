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
import {ModalVideoComponent} from '../component/modalVideo.component';
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

export const DetailTutorScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {typeParam, qcurricullum, qgrade, qsubject} = route.params;
  const auth = useSelector(state => state.auth);
  const [month, setMonth] = useState(0);
  const [toast, setToast] = useState(false);
  const [display, setDisplay] = useState(false);
  const [alertMsgToast, setAlertMsgToast] = useState('');
  const [monthName, setMonthName] = useState(0);
  const [type, setType] = useState('private');
  const {
    detailTutor,
    jadwalPublic,
    isLoadingJadwalPublic,
    isErrorJadwalPublic,
    totalDataHours,
    limitHours,
    currentPageHours,
    nextPageHours,
    isErrorFav,
    isLoadingFav,
    isFav,
    alertMsgErr,
  } = useSelector(state => state?.publicBeranda);
  const {isErrorCartAdd, isLoadingCartAdd, isCartAdd, alertMsgError} =
    useSelector(state => state?.cart);
  const [favourite, setFavourite] = useState(false);
  const navigateBack = () => {
    navigation.goBack();
  };
  console.log('alert error', alertMsgError);
  const days = [
    {id: 1, day: 'Senin', off: false},
    {id: 2, day: 'Selasa', off: false},
    {id: 3, day: 'Rabu', off: false},
    {id: 4, day: 'Kamis', off: false},
    {id: 5, day: 'Jumat', off: false},
    {id: 6, day: 'Sabtu', off: false},
    {id: 0, day: 'Minggu', off: false},
  ];
  const [themeDays, setThemeDays] = useState(days);
  const [cardSubjectId, setCardSubjectId] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loadAddFriends, setLoadAddFriends] = useState(false);

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

  const setPressDay = index => {
    days.forEach((item, i) => {
      if (i == index) {
        item.off = true;
      } else {
        item.off = false;
      }
    });
    setThemeDays(days);
  };

  const addCart = item => {
    let xdate = item?.date.split(',');
    dispatch(
      cartAction.addCart({
        teacherId: item?.teacherId,
        typeCourse: type,
        startTime: xdate[1] + ' ' + item?.timeStart,
        endTime: xdate[1] + ' ' + item?.timeEnd,
        teacherSubjectId: cardSubjectId,
        availabilityHoursId: item?.id,
        requestMaterial: '',
        imageMaterial: '',
      }),
    );
  };

  const renderDays = ({item, index}) => (
    <Layout>
      <DaysNavigator
        item={item}
        check={item?.off}
        offDays={jadwalPublic}
        pressDay={i => setPressDay(i)}
        index={index}
      />
    </Layout>
  );

  const setPressSubject = index => {
    let su = subjects;
    su.forEach((item, i) => {
      if (i == index) {
        item.choose = true;
      } else {
        item.choose = false;
      }
    });
    setSubjects(su);
    setCardSubjectId(su[index]?.id);
    setSelectedSubject(su[index]);
  };

  const renderSubjects = ({item, index}) => (
    <Layout>
      <SubjectsNavigator
        item={item}
        choose={item?.choose}
        pressSubject={i => setPressSubject(i)}
        index={index}
        id={cardSubjectId}
      />
    </Layout>
  );

  const navigateToDetail = item => {
    if (cardSubjectId != '') {
      dispatch(publicAction.setDetailLes(item));
      navigation.navigate('DetailLes', {
        subid: cardSubjectId,
        sub: JSON.stringify(selectedSubject),
        lesType: type,
        cartId: '',
      });
    } else {
      setAlertMsgToast('Pilih Mata Pelajaran');
      setToast(true);
    }
  };

  const renderJadwal = ({item}) => (
    // <TouchableOpacity onPress={() => navigateToDetail(item)}>
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
      <Layout style={global.marginHorizontalDefault}>
        <Text
          category="p1"
          style={[
            global.normalFont,
            {fontWeight: 'bold', paddingBottom: width * 0.02},
          ]}>
          {type == '' || type == 'private'
            ? CURRENCY + FORMATPRICE(item?.private)
            : CURRENCY + FORMATPRICE(item?.group)}
        </Text>
      </Layout>
      <Layout
        style={[
          global.marginHorizontalDefault,
          {flexDirection: 'row', marginVertical: width * 0.02},
        ]}>
        {loadAddFriends ? (
          <Spinner size="medium" />
        ) : (
          <TouchableOpacity
            style={
              type == 'private'
                ? [global.cardButton, {opacity: 0}]
                : [global.cardButton]
            }>
            <Text
              category="c2"
              style={[
                global.captionFont,
                global.greenFontColor,
                {
                  fontSize: width * 0.03,
                },
              ]}>
              + Tambah Teman
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => addCart(item)}
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

  const setSelectedMonth = i => {
    const xmonth = MONTH[i.row];
    setMonth(xmonth?.id);
    setMonthName(xmonth?.value);
  };

  const setSelectedType = i => {
    const xtype = TYPE[i.row];
    setType(xtype?.value);
    setLoadAddFriends(true);
    setInterval(() => {
      setLoadAddFriends(false);
    }, 100);
  };

  const doRefresh = () => {
    dispatch(publicAction.clearJadwalPublic());
    dispatch(publicAction.getJadwalPublic(null, 1, 10, detailTutor?.id));
  };

  const loadMore = () => {
    if (jadwalPublic && jadwalPublic.length < totalDataHours) {
      dispatch(
        publicAction.getJadwalPublic(
          month,
          nextPageHours,
          limitHours,
          detailTutor?.id,
        ),
      );
    }
  };

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
    dispatch(cartAction.clearAdd());
  };

  const dismissToast = () => {
    if (toast) {
      setToast(!toast);
      setAlertMsgToast('');
    } else {
      setToast(toast);
    }
  };

  const dismissVideo = () => {
    if (display) {
      setDisplay(!display);
    } else {
      setDisplay(display);
    }
  };

  const RightAction = () => (
    <Fragment>
      <TopNavigationAction
        icon={CartIcon}
        onPress={() => navigation.navigate('Cart')}
      />
      <TopNavigationAction icon={StarIcon} onPress={() => favTutor()} />
    </Fragment>
  );

  const setDetailSubjects = sub => {
    if (sub.length > 0) {
      sub.forEach((item, i) => {
        item.choose = false;
      });
      setSubjects(sub);
    }
  };

  useEffect(() => {
    dispatch(publicAction.clearJadwalPublic());
    dispatch(publicAction.getJadwalPublic(month, 1, 10, detailTutor?.id));
    setDetailSubjects(detailTutor?.teacherSubjects);
  }, [dispatch, detailTutor, month]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <ModalComponent
        visible={isErrorFav || isErrorCartAdd}
        dismiss={() => dismissModal()}
        msg={alertMsgErr || alertMsgError}
      />
      <ModalComponent
        visible={isCartAdd}
        dismiss={() => dismissModal()}
        msg={
          'Hai...Terima kasih sudah beli kelas, selanjutnya lakukan checkout dan pembayaran ya'
        }
      />
      <ModalComponent
        visible={toast}
        dismiss={() => dismissToast()}
        msg={alertMsgToast}
      />
      <ModalVideoComponent
        visible={display}
        dismiss={() => dismissVideo()}
        url={detailTutor?.url}
      />
      <TopNavigation accessoryLeft={BackAction} accessoryRight={RightAction} />
      <Divider />
      <Layout
        style={{
          flexDirection: 'row',
          marginHorizontal: width * 0.02,
          marginVertical: width * 0.02,
        }}>
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
            <TouchableOpacity onPress={() => setDisplay(true)}>
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
            <Layout
              style={{flexDirection: 'column', paddingLeft: width * 0.02}}>
              <Text
                category="c2"
                style={[global.captionFont, {fontSize: width * 0.025}]}>
                Tutor Andalan
              </Text>
            </Layout>
          </Layout>
        </Layout>
        <Layout style={{flexDirection: 'column'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('TutorExperiences')}>
            <Image
              source={
                detailTutor?.profile
                  ? {uri: `${publicUrl.API_URL + detailTutor?.profile}`}
                  : require('./../assets/login.png')
              }
              style={{
                width: width * 0.18,
                height: width * 0.18,
                marginLeft: 'auto',
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={[global.captionFont, {fontSize: width * 0.025}]}
              category="c1">
              Riwayat Mengajar
            </Text>
          </TouchableOpacity>
        </Layout>
      </Layout>
      <Layout
        style={{
          flexDirection: 'row',
          backgroundColor: '#e2e2e2',
          paddingHorizontal: width * 0.05,
        }}>
        <TouchableOpacity>
          <Layout
            style={{
              flexDirection: 'column',
              backgroundColor: '#e2e2e2',
              margin: width * 0.05,
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
              style={[global.captionFont, {textAlign: 'center'}]}>
              Chat
            </Text>
          </Layout>
        </TouchableOpacity>
        <Layout
          style={{
            padding: width * 0.05,
            backgroundColor: '#e2e2e2',
          }}>
          <Text
            category="p2"
            style={[
              global.normalFont,
              {
                textAlign: 'center',
                backgroundColor: '#e2e2e2',
                width: width * 0.6,
              },
            ]}>
            Yuk chat tutor pilihanmu dulu, untuk memastikan jadwal tutor
            tersedia untukmu
          </Text>
        </Layout>
      </Layout>
      <Text
        category="c1"
        style={[
          global.titleFont,
          global.orangeFontColor,
          global.marginHorizontalDefault,
          {marginVertical: width * 0.02},
        ]}>
        mapel lain
      </Text>
      <Layout>
        <FlatList data={subjects} renderItem={renderSubjects} horizontal />
      </Layout>

      <Layout style={{flex: 1, marginBottom: width * 0.05}}>
        <FlatList
          ListHeaderComponent={() => (
            <Layout>
              <Text
                category="p1"
                style={[
                  global.titleFont,
                  global.marginHorizontalDefault,
                  {fontWeight: 'bold', fontSize: width * 0.05},
                ]}>
                Filter Berdasarkan
              </Text>
              <Layout>
                <FlatList data={themeDays} renderItem={renderDays} horizontal />
              </Layout>
              <Layout
                style={[
                  global.marginHorizontalDefault,
                  {flexDirection: 'row', marginVertical: width * 0.015},
                ]}>
                <Layout style={{width: width * 0.4, marginRight: width * 0.02}}>
                  <Select
                    size="small"
                    style={{color: '#459c8e'}}
                    value={monthName}
                    onSelect={i => setSelectedMonth(i)}
                    placeholder="Bulan">
                    {MONTH.map((item, i) => (
                      <SelectItem key={i} title={item?.value} />
                    ))}
                  </Select>
                </Layout>
                <Layout style={{width: width * 0.4}}>
                  <Select
                    size="small"
                    style={{color: '#459c8e'}}
                    value={type}
                    onSelect={i => setSelectedType(i)}
                    placeholder="Jenis Kelas">
                    {TYPE.map((item, i) => (
                      <SelectItem key={i} title={item?.value} />
                    ))}
                  </Select>
                </Layout>
              </Layout>
            </Layout>
          )}
          data={jadwalPublic}
          renderItem={renderJadwal}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0.2}
          onEndReached={loadMore}
          onRefresh={doRefresh}
          refreshing={false}
          ListFooterComponent={
            isLoadingJadwalPublic && (
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
            !isLoadingJadwalPublic && (
              <Layout>
                <Text
                  category="c2"
                  style={[global.captionFont, {textAlign: 'center'}]}>
                  Belum ada jadwal nih..
                </Text>
              </Layout>
            )
          }
        />
      </Layout>
    </SafeAreaView>
  );
};

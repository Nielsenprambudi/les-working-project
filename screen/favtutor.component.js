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
import {orange, blue, green, FORMATPRICE} from '../helpers/constant';
import {ModalComponent} from '../component/modal.component';
import Carousel from 'react-native-snap-carousel';
import berandaAction from '../redux/actions/beranda';
import publicAction from '../redux/actions/public';
import publicUrl from '../publicUrl';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const FavTutorScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const auth = useSelector(state => state.auth);
  const {
    totalDataGetFav,
    limitGetFav,
    currentPageGetFav,
    nextPageGetFav,
    isErrorGetFav,
    isLoadingGetFav,
    isGetFav,
    favTutor,
    alertMsgErr,
  } = useSelector(state => state?.publicBeranda);
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
    <Icon {...props} name="arrow-back" fill="#FFFFFF" />
  );

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const RightAction = () => (
    <Fragment>
      <TopNavigationAction
        icon={CartIcon}
        onPress={() => navigation.navigate('Cart')}
      />
      <TopNavigationAction
        icon={HelpIcon}
        onPress={() => navigation.navigate('Help')}
      />
    </Fragment>
  );

  const setDetailTutor = item => {
    dispatch(publicAction.getDetailTutor(item));
    navigation.navigate('DetailTutor');
  };

  const renderLes = ({item}) => (
    <TouchableOpacity onPress={() => setDetailTutor(item?.teacher)}>
      <Layout
        style={{
          width: width * 0.45,
          padding: width * 0.05,
          margin: width * 0.02,
          borderColor: '#e2e2e2',
          borderRadius: width * 0.02,
          borderWidth: 1,
          elevation: 2,
        }}
        key={item.id}>
        <Layout>
          {item?.teacher?.profile ? (
            <Image
              source={{uri: `${publicUrl.API_URL + item?.teacher?.profile}`}}
              style={{
                width: width * 0.3,
                height: width * 0.3,
                marginVertical: width * 0.02,
                marginHorizontal: width * 0.02,
                borderRadius: width * 0.02,
              }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require('./../assets/login.png')}
              style={{
                width: width * 0.3,
                height: width * 0.3,
                marginVertical: width * 0.02,
                marginHorizontal: width * 0.02,
                borderRadius: width * 0.02,
              }}
              resizeMode="contain"
            />
          )}
        </Layout>
        <Text style={[global.titleFont]}>
          {item?.teacher?.firstName + ' ' + item?.teacher?.lastName}
        </Text>

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
            {FORMATPRICE(item?.teacher?.coin)}
          </Text>
        </Layout>
      </Layout>
    </TouchableOpacity>
  );

  const doRefresh = () => {
    setRefresh(true);
    dispatch(publicAction.clearGetFavourite());
    dispatch(publicAction.getFavouriteTutor(1, 10));
  };

  const loadMore = () => {
    if (favTutor && favTutor.length < totalDataGetFav) {
      dispatch(publicAction.getFavouriteTutor(nextPageGetFav, limitGetFav));
    }
  };

  const dismissModal = () => {
    dispatch(publicAction.clearGetFavourite());
  };

  useEffect(() => {
    dispatch(publicAction.clearGetFavourite());
    dispatch(publicAction.getFavouriteTutor(1, 10));
  }, [dispatch]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <ModalComponent
        visible={isErrorGetFav}
        dismiss={() => dismissModal()}
        msg={alertMsgErr}
      />
      <TopNavigation
        style={{backgroundColor: blue}}
        title={evaprops => (
          <Text
            {...evaprops}
            category="h6"
            style={[global.titleFont, {color: '#FFFFFF'}]}>
            Tutor Favoritku
          </Text>
        )}
        accessoryLeft={BackAction}
        accessoryRight={RightAction}
      />
      <FlatList
        data={favTutor}
        renderItem={renderLes}
        numColumns={2}
        onEndReachedThreshold={0.2}
        onRefresh={doRefresh}
        onEndReached={loadMore}
        refreshing={false}
        ListFooterComponent={
          isLoadingGetFav && (
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
          !isLoadingGetFav && (
            <Layout style={{flexDirection: 'column', marginVertical: width}}>
              <Text
                category="h5"
                style={[global.titleFont, {textAlign: 'center'}]}>
                Tambah Tutor Favorit, Yukk!
              </Text>
              <Text
                category="c2"
                style={[global.captionFont, {textAlign: 'center'}]}>
                Tutor kami akan dengan senang hati membantumu belajar
              </Text>
            </Layout>
          )
        }
      />
    </SafeAreaView>
  );
};

import React, {useEffect, useState} from 'react';
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
} from '@ui-kitten/components';
import {ModalComponent} from '../component/modal.component';
import Carousel from 'react-native-snap-carousel';
import berandaAction from '../redux/actions/beranda';
import publicAction from '../redux/actions/public';
import publicUrl from '../publicUrl';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const FilterLesScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {qsearch, typeParam, qcurricullum, qgrade, qsubject} = route.params;
  const [refresh, setRefresh] = useState(false);
  const {isLoadingSlider, isSlider, isErrorSlider, dataSlider, alertMsg} =
    useSelector(state => state.beranda);
  const auth = useSelector(state => state.auth);
  const {
    totalData,
    limit,
    currentPage,
    nextPage,
    dataPublic,
    isPublic,
    isErrorPublic,
    isLoadingPublic,
  } = useSelector(state => state?.publicBeranda);
  const navigateDetails = () => {
    navigation.navigate('Login');
  };

  const renderSearchIcon = props => (
    <Icon {...props} name="search" color="#e2e2e2" />
  );

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

  const renderLes = ({item}) => (
    <TouchableOpacity>
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
          {item?.profile ? (
            <Image
              source={{uri: `${publicUrl.API_URL + item?.profile}`}}
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
          {item?.firstName + ' ' + item?.lastName}
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
            {item?.coin}
          </Text>
        </Layout>
      </Layout>
    </TouchableOpacity>
  );

  const doRefresh = () => {
    setRefresh(true);
    dispatch(publicAction.clear());
    dispatch(publicAction.getPublic(null, null, null, 1, 10, null));
  };

  const loadMore = () => {
    if (dataPublic && dataPublic.length < totalData) {
      dispatch(
        publicAction.getPublic(
          qsearch,
          qcurricullum,
          qgrade,
          qsubject,
          nextPage,
          limit,
          typeParam,
        ),
      );
    }
  };

  const dismissModal = () => {
    dispatch(berandaAction.clear());
  };

  const getAll = () => {
    dispatch(publicAction.clear());
    dispatch(publicAction.getPublic(null, null, null, 1, 10, null));
  };

  useEffect(() => {
    dispatch(berandaAction.getSliders());
    dispatch(publicAction.clear());
    dispatch(
      publicAction.getPublic(
        qsearch,
        qcurricullum,
        qgrade,
        qsubject,
        currentPage,
        limit,
        typeParam,
      ),
    );
  }, [
    dispatch,
    qsearch,
    qcurricullum,
    qgrade,
    qsubject,
    currentPage,
    limit,
    typeParam,
  ]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <ModalComponent
        visible={isErrorSlider}
        dismiss={() => dismissModal()}
        msg={alertMsg}
      />
      <Layout
        style={{
          flexDirection: 'row',
          height: width * 0.2,
          marginBottom: 5,
          backgroundColor: '#193c58',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back"
            fill="#FFFFFF"
            style={{
              width: width * 0.1,
              height: width * 0.1,
              marginVertical: width * 0.05,
            }}
          />
        </TouchableOpacity>
        <Input
          placeholder={'Mau les apa hari ini?'}
          value={`${qsearch} - ${qcurricullum} - ${qsubject} - ${qgrade}`}
          accessoryLeft={renderSearchIcon}
          size="large"
          style={{
            marginTop: width * 0.03,
            borderRadius: width * 0.1,
            marginLeft: width * 0.02,
            marginRight: width * 0.02,
            borderColor: '#e2e2e2',
            width: width * 0.65,
          }}
          textStyle={global.captionFont}
          onFocus={() => navigation.navigate('Filter', {typeParam: typeParam})}
        />
        <TouchableOpacity onPress={() => navigation.navigage('Cart')}>
          <View style={{flexDirection: 'column'}}>
            <Avatar
              size="large"
              style={{marginHorizontal: width * 0.02}}
              source={require('./../assets/keranjang.png')}
            />
            <Text
              style={[global.captionFont, {textAlign: 'center'}]}
              category="c1">
              Keranjang
            </Text>
          </View>
        </TouchableOpacity>
      </Layout>
      <TouchableOpacity
        onPress={() => getAll()}
        style={{marginLeft: width * 0.55, width: width * 0.4}}>
        <Text
          category="c1"
          style={[
            global.normalFont,
            {
              padding: 5,
              borderRadius: width * 0.2,
              backgroundColor: '#193c58',
              color: '#FFFFFF',
              textAlign: 'center',
            },
          ]}>
          Lihat Semua
        </Text>
      </TouchableOpacity>
      <Layout>
        <Text
          category="p1"
          style={[
            global.titleFont,
            {
              textAlign: 'left',
              paddingHorizontal: width * 0.02,
              paddingVertical: width * 0.04,
            },
          ]}>
          Kerja tugas sama Tutor
        </Text>
      </Layout>
      <FlatList
        data={dataPublic}
        renderItem={renderLes}
        numColumns={2}
        onEndReachedThreshold={0.2}
        onRefresh={doRefresh}
        onEndReached={loadMore}
        refreshing={false}
        ListFooterComponent={
          isLoadingPublic && (
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
          !isLoadingPublic && (
            <Layout>
              <Text
                category="c2"
                style={[global.captionFont, {textAlign: 'center'}]}>
                Belum ada tutor nih..
              </Text>
            </Layout>
          )
        }
      />
    </SafeAreaView>
  );
};

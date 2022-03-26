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
  yellow,
} from '../helpers/constant';
import {WebView} from 'react-native-webview';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const LesRoomScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {link} = route.params;
  const auth = useSelector(state => state.auth);
  const [agree, setAgree] = useState(false);
  const {data} = useSelector(state => state?.student);
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackIcon = props => (
    <Icon {...props} name="arrow-back" fill={agree ? '#000000' : '#FFFFFF'} />
  );
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <TopNavigation
        style={{backgroundColor: agree ? '#FFFFFF' : blue}}
        accessoryLeft={BackAction}
        title={evaprops => (
          <Text
            {...evaprops}
            category="p1"
            style={[global.normalFont, {color: agree ? '#000000' : '#FFFFFF'}]}>
            {agree ? 'Sebis Les' : 'Disclaimer'}
          </Text>
        )}
      />
      {agree ? (
        <WebView
          renderLoading={() => (
            <View
              style={{
                bottom: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Spinner fill={green} size="large" />
              <Text style={{color: 'black', fontSize: 20}}>Memuat data</Text>
            </View>
          )}
          startInLoadingState={true}
          source={{uri: link}}
          style={{marginTop: 20}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          userAgent="Mozilla/5.0 (Linux; Android 10; M2003J15SC) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.115 Mobile Safari/537.36"
        />
      ) : (
        <View style={{backgroundColor: '#FFFFFF'}}>
          <Layout
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10,
            }}>
            <View style={{flexDirection: 'column'}}>
              <Image
                source={require('./../assets/sebby-laptop.png')}
                resizeMode="cover"
                style={{
                  width: width * 0.5,
                  height: width * 0.5,
                  marginHorizontal: width * 0.2,
                }}
              />
              <Text style={{textAlign: 'justify', margin: 5}}>
                - Materi les online yang disampaikan sesuai dengan request dari
                Siswa. Konten les online tidak: mengganggu, bersifat asusila,
                mengancam, mencemarkan nama baik, atau melanggar hak privasi.
              </Text>
              <Text style={{textAlign: 'justify', margin: 5}}>
                - Pastikan video kamera tetap menyala selama les online, agar
                proses pembelajaran berjalan secara efektif dan optimal
              </Text>
              <Text style={{textAlign: 'justify', margin: 5}}>
                - Siswa diijinkan untuk merekam video pembelajaran sebagai
                dokumentasi pribadi.
              </Text>
              <Text style={{textAlign: 'justify', margin: 5}}>
                - Sebis Les akan memantau setiap sesi kelas dan merekam proses
                pembelajaran (secara random) untuk memastikan kualitas
                pembelajaran dan tidak terjadinya pelanggaran.
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: green,
                width: 100,
                height: 40,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
              }}
              onPress={() => setAgree(true)}>
              <Text style={{color: '#ffff'}}>Ok</Text>
            </TouchableOpacity>
          </Layout>
        </View>
      )}
    </SafeAreaView>
  );
};

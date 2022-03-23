import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
  Radio,
  Modal,
  Card,
  Spinner,
} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import authAction from './../redux/actions/auth';
const global = require('./../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const BackIcon = props => <Icon {...props} name="arrow-back" fill="#193c58" />;

export const EmailVerifyScreen = ({navigation}) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <TopNavigation accessoryLeft={BackAction} />

        <Layout>
          <Text
            category="h5"
            style={{
              textAlign: 'center',
            }}>
            Check Email Kamu
          </Text>
        </Layout>
        <Layout
          style={{
            borderBottomWidth: 2,
            borderBottomColor: '#de723f',
            width: width * 0.7,
            marginHorizontal: width * 0.155,
          }}
        />
        <Layout>
          <Image
            source={require('./../assets/email-verifikasi.png')}
            resizeMode="cover"
            style={{
              width: width * 0.5,
              height: width * 0.5,
              marginHorizontal: width * 0.25,
            }}
          />
        </Layout>
        <Layout>
          <Text
            category="p1"
            style={[global.normalFont, {padding: 10, textAlign: 'center'}]}>
            Link verifikasi telah dikirimkan ke email kamu. Yukk segera klik
            link-nya agar akunmu aktif dan bisa ikut les yang asyikk di Sebis
            Les
          </Text>
          <Button
            onPress={() => navigation.navigate('Login')}
            appearance="outline"
            size="large"
            status="basic"
            activeOpacity={0.2}
            style={global.defaultButton}>
            {evaprops => (
              <Text
                {...evaprops}
                style={[global.normalFont, {color: '#e2e2e2'}]}>
                Kembali Ke Login
              </Text>
            )}
          </Button>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

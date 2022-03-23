import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
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
  Spinner,
  Modal,
  Card,
} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import authAction from '../redux/actions/auth';
import auth from '@react-native-firebase/auth';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const BackIcon = props => <Icon {...props} name="arrow-back" fill="#193c58" />;

export const VerifyNumberScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const reftimer = useRef();
  const [verifyNumber, setVerifyNumber] = useState('');
  const [mins, setMins] = useState(2);
  const [sec, setSec] = useState(2);
  const [idTokens, setidTokens] = useState('');
  const [loggedIn, setloggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const navigateBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (route.params?.mobilePhone) {
      loginPhone(route.params?.mobilePhone);
    }
    // const timerId = setInterval(() => {
    //   if (sec <= 0) {
    //     if (mins <= 0) {
    //       alert('end');
    //     } else {
    //       setMins(m => m - 1);
    //       setSec(59);
    //     }
    //   } else {
    //     setSec(s => s - 1);
    //   }
    // }, 1000);
    // return () => clearInterval(timerId);
  }, [dispatch, route?.params]);

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const loginPhone = async mobile => {
    console.log('check mobile', mobile);
    const confirmationPhone = await auth().signInWithPhoneNumber(mobile);
    setConfirm(confirmationPhone);
  };

  const verify = async () => {
    setLoading(true);
    try {
      await confirm.confirm(verifyNumber);
      setLoading(false);
      navigation.navigate('RegisterNumber', route?.params);
    } catch (error) {
      setLoading(false);
      console.log('check error', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <ScrollView>
        <TopNavigation accessoryLeft={BackAction} />

        <Layout>
          <Text
            category="h5"
            style={{
              textAlign: 'center',
            }}>
            Masukkan kode verifikasi
          </Text>
        </Layout>
        <Layout
          style={{
            borderBottomWidth: 2,
            borderBottomColor: '#de723f',
            width: width * 0.5,
            marginHorizontal: width * 0.26,
          }}
        />
        <Layout>
          <Image
            source={require('./../assets/phone.png')}
            resizeMode="cover"
            style={{
              width: width * 0.5,
              height: width * 0.5,
              marginHorizontal: width * 0.25,
              marginVertical: width * 0.1,
            }}
          />
        </Layout>
        <Layout>
          <Layout
            style={{
              marginVertical: width * 0.08,
              marginHorizontal: width * 0.02,
            }}>
            <Text
              category="p1"
              style={[global.normalFont, {textAlign: 'center'}]}>
              Kode verifikasi telah dikirimkan melalui SMS
            </Text>
          </Layout>
          <Layout>
            <Layout>
              <Input
                placeholder="* * * * *"
                keyboardType="number-pad"
                style={[global.inputStyle, {marginHorizontal: width * 0.1}]}
                textStyle={[
                  global.titleFont,
                  {textAlign: 'center', fontSize: width * 0.1},
                ]}
                value={verifyNumber}
                maxLength={6}
                onChangeText={e => setVerifyNumber(e)}
              />
            </Layout>
          </Layout>
          {loading ? (
            <Layout
              style={{
                marginHorizontal: width * 0.45,
                marginVertical: width * 0.2,
              }}>
              <Spinner size="large" animating={true} />
            </Layout>
          ) : (
            <Button
              size="large"
              disabled={verifyNumber == ''}
              style={[
                verifyNumber == ''
                  ? global.defaultDisabledButton
                  : global.defaultButton,
                {marginTop: width * 0.15, borderRadius: width * 0.2},
              ]}
              onPress={() => verify()}
              activeOpacity={0.2}>
              {evaprops => (
                <Text
                  {...evaprops}
                  style={[global.normalFont, {color: '#FFFFFF'}]}>
                  Verifikasi
                </Text>
              )}
            </Button>
          )}
          {/* <Text
            category="p1"
            style={[
              global.normalFont,
              {textAlign: 'center', height: width * 0.5},
            ]}>
            Mohon menunggu {mins}:{sec < 10 && 0}
            {sec} menit untuk dikirim ulang
          </Text> */}
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

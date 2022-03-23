import React, {useState, useEffect} from 'react';
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

export const LoginWithNumberScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState('');
  const {isLoadingLoginPhone, isLoginPhone, isErrorLoginPhone, alertMsgErr} =
    useSelector(state => state.auth);
  const [idTokens, setidTokens] = useState('');
  const [loggedIn, setloggedIn] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const navigateBack = () => {
    navigation.goBack();
  };

  useEffect(() => {}, [dispatch, idTokens]);

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const loginPhone = async () => {
    // dispatch(authAction.login({identity: email, password: password}));
    // const confirmationPhone = await auth().signInWithPhoneNumber(
    //   '+62' + mobile,
    // );
    navigation.navigate('VerifyNumber', {
      mobilePhone: '+62' + mobile,
    });
  };

  const dismissModal = () => {
    dispatch(authAction.clear());
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Modal
        visible={isErrorLoginPhone}
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <Card
          style={{
            width: width,
            borderColor: '#459c8e',
            backgroundColor: '#e2e2e2',
          }}
          header={props => (
            <TouchableOpacity
              {...props}
              style={{
                marginLeft: width * 0.85,
                padding: 2,
              }}
              onPress={() => dismissModal()}>
              <Text
                category="h5"
                style={{
                  textAlign: 'center',
                  borderColor: '#2e2e2e',
                  borderWidth: 2,
                  borderRadius: width * 0.1,
                  width: width * 0.1,
                }}>
                x
              </Text>
            </TouchableOpacity>
          )}>
          <Layout style={{flexDirection: 'row', backgroundColor: '#e2e2e2'}}>
            <Image
              source={require('./../assets/gadjah.png')}
              resizeMode="center"
              style={{
                width: width * 0.5,
                height: width * 0.5,
              }}
            />
            <Text style={[global.normalFont, global.textModal]}>
              {alertMsgErr}
            </Text>
          </Layout>
        </Card>
      </Modal>
      <ScrollView>
        <TopNavigation accessoryLeft={BackAction} />

        <Layout>
          <Text
            category="h5"
            style={{
              textAlign: 'center',
            }}>
            Masuk
          </Text>
        </Layout>
        <Layout
          style={{
            borderBottomWidth: 2,
            borderBottomColor: '#de723f',
            width: width * 0.5,
            marginHorizontal: width * 0.24,
          }}
        />
        <Layout>
          <Layout
            style={{
              marginVertical: width * 0.08,
              marginHorizontal: width * 0.02,
            }}>
            <Text category="p1" style={global.normalFont}>
              Masukkan nomor handphone untuk masuk
            </Text>
          </Layout>
          <Layout style={{flexDirection: 'row'}}>
            <Layout
              style={{
                margin: width * 0.02,
                padding: width * 0.02,
                borderRadius: width * 0.02,
                backgroundColor: '#e2e2e2',
              }}>
              <Text>+62</Text>
            </Layout>
            <Layout>
              <Input
                placeholder="8200092020"
                keyboardType="number-pad"
                style={[
                  global.inputStyle,
                  {width: width * 0.75, marginBottom: width * 0.02},
                ]}
                textStyle={global.normalFont}
                value={mobile}
                onChangeText={e => setMobile(e)}
              />
            </Layout>
          </Layout>
          <Button
            size="large"
            activeOpacity={0.2}
            // disabled={isLoadingLoginPhone || isLoginPhone}
            disabled={mobile == ''}
            style={[
              global.defaultButton,
              {marginTop: width * 0.15, borderRadius: width * 0.2},
            ]}
            onPress={() => loginPhone()}>
            {isLoadingLoginPhone ? (
              <Spinner size="small" animating={true} />
            ) : (
              evaprops => (
                <Text
                  {...evaprops}
                  style={[global.normalFont, {color: '#FFFFFF'}]}>
                  Lanjutkan
                </Text>
              )
            )}
          </Button>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

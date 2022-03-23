import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
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
  Spinner,
  Modal,
  Card,
} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import authAction from '../redux/actions/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const ResetPasswordScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const {isErrorLupaPass, isLupaPass, isLoadingLupaPass, alertMsgErr} =
    useSelector(state => state.auth);
  const [secure, setSecure] = useState(true);
  const [secureconfirm, setSecureConfirm] = useState(true);
  const navigateBack = () => {
    navigation.goBack();
  };
  const BackIcon = props => (
    <Icon {...props} name="arrow-back" fill="#FFFFFF" />
  );
  const LockIcon = props => <Icon {...props} name="lock" fill="#193c58" />;
  const LockIconConfirm = props => (
    <Icon {...props} name="lock" fill="#193c58" />
  );
  const EyeIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecurity}>
      <Icon {...props} name={secure ? 'eye-off' : 'eye'} fill="#193c58" />
    </TouchableWithoutFeedback>
  );
  const EyeIconConfirm = props => (
    <TouchableWithoutFeedback onPress={toggleSecurityConfirm}>
      <Icon
        {...props}
        name={secureconfirm ? 'eye-off' : 'eye'}
        fill="#193c58"
      />
    </TouchableWithoutFeedback>
  );
  const toggleSecurity = () => {
    setSecure(!secure);
  };
  const toggleSecurityConfirm = () => {
    setSecureConfirm(!secureconfirm);
  };

  useEffect(() => {
    if (isLupaPass) {
      navigation.navigate('Home');
    }
  }, [dispatch, isLupaPass]);

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const sendEmail = () => {
    // dispatch(authAction.lupaPass({password: password}));
  };

  const dismissModal = () => {
    dispatch(authAction.clear());
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <Modal
        visible={isErrorLupaPass}
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
        <TopNavigation
          accessoryLeft={BackAction}
          style={{backgroundColor: '#193c58'}}
        />
        <Layout>
          <Image
            source={require('./../assets/forgot-form.jpg')}
            resizeMode="cover"
            style={{
              width: width,
              height: width,
            }}
          />
        </Layout>
        <Layout>
          <Text
            category="p1"
            style={[
              global.titleFont,
              global.defaultTextColor,
              {
                marginTop: width * 0.08,
                marginHorizontal: width * 0.02,
              },
            ]}>
            Masukkan Password Baru
          </Text>
        </Layout>
        <Input
          placeholder="Kata Sandi"
          secureTextEntry={secure}
          accessoryLeft={LockIcon}
          accessoryRight={EyeIcon}
          style={global.inputStyle}
          textStyle={global.captionFont}
          value={password}
          onChangeText={e => setPassword(e)}
        />
        <Layout>
          <Text
            category="p1"
            style={[
              global.titleFont,
              global.defaultTextColor,
              {
                marginTop: width * 0.08,
                marginHorizontal: width * 0.02,
              },
            ]}>
            Konfirmasi Password
          </Text>
        </Layout>
        <Input
          placeholder="Konfirmasi Kata Sandi"
          secureTextEntry={secureconfirm}
          accessoryLeft={LockIconConfirm}
          accessoryRight={EyeIconConfirm}
          style={global.inputStyle}
          textStyle={global.captionFont}
          value={confirmpassword}
          onChangeText={e => setConfirmPassword(e)}
        />
        <Layout>
          {isLoadingLupaPass ? (
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
              disabled={password == '' || password != confirmpassword}
              style={global.defaultButton}
              activeOpacity={0.2}
              onPress={() => sendEmail()}>
              {evaprops => (
                <Text
                  {...evaprops}
                  style={[global.normalFont, {color: '#FFFFFF'}]}>
                  Ganti Password
                </Text>
              )}
            </Button>
          )}
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

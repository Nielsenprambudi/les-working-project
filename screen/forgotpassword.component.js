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

export const ForgotPasswordScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const {isErrorLupaPass, isLupaPass, isLoadingLupaPass, alertMsgErr} =
    useSelector(state => state.auth);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const navigateBack = () => {
    navigation.goBack();
  };
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const BackIcon = props => (
    <Icon {...props} name="arrow-back" fill="#FFFFFF" />
  );
  const EmailIcon = props => <Icon {...props} name="email" fill="#193c58" />;
  const CheckIcon = props => (
    <Icon
      {...props}
      name="checkmark"
      fill={invalidEmail ? '#e2e2e2' : '#193c58'}
    />
  );

  useEffect(() => {
    if (isLupaPass) {
      navigation.navigate('ResetPassword');
    }
  }, [dispatch, isLupaPass]);

  const checkEmail = e => {
    setEmail(e);
    if (regex.test(e) == false) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
    }
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const sendEmail = () => {
    dispatch(authAction.lupaPass({email: email}));
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
            Masukkan email anda
          </Text>
        </Layout>
        <Layout>
          <Input
            placeholder="Email"
            keyboardType="email-address"
            accessoryLeft={EmailIcon}
            accessoryRight={CheckIcon}
            style={[global.inputStyle]}
            textStyle={global.captionFont}
            value={email}
            onChangeText={e => checkEmail(e)}
          />
          {invalidEmail && (
            <Text
              category="p2"
              style={{color: 'red', marginHorizontal: width * 0.02}}>
              Email tidak valid
            </Text>
          )}
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
              disabled={email == '' || invalidEmail}
              style={global.defaultButton}
              activeOpacity={0.2}
              onPress={() => sendEmail()}>
              {evaprops => (
                <Text
                  {...evaprops}
                  style={[global.normalFont, {color: '#FFFFFF'}]}>
                  Kirimkan link verifikasi ke email
                </Text>
              )}
            </Button>
          )}
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

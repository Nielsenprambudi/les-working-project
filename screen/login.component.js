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
import authAction from './../redux/actions/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
const global = require('./../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    isLoadingLogin,
    isLogin,
    isErrorLogin,
    alertMsgErr,
    isLoadingLoginGoogle,
    isLoginGoogle,
    isErrorLoginGoogle,
  } = useSelector(state => state.auth);
  const [idTokens, setidTokens] = useState('');
  const [loggedIn, setloggedIn] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [secure, setSecure] = useState(true);
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
  const LockIcon = props => <Icon {...props} name="lock" fill="#193c58" />;

  const toggleSecurity = () => {
    setSecure(!secure);
  };

  const EyeIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecurity}>
      <Icon {...props} name={secure ? 'eye-off' : 'eye'} fill="#193c58" />
    </TouchableWithoutFeedback>
  );

  const onAuth = user => {
    if (user) {
      setloggedIn(true);
    } else {
      setloggedIn(false);
    }
  };

  useEffect(() => {
    dispatch(authAction.clear());
    GoogleSignin.configure({
      webClientId:
        '1017733613480-ihrvvo2foon7u1uenc03g30q7or73dbs.apps.googleusercontent.com',
    });
    clearLoginGoogle();
    const subscriber = auth().onAuthStateChanged(onAuth);
    return subscriber;
  }, [dispatch, idTokens]);

  const clearLoginGoogle = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.log('error clear login', error);
    }
  };

  const checkEmail = e => {
    setEmail(e);
    if (regex.test(e) == false) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
    }
  };

  const onLoginGoogle = async () => {
    //  dispatch(authAction.login({idToken:'abcde'}));
    try {
      const userInfo = await GoogleSignin.signIn();
      setidTokens(userInfo.idToken);
      dispatch(authAction.loginGoogle({idToken: userInfo.idToken}));
    } catch (error) {
      console.log('error', error);
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  const onClearGoogleLogin = async () => {
    try {
      dispatch(authAction.clear());
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.log('error', error);
    }
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const login = () => {
    dispatch(authAction.login({identity: email, password: password}));
  };

  const dismissModal = () => {
    dispatch(authAction.clear());
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Modal
        visible={isErrorLogin || isErrorLoginGoogle}
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
            source={require('./../assets/login-back.png')}
            resizeMode="cover"
            style={{
              width: width,
              height: width * 0.8,
            }}
          />
        </Layout>
        <Layout>
          <Input
            placeholder="Email"
            keyboardType="email-address"
            accessoryLeft={EmailIcon}
            accessoryRight={CheckIcon}
            style={global.inputStyle}
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
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={{marginVertical: width * 0.02}}>
            <Text
              category="p2"
              style={[
                global.titleFont,
                {
                  textAlign: 'right',
                  fontWeight: 'bold',
                  paddingRight: width * 0.02,
                },
              ]}>
              Lupa Kata Sandi ?
            </Text>
          </TouchableOpacity>
          {isLoadingLogin ? (
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
              disabled={email == '' || password == '' || invalidEmail}
              style={global.defaultButton}
              activeOpacity={0.2}
              onPress={() => login()}>
              {isLoadingLogin ? (
                <Spinner size="small" animating={true} />
              ) : (
                evaprops => (
                  <Text
                    {...evaprops}
                    style={[global.normalFont, {color: '#FFFFFF'}]}>
                    Masuk
                  </Text>
                )
              )}
            </Button>
          )}

          <Divider style={{marginVertical: 5}} />
          <TouchableOpacity
            style={{
              margin: 0,
              marginHorizontal: width * 0.15,
            }}
            onPress={() => onLoginGoogle()}>
            <Layout style={{flexDirection: 'row'}}>
              <Image
                source={require('./../assets/btn_google_light_pressed_xxxhdpi.png')}
                style={{width: 50, height: 50}}
              />
              <Text
                style={[
                  global.normalFont,
                  {padding: 10, color: '#193c58', textAlign: 'center'},
                ]}>
                Masuk dengan google
              </Text>
            </Layout>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginNumber')}
            style={{
              margin: 0,
              marginHorizontal: width * 0.15,
            }}>
            <Layout style={{flexDirection: 'row'}}>
              <Image
                source={require('./../assets/handphone-biru.png')}
                style={{width: 45, height: 45}}
              />
              <Text
                style={[
                  global.normalFont,
                  {padding: 10, color: '#193c58', textAlign: 'center'},
                ]}>
                Masuk dengan No.HP
              </Text>
            </Layout>
          </TouchableOpacity>
          <Button
            onPress={() => navigation.navigate('Register')}
            appearance="outline"
            size="large"
            status="basic"
            activeOpacity={0.2}
            style={global.defaultButton}>
            {evaprops => (
              <Text
                {...evaprops}
                style={[global.normalFont, {color: '#e2e2e2'}]}>
                Daftar
              </Text>
            )}
          </Button>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

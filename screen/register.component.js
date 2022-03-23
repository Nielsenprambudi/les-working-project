import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {
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

export const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLoadingRegister, isRegister, isErrorRegister, alertMsgErr} =
    useSelector(state => state.auth);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [secure, setSecure] = useState(true);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const navigateBack = () => {
    navigation.goBack();
  };
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const BackIcon = props => (
    <Icon {...props} name="arrow-back" fill="#FFFFFF" />
  );
  const UserIcon = props => <Icon {...props} name="person" fill="#e2e2e2" />;
  const EmailIcon = props => <Icon {...props} name="email" fill="#e2e2e2" />;
  const CheckIcon = props => (
    <Icon
      {...props}
      name="checkmark"
      fill={invalidEmail ? '#e2e2e2' : '#193c58'}
    />
  );
  const LockIcon = props => <Icon {...props} name="lock" fill="#e2e2e2" />;
  const smartphoneIcon = props => (
    <Icon {...props} name="smartphone" fill="#e2e2e2" />
  );

  const goToVerify = () => {
    navigation.navigate('Verify');
  };

  const toggleSecurity = () => {
    setSecure(!secure);
  };

  const EyeIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecurity}>
      <Icon {...props} name={secure ? 'eye-off' : 'eye'} fill="#2e2e2e" />
    </TouchableWithoutFeedback>
  );

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const register = () => {
    dispatch(
      authAction.register({
        firstName: firstname,
        lastName: lastname,
        email: email,
        phoneNumber: mobile,
        gender: gender,
        password: password,
        roleId: 'a0a76676-e446-49d2-ab7a-ae622783d7b8',
      }),
    );
  };

  const dismissModal = () => {
    dispatch(authAction.clearRegister());
    if (isRegister) {
      goToVerify();
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

  return (
    <SafeAreaView style={{flex: 1}}>
      <Modal
        visible={isErrorRegister}
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
            source={require('./../assets/register-form.png')}
            resizeMode="cover"
            style={{
              width: width,
              height: width * 0.8,
            }}
          />
        </Layout>
        <Layout>
          <Input
            placeholder="Nama Depan"
            accessoryLeft={UserIcon}
            style={global.inputStyle}
            textStyle={global.normalFont}
            value={firstname}
            onChangeText={e => setFirstname(e)}
          />
          <Input
            placeholder="Nama Belakang"
            accessoryLeft={UserIcon}
            style={global.inputStyle}
            textStyle={global.normalFont}
            value={lastname}
            onChangeText={e => setLastname(e)}
          />
          <Input
            placeholder="No. HP"
            keyboardType="number-pad"
            accessoryLeft={smartphoneIcon}
            style={global.inputStyle}
            textStyle={global.normalFont}
            value={mobile}
            onChangeText={e => setMobile(e)}
          />
          <Input
            placeholder="Email"
            accessoryLeft={EmailIcon}
            accessoryRight={CheckIcon}
            style={global.inputStyle}
            textStyle={global.normalFont}
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
            accessoryLeft={LockIcon}
            accessoryRight={EyeIcon}
            style={global.inputStyle}
            textStyle={global.normalFont}
            secureTextEntry={secure}
            value={password}
            onChangeText={e => setPassword(e)}
          />
          <Layout
            style={[
              global.normalFont,
              {
                flexDirection: 'row',
                marginVertical: width * 0.02,
                marginHorizontal: width * 0.2,
              },
            ]}>
            <Radio
              checked={gender === 'male' ? true : false}
              onChange={e => e === true && setGender('male')}
              style={{float: 'left'}}>
              {evaprops => (
                <Text
                  {...evaprops}
                  style={[
                    global.normalFont,
                    {paddingHorizontal: width * 0.02},
                  ]}>
                  Pria
                </Text>
              )}
            </Radio>
            <Radio
              checked={gender === 'female' ? true : false}
              onChange={e => e === true && setGender('female')}
              style={{marginHorizontal: width * 0.2}}>
              {evaprops => (
                <Text
                  {...evaprops}
                  style={[
                    global.normalFont,
                    {paddingHorizontal: width * 0.02},
                  ]}>
                  Wanita
                </Text>
              )}
            </Radio>
          </Layout>
          <Text
            category="c1"
            appearance="hint"
            style={[
              global.normalFont,
              {
                textAlign: 'center',
                padding: width * 0.05,
              },
            ]}>
            Dengan mendaftar, maka saya sudah menyetujui{' '}
            <Text category="c1" style={global.defaultTextColor}>
              Syarat Ketentuan
            </Text>{' '}
            dan{' '}
            <Text category="c1" style={global.defaultTextColor}>
              Kebijakan Privasi
            </Text>
          </Text>
          {isLoadingRegister ? (
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
              style={global.defaultButton}
              activeOpacity={0.2}
              onPress={() => register()}
              // onPress={() => navigation.navigate('Verify')}
              disabled={isLoadingRegister || isRegister}>
              {evaprops => (
                <Text
                  {...evaprops}
                  style={(global.normalFont, {color: '#FFFFFF'})}>
                  Daftar
                </Text>
              )}
            </Button>
          )}
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

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
import authAction from '../redux/actions/auth';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const BackIcon = props => <Icon {...props} name="arrow-back" fill="#193c58" />;
const UserIcon = props => <Icon {...props} name="person" fill="#e2e2e2" />;
const EmailIcon = props => <Icon {...props} name="email" fill="#e2e2e2" />;
const CheckIcon = props => <Icon {...props} name="checkmark" fill="#e2e2e2" />;

export const RegisterNumberScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {
    isLoadingRegisterNumber,
    isRegisterNumber,
    isErrorRegisterNumber,
    alertMsgErr,
  } = useSelector(state => state.auth);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const navigateBack = () => {
    navigation.goBack();
  };
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  // useEffect(() => {
  //   if (isRegisterNumber) {
  //     navigation.navigate('Home');
  //   }
  // }, [dispatch, isRegisterNumber]);

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const checkEmail = e => {
    setEmail(e);
    if (regex.test(e) == false) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
    }
  };

  const register = () => {
    dispatch(
      authAction.registerPhoneNumber({
        firstName: firstname,
        lastName: lastname,
        email: email,
        phoneNumber: route?.params.mobilePhone,
        roleId: 'a0a76676-e446-49d2-ab7a-ae622783d7b8',
      }),
    );
  };

  const dismissModal = () => {
    dispatch(authAction.clearRegister());
    if (isRegisterNumber) {
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Modal
        visible={isErrorRegisterNumber || isRegisterNumber}
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
              {isErrorRegisterNumber
                ? alertMsgErr
                : 'Nomor handphonemu telah terdaftar'}
            </Text>
          </Layout>
        </Card>
      </Modal>
      <Layout>
        <TopNavigation accessoryLeft={BackAction} />
        <Layout style={{height: height}}>
          <Text
            category="h6"
            style={[
              global.defaultTextColor,
              global.titleFont,
              {textAlign: 'center'},
            ]}>
            Yuk lengkapi datamu
          </Text>

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

          {isLoadingRegisterNumber ? (
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
              style={[
                email != '' &&
                firstname != '' &&
                lastname != '' &&
                !invalidEmail
                  ? global.defaultButton
                  : global.defaultDisabledButton,
                {marginTop: width * 0.18},
                ,
              ]}
              activeOpacity={0.2}
              onPress={() => register()}
              // onPress={() => navigation.navigate('Verify')}
              disabled={
                isRegisterNumber ||
                email == '' ||
                firstname == '' ||
                lastname == '' ||
                invalidEmail
              }>
              {evaprops => (
                <Text
                  {...evaprops}
                  style={(global.normalFont, {color: '#FFFFFF'})}>
                  Lanjutkan
                </Text>
              )}
            </Button>
          )}
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
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

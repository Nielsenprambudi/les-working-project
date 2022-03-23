import React, {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  SafeAreaView,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
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
  Datepicker,
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
} from '../helpers/constant';
import studentAction from '../redux/actions/student';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ModalComponent} from '../component/modal.component';
import axios from 'axios';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const EditUserProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const auth = useSelector(state => state.auth);
  console.log('check auth', auth);
  const {
    data,
    dataDetail,
    isLoading,
    isError,
    isEdit,
    isLoadingDetail,
    isErrorDetail,
    isEditDetail,
    isEditImageDetail,
    isErrorEditDetail,
    isLoadingEditDetail,
    isAddDetail,
    isErrorAddDetail,
    isLoadingAddDetail,
    isLoadingEditImageDetail,
    isErrorEditImageDetail,
    alertMsgError,
    alertMsgSuccess,
  } = useSelector(state => state?.student);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthplace, setBirthplace] = useState('');
  const [birthdate, setBirthdate] = useState(null);
  const [birthdateFormat, setBirthdateFormat] = useState(null);
  const [religion, setReligion] = useState('');
  const [idCardType, setIdCardType] = useState('');
  const [idCardNumber, setIdCardNumber] = useState('');
  const [mailingAddress, setMailingAddress] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [aboutme, setAboutme] = useState('');
  const [password, setPassword] = useState('');
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackIcon = props => <Icon {...props} name="arrow-back" />;
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const RightAction = () => (
    <TopNavigationAction
      icon={evaprops => (
        <TouchableOpacity
          {...evaprops}
          onPress={changeProfile}
          style={global.defaultButton}>
          <Text
            category="c1"
            style={[
              global.captionFont,
              {color: '#ffffff', padding: width * 0.02},
            ]}>
            Simpan
          </Text>
        </TouchableOpacity>
      )}
    />
  );

  const changeProfile = () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    };
    dispatch(studentAction.updateStudent(data));
  };
  const changeProfileDetail = () => {
    console.log('check', dataDetail);
    const data = {
      birthPlace: birthplace,
      birthDate: birthdate,
      religion: religion,
      idCardType: idCardType,
      idCardNumber: idCardNumber,
      mailingAddress: mailingAddress,
      city: city,
      region: region,
      postalCode: postalCode,
      country: 'Indonesia',
      aboutMe: aboutme,
    };
    if (dataDetail) {
      dispatch(studentAction.updateStudentDetail(data));
    } else {
      dispatch(studentAction.addStudentDetail(data));
    }
  };

  const getImage = async () => {
    refRBSheet.current.close();
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 200,
      maxWidth: 200,
      quality: 1,
    });
    const source = {
      uri: result.assets[0].uri,
      name: 'profile.jpg',
      type: result.assets[0].type,
    };
    const formData = new FormData();
    formData.append('fileProfile', source);
    await dispatch(studentAction.uploadStudent(formData));
  };

  const getImageCamera = async () => {
    refRBSheet.current.close();
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
      quality: 1,
      maxHeight: 500,
      maxWidth: 500,
    });
    const source = {
      uri: result.assets[0].uri,
      name: result.assets[0].fileName,
      type: result.assets[0].type,
    };
    const formData = new FormData();
    formData.append('fileProfile', source);
    dispatch(studentAction.uploadStudent(formData));

    // dispatch(studentAction.getStudent());
  };

  const dismissModal = () => {
    dispatch(studentAction.clearEditImage());
    dispatch(studentAction.clearEdit());
  };
  const dismissToast = () => {
    dispatch(studentAction.clearEdit());
    dispatch(studentAction.clearEditImage());
    dispatch(studentAction.getStudentDetail());
  };

  const formatingDate = x => {
    var datex = new Date(x),
      month = '' + (datex.getMonth() + 1),
      day = '' + datex.getDate(),
      year = datex.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    setBirthdate([year, month, day].join('-'));
  };

  useEffect(() => {
    dispatch(studentAction.getSchools('', ''));
    if (data) {
      setFirstName(data?.firstName);
      setLastName(data?.lastName);
      setEmail(data?.email);
      setPhoneNumber(data?.phoneNumber);
    }
    if (dataDetail) {
      setAboutme(dataDetail?.aboutMe);
      setBirthplace(dataDetail?.birthPlace);
      setBirthdate(dataDetail?.birthDate && new Date(dataDetail?.birthDate));
      setCity(dataDetail?.city);
      setIdCardNumber(dataDetail?.idCardNumber);
      setIdCardType(dataDetail?.idCardType);
      setMailingAddress(dataDetail?.mailingAddress);
      setPostalCode(dataDetail?.postalCode.toString());
      setRegion(dataDetail?.region);
      setReligion(dataDetail?.religion);
    }
  }, [dispatch, data, dataDetail]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <ModalComponent
        visible={isErrorEditImageDetail || isError || isErrorEditDetail}
        dismiss={() => dismissModal()}
        msg={alertMsgError}
      />
      <ModalComponent
        visible={isEditDetail || isAddDetail || isEditImageDetail}
        dismiss={() => dismissToast()}
        msg={alertMsgSuccess}
      />
      <TopNavigation
        accessoryLeft={BackAction}
        title={evaprops => (
          <Text {...evaprops} category="p1" style={global.normalFont}>
            Ubah Profil
          </Text>
        )}
        // accessoryRight={RightAction}
      />
      <ScrollView>
        <Text
          category="p1"
          style={[global.normalFont, global.marginHorizontalDefault]}>
          Foto Profile
        </Text>
        <Layout
          style={{
            flexDirection: 'row',
            marginHorizontal: width * 0.02,
            marginVertical: width * 0.02,
          }}>
          {isLoadingEditImageDetail ? (
            <Layout
              style={[
                global.marginHorizontalDefault,
                {marginVertical: width * 0.02},
              ]}>
              <Spinner size="large" fill={blue} />
            </Layout>
          ) : (
            <TouchableOpacity
              onPress={() => refRBSheet.current.open()}
              style={{flexDirection: 'column'}}>
              {data?.profile ? (
                <Avatar
                  size="giant"
                  shape="square"
                  style={{
                    width: width * 0.32,
                    height: width * 0.32,
                  }}
                  source={{uri: publicUrl.API_URL + data?.profile}}
                />
              ) : (
                <Image
                  source={require('./../assets/login.png')}
                  width={width * 0.2}
                  height={width * 0.2}
                  resizeMode="cover"
                />
              )}
              <Text
                category="c2"
                style={[global.captionFont, {fontSize: width * 0.03}]}>
                Tambah Gambar
              </Text>
            </TouchableOpacity>
          )}
          <Layout
            style={{
              paddingBottom: width * 0.02,
              paddingHorizontal: width * 0.02,
            }}>
            <Text
              category="c2"
              style={[
                global.captionFont,
                {paddingTop: width * 0.05, width: width * 0.6},
              ]}>
              Tampilkan foto terbaikmu! Semua orang bakal bisa lihat!
            </Text>
          </Layout>
        </Layout>
        <Layout style={{paddingVertical: width * 0.05}}>
          <Input
            placeholder="Nama Depan"
            label={evaprops => (
              <Text {...evaprops} category="c2" style={global.captionFont}>
                Nama Depan *
              </Text>
            )}
            style={global.inputStyle}
            textStyle={global.normalFont}
            value={firstName}
            onChangeText={e => setFirstName(e)}
          />
          <Input
            placeholder="Nama Belakang"
            label={evaprops => (
              <Text {...evaprops} category="c2" style={global.captionFont}>
                Nama Belakang *
              </Text>
            )}
            style={global.inputStyle}
            textStyle={global.normalFont}
            value={lastName}
            onChangeText={e => setLastName(e)}
          />
          <Input
            placeholder="Email"
            label={evaprops => (
              <Text {...evaprops} category="c2" style={global.captionFont}>
                Email *
              </Text>
            )}
            keyboardType="email-address"
            disabled
            style={global.inputStyle}
            textStyle={global.captionFont}
            value={email}
          />
        </Layout>
        <Input
          placeholder="No. HP"
          label={evaprops => (
            <Text {...evaprops} category="c2" style={global.captionFont}>
              No. HP *
            </Text>
          )}
          disabled
          keyboardType="number-pad"
          style={global.inputStyle}
          textStyle={global.normalFont}
          value={phoneNumber}
        />

        <TouchableOpacity onPress={changeProfile} style={global.defaultButton}>
          <Text
            category="p1"
            style={[
              global.captionFont,
              {color: '#ffffff', padding: width * 0.05, textAlign: 'center'},
            ]}>
            Ubah Data Utama
          </Text>
        </TouchableOpacity>
        <Input
          placeholder="Masukkan Tempat Lahir"
          label={evaprops => (
            <Text {...evaprops} category="c2" style={global.captionFont}>
              Tempat Lahir
            </Text>
          )}
          style={global.inputStyle}
          textStyle={global.normalFont}
          onChangeText={e => setBirthplace(e)}
          value={birthplace}
        />
        <Datepicker
          placeholder="Masukkan Tanggal Lahir"
          label={evaprops => (
            <Text {...evaprops} category="c2" style={global.captionFont}>
              Tanggal Lahir
            </Text>
          )}
          style={[global.inputStyle]}
          textStyle={global.normalFont}
          date={birthdateFormat}
          onSelect={e => {
            setBirthdateFormat(e);
            formatingDate(e);
          }}
        />
        <Input
          placeholder="Masukkan Agama"
          label={evaprops => (
            <Text {...evaprops} category="c2" style={global.captionFont}>
              Agama
            </Text>
          )}
          style={global.inputStyle}
          textStyle={global.normalFont}
          onChangeText={e => setReligion(e)}
          value={religion}
        />
        <Input
          placeholder="Masukkan Tipe Kartu ID"
          label={evaprops => (
            <Text {...evaprops} category="c2" style={global.captionFont}>
              Tipe Kartu Id
            </Text>
          )}
          style={global.inputStyle}
          textStyle={global.normalFont}
          onChangeText={e => setIdCardType(e)}
          value={idCardType}
        />
        <Input
          placeholder="Masukkan Nomor Kartu Id"
          label={evaprops => (
            <Text {...evaprops} category="c2" style={global.captionFont}>
              Nomor Kartu Id
            </Text>
          )}
          style={global.inputStyle}
          textStyle={global.normalFont}
          onChangeText={e => setIdCardNumber(e)}
          value={idCardNumber}
        />
        <Input
          placeholder="Masukkan Alamat Tinggal"
          label={evaprops => (
            <Text {...evaprops} category="c2" style={global.captionFont}>
              Alamat Tinggal
            </Text>
          )}
          style={global.inputStyle}
          textStyle={global.normalFont}
          onChangeText={e => setMailingAddress(e)}
          value={mailingAddress}
        />
        <Input
          placeholder="Kota Tinggal"
          label={evaprops => (
            <Text {...evaprops} category="c2" style={global.captionFont}>
              Kota Tinggal
            </Text>
          )}
          style={global.inputStyle}
          textStyle={global.normalFont}
          onChangeText={e => setCity(e)}
          value={city}
        />
        <Input
          placeholder="Masukkan Kecamatan"
          label={evaprops => (
            <Text {...evaprops} category="c2" style={global.captionFont}>
              Kecamatan
            </Text>
          )}
          style={global.inputStyle}
          textStyle={global.normalFont}
          onChangeText={e => setRegion(e)}
          value={region}
        />
        <Input
          placeholder="Masukkan Kode Pos"
          label={evaprops => (
            <Text {...evaprops} category="c2" style={global.captionFont}>
              Kode Pos
            </Text>
          )}
          style={global.inputStyle}
          textStyle={global.normalFont}
          onChangeText={e => setPostalCode(e)}
          value={postalCode}
        />
        <Input
          placeholder="Sekolah"
          label={evaprops => (
            <Text {...evaprops} category="c2" style={global.captionFont}>
              Sekolah
            </Text>
          )}
          style={global.inputStyle}
          textStyle={global.normalFont}
          onChangeText={e => setSchool(e)}
          value={school}
        />
        <Input
          placeholder="Kelas"
          label={evaprops => (
            <Text {...evaprops} category="c2" style={global.captionFont}>
              Kelas
            </Text>
          )}
          style={global.inputStyle}
          textStyle={global.normalFont}
          onChangeText={e => setGrade(e)}
          value={grade}
        />
        <Input
          placeholder="Ceritakan dirimu"
          label={evaprops => (
            <Text {...evaprops} category="c2" style={global.captionFont}>
              Tentang Saya
            </Text>
          )}
          multiline={true}
          numberOfLines={3}
          style={global.inputStyle}
          textStyle={global.normalFont}
          onChangeText={e => setAboutme(e)}
          value={aboutme}
        />
        {isLoadingDetail || isLoadingEditDetail ? (
          <Layout
            style={{
              marginVertical: width * 0.25,
              marginHorizontal: width * 0.02,
            }}>
            <Spinner size="giant" />
          </Layout>
        ) : (
          <TouchableOpacity
            onPress={() => changeProfileDetail()}
            style={global.defaultButton}>
            <Text
              category="p1"
              style={[
                global.captionFont,
                {color: '#ffffff', padding: width * 0.05, textAlign: 'center'},
              ]}>
              Ubah Data Tambahan
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        height={width * 0.5}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
            borderTopEndRadius: width * 0.2,
            borderTopStartRadius: width * 0.2,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View
          style={[
            global.marginHorizontalDefault,
            {
              flexDirection: 'column',
            },
          ]}>
          <Text category="h6" style={[global.titleFont, {fontWeight: 'bold'}]}>
            Ganti Foto Profil
          </Text>
          <TouchableOpacity
            style={{paddingVertical: width * 0.05, flexDirection: 'row'}}
            onPress={() => getImage()}>
            <Icon
              name="image"
              fill="#000000"
              style={{width: width * 0.08, height: width * 0.08}}
            />
            <Text
              category="p1"
              style={(global.normalFont, global.marginHorizontalDefault)}>
              Pilih dari galeri
            </Text>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity
            style={{paddingVertical: width * 0.05, flexDirection: 'row'}}
            onPress={() => getImageCamera()}>
            <Icon
              name="camera"
              fill="#000000"
              style={{width: width * 0.08, height: width * 0.08}}
            />
            <Text
              category="p1"
              style={[global.normalFont, global.marginHorizontalDefault]}>
              Ambil dari kamera
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

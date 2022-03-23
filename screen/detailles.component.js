import React, {useEffect, useState, Fragment} from 'react';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useSelector, useDispatch} from 'react-redux';
import {
  SafeAreaView,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
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
} from '@ui-kitten/components';
import {ModalComponent} from '../component/modal.component';
import {DaysNavigator} from '../component/days.component';
import {SubjectsNavigator} from '../component/subjects.component';
import Carousel from 'react-native-snap-carousel';
import berandaAction from '../redux/actions/beranda';
import publicAction from '../redux/actions/public';
import cartAction from '../redux/actions/cart';
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
  greydark,
} from '../helpers/constant';
import DocumentPicker, {
  DocumentPickerOptions,
  DirectoryPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import Contacts from 'react-native-contacts';
import {ContactListComponent} from '../component/contactlist.component';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const DetailLesScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {subid, sub, lesType, cartId, teacher} = route.params;
  const auth = useSelector(state => state.auth);
  const [month, setMonth] = useState(0);
  const [monthName, setMonthName] = useState(0);
  const [selectedSub, setSelectedSub] = useState(JSON.parse(sub));
  const [allowRead, setAllowRead] = useState(false);
  const [granted, setGranted] = useState(false);
  const [grantedMsg, setGrantedMsg] = useState('');
  const [fileName, setFileName] = useState('Kamu bisa menambahkan foto/file');
  const [pickFile, setPickFile] = useState(null);
  const [modalContact, setModalContact] = useState(false);
  const [contactList, setContactList] = useState([]);
  const [whichContact, setWhichContact] = useState('');
  const [emailFriend1, setEmailFriend1] = useState('');
  const [phoneFriend1, setPhoneFriend1] = useState('');
  const [emailFriend2, setEmailFriend2] = useState('');
  const [phoneFriend2, setPhoneFriend2] = useState('');
  const [requestMateri, setRequestMateri] = useState('');
  const {detailTutor, detailLes} = useSelector(state => state?.publicBeranda);
  const {
    isErrorCartAdd,
    isLoadingCartAdd,
    isCartAdd,
    isErrorRequestMaterial,
    isRequestMaterial,
    isLoadingRequestMaterial,
    alertMsgError,
    alertMsgSuccess,
  } = useSelector(state => state?.cart);
  const navigateBack = () => {
    navigation.goBack();
  };
  const [cardSubjectId, setCardSubjectId] = useState('');
  const [subjects, setSubjects] = useState([]);

  const BackIcon = props => <Icon {...props} name="arrow-back" />;
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const patchRequestMateri = e => {
    setRequestMateri(e);
  };

  const addCart = () => {
    const source = {
      uri: pickFile.uri,
      name: pickFile.name,
      type: pickFile.type,
    };
    const formData = new FormData();
    formData.append('requestMaterial', requestMateri);
    formData.append('fileMaterial', source);
    if (lesType === 'group') {
      if (emailFriend1 !== '') {
        formData.append('email1', emailFriend1);
      }
      if (emailFriend2 !== '') {
        formData.append('email2', emailFriend2);
      }
      if (phoneFriend1 !== '') {
        formData.append('phone1', phoneFriend1);
      }
      if (phoneFriend2 !== '') {
        formData.append('phone2', phoneFriend2);
      }
    }
    dispatch(cartAction.requestMaterial(formData, selectedSub?.cartItemId));
  };

  const dismissModal = () => {
    if (isRequestMaterial) {
      navigation.goBack();
      dispatch(cartAction.clear());
      dispatch(cartAction.getCart(1, 10));
    }
    dispatch(cartAction.clearRequest());
  };

  const RightAction = () => (
    <Fragment>
      <TopNavigationAction
        icon={evaprops => (
          <Layout
            {...evaprops}
            style={{
              flexDirection: 'column',
              margin: width * 0.02,
            }}>
            <Image
              source={require('./../assets/chat.png')}
              style={{
                width: width * 0.1,
                height: width * 0.1,
                marginLeft: width * 0.07,
              }}
              resizeMode="cover"
            />
            <Text
              category="c1"
              style={[global.captionFont, {textAlign: 'center'}]}>
              Chat Tutor
            </Text>
          </Layout>
        )}
        onPress={() => console.log('chat tutor')}
      />
    </Fragment>
  );

  const setDetailSubjects = sub => {
    if (sub.length > 0) {
      sub.forEach((item, i) => {
        item.choose = false;
      });
      setSubjects(sub);
    }
  };

  const getDocument = () => {
    DocumentPicker.pick({
      type: [types.pdf, types.images],
    })
      .then(res => {
        console.log('get document', res);
        setPickFile(res[0]);
        setFileName(res[0].name);
      })
      .catch(err => console.log('pick err', err));
  };

  const getContactsPhone = type => {
    if (allowRead) {
      Contacts.getAll().then(item => {
        console.log('check item', item);
        setModalContact(true);
        setContactList(item);
        setWhichContact(type);
      });
    } else {
      setGranted(true);
      setGrantedMsg(
        'Silahkan aktifkan ijin untuk akses kontak Anda di bagian pengaturan smartphone Anda',
      );
    }
  };

  const setChooseContact = e => {
    if (whichContact === 'contact1') {
      if (e) {
        setPhoneFriend1(e.number);
      }
    } else {
      if (e) {
        setPhoneFriend2(e.number);
      }
    }
    dismissContactList();
  };

  const requestContacts = () => {
    request(PERMISSIONS.ANDROID.READ_CONTACTS, {
      title: 'Hai',
      message: 'Ijinkan sebis les, untuk akses kontak',
      buttonPositive: 'Tambahkan',
    }).then(result => {
      if (result === 'granted') {
        setAllowRead(true);
      }
    });
  };

  const dismissAccessWarning = () => {
    setGranted(false);
    setGrantedMsg('');
  };

  const dismissContactList = () => {
    setModalContact(false);
  };

  useEffect(() => {
    requestContacts();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <ModalComponent
        visible={isErrorRequestMaterial}
        dismiss={() => dismissModal()}
        msg={alertMsgError}
      />
      <ModalComponent
        visible={isRequestMaterial}
        dismiss={() => dismissModal()}
        msg={alertMsgSuccess}
      />
      <ModalComponent
        visible={granted}
        dismiss={() => dismissAccessWarning()}
        msg={grantedMsg}
      />
      <ContactListComponent
        visible={modalContact}
        contacts={contactList}
        setContact={e => setChooseContact(e)}
        dismiss={() => dismissContactList()}
      />
      <TopNavigation accessoryLeft={BackAction} accessoryRight={RightAction} />
      <Divider />
      <Layout
        style={{
          flexDirection: 'row',
          marginHorizontal: width * 0.02,
          marginVertical: width * 0.02,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Layout
            style={{
              flexDirection: 'column',
              paddingBottom: width * 0.02,
              paddingRight: width * 0.03,
            }}>
            <Text category="h5" style={global.titleFont}>
              {teacher}{' '}
              <Icon
                name="arrow-ios-forward-outline"
                fill="black"
                style={{width: width * 0.05, height: width * 0.05}}
              />
            </Text>
          </Layout>
        </TouchableOpacity>
      </Layout>
      <ScrollView>
        <Layout
          style={[global.marginHorizontalDefault, {flexDirection: 'row'}]}>
          <Image
            source={require('./../assets/sebis_les.png')}
            style={{
              width: width * 0.15,
              height: width * 0.15,
            }}
            resizeMode="cover"
          />
          <Layout style={{flexDirection: 'column', paddingLeft: width * 0.02}}>
            <Layout>
              <Text
                category="c1"
                style={(global.captionFont, global.greyFontColor)}>
                {selectedSub?.subject?.subjectCode == null
                  ? selectedSub?.subject
                  : selectedSub?.subject?.subjectCode}
              </Text>
              <Text
                category="c1"
                style={(global.captionFont, global.greyFontColor)}>
                {selectedSub?.grade?.gradeName == null
                  ? selectedSub?.grade
                  : selectedSub?.grade?.gradeName}
              </Text>
              <Text
                category="c1"
                style={(global.captionFont, global.greyFontColor)}>
                {lesType == 'private' ? 'kelas Privat' : 'Kelas grup'}
              </Text>
            </Layout>
            <Text category="p1" style={global.normalFont}>
              {detailLes == null
                ? selectedSub?.date
                : FORMATDATE(detailLes?.date)}
            </Text>
            <Text category="c1" style={global.normalFont}>
              {detailLes == null
                ? selectedSub?.time
                : detailLes?.timeStart + '-' + detailLes?.timeEnd}
            </Text>
            <Text
              category="h6"
              style={[global.normalFont, {fontWeight: 'bold'}]}>
              {detailLes == null
                ? CURRENCY + FORMATPRICE(selectedSub?.price)
                : CURRENCY + FORMATPRICE(detailLes?.private)}
            </Text>
            <Layout style={{marginVertical: width * 0.02}}>
              <Input
                placeholder="Tulis materimu disini, contoh : saya request materi Geomatri untuk menghitung sudut bidang datar"
                placeholderTextColor={grey}
                label={evaprops => (
                  <Text {...evaprops} category="p2" style={global.normalFont}>
                    Request Materi :
                  </Text>
                )}
                multiline={true}
                numberOfLines={3}
                style={[
                  global.inputStyle,
                  {
                    borderBottomWidth: 0,
                    marginHorizontal: 0,
                    marginVertical: 0,
                    width: width * 0.8,
                  },
                ]}
                textStyle={global.normalFont}
                value={requestMateri}
                onChangeText={e => patchRequestMateri(e)}
              />
            </Layout>
            <Layout>
              <Text category="p2" style={global.normalFont}>
                Dokumen / Foto Request Materi :
              </Text>
              <Layout style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => getDocument()}
                  style={{flexDirection: 'row'}}>
                  <Text category="c2" style={[global.captionFont]}>
                    {fileName}
                  </Text>
                  <Icon
                    name="attach-outline"
                    fill="black"
                    style={{width: width * 0.1, height: width * 0.1}}
                  />
                </TouchableOpacity>
              </Layout>
            </Layout>
            {lesType === 'group' && (
              <Layout>
                <Layout style={{paddingVertical: width * 0.05}}>
                  <Text
                    category="c1"
                    style={[global.titleFont, {fontWeight: 'bold'}]}>
                    Masukkan Akun Temanmu (opsional)
                  </Text>
                  <Text category="c2" style={global.normalFont}>
                    Agar temanmu mendapat Report Siswa
                  </Text>
                </Layout>
                <Layout style={{width: width * 0.8}}>
                  <Input
                    placeholder="Tambahkan email login temanmu"
                    label={evaprops => (
                      <Text
                        {...evaprops}
                        category="p1"
                        style={[global.normalFont, {fontWeight: 'bold'}]}>
                        Teman 1 :
                      </Text>
                    )}
                    style={[global.inputStyle]}
                    textStyle={[global.normalFont, {fontSize: width * 0.03}]}
                    onChangeText={e => setEmailFriend1(e)}
                    value={emailFriend1}
                  />
                  <Input
                    placeholder="Tambahkan nomor kontak"
                    style={[global.inputStyle, {marginVertical: 0}]}
                    textStyle={[global.normalFont, {fontSize: width * 0.03}]}
                    onChangeText={e => setPhoneFriend1(e)}
                    value={phoneFriend1}
                  />
                  <TouchableOpacity
                    onPress={() => getContactsPhone('contact1')}
                    style={[
                      global.secondaryButton,
                      {
                        borderRadius: 0,
                        flexDirection: 'row',
                        backgroundColor: grey,
                        marginVertical: width * 0.02,
                        padding: width * 0.02,
                        borderColor: greydark,
                        borderWidth: 1,
                      },
                    ]}>
                    <Icon
                      name="person-add"
                      style={{width: width * 0.08, height: width * 0.08}}
                      fill="#000000"
                    />
                    <Text
                      category="p1"
                      style={[
                        global.normalFont,
                        {color: green, textAlign: 'center'},
                      ]}>
                      Tambah dari kontak
                    </Text>
                  </TouchableOpacity>
                </Layout>
                <Layout style={{width: width * 0.8}}>
                  <Input
                    placeholder="Tambahkan email login temanmu"
                    label={evaprops => (
                      <Text
                        {...evaprops}
                        category="p1"
                        style={[global.normalFont, {fontWeight: 'bold'}]}>
                        Teman 2 :
                      </Text>
                    )}
                    style={[global.inputStyle]}
                    textStyle={[global.normalFont, {fontSize: width * 0.03}]}
                    onChangeText={e => setEmailFriend2(e)}
                    value={emailFriend2}
                  />
                  <Input
                    placeholder="Tambahkan nomor kontak"
                    style={[global.inputStyle, {marginVertical: 0}]}
                    textStyle={[global.normalFont, {fontSize: width * 0.03}]}
                    onChangeText={e => setPhoneFriend2(e)}
                    value={phoneFriend2}
                  />
                  <TouchableOpacity
                    onPress={() => getContactsPhone('contact2')}
                    style={[
                      global.secondaryButton,
                      {
                        borderRadius: 0,
                        flexDirection: 'row',
                        backgroundColor: grey,
                        marginVertical: width * 0.02,
                        padding: width * 0.02,
                        borderColor: greydark,
                        borderWidth: 1,
                      },
                    ]}>
                    <Icon
                      name="person-add"
                      style={{width: width * 0.08, height: width * 0.08}}
                      fill="#000000"
                    />
                    <Text
                      category="p1"
                      style={[
                        global.normalFont,
                        {color: green, textAlign: 'center'},
                      ]}>
                      Tambah dari kontak
                    </Text>
                  </TouchableOpacity>
                </Layout>
              </Layout>
            )}
            <Layout style={{marginVertical: width * 0.02}}>
              {isLoadingRequestMaterial ? (
                <Spinner size="large" style={{marginHorizontal: width * 0.1}} />
              ) : (
                <TouchableOpacity
                  onPress={() => addCart()}
                  style={[
                    global.cardButton,
                    {
                      backgroundColor: green,
                      borderRadius: width * 0.02,
                      padding: width * 0.02,
                      marginVertical: width * 0.05,
                    },
                  ]}>
                  <Text
                    category="p1"
                    style={[
                      global.normalFont,
                      {color: '#FFFFFF', textAlign: 'center'},
                    ]}>
                    Ubah Detail Request Materi
                  </Text>
                </TouchableOpacity>
              )}
            </Layout>
          </Layout>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

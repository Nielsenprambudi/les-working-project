import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import {Layout, Text, Card, Input, Divider, Icon} from '@ui-kitten/components';
import {greydark} from '../helpers/constant';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const ContactListComponent = ({
  visible,
  contacts,
  setContact,
  dismiss,
}) => {
  const [filterMsg, setFilterMsg] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    if (contacts.length > 0) {
      setList(contacts);
    }
  }, [contacts]);

  const search = () => {
    if (filterMsg !== '') {
      let filterContact = contacts.filter(
        x => x.displayName.toLowerCase() === filterMsg.toLowerCase(),
      );
      setList(filterContact);
    } else {
      setList(contacts);
    }
  };

  const RenderContact = ({item}) => (
    <Layout
      style={[global.marginHorizontalDefault, {marginVertical: width * 0.04}]}>
      <Divider />
      <Text category="p1" style={[global.normalFont]}>
        {item?.displayName}
      </Text>
      {item?.phoneNumbers.length > 0 ? (
        item?.phoneNumbers.map((ph, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setContact(ph)}
            style={{paddingVertical: width * 0.02}}>
            <Text category="p1" style={[global.normalFont]}>
              {ph?.number}
            </Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text category="p1" style={global.normalFont}>
          Tidak ada nomor
        </Text>
      )}

      <Divider />
    </Layout>
  );

  return (
    <Modal visible={visible} animationType="slide">
      <TouchableOpacity onPress={() => dismiss()}>
        <Text style={[global.marginHorizontalDefault, {textAlign: 'right'}]}>
          X
        </Text>
      </TouchableOpacity>
      <Layout
        style={{
          flexDirection: 'row',
          width: width,
          marginVertical: width * 0.05,
        }}>
        <Input
          placeholder="Ketik untuk pencarian"
          style={[global.inputStyle, {width: width * 0.8}]}
          textStyle={[global.normalFont, {fontSize: width * 0.03}]}
          onChangeText={e => setFilterMsg(e)}
          value={filterMsg}
        />
        <TouchableOpacity
          onPress={() => search()}
          style={{
            padding: width * 0.05,
            borderRadius: width,
            backgroundColor: greydark,
          }}>
          <Icon
            name="search"
            style={{width: width * 0.05, height: width * 0.05}}
            fill={'#FFFFFF'}
          />
        </TouchableOpacity>
      </Layout>
      <FlatList
        data={list}
        renderItem={RenderContact}
        ListEmptyComponent={
          list.length === 0 && (
            <Layout>
              <Text
                category="c2"
                style={[global.captionFont, {textAlign: 'center'}]}>
                Tidak ada kontak yang sesuai
              </Text>
            </Layout>
          )
        }
      />
    </Modal>
  );
};

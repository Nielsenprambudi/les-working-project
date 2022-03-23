import React, {useRef, useState, useEffect} from 'react';
import {View, Dimensions, TouchableOpacity, Image} from 'react-native';
import {Modal, Layout, Text, Card} from '@ui-kitten/components';
import {FORMATLINK} from '../helpers/constant';
import YoutubePlayer from 'react-native-youtube-iframe';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const ModalVideoComponent = ({visible, dismiss, url}) => {
  return (
    <Modal
      visible={visible}
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
            onPress={() => dismiss()}>
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
        <Layout style={{backgroundColor: '#e2e2e2'}}>
          {url == null ? (
            <YoutubePlayer
              height={width * 0.5}
              width={width * 0.9}
              play={true}
              videoId={'-vroB_s5wFQ'}
            />
          ) : (
            <YoutubePlayer
              height={width * 0.5}
              width={width * 0.9}
              play={false}
              videoId={FORMATLINK(url)}
            />
          )}
        </Layout>
      </Card>
    </Modal>
  );
};

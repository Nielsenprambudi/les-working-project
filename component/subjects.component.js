import React, {useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {Layout, Text, Spinner} from '@ui-kitten/components';
import {blue, green} from '../helpers/constant';
const global = require('../styles/global');
const width = Dimensions.get('window').width;

export const SubjectsNavigator = ({item, choose, index, pressSubject, id}) => {
  const [loading, setLoading] = useState(false);
  const [subPress, setSubPress] = useState(false);

  useEffect(() => {
    if (item?.id == id) {
      setSubPress(true);
      setLoading(true);
      setInterval(() => {
        setLoading(false);
      }, 100);
    } else {
      setSubPress(false);
      setLoading(true);
      setInterval(() => {
        setLoading(false);
      }, 100);
    }
  }, [id, item]);
  return (
    <TouchableOpacity onPress={() => pressSubject(index)}>
      {loading ? (
        <Layout style={{marginHorizontal: width * 0.2}}>
          <Spinner size="medium" />
        </Layout>
      ) : (
        <Layout
          style={
            !subPress
              ? [
                  global.greenBackColor,
                  {
                    margin: width * 0.015,
                    padding: width * 0.015,
                    borderRadius: width * 0.03,
                  },
                ]
              : [
                  global.blueBackColor,
                  {
                    margin: width * 0.015,
                    padding: width * 0.015,
                    borderRadius: width * 0.03,
                  },
                ]
          }>
          <Text
            category="p2"
            style={[
              global.normalFont,
              {
                fontWeight: 'bold',
                paddingBottom: 5,
                color: !subPress ? blue : '#FFFFFF',
              },
            ]}>
            {item?.subject?.subjectName.toLowerCase()}
          </Text>
          <Text
            category="c2"
            style={[
              global.captionFont,
              {
                fontWeight: 'bold',
                textAlign: 'center',
                color: !subPress ? blue : '#FFFFFF',
              },
            ]}>
            {item?.grade?.gradeName.toLowerCase()}
          </Text>
        </Layout>
      )}
    </TouchableOpacity>
  );
};

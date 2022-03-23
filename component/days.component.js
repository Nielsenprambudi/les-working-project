import React, {useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {Layout, Text, Spinner} from '@ui-kitten/components';
import {blue, green} from '../helpers/constant';
const global = require('./../styles/global');
const width = Dimensions.get('window').width;

export const DaysNavigator = ({item, check, index, offDays, pressDay}) => {
  const checkOff = id => {
    let find = offDays.filter(x => x.dayCode == id);
    if (find.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  const [theme, setTheme] = useState(item);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (check) {
      setTheme(item);
      setLoading(true);
      setInterval(() => {
        setLoading(false);
      }, 100);
    }
  }, [check, item]);
  return (
    <TouchableOpacity
      onPress={() => pressDay(index)}
      disabled={checkOff(theme?.id) == false}>
      {loading ? (
        <Spinner size="medium" />
      ) : (
        <Layout
          style={
            checkOff(theme?.id) == true
              ? !check
                ? [
                    global.defaultButton,
                    {
                      padding: width * 0.02,
                      borderRadius: width * 0.2,
                      backgroundColor: green,
                    },
                  ]
                : [
                    global.defaultButton,
                    {padding: width * 0.02, borderRadius: width * 0.2},
                  ]
              : [
                  global.defaultDisabledButton,
                  {padding: width * 0.02, borderRadius: width * 0.2},
                ]
          }>
          <Text
            style={[
              global.captionFont,
              {
                color:
                  checkOff(theme?.id) == true
                    ? !check
                      ? blue
                      : '#FFFFFF'
                    : 'black',
                fontWeight: 'bold',
              },
            ]}
            category="c1">
            {theme?.day}
          </Text>
        </Layout>
      )}
    </TouchableOpacity>
  );
};

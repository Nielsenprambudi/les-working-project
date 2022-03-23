'use strict';
import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  titleFont: {
    fontFamily: 'FredokaOne-Regular',
  },
  normalFont: {
    fontFamily: 'Comfortaa-Medium',
  },
  captionFont: {
    fontFamily: 'Comfortaa-Light',
  },
  yellowFontColor: {
    color: '#e4c44c',
  },
  blueFontColor: {
    color: '#193c58',
  },
  orangeFontColor: {
    color: '#de723f',
  },
  greyFontColor: {
    color: '#e2e2e2',
  },
  greenFontColor: {
    color: '#459c8e',
  },
  yellowBackColor: {
    backgroundColor: '#e4c44c',
  },
  blueBackColor: {
    backgroundColor: '#193c58',
  },
  orangeBackColor: {
    backgroundColor: '#de723f',
  },
  greyBackColor: {
    backgroundColor: '#e2e2e2',
  },
  greenBackColor: {
    backgroundColor: '#459c8e',
  },
  marginHorizontalDefault: {
    marginHorizontal: width * 0.02,
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#193c58',
    marginVertical: width * 0.02,
    marginHorizontal: width * 0.02,
    backgroundColor: '#FFFFFF',
  },
  defaultTextColor: {
    color: '#193c58',
  },
  defaultButton: {
    backgroundColor: '#193c58',
    marginHorizontal: width * 0.02,
    marginBottom: width * 0.02,
    borderColor: '#ffffff',
    borderRadius: 12,
  },
  defaultDisabledButton: {
    backgroundColor: '#e2e2e2',
    marginHorizontal: width * 0.02,
    marginBottom: width * 0.02,
    borderColor: '#ffffff',
    borderRadius: 12,
  },
  secondaryButton: {
    borderColor: '#e2e2e2',
    marginHorizontal: width * 0.02,
    marginBottom: width * 0.02,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  cardButton: {
    padding: width * 0.01,
    borderColor: '#459c8e',
    borderWidth: 1,
    marginRight: width * 0.2,
  },
  disabledCardButton: {
    padding: width * 0.01,
    borderColor: '#e2e2e2',
    backgroundColor: '#e2e2e2',
    borderWidth: 1,
    marginRight: width * 0.2,
  },
  cartButton: {
    color: '#ffffff',
    fontWeight: 'bold',
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.04,
    marginHorizontal: width * 0.02,
    textAlign: 'right',
    backgroundColor: '#193c58',
  },
  DisabledCartButton: {
    color: '#ffffff',
    fontWeight: 'bold',
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.04,
    marginHorizontal: width * 0.02,
    textAlign: 'right',
    backgroundColor: '#e2e2e2',
  },
  textModal: {
    width: width * 0.4,
    textAlign: 'center',
    paddingRight: 5,
  },
  backgroundIcon: {
    backgroundColor: '#e2e2e2',
    margin: width * 0.03,
    borderRadius: width * 0.05,
    width: width * 0.2,
    height: width * 0.2,
  },
  carouselHeaderDefault: {
    flexDirection: 'row',
    backgroundColor: '#193c58',
    marginHorizontal: width * 0.02,
    borderTopStartRadius: width * 0.02,
    borderTopEndRadius: width * 0.02,
    height: width * 0.5,
    elevation: 2,
  },
});

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './../screen/home.component';
import {LesScreen} from './../screen/les.component';
import {FavTutorScreen} from './../screen/favtutor.component';
import {FilterScreen} from './../screen/filter.component';
import {FilterLesScreen} from './../screen/filterles.component';
import {DetailTutorScreen} from './../screen/detailtutor.component';
import {UserProfileScreen} from './../screen/userprofile.component';
import {EditUserProfileScreen} from './../screen/edituserprofile.component';
import {HelpScreen} from './../screen/help.component';
import {TutorialScreen} from './../screen/tutorial.component';
import {DetailLesScreen} from './../screen/detailles.component';
import {TutorExperiencesScreen} from './../screen/tutorexperience.component';
import {CartScreen} from './../screen/cart.component';
import {CartCheckoutScreen} from './../screen/cartcheckout.component';
import {LoginScreen} from '../screen/login.component';
import {RegisterScreen} from '../screen/register.component';
import {EmailVerifyScreen} from '../screen/emailverify.component';
import {LoginWithNumberScreen} from '../screen/loginwithnumber.component';
import {ForgotPasswordScreen} from '../screen/forgotpassword.component';
import {ResetPasswordScreen} from '../screen/resetpassword.component';
import {VerifyNumberScreen} from '../screen/verifynumber.component';
import {RegisterNumberScreen} from '../screen/registernumber.component';
import {CoinScreen} from '../screen/coin.component';
import {CoinCheckoutScreen} from '../screen/coincheckout.component';
import {LesRoomScreen} from '../screen/lesroom.component';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import http from '../helpers/http';

const {Navigator, Screen} = createStackNavigator();

const AuthNavigator = () => (
  <Navigator
    headerMode="none"
    initialRouteName="Home"
    screenOptions={{headerShown: false}}>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Les" component={LesScreen} />
    <Screen name="Filter" component={FilterScreen} />
    <Screen name="FilterLes" component={FilterLesScreen} />
    <Screen name="Login" component={LoginScreen} />
    <Screen name="LoginNumber" component={LoginWithNumberScreen} />
    <Screen name="VerifyNumber" component={VerifyNumberScreen} />
    <Screen name="Verify" component={EmailVerifyScreen} />
    <Screen name="Register" component={RegisterScreen} />
    <Screen name="RegisterNumber" component={RegisterNumberScreen} />
    <Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Screen name="ResetPassword" component={ResetPasswordScreen} />
    <Screen name="DetailTutor" component={DetailTutorScreen} />
    <Screen name="DetailLes" component={DetailLesScreen} />
    <Screen name="TutorExperiences" component={TutorExperiencesScreen} />
    <Screen name="Tutorial" component={TutorialScreen} />
  </Navigator>
);

const HomeNavigator = () => (
  <Navigator
    headerMode="none"
    initialRouteName="Home"
    screenOptions={{headerShown: false}}>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Les" component={LesScreen} />
    <Screen name="FavTutor" component={FavTutorScreen} />
    <Screen name="Filter" component={FilterScreen} />
    <Screen name="FilterLes" component={FilterLesScreen} />
    <Screen name="DetailTutor" component={DetailTutorScreen} />
    <Screen name="DetailLes" component={DetailLesScreen} />
    <Screen name="TutorExperiences" component={TutorExperiencesScreen} />
    <Screen name="Cart" component={CartScreen} />
    <Screen name="CartCheckout" component={CartCheckoutScreen} />
    <Screen name="UserProfile" component={UserProfileScreen} />
    <Screen name="EditUserProfile" component={EditUserProfileScreen} />
    <Screen name="Help" component={HelpScreen} />
    <Screen name="Tutorial" component={TutorialScreen} />
    <Screen name="Coin" component={CoinScreen} />
    <Screen name="CoinCheckout" component={CoinCheckoutScreen} />
    <Screen name="LesRoom" component={LesRoomScreen} />
  </Navigator>
);

export const AppNavigator = () => {
  const auth = useSelector(state => state.auth);
  const linking = {
    prefixes: ['sebisles://'],
    config: {
      screens: {
        Coin: 'Coin',
      },
    },
  };

  useEffect(() => {
    if (auth?.token && auth?.refreshToken) {
      storeToken(auth?.token);
      storeReftoken(auth?.refreshToken);
      http.defaults.headers.common.Authorization = 'Bearer ' + auth?.token;
    }
  }, [auth]);

  const storeToken = async token => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (e) {
      console.log('error set storage token', e);
    }
  };

  const storeReftoken = async ref => {
    try {
      await AsyncStorage.setItem('refreshtoken', ref);
    } catch (e) {
      console.log('error set storage refresh token', e);
    }
  };

  return (
    <NavigationContainer linking={linking}>
      <Navigator>
        {auth?.token ? (
          <Screen
            name="Home"
            component={HomeNavigator}
            options={{headerShown: false}}
          />
        ) : (
          <Screen
            name="Auth"
            component={AuthNavigator}
            options={{headerShown: false}}
          />
        )}
      </Navigator>
    </NavigationContainer>
  );
};

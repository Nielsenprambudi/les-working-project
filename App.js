import React from 'react';
import {StyleSheet} from 'react-native';
import {ApplicationProvider, Icon, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {AppNavigator} from './component/navigation.component';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store from './redux/store';

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store().store}>
        <PersistGate loading={null} persistor={store().persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </ApplicationProvider>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
});

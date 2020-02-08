import {StatusBar, Platform} from 'react-native';

Platform.select({
  ios: {
    backgroundColor: null,
  },
  android: () => StatusBar.setBackgroundColor('#4DAE4C'),
});

import { registerRootComponent } from 'expo';



import Launcher from './screens/Launcher';
import Train from './screens/Train';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Launcher);

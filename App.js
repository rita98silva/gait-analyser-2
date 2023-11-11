import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Avatar, Button } from '@ui-kitten/components';

import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes
} from "react-native-sensors";

const { Navigator, Screen } = createBottomTabNavigator();

const [accX, setAccX] = useState([])
const [accY, setAccY] = useState([])
const [accZ, setAccZ] = useState([])

const [gyroX, setGyroX] = useState([])
const [gyroY, setGyroY] = useState([])
const [gyroZ, setGyroZ] = useState([])

const collectData = () => {
  setUpdateIntervalForType(SensorTypes.accelerometer, 2000);

  const acc_sub = accelerometer.subscribe(({ x, y, z }) => {
    setAccX(accX => [...accX, x]);
    setAccY(accY => [...accY, y]);
    setAccZ(accZ => [...accZ, z]);
  });

  console.log(accX, accY, accZ)
};

const UsersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Button onPress={() => collectData}>
        Get accelerometer values
      </Button>
  </Layout>
);

const OrdersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>Dual Task</Text>
  </Layout>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='Single Task'/>
    <BottomNavigationTab title='Dual Task'/>
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Single Task' component={UsersScreen}/>
    <Screen name='Dual Task' component={OrdersScreen}/>
  </Navigator>
);


export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <NavigationContainer>
      <View>
        <Avatar source={require('./assets/app-icon.png')} />
      </View>
    <TabNavigator/>
  </NavigationContainer>
  </ApplicationProvider>
)


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterCandidateScreen from './Screens/RegisterCandidateScreen';
import StudentListScreen from './Screens/StudentListScreen';
import MarkAttendanceScreen from './Screens/MarkAttendanceScreen';
import DeleteCandidateScreen from './Screens/DeleteCandidateScreen';
import Home from './Screens/Home'; 
import { initDatabase } from './Database';
import DailyAttendanceListScreen from './Screens/DailyAttendanceListScreen';

const Tab = createBottomTabNavigator();
initDatabase();
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} /> 
        <Tab.Screen name="Register" component={RegisterCandidateScreen} />
        <Tab.Screen name="StudentList" component={StudentListScreen} />
        <Tab.Screen name="MarkAttendance" component={MarkAttendanceScreen} />
        <Tab.Screen name="DeleteCandidate" component={DeleteCandidateScreen} />
        <Tab.Screen name="Daily Attendance List" component={DailyAttendanceListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

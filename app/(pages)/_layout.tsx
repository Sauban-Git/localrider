
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <>
      {/* Make status bar icons/text black */}
      <StatusBar style="dark" />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#fff', height: 60 },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}


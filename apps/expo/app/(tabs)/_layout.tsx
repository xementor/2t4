import { Home, Settings2, Calendar, BarChart } from '@tamagui/lucide-icons'
import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name='timeline'
        options={{
          title: 'Timeline',
          tabBarIcon: ({ color }) => <Calendar size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name='metrics'
        options={{
          title: 'Metrics',
          tabBarIcon: ({ color }) => <BarChart size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings2 size={28} color={color} />,
        }}
      />
    </Tabs>
  )
}

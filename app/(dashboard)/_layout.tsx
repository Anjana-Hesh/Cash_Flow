import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { CustomTabBar } from '@/components/CustomTabBar';

export const tabs = [
  { name: "home",       title: "Home",       icon: "home" },
  { name: "statistics", title: "Statistics", icon: "query-stats" },
  { name: "wallet",     title: "Wallet",     icon: "wallet" },
  { name: "profile",    title: "Profile",    icon: "person-outline" },
] as const;

const _layout = () => {
  return (
    <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
            headerShown: false,
            // sceneStyle: { backgroundColor: '#171717' }, // Neutral-900 hex code
        }}
    >
        {tabs.map(({name, title, icon}: any) => (
            <Tabs.Screen
                key={name}
                name={name}
                options={{
                    title: title,
                    tabBarIcon: ({color , size , focused}) => (
                        <MaterialIcons name={icon} color={color} size={size} />
                        // <MaterialIcons name={icon} color={focused ? "blue" : "gray"} size={size} />
                    )
                }}
            />
        ))}
    </Tabs>
  )
}

export default _layout
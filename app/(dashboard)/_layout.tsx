import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const tabs = [
  { name: "home",       title: "Home",       icon: "home" },
  { name: "statistics", title: "Statistics", icon: "list" },
  { name: "wallet",     title: "Wallet",     icon: "wallet" },
  { name: "profile",    title: "Profile",    icon: "person-outline" },
] as const;

const _layout = () => {
  return (
    <Tabs>
        {tabs.map(({name, title, icon}: any) => (
            <Tabs.Screen
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
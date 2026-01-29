import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { AuthProvider } from '@/context/authContext'

const _layout = () => {
  return (
    <AuthProvider>
      <Stack
          screenOptions={{ headerShown: false}}
      >

        <Stack.Screen name="index" /> 
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(dashboard)" />

        <Stack.Screen
          name="(models)/walletModel"
          options={{
            presentation: "modal"
          }}
        />

        <Stack.Screen
          name="(models)/profileModel"
          options={{
            presentation: "modal"
          }}
        />

        

        <Stack.Screen
          name="(models)/transactionModel"
          options={{
            presentation: "modal"
          }}
        />

        <Stack.Screen
          name="(models)/privacyPolicy"
          options={{
            presentation: "modal"
          }}
        />

        <Stack.Screen
          name="(models)/settingsModel"
          options={{
            presentation: "modal"
          }}
        />

      </Stack>
    </AuthProvider>
  )
}

export default _layout
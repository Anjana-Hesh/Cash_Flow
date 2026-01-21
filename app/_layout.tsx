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
        <Stack.Screen
          name="/profileModel"
          options={{
            presentation: "modal"
          }}
        />

      </Stack>
    </AuthProvider>
  )
}

export default _layout

const styles = StyleSheet.create({})
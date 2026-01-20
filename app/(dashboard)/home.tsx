import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Button from '@/components/Button'
import Typo from '@/components/Typo'
import { colors } from '@/constants/theme'
import { signOut } from 'firebase/auth'
import { auth } from '@/service/firebaseConfig'
import Loading from '@/components/Loading'
import { useRouter } from 'expo-router'

const Home = () => {

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      router.replace('/login');
    } catch (error: any) {
      console.error("Logout Error: ", error.message);
    }
  }

  return (
    <View>
      <Text>home</Text>
      <Button onPress={handleLogout}>
        <Typo color={colors.black}>Logout</Typo>
      </Button>
    </View>
  )
}

export default Home
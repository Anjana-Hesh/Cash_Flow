import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Button from '@/components/Button'
import Typo from '@/components/Typo'
import { colors } from '@/constants/theme'
import { signOut } from 'firebase/auth'
import { auth } from '@/service/firebaseConfig'
import Loading from '@/components/Loading'
import { useRouter } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import { logout } from '@/service/authService'

const Home = () => {

  const router = useRouter();

  const {user} = useAuth();

  if (!user) return <Text>Loading...</Text>;

  console.log(user.displayName); // "Anjana heshan"
  console.log(user.email); // "anjanaheshan676@gmail.com"
  console.log(user.uid); // "7k6G1wJ4BxSfZg8eusOstgnTzS82"

  const handleLogout = async () => {
    try {
      // await signOut(auth);
      await logout()
      console.log("User signed out successfully");
      router.replace('/welcome');
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
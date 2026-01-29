import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import '../global.css'
import { colors } from '@/constants/theme'
import { Redirect, useRouter } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'

const index = () => {

  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    
    if (!loading) {
      const timer = setTimeout(() => {
        if (user) {
          router.replace('/(dashboard)/home');
        } else {
          router.replace('/welcome');
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [user, loading]);

  return (
    <View 
      className='flex-1 items-center justify-center'
      style={{ backgroundColor: colors.neutral900 }}  
    >
      <Image 
        className='h-[20%] aspect-square'
        resizeMode='contain'
        source={require('../assets/images/splashImage.png')}
      />
    </View>
  )

    // if (user) {
    //   return <Redirect href="/home" />
    // }

    // return <Redirect href="/login" />
}

export default index
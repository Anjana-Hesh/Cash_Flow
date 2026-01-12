import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import '../global.css'
import { colors } from '@/constants/theme'
import { useRouter } from 'expo-router'

const index = () => {

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/welcome');
    }, 2000);
  }, []);

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
}

export default index

const styles = StyleSheet.create({})
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Button from '@/components/Button'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { signOut } from 'firebase/auth'
import { auth } from '@/service/firebaseConfig'
import Loading from '@/components/Loading'
import { useRouter } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import { logout } from '@/service/authService'
import ScreenWrapper from '@/components/ScreenWrapper'
import { verticalScale } from '@/utils/styling'
import * as Icons from 'phosphor-react-native';
import HomeCard from '@/components/HomeCard'

const Home = () => {

  const router = useRouter();

  const {user} = useAuth();

  if (!user) return <Text>Loading...</Text>;

  console.log(user.displayName); // "Anjana heshan"
  console.log(user.email); // "anjanaheshan676@gmail.com"
  console.log(user.uid); // "7k6G1wJ4BxSfZg8eusOstgnTzS82"

  return (
    <ScreenWrapper>
      <View style={styles.container} >

        {/* Header -- */}
        <View style={styles.header}>
          <View className='gap-4'>
            <Typo size={16} color={colors.neutral400}>
              Hello, 
            </Typo>
            <Typo size={20} fontWeight={"500"}>{user?.displayName}</Typo>
          </View>
          <TouchableOpacity style={styles.searchIcon}>
            <Icons.MagnifyingGlass
              size={verticalScale(22)}
              color={colors.neutral200}
              weight='bold'
            />
          </TouchableOpacity>
        </View>


        <ScrollView
          contentContainerStyle={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
        >
          {/* card */}
          <View>
            <HomeCard />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    marginTop: verticalScale(8)
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom:spacingY._10
  },
  searchIcon: {
    backgroundColor: colors.neutral700,
    padding: spacingX._10,
    borderRadius: 50
  },
  floatingButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: 100,
    position: "absolute",
    bottom: verticalScale(30),
    right: verticalScale(30)
  },
  scrollViewStyle:{
    marginTop: spacingY._10,
    paddingBottom: verticalScale(100),
    gap: spacingY._25
  }
})
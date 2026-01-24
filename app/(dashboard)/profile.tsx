import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Header from '@/components/Header'
import { useAuth } from '@/hooks/useAuth'
import { Image } from 'expo-image'
import { getProfileImage } from '@/utils/imageUtile'
import { accountOptionType } from '@/types'
import * as Icons from 'phosphor-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated'
import { logout } from '@/service/authService'
import { useRouter } from 'expo-router'

const Profile = () => {
  const { user } = useAuth();
  const router = useRouter();

  const accountOptions: accountOptionType[] = [
    {
      title: "Edit Profile",
      icon: <Icons.User size={26} color={colors.white} weight="fill" />,
      routeName: '/profileModel',
      bgColor: "#6366f1"
    },
    {
      title: "Settings",
      icon: <Icons.GearSix size={26} color={colors.white} weight="fill" />,
      routeName: '/settingsModel',
      bgColor: "#059669"
    },
    {
      title: "Privacy Policy",
      icon: <Icons.Lock size={26} color={colors.white} weight="fill" />,
      routeName: '/privacyPolicy',
      bgColor: colors.neutral600
    },
    {
      title: "Logout",
      icon: <Icons.Power size={26} color={colors.white} weight="fill" />,
      bgColor: "#e11d48"
    }
  ]

  const handleLogout = async () => {
    try {
      await logout()
      router.replace('/welcome');
    } catch (error: any) {
      console.error("Logout Error: ", error.message);
    }
  }

  const showLogoutAlert = () => {
    Alert.alert(
      "Sign out",
      "You will be signed out of your account. Do you want to continue?",
      [
        { text: "Stay", style: "cancel" },
        { text: "Sign out", style: "destructive", onPress: handleLogout },
      ]
    );
  };

  const handlePress = (item: accountOptionType) => {
    if (item.title == 'Logout') {
      showLogoutAlert();
    }
    if (item.routeName) router.push(item.routeName as any);
  }

  return (
    <ScreenWrapper>
      {/* Container with Horizontal Padding */}
      <View className="flex-1 px-5">
        
        {/* Header */}
        <Header title='Profile' style={{ marginVertical: spacingY._10 }} />

        {/* User Info Section */}
        <View className="items-center mt-8 space-y-4">
          
          {/* Avatar with Ring effect */}
          <View className="p-1 border-2 border-indigo-500/20 rounded-full">
            <Image 
              source={getProfileImage(user?.photoURL ?? undefined)}
              style={{
                height: verticalScale(135),
                width: verticalScale(135),
                borderRadius: 100,
              }}
              className="bg-neutral-800"
              contentFit="cover"
              transition={100}
            />
          </View>

          {/* Name & Email Container */}
          <View className="items-center space-y-1">
            <Typo size={24} fontWeight={"600"} color={colors.neutral100}>
              {user?.displayName}
            </Typo>
            <Typo size={15} color={colors.neutral400}>
              {user?.email}
            </Typo>
          </View>
        </View>

        {/* Account Options List */}
        <View className="mt-10">
          {accountOptions.map((item, index) => (
            <Animated.View 
              key={index.toString()}
              entering={FadeInDown.delay(index * 50).springify().damping(14)} 
              className="mb-4"
            >
              <TouchableOpacity 
                className="flex-row items-center p-1" 
                onPress={() => handlePress(item)}
                activeOpacity={0.7}
              >
                {/* Icon Wrapper */}
                <View 
                  style={{ backgroundColor: item?.bgColor }}
                  className="h-12 w-12 items-center justify-center rounded-2xl"
                >
                  {item.icon}
                </View>

                {/* Title */}
                <View className="flex-1 ml-4">
                  <Typo size={16} fontWeight={"500"}>{item.title}</Typo>
                </View>

                {/* Arrow Icon */}
                <Icons.CaretRight 
                  size={verticalScale(20)}
                  weight='bold'
                  color={colors.neutral400}
                />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

      </View>
    </ScreenWrapper>
  )
}

export default Profile
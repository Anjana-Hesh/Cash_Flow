import { Alert, Pressable, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import BackButton from '@/components/BackButton'
import Input from '@/components/Input'
import * as Icons from 'phosphor-react-native'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'

const Login = () => {
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Login', 'Please fill all the fields')
      return
    }

    console.log('email:', emailRef.current)
    console.log('password:', passwordRef.current)
    console.log('Good to go')
  }

  return (
    <ScreenWrapper>
      <View className="flex-1 px-5 gap-8">
        {/* Back Button */}
        <BackButton iconSize={28} />

        {/* Title */}
        <View className="gap-1 mt-5">
          <Typo size={30} fontWeight="800">
            Hey
          </Typo>
          <Typo size={30} fontWeight="800">
            Welcome Back
          </Typo>
        </View>

        {/* Form */}
        <View className="gap-5">
          <Typo size={16} color={colors.textLighter}>
            Login now to track all your expenses
          </Typo>

          <Input
            placeholder="Enter Your E-mail"
            icon={
              <Icons.At
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
            onChangeText={(value) => (emailRef.current = value)}
          />

          <Input
            placeholder="Enter Your Password"
            secureTextEntry
            icon={
              <Icons.Lock
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
            onChangeText={(value) => (passwordRef.current = value)}
          />

          {/* Forgot password */}
          <Typo
            size={14}
            color={colors.text}
            style={{ alignSelf: 'flex-end' }}
          >
            Forgot Password
          </Typo>

          <Button loading={isLoading} onPress={handleSubmit}>
            <Typo fontWeight="700" color={colors.black} size={21}>
              Login
            </Typo>
          </Button>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center items-center gap-1">
          <Typo size={15}>Don't have an account?</Typo>
          <Pressable onPress={() => router.push('/register')}>
            <Typo size={15} fontWeight="700" color={colors.primary}>
              Sign Up
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Login

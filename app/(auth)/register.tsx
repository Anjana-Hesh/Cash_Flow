// import { Alert, Pressable, View } from 'react-native'
// import React, { useRef, useState } from 'react'
// import ScreenWrapper from '@/components/ScreenWrapper'
// import Typo from '@/components/Typo'
// import { colors } from '@/constants/theme'
// import { verticalScale } from '@/utils/styling'
// import BackButton from '@/components/BackButton'
// import Input from '@/components/Input'
// import * as Icons from 'phosphor-react-native'
// import Button from '@/components/Button'
// import { useRouter } from 'expo-router'
// import { registerUser } from '@/service/authService'

// const Register = () => {
//   const emailRef = useRef('')
//   const passwordRef = useRef('')
//   const nameRef = useRef('')
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const router = useRouter()

//   // const handleSubmit = async () => {
//   //   if (!emailRef.current || !passwordRef.current || !nameRef.current) {
//   //     Alert.alert('Sign up', 'Please fill all the fields')
//   //     return
//   //   }

//   //   console.log('email:', emailRef.current)
//   //   console.log('password:', passwordRef.current)
//   //   console.log('name:', nameRef.current)
//   //   console.log('Good to go')
//   // }

//   const handleRegister = async () => {
        
//         if(!name || !email || !password || !confirmPassword) {
//             return;
//         }

//         if(password !== confirmPassword) {
//             Alert.alert("Password do not matcj ...!");
//             return;
//         }
        
//         try {

//             await registerUser(name, email, password);
//             Alert.alert("Account Created Successfully !");

//             router.replace("/login")
            
//         } catch (error) {
//             Alert.alert("Registration Failed !");

//         } finally {
          

//         }

//     }

//   return (
//     <ScreenWrapper>
//       <View className="flex-1 px-5 gap-8">
//         {/* Back Button */}
//         <BackButton iconSize={28} />

//         {/* Title */}
//         <View className="gap-1 mt-5">
//           <Typo size={30} fontWeight="800">
//             Let's
//           </Typo>
//           <Typo size={30} fontWeight="800">
//             Get Started
//           </Typo>
//         </View>

//         {/* Form */}
//         <View className="gap-5">
//           <Typo size={16} color={colors.textLighter}>
//             Create an account to track your Money Flow
//           </Typo>

//           <Input
//             placeholder="Enter Your Name"
//             icon={
//               <Icons.User
//                 size={verticalScale(26)}
//                 color={colors.neutral300}
//                 weight="fill"
//               />
//             }
//             onChangeText={(value) => (nameRef.current = value)}
//           />

//           <Input
//             placeholder="Enter Your E-mail"
//             icon={
//               <Icons.At
//                 size={verticalScale(26)}
//                 color={colors.neutral300}
//                 weight="fill"
//               />
//             }
//             onChangeText={(value) => (emailRef.current = value)}
//           />

//           <Input
//             placeholder="Enter Your Password"
//             secureTextEntry
//             icon={
//               <Icons.Lock
//                 size={verticalScale(26)}
//                 color={colors.neutral300}
//                 weight="fill"
//               />
//             }
//             onChangeText={(value) => (passwordRef.current = value)}
//           />

//           <Button onPress={handleRegister}>
//             <Typo fontWeight="700" color={colors.black} size={21}>
//               Sign Up
//             </Typo>
//           </Button>
//         </View>

//         {/* Footer */}
//         <View className="flex-row justify-center items-center gap-1">
//           <Typo size={15}>Already have an account?</Typo>
//           <Pressable onPress={() => router.replace('/login')}>
//             <Typo size={15} fontWeight="700" color={colors.primary}>
//               Login
//             </Typo>
//           </Pressable>
//         </View>
//       </View>
//     </ScreenWrapper>
//   )
// }

// export default Register


import { Alert, Pressable, View } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import BackButton from '@/components/BackButton'
import Input from '@/components/Input'
import * as Icons from 'phosphor-react-native'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'
import { registerUser } from '@/service/authService'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter()

  const handleRegister = async () => {
    if(!name || !email || !password || !confirmPassword) {
      Alert.alert('Sign up', 'Please fill all the fields')
      return;
    }

    if(password !== confirmPassword) {
      Alert.alert("Passwords do not match!");
      return;
    }
    
    try {
      await registerUser(name, email, password);
      Alert.alert("Account Created Successfully!");
      router.replace("/login")
    } catch (error) {
      Alert.alert("Registration Failed!");
    }
  }

  return (
    <ScreenWrapper>
      <View className="flex-1 px-5 gap-8">
        {/* Back Button */}
        <BackButton iconSize={28} />

        {/* Title */}
        <View className="gap-1 mt-5">
          <Typo size={30} fontWeight="800">
            Let's
          </Typo>
          <Typo size={30} fontWeight="800">
            Get Started
          </Typo>
        </View>

        {/* Form */}
        <View className="gap-5">
          <Typo size={16} color={colors.textLighter}>
            Create an account to track your Money Flow
          </Typo>

          <Input
            placeholder="Enter Your Name"
            value={name}
            onChangeText={setName}
            icon={
              <Icons.User
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />

          <Input
            placeholder="Enter Your E-mail"
            value={email}
            onChangeText={setEmail}
            icon={
              <Icons.At
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />

          <Input
            placeholder="Enter Your Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            icon={
              <Icons.Lock
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />

          <Input
            placeholder="Confirm Your Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            icon={
              <Icons.Lock
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />

          <Button onPress={handleRegister}>
            <Typo fontWeight="700" color={colors.black} size={21}>
              Sign Up
            </Typo>
          </Button>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center items-center gap-1">
          <Typo size={15}>Already have an account?</Typo>
          <Pressable onPress={() => router.replace('/login')}>
            <Typo size={15} fontWeight="700" color={colors.primary}>
              Login
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Register
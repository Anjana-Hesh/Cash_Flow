import { Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Button from '@/components/Button'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import { useRouter } from 'expo-router'

const Welcome = () => {

    const router = useRouter();

    return (
        <ScreenWrapper>
            {/* container: flex-1, justify-between */}
            <View className="flex-1 justify-between" style={{ paddingTop: spacingY._7 }}>
                
                {/* Login button & Image container */}
                <View>
                    <TouchableOpacity 
                        onPress={() => router.push('/login')}
                        className="self-end" 
                        style={{ marginRight: spacingX._20 }}
                    >
                        <Typo fontWeight={"500"}>Sign In</Typo>
                    </TouchableOpacity>

                    <Animated.Image
                        entering={FadeIn.duration(2000)} 
                        source={require("../../assets/images/welcome.png")}
                        className="self-center"
                        style={{ width: "100%", height: verticalScale(300), marginTop: verticalScale(100) }}
                        resizeMode='contain'
                    />
                </View>

                {/* footer: bg-neutral900, items-center */}
                <View 
                    className="bg-neutral900 items-center"
                    style={{ 
                        paddingTop: verticalScale(30), 
                        paddingBottom: verticalScale(45), 
                        gap: spacingY._20,
                        // Shadow effects inline safe more than tailwind
                        shadowColor: "white",
                        shadowOffset: { width: 0, height: -10 },
                        elevation: 10,
                        shadowRadius: 25,
                        shadowOpacity: 0.15,
                    }}
                >
                    {/* Titles */}
                    <Animated.View
                        entering={FadeInDown.duration(1000).springify().damping(12)}  // Like spring morsion animation
                        className="items-center"
                    >
                        <Typo size={30} fontWeight={800}>Always take Control</Typo>
                        <Typo size={30} fontWeight={800}>of your finances</Typo>
                    </Animated.View>

                    {/* Subtitles */}
                    <Animated.View
                        entering={FadeInDown.duration(100).delay(1000).springify().damping(12)}
                        className="items-center gap-0.5"
                    >
                        <Typo size={17} color={colors.textLight}>
                            Finances must be arranged to set a better
                        </Typo>
                        <Typo size={17} color={colors.textLight}>
                            Lifestyle in future
                        </Typo>
                    </Animated.View>

                    {/* Button Container */}
                    <Animated.View
                        entering={FadeInDown.duration(200).delay(1000).springify().damping(12)} 
                        className="w-full" style={{ paddingHorizontal: spacingX._25 }}
                    >
                        <Button onPress={() => router.push('/register')}>
                            <Typo size={22} color={colors.neutral900} fontWeight={600}>
                                Get Started
                            </Typo>
                        </Button>
                    </Animated.View>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Welcome
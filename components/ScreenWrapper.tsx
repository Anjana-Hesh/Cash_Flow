import { Dimensions, Keyboard, Platform, StatusBar, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { ScreenWrapperProps } from '@/types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// const { height } = Dimensions.get('window')

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
    
    const insets = useSafeAreaInsets();
//   const paddingTop = Platform.OS === 'ios' ? height * 0.06 : StatusBar.currentHeight || 50

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        className="flex-1 bg-neutral-900"
        style={[{ marginTop: insets.top}, style]}
      >
        <StatusBar barStyle="light-content" />
        {children}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ScreenWrapper

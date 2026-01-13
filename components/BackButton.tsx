import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BackButtonProps } from '@/types'
import { useRouter } from 'expo-router'
import { CaretLeftIcon } from 'phosphor-react-native'
import { verticalScale } from '@/utils/styling'
import { colors } from '@/constants/theme'

const BackButton = ({
  style,
  iconSize = 26,
}: BackButtonProps) => {
  const router = useRouter()

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className="bg-neutral-600 self-start rounded-xl p-1 mt-1.5"
    >
      <CaretLeftIcon
        size={verticalScale(iconSize)}
        color={colors.white}
        weight="bold"
      />
    </TouchableOpacity>
  )
}

export default BackButton

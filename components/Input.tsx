import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { InputProps } from '@/types'
import { colors, radius, spacingX } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'

const Input = (props: InputProps) => {

    return (
        <View
            // Tailwind: flex-row, items-center, justify-center, border
            className="flex-row items-center justify-center border"
            style={[
                {
                    height: verticalScale(54),
                    borderColor: colors.neutral300,
                    borderRadius: radius._17,
                    borderCurve: "continuous",
                    paddingHorizontal: spacingX._15,
                    gap: spacingX._10,
                }, 
                props.containerStyle
            ]}
        >
            {props.icon && props.icon}

            <TextInput 
                // Tailwind: flex-1, text-white
                className="flex-1 text-white"
                style={[
                    {
                        fontSize: verticalScale(14),
                    },
                    props.inputStyle
                ]}
                placeholderTextColor={colors.neutral400}
                ref={props.inputRef}
                {...props} 
            />
        </View>
    )
}

export default Input;
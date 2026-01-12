import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/types'
import { colors, radius } from '@/constants/theme' // Inline styles වලට මේවා ඕනේ
import { verticalScale } from '@/utils/styling'
import Loading from './Loading'

const Button = ({
    style,
    onPress,
    loading = false,
    children
}: CustomButtonProps) => {

    if(loading){
        return(
            <View 
                className="justify-center items-center" 
                style={[{ 
                    height: verticalScale(52), 
                    borderRadius: radius._17, 
                    backgroundColor: 'transparent' 
                }, style]} 
            >
                <Loading/>
            </View>
        )
    }
    
    return (
        <TouchableOpacity 
            onPress={onPress} 
           
            className="bg-primary justify-center items-center"
            style={[{ 
                height: verticalScale(52), 
                borderRadius: radius._17,
                borderCurve: "continuous"
            }, style]}
        >
            {children}
        </TouchableOpacity>
    )
}

export default Button
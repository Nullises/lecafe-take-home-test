import { Pressable, PressableProps, TouchableOpacity, TouchableOpacityProps } from "react-native"
import React from "react"
import { LinearGradient } from "expo-linear-gradient"

interface CustomButtonProps extends TouchableOpacityProps {
    children: React.ReactElement
    colorGradientSchema: { initial: string, final: string }
}

const CustomButtonInterests = ({
    children,
    onPress,
    colorGradientSchema
}: CustomButtonProps) => {

    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
                colors={[colorGradientSchema.initial, colorGradientSchema.final]}
                start={[0.5, 0]}
                end={[0.5, 1]}
                style={{
                    padding: 15,
                    alignItems: 'center',
                    borderRadius: 50,
                    flexDirection: 'row',
                    height: 32,
                    width: 120,
                    justifyContent: 'center'
                }}
            >
                {children}
            </LinearGradient>
        </TouchableOpacity>


    )
}

export default CustomButtonInterests

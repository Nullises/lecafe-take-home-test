import { Pressable, PressableProps } from "react-native"
import React from "react"

interface CustomButtonProps extends PressableProps {
    children: React.ReactElement
    btnColor: string
    btnColorActive: string
}

const CustomButton = ({
    children,
    btnColor,
    btnColorActive,
    onPress,
}: CustomButtonProps) => {

    return (
        <Pressable
            onPress={onPress}

            style={({ pressed, hovered }) => ({
                opacity: pressed ? 0.7 : (hovered ? 0.8 : 1),
            })}
            className={`p-4 rounded-full flex justify-center items-center w-[58px] h-[58px] ${btnColor} ${btnColorActive}`}
        >
            {children}
        </Pressable>
    )
}

export default CustomButton

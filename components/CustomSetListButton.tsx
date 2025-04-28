import { Pressable, PressableProps } from "react-native"
import React from "react"

interface CustomButtonProps extends PressableProps {
    children: React.ReactElement
    selected: boolean
}

const CustomSetListButton = ({
    children,
    onPress,
    selected
}: CustomButtonProps) => {

    return (
        <Pressable
            onPress={onPress}
            className={`p-4 rounded-full flex justify-center items-center w-[58px] h-[58px] bg-buttonwhite ${selected ? 'opacity-100 border border-drawerpink' : 'opacity-60 '}  `}
        >
            {children}
        </Pressable>
    )
}

export default CustomSetListButton

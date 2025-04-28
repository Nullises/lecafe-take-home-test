import { Pressable, PressableProps } from "react-native"
import React, { useState } from "react"
import LikeWhite from "@/assets/icons/LikeWhite"
import Like from "@/assets/icons/Like"

interface CustomButtonProps extends PressableProps {
}

const CustomLikeButton = ({
    onPress,
}: CustomButtonProps) => {

    const [btnPressed, setBtnPressed] = useState(false)

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1
            })
            }
            className={`p-4 rounded-full flex justify-center items-center w-[58px] h-[58px] active:bg-buttonstrongpink bg-buttonwhite`}
        >
            {btnPressed ? (<LikeWhite />) : (<Like />)}
        </Pressable>
    )
}

export default CustomLikeButton
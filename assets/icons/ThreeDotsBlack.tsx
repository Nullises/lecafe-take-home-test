import { Image } from 'expo-image'
import React from 'react'
import threedotsblack from '../images/threedotsblack.svg'

const ThreeDotsBlack = () => {
    return (
        <Image source={threedotsblack} style={{
            width: 4,
            height: 16
        }} />
    )
}

export default ThreeDotsBlack
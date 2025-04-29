import { Image } from 'expo-image'
import React from 'react'
import xmarkblack from '../images/xmarkblack.svg'

const XMarkBlack = () => {
    return (
        <Image source={xmarkblack} style={{
            width: 14,
            height: 14
        }} />
    )
}

export default XMarkBlack
import { Image } from 'expo-image'
import React from 'react'
import xmark from '../images/xmark.svg'

const XMark = () => {
    return (
        <Image source={xmark} style={{
            width: 24,
            height: 24
        }} />
    )
}

export default XMark
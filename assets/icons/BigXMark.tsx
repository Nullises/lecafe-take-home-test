import { Image } from 'expo-image'
import React from 'react'
import bigxmark from '../images/bigxmark.svg'

const BigXMark = () => {
    return (
        <Image source={bigxmark} style={{
            width: 43,
            height: 43
        }} />
    )
}

export default BigXMark
import { Image } from 'expo-image'
import React from 'react'
import friendship from '../images/friendship.svg'

const Friendship = () => {
    return (
        <Image source={friendship} style={{
            width: 52,
            height: 52
        }} />
    )
}

export default Friendship
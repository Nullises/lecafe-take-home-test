import { Image } from 'expo-image'
import React from 'react'
import like from '../images/like.svg'

const Like = () => {
    return (
        <Image source={like} style={{
            width: 28.382976531982422,
            height: 24.680850982666016
        }} />
    )
}

export default Like
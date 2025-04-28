import { Image } from 'expo-image'
import React from 'react'
import relationship from '../images/relationship.svg'

const Relationship = () => {
    return (
        <Image source={relationship} style={{
            width: 28,
            height: 28
        }} />
    )
}

export default Relationship
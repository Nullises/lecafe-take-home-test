import { Image } from 'expo-image'
import React from 'react'
import messages from '../images/messages.svg'

const Messages = () => {
    return (
        <Image source={messages} style={{
            width: 18,
            height: 16
        }} />
    )
}

export default Messages
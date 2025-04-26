import { Image } from 'expo-image'
import React from 'react'
import profile from '../images/profile.svg'

const Profile = () => {
    return (
        <Image source={profile} style={{
            width: 15,
            height: 18
        }} />
    )
}

export default Profile
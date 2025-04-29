import { Pressable, SafeAreaView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, router, useLocalSearchParams } from 'expo-router'
import useUsers from '@/presentation/hooks/useUsers'
import { UserInterface } from '@/presentation'
import InterestsCollapsable from '@/components/InterestsCollapsable'
import { handleColorGradientSchema } from '@/presentation/utils/handleColorSchema'
import { ImageBackground } from 'expo-image'
import XMarkBlack from '@/assets/icons/XMarkBlack'
import ThreeDotsBlack from '@/assets/icons/ThreeDotsBlack'
const IMAGE_TOP_AREA_HEIGHT = 400
const absoluteFill = StyleSheet.absoluteFillObject


const Interests = () => {
    const { id, name } = useLocalSearchParams()
    const { users } = useUsers()


    const [colorGradientSchema, setColorGradientSchema] = useState<{ initial: string, final: string }>({
        initial: "",
        final: ""
    })

    useEffect(() => {
        if (name) {
            handleColorGradientSchema(name.toString(), setColorGradientSchema)
        }

    }, [name])

    const matchUser = users.find((user: UserInterface) => user.id == Number(id))

    if (!matchUser) {
        <Redirect href="/" />
    }



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ImageBackground
                source={{ uri: matchUser?.urlImg }}
                contentFit="cover"
                style={absoluteFill}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{
                        position: 'absolute',
                        top: 40,
                        left: 0,
                        right: 0,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        zIndex: 10
                    }}>
                        <Pressable onPress={() => router.back()} style={{ padding: 8 }}>
                            <XMarkBlack />
                        </Pressable>
                        <Pressable onPress={() => { }} style={{ padding: 8 }}>
                            <ThreeDotsBlack />
                        </Pressable>
                    </View>
                    <InterestsCollapsable colorGradientSchema={colorGradientSchema} matchUser={matchUser!} />
                </SafeAreaView>
            </ImageBackground>
        </View>


    )
}

export default Interests

const styles = StyleSheet.create({})
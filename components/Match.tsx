import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { UserInterface, UserLists } from '@/presentation'
import { ImageBackground } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import MatchIcon from '@/assets/icons/MatchIcon'
import { router } from 'expo-router'
import { Colors } from '@/constants/Colors'

const Match = ({
    card,
    optionSelected
}: {
    card: UserInterface
    optionSelected: string
}) => {

    const [message, setMessage] = useState<string>("")
    const absoluteFill = StyleSheet.absoluteFillObject

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={card?.urlImg}
                style={absoluteFill}
                contentFit="cover"
                transition={1000}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <View className='flex-1 flex-col items-center justify-end p-4'>
                        <MatchIcon />
                        <Text className='font-quicksand-bold text-lg text-textwhite'>New</Text>
                        <Text className='font-quicksand-bold text-xxl text-textwhite'>Match</Text>
                        <Text className='font-mavenpro-bold text-smbold text-textwhite'>¡También le gustas a {card?.name}!</Text>
                        <Text className='font-mavenpro text-sm text-textwhite mt-4 mb-4'>Estas más cerca de tener
                            {optionSelected == UserLists.FRIENDSHIP && ' su amistad'}
                            {optionSelected == UserLists.DATES && ' una cita'}
                            {optionSelected == UserLists.RELATIONSHIP && ' una relación'}
                        </Text>
                        <View className='flex justify-center mb-8'>
                            <TextInput
                                value={message}
                                onChange={(e: any) => {
                                    setMessage(e?.target?.value)
                                }}
                                style={{
                                    width: 331,
                                    height: 50,
                                    borderColor: Colors.white,
                                    borderRadius: 50,
                                    borderWidth: 1,
                                    backgroundColor: Colors.white,
                                    paddingLeft: 30,
                                    paddingRight: 30
                                }}
                                placeholder='Dile algo agradable'
                            />
                            <Pressable
                                onPress={() => setMessage("")}
                                className='active:opacity-90'
                                style={{
                                    position: 'absolute',
                                    alignSelf: 'center',
                                    alignContent: 'center',
                                    right: 30,
                                }}>
                                <Text className='font-mavenpro-bold text-sm text-textpink'>ENVIAR</Text>
                            </Pressable>
                        </View>

                        <Pressable className='active:opacity-90' onPress={() => router.push('/(drawer)/dashboard')}>
                            <Text className='font-mavenpro-bold text-smbold text-textwhite mt-4 mb-4'> Regresar a Lecafé</Text>
                        </Pressable>
                    </View>
                </SafeAreaView>


            </ImageBackground>
        </View>
    )



}

export default Match

const styles = StyleSheet.create({}) 
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, spacingY } from '@/constants/theme'
import { scale, verticalScale } from '@/utils/styling'
import ModelWrapper from '@/components/ModelWrapper'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import { Image } from 'expo-image'
import { getProfileImage } from '@/utils/imageUtile'
import * as Icons from 'phosphor-react-native';
import Typo from '@/components/Typo'
import Input from '@/components/Input'
import { UserDataType } from '@/types'
import Button from '@/components/Button'
import { useAuth } from '@/hooks/useAuth'
import { updateUser } from '@/utils/user'
import { useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';

const ProfileModel = () => {
    const { user, setUser } = useAuth();
    const [userData, setUserData] = useState<UserDataType>({
        name: "",
        image: null,
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setUserData({
            name: user?.displayName || "",
            image: user?.photoURL || null
        })
    }, [user]);

    const onPickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        // allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        });

        console.log(result);

        if (!result.canceled) {
        setUserData({...userData , image: result.assets[0] });
        }
    }

    const onSubmit = async () => {
        let { name } = userData;

        if (!name.trim()) {
            Alert.alert("User", "Please fill all the fields");
            return;
        }

        setLoading(true);
        const resp = await updateUser(user?.uid as string, userData);
        setLoading(false);

        if (resp.success) {
            // Local state eka update kirima
            if (setUser) {
                setUser({
                    ...user,
                    displayName: userData.name,
                    photoURL: userData.image
                } as any);
            }
            router.back();
        } else {
            Alert.alert("User", resp.msg);
        }
    };

    return (
        <ModelWrapper>
            {/* Main Container */}
            <View className="flex-1 justify-between px-5">
                <View>
                    <Header 
                        title='Update Profile' 
                        leftIcon={<BackButton />} 
                        style={{ marginBottom: spacingY._10 }}
                    />

                    {/* Form Section */}
                    <ScrollView 
                        contentContainerStyle={{ gap: spacingY._30, marginTop: spacingY._15 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Avatar */}
                        <View className="relative self-center">
                            <Image
                                style={{
                                    height: verticalScale(135),
                                    width: verticalScale(135),
                                    borderRadius: 100,
                                    borderWidth: 1,
                                    borderColor: colors.neutral500
                                }}
                                className="bg-neutral-300"
                                source={getProfileImage(userData.image)}
                                contentFit='cover'
                                transition={100}
                            />

                            <TouchableOpacity
                                onPress={onPickImage}
                                className="absolute bg-white rounded-full p-2 shadow-sm"
                                style={{ 
                                    bottom: spacingY._5, 
                                    right: spacingY._7,
                                    elevation: 4,
                                    shadowColor: colors.black,
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 10,
                                }}
                            >
                                <Icons.Pencil
                                    size={verticalScale(20)}
                                    color={colors.neutral800}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Name Input */}
                        <View className="space-y-2">
                            <Typo color={colors.neutral200}>Name</Typo>
                            <Input
                                placeholder='Name'
                                value={userData.name}
                                onChangeText={(value) => setUserData({ ...userData, name: value })}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>

            {/* Footer */}
            <View 
                className="flex-row items-center justify-center px-5 pt-4 border-t border-neutral-700"
                style={{ marginBottom: spacingY._5 }}
            >
                <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}> 
                    <Typo color={colors.black} fontWeight={"700"} size={18}> Update </Typo>
                </Button>
            </View>
        </ModelWrapper>
    )
}

export default ProfileModel;
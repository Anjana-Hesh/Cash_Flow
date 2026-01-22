import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, spacingY } from '@/constants/theme'
import { scale, verticalScale } from '@/utils/styling'
import ModelWrapper from '@/components/ModelWrapper'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import { Image } from 'expo-image'
import { getProfileImage, uploadFileToCloudinary } from '@/utils/imageUtile'
import * as Icons from 'phosphor-react-native';
import Typo from '@/components/Typo'
import Input from '@/components/Input'
import { UserDataType, WalletType } from '@/types'
import Button from '@/components/Button'
import { useAuth } from '@/hooks/useAuth'
import { updateUser } from '@/utils/user'
import { useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
import ImageUpload from '@/components/ImageUpload'
import { createOrUpdateWallet } from '@/utils/walletUtil'

const WalletModel = () => {
    const { user, setUser } = useAuth();
    const [wallet, setWallet] = useState<WalletType>({
        name: "",
        image: null,
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    

    const onSubmit = async () => {
        let { name, image } = wallet;

        if (!name.trim() || !image) {
            Alert.alert("Wallet", "Please fill all the fields");
            return;
        }

        setLoading(true);

        try {
            // 1. Upload to Cloudinary first
            // This converts the local URI to a permanent HTTPS URL
            const imageResp = await uploadFileToCloudinary(image, "wallets");
            
            if (!imageResp.success) {
                Alert.alert("Wallet", "Failed to upload icon.");
                setLoading(false);
                return;
            }

            // 2. Prepare final data with the Cloudinary URL
            const data: WalletType = {
                name,
                image: imageResp.data, // This is now the URL string
                uid: user?.uid
            }

            // 3. Save to Firestore
            const resp = await createOrUpdateWallet(data);

            if (resp.success) {
                router.back();
            } else {
                Alert.alert("Wallet", resp.msg);
            }
        } catch (error) {
            console.log("Update Error: ", error);
            Alert.alert("Wallet", "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModelWrapper>
            {/* Main Container */}
            <View className="flex-1 justify-between px-5">
                <View>
                    <Header 
                        title='New Wallet' 
                        leftIcon={<BackButton />} 
                        style={{ marginBottom: spacingY._10 }}
                    />

                    {/* Form Section */}
                    <ScrollView 
                        contentContainerStyle={{ gap: spacingY._30, marginTop: spacingY._15 }}
                        showsVerticalScrollIndicator={false}
                    >

                        {/* Name Input */}
                        <View className="space-y-2">
                            <Typo color={colors.neutral200}>Wallet Name</Typo>
                            <Input
                                placeholder='Salary'
                                value={wallet.name}
                                onChangeText={(value) => setWallet({ ...wallet, name: value })}
                            />
                        </View>
                        <View className="space-y-2">
                            <Typo color={colors.neutral200}>Wallet Icon</Typo>
                            {/* image input */}
                            <ImageUpload
                                file={wallet.image}
                                onClear={() => setWallet({...wallet, image: null})}
                                onSelect={file => setWallet({...wallet, image: file})} 
                                placeholder='Upload Image' 
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
                    <Typo color={colors.black} fontWeight={"700"} size={18}> Add Wallet </Typo>
                </Button>
            </View>
        </ModelWrapper>
    )
}

export default WalletModel;
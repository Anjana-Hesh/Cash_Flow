import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
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
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
import ImageUpload from '@/components/ImageUpload'
import { createOrUpdateWallet, deleteWallet } from '@/utils/walletUtil'

const WalletModel = () => {
    const { user, setUser } = useAuth();
    const [wallet, setWallet] = useState<WalletType>({
        name: "",
        image: null,
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const oldWallet: {name: string, image: string , id: string} = 
        useLocalSearchParams();
        console.log("Old wallet: ", oldWallet);

    useEffect(() => {
        if (oldWallet?.id) {
            setWallet({
                name: oldWallet?.name,
                image: oldWallet?.image,
            })
        }
    }, []);

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

            if(oldWallet?.id) data.id = oldWallet?.id;

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

    const onDelete = async () => {
        console.log("Deleting walet: ", oldWallet?.id);
        if(!oldWallet?.id) return;
        setLoading(true);
        const res =  await deleteWallet(oldWallet?.id);
        setLoading(false);

        if (res.success) {
            router.back();
        } else {
            Alert.alert("Wallet", res.msg);
        }
    }

    const showDeleteAlert = () => {
        Alert.alert(
            "Confirm", 
            "Are you sure you want to do this? \nThis action will remove all the transactions related to this wallet",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel delete"),
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => onDelete(),
                    style: "destructive"
                },
            ]
        );
    }

    return (
        <ModelWrapper>
            {/* Main Container */}
            <View className="flex-1 justify-between px-5">
                <View>
                    <Header 
                        title={oldWallet?.id ? "Update Wallet" : 'New Wallet'} 
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
                {
                    oldWallet?.id && !loading && (
                        <Button
                            onPress={showDeleteAlert}
                            style={{
                                backgroundColor: colors.rose,
                                paddingHorizontal: spacingX._15
                            }}
                        >
                            <Icons.Trash
                                color={colors.white}
                                size={verticalScale(24)}
                                weight='bold'
                            />
                        </Button>
                    )
                }
                <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}> 
                    <Typo color={colors.black} fontWeight={"700"} size={18}> 
                        {
                            oldWallet?.id ? "Uppdate Wallet" : "Add Wallet"
                        } 
                    </Typo>
                </Button>
            </View>
        </ModelWrapper>
    )
}

export default WalletModel;
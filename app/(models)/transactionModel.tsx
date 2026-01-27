import { Alert, ScrollView, StyleSheet, TouchableOpacity, View, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import ModelWrapper from '@/components/ModelWrapper'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import * as Icons from 'phosphor-react-native';
import Typo from '@/components/Typo'
import Input from '@/components/Input'
import { TransactionType, WalletType } from '@/types'
import Button from '@/components/Button'
import { useAuth } from '@/hooks/useAuth'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ImageUpload from '@/components/ImageUpload'
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { uploadFileToCloudinary } from '@/utils/imageUtile'
import { addDoc, collection, doc, Timestamp, updateDoc, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/service/firebaseConfig'
import { updateWalletBalance } from '@/utils/walletUtil'

const TransactionModel = () => {
    const { user } = useAuth();
    const router = useRouter();
    const oldTransaction: any = useLocalSearchParams();
    
    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [wallets, setWallets] = useState<WalletType[]>([]);

    const [transaction, setTransaction] = useState<TransactionType>({
        type: "expense",
        amount: 0,
        description: "",
        category: "",
        date: new Date(),
        walletId: "",
        image: null,
    });

    const transactionTypes = [
        { label: 'Expense', value: 'expense' },
        { label: 'Income', value: 'income' },
    ];

    useEffect(() => {
        if (!user?.uid) return;

        const q = query(collection(db, "wallets"), where("uid", "==", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const walletData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as WalletType[];
            setWallets(walletData);
        });

        return () => unsubscribe();
    }, [user?.uid]);

    useEffect(() => {
        if (oldTransaction?.id) {
            setTransaction({
                type: oldTransaction.type,
                amount: Number(oldTransaction.amount),
                description: oldTransaction.description || "",
                category: oldTransaction.category || "",
                date: new Date(oldTransaction.date),
                walletId: oldTransaction.walletId,
                image: oldTransaction.image || null,
            });
        }
    }, [oldTransaction]);

    const onSubmit = async () => {
        const { type, amount, description, category, date, walletId, image } = transaction;

        if (!amount || amount <= 0 || !walletId || !category) {
            Alert.alert("Missing Information", "Please enter amount, category and select a wallet.");
            return;
        }

        setLoading(true);

        try {
            let finalImageUrl = image;

            if (image && typeof image === 'object' && image.uri) {
                const uploadResp = await uploadFileToCloudinary(image, "transactions");
                if (uploadResp.success) {
                    finalImageUrl = uploadResp.data;
                }
            }

            const transactionData = {
                type,
                amount: Number(amount),
                description: description?.trim(),
                category,
                date: Timestamp.fromDate(new Date(date as any)),
                walletId,
                image: finalImageUrl,
                uid: user?.uid,
                updatedAt: Timestamp.now()
            };

            if (oldTransaction?.id) {
                await updateDoc(doc(db, "transactions", oldTransaction.id), transactionData);
            } else {
                await addDoc(collection(db, "transactions"), {
                    ...transactionData,
                    createdAt: Timestamp.now()
                });

                const res = await updateWalletBalance(walletId, Number(amount), type);

                if (!res.success) {
                    console.warn("Wallet update failed but transaction was saved.");
                }
            }

            router.back();
        } catch (error: any) {
            Alert.alert("Error", "Could not save transaction.");
        } finally {
            setLoading(false);
        }
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) setTransaction({ ...transaction, date: selectedDate });
    };

    return (
        <ModelWrapper>
            <View className="flex-1 px-5">
                <Header 
                    title={oldTransaction?.id ? "Update Transaction" : 'New Transaction'} 
                    leftIcon={<BackButton />} 
                />

                <ScrollView contentContainerStyle={{ paddingBottom: spacingY._30 }} showsVerticalScrollIndicator={false}>
                    <View className="gap-y-6 mt-4">
                        
                        {/* Transaction Type */}
                        <View className="gap-y-2">
                            <Typo color={colors.neutral200} size={16}>Type</Typo>
                            <Dropdown
                                style={[styles.dropdown, { borderColor: colors.neutral500 }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.itemText}
                                activeColor={colors.neutral700}
                                data={transactionTypes}
                                labelField="label"
                                valueField="value"
                                value={transaction.type}
                                onChange={item => setTransaction({...transaction, type: item.value as any})}
                            />
                        </View>

                        <View className="gap-y-2">
                            <Typo color={colors.neutral200} size={16}>Select Wallet</Typo>
                            <Dropdown
                                style={[styles.dropdown, { borderColor: colors.neutral500 }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.itemText}
                                activeColor={colors.neutral700}
                                data={wallets}
                                labelField="name"
                                valueField="id"
                                placeholder="Choose Wallet"
                                value={transaction.walletId}
                                onChange={item => setTransaction({...transaction, walletId: item.id as string})}
                            />
                        </View>

                        {/* Amount Input */}
                        <View className="gap-y-2">
                            <Typo color={colors.neutral200} size={16}>Amount</Typo>
                            <Input
                                placeholder="0.00"
                                keyboardType="numeric"
                                value={transaction.amount.toString()}
                                onChangeText={(val) => setTransaction({...transaction, amount: Number(val)})}
                            />
                        </View>

                        <View className="gap-y-2">
                            <Typo color={colors.neutral200} size={16}>Category</Typo>
                            <Input
                                placeholder="e.g. Food, Rent, Salary"
                                value={transaction.category}
                                onChangeText={(val) => setTransaction({...transaction, category: val})}
                            />
                        </View>

                        {/* Date Picker */}
                        <View className="gap-y-2">
                            <Typo color={colors.neutral200} size={16}>Date</Typo>
                            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
                                <Icons.CalendarBlank size={20} color={colors.neutral200} />
                                <Typo color={colors.neutral100} style={{ marginLeft: 10 }}>
                                    {(transaction.date as Date).toDateString()}
                                </Typo>
                            </TouchableOpacity>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={(transaction.date instanceof Date) ? transaction.date : new Date()}
                                    mode="date"
                                    display="default"
                                    onChange={onDateChange}
                                />
                            )}
                        </View>

                        {/* Description */}
                        <View className="gap-y-2">
                            <Typo color={colors.neutral200} size={16}>Description</Typo>
                            <Input
                                placeholder="Notes..."
                                multiline
                                containerStyle={{ minHeight: verticalScale(80), alignItems: 'flex-start' }}
                                value={transaction.description}
                                onChangeText={(val) => setTransaction({...transaction, description: val})}
                            />
                        </View>

                        {/* Image Upload */}
                        <View className="gap-y-2">
                            <Typo color={colors.neutral200} size={16}>Receipt Image</Typo>
                            <ImageUpload
                                file={transaction.image}
                                onClear={() => setTransaction({...transaction, image: null})}
                                onSelect={file => setTransaction({...transaction, image: file})} 
                                placeholder='Upload Receipt' 
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>

            {/* Footer Buttons */}
            <View className="flex-row items-center gap-x-3 px-5 py-4 border-t border-neutral-800 bg-black">
                <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}> 
                    <Typo color={colors.black} fontWeight={"700"} size={18}> 
                        {oldTransaction?.id ? "Update Transaction" : "Add Transaction"} 
                    </Typo>
                </Button>
            </View>
        </ModelWrapper>
    )
}

export default TransactionModel;

const styles = StyleSheet.create({
    dropdown: {
        height: verticalScale(54),
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 15,
        backgroundColor: colors.neutral800,
    },
    dropdownContainer: {
        backgroundColor: colors.neutral800,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.neutral500,
    },
    placeholderStyle: { color: colors.neutral400, fontSize: 16 },
    selectedTextStyle: { color: colors.neutral100, fontSize: 16 },
    itemText: { color: colors.neutral100 },
    datePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.neutral800,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.neutral500,
    }
});
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View, Platform } from 'react-native'
import React, { useState } from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import ModelWrapper from '@/components/ModelWrapper'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import * as Icons from 'phosphor-react-native';
import Typo from '@/components/Typo'
import Input from '@/components/Input'
import { TransactionType } from '@/types'
import Button from '@/components/Button'
import { useAuth } from '@/hooks/useAuth'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ImageUpload from '@/components/ImageUpload'
import { deleteWallet } from '@/utils/walletUtil'
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

const TransactionModel = () => {
    const { user } = useAuth();
    const router = useRouter();
    const oldTransaction: any = useLocalSearchParams();
    
    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
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

    const onSubmit = async () => {
        // Submit logic here
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setTransaction({ ...transaction, date: selectedDate });
        }
    };

    return (
        <ModelWrapper>
            <View className="flex-1 px-5">
                <Header 
                    title={oldTransaction?.id ? "Update Transaction" : 'New Transaction'} 
                    leftIcon={<BackButton />} 
                    style={{ marginBottom: spacingY._10 }}
                />

                <ScrollView 
                    contentContainerStyle={{ paddingBottom: spacingY._30 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View className="gap-y-6 mt-4">
                        
                        {/* Transaction Type Dropdown */}
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
                                placeholder="Select Type"
                                value={transaction.type}
                                onChange={item => setTransaction({...transaction, type: item.value as any})}
                            />
                        </View>

                        {/* Amount Input */}
                        <Input
                            placeholder="0.00"
                            keyboardType="numeric"
                            value={transaction.amount.toString()}
                            onChangeText={(val) => setTransaction({...transaction, amount: Number(val)})}
                        />

                        {/* Date Picker Section */}
                        <View className="gap-y-2">
                            <Typo color={colors.neutral200} size={16}>Date</Typo>
                            <TouchableOpacity 
                                onPress={() => setShowDatePicker(true)}
                                className="flex-row items-center bg-neutral-800 p-4 rounded-2xl border border-neutral-500"
                            >
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

                        {/* Description Input */}
                        <Input
                            placeholder="What is this for?"
                            multiline
                            containerStyle={{ minHeight: verticalScale(100), alignItems: 'flex-start', paddingTop: 10 }}
                            value={transaction.description}
                            onChangeText={(val) => setTransaction({...transaction, description: val})}
                        />

                        {/* Image Upload */}
                        <View className="gap-y-2">
                            <Typo color={colors.neutral200} size={16}>Receipt / Icon</Typo>
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
                {oldTransaction?.id && (
                    <TouchableOpacity 
                        onPress={() => {}} // Delete function
                        className="bg-rose-600 p-4 rounded-2xl"
                    >
                        <Icons.Trash color={colors.white} size={verticalScale(24)} weight='bold' />
                    </TouchableOpacity>
                )}
                
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
        overflow: 'hidden'
    },
    placeholderStyle: {
        color: colors.neutral400,
        fontSize: 16,
    },
    selectedTextStyle: {
        color: colors.neutral100,
        fontSize: 16,
    },
    itemText: {
        color: colors.neutral100,
    },
});
import { ScrollView, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Header from '@/components/Header'
import Typo from '@/components/Typo'
import { colors, spacingY } from '@/constants/theme'
import BackButton from '@/components/BackButton'

const PrivacyPolicy = () => {
    return (
        <ScreenWrapper>
            <View className="flex-1 px-5">
                {/* Header with Back Button */}
                <Header title="Privacy Policy" leftIcon={<BackButton />} />

                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}
                >
                    {/* Last Updated Date */}
                    <View className="mb-6 bg-neutral-800/50 p-4 rounded-2xl border border-neutral-700">
                        <Typo size={14} color={colors.neutral400}>
                            Last Updated: October 24, 2023
                        </Typo>
                    </View>

                    {/* Section 1: Introduction */}
                    <View className="mb-6">
                        <Typo size={20} fontWeight="700" style={{marginBottom: 2}}>Introduction</Typo>
                        <Typo size={15} color={colors.neutral400} style={{ lineHeight: 22 }}>
                            Welcome to our Expense Tracker app. We value your privacy and are committed to 
                            protecting your personal data. This policy explains how we collect, use, and 
                            safeguard your information.
                        </Typo>
                    </View>

                    {/* Section 2: Data Collection */}
                    <View className="mb-6">
                        <Typo size={20} fontWeight="700" style={{marginBottom: 2}}>Data We Collect</Typo>
                        <Typo size={15} color={colors.neutral400} style={{ lineHeight: 22 }}>
                            We may collect the following information to provide a better service:
                        </Typo>
                        <View className="mt-3 ml-2">
                            <Typo size={15} color={colors.neutral400} style={{marginBottom: 1}}>• Transaction details (Amount, Category, Date)</Typo>
                            <Typo size={15} color={colors.neutral400} style={{marginBottom: 1}}>• Account information (Email, Name)</Typo>
                            <Typo size={15} color={colors.neutral400} style={{marginBottom: 1}}>• Device information for analytics</Typo>
                        </View>
                    </View>

                    {/* Section 3: How We Use Data */}
                    <View className="mb-6">
                        <Typo size={20} fontWeight="700" style={{marginBottom: 2}}>How We Use Your Data</Typo>
                        <Typo size={15} color={colors.neutral400} style={{ lineHeight: 22 }}>
                            Your data is used solely to provide personal finance insights, synchronize 
                            your data across devices, and improve our application features. We do 
                            <Typo fontWeight="600" color={colors.rose}> NOT </Typo> sell your data to third parties.
                        </Typo>
                    </View>

                    {/* Section 4: Security */}
                    <View className="mb-6">
                        <Typo size={20} fontWeight="700" style={{marginBottom: 2}}>Data Security</Typo>
                        <View className="p-4 bg-neutral-800 rounded-2xl border border-neutral-700">
                            <Typo size={15} color={colors.neutral400} style={{ lineHeight: 22 }}>
                                We use industry-standard encryption to protect your data. All transactions 
                                and account information are stored securely on our encrypted servers.
                            </Typo>
                        </View>
                    </View>

                    {/* Section 5: Contact */}
                    <View className="mb-6 items-center py-6 border-t border-neutral-800">
                        <Typo size={16} fontWeight="600">Have questions?</Typo>
                        <Typo size={14} color={colors.neutral400} style={{marginBottom: 1}}>
                            support@expensetracker.com
                        </Typo>
                    </View>
                    
                </ScrollView>
            </View>
        </ScreenWrapper>
    )
}

export default PrivacyPolicy
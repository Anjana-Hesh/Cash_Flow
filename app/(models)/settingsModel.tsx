import { ScrollView, StyleSheet, TouchableOpacity, View, Switch } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Header from '@/components/Header'
import Typo from '@/components/Typo'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import * as Icons from 'phosphor-react-native'
import { useRouter } from 'expo-router'
import BackButton from '@/components/BackButton'
import { logout } from '@/service/authService'

const Settings = () => {
    const router = useRouter();
    const [isFaceID, setIsFaceID] = useState(true);
    const [isNotifications, setIsNotifications] = useState(true);

    // Settings Row Component (Reusable)
    const SettingItem = ({ icon: Icon, label, value, onPress, showChevron = true, color = colors.white }: any) => (
        <TouchableOpacity style={styles.row} onPress={onPress}>
            <View className="flex-row items-center gap-3">
                <View style={styles.iconContainer}>
                    <Icon size={22} color={color} weight="fill" />
                </View>
                <Typo size={16} color={color}>{label}</Typo>
            </View>
            <View className="flex-row items-center gap-2">
                {value && <Typo size={14} color={colors.neutral400}>{value}</Typo>}
                {showChevron && <Icons.CaretRight size={18} color={colors.neutral400} />}
            </View>
        </TouchableOpacity>
    );

    const handleLogout = async () => {
        try {
          await logout()
          router.replace('/welcome');
        } catch (error: any) {
          console.error("Logout Error: ", error.message);
        }
    }

    return (
        <ScreenWrapper>
            <View className="flex-1 px-5">
                <Header title="Settings" leftIcon={<BackButton />} />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}>
                    
                    {/* Account Section */}
                    <Typo size={14} color={colors.neutral400} style={styles.sectionTitle}>ACCOUNT</Typo>
                    <View style={styles.sectionBox}>
                        <SettingItem icon={Icons.User} label="Profile Details" value="John Doe" />
                        <SettingItem icon={Icons.EnvelopeSimple} label="Email" value="john@example.com" />
                    </View>

                    {/* App Preferences */}
                    <Typo size={14} color={colors.neutral400} style={styles.sectionTitle}>PREFERENCES</Typo>
                    <View style={styles.sectionBox}>
                        <SettingItem icon={Icons.CurrencyDollar} label="Currency" value="LKR (Rs.)" />
                        
                        {/* Notifications Toggle */}
                        <View style={styles.row}>
                            <View className="flex-row items-center gap-3">
                                <View style={styles.iconContainer}><Icons.Bell size={22} color={colors.white} weight="fill" /></View>
                                <Typo size={16}>Notifications</Typo>
                            </View>
                            <Switch 
                                value={isNotifications} 
                                onValueChange={setIsNotifications}
                                trackColor={{ false: colors.neutral700, true: colors.primary }}
                            />
                        </View>

                        {/* Security Toggle */}
                        <View style={styles.row}>
                            <View className="flex-row items-center gap-3">
                                <View style={styles.iconContainer}><Icons.Fingerprint size={22} color={colors.white} weight="fill" /></View>
                                <Typo size={16}>Face ID / Biometrics</Typo>
                            </View>
                            <Switch 
                                value={isFaceID} 
                                onValueChange={setIsFaceID}
                                trackColor={{ false: colors.neutral700, true: colors.primary }}
                            />
                        </View>
                    </View>

                    {/* Support & Legal */}
                    <Typo size={14} color={colors.neutral400} style={styles.sectionTitle}>SUPPORT & LEGAL</Typo>
                    <View style={styles.sectionBox}>
                        <SettingItem 
                            icon={Icons.Lock} 
                            label="Privacy Policy" 
                            onPress={() => router.push('/privacyPolicy')} 
                        />
                        <SettingItem icon={Icons.Info} label="About Us" />
                        <SettingItem icon={Icons.FileText} label="Terms of Service" />
                    </View>

                    {/* Actions */}
                    <Typo size={14} color={colors.neutral400} style={styles.sectionTitle}>ACTIONS</Typo>
                    <View style={styles.sectionBox}>
                        <SettingItem icon={Icons.ArrowSquareOut} label="Export Data (CSV)" />
                        <SettingItem 
                            icon={Icons.SignOut} 
                            label="Logout" 
                            color={colors.rose} 
                            showChevron={false} 
                            onPress={() => {handleLogout()}}
                        />
                    </View>

                </ScrollView>
            </View>
        </ScreenWrapper>
    )
}

export default Settings

const styles = StyleSheet.create({
    sectionTitle: {
        marginBottom: 10,
        marginLeft: 5,
        fontWeight: '600',
        letterSpacing: 1
    },
    sectionBox: {
        backgroundColor: colors.neutral800,
        borderRadius: radius._20,
        paddingHorizontal: 15,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: colors.neutral700,
        overflow: 'hidden'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.neutral700,
    },
    iconContainer: {
        backgroundColor: colors.neutral700,
        padding: 8,
        borderRadius: 10,
    }
})
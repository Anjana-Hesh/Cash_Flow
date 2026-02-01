import { ScrollView, StyleSheet, TouchableOpacity, View, Switch, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Header from '@/components/Header'
import Typo from '@/components/Typo'
import { colors, radius } from '@/constants/theme'
import * as Icons from 'phosphor-react-native'
import { useRouter } from 'expo-router'
import BackButton from '@/components/BackButton'
import { logout } from '@/service/authService'
import * as LocalAuthentication from 'expo-local-authentication'
import * as SecureStore from 'expo-secure-store'

const Settings = () => {
    const router = useRouter();
    const [isFaceID, setIsFaceID] = useState(false);
    const [isNotifications, setIsNotifications] = useState(true);

    // Load saved biometric preference when the screen opens
    useEffect(() => {
        loadBiometricSettings();
    }, []);

    const loadBiometricSettings = async () => {
        const enabled = await SecureStore.getItemAsync('biometric_enabled');
        setIsFaceID(enabled === 'true');
    };

    const handleBiometricToggle = async (value: boolean) => {
        // If user is turning it OFF
        if (!value) {
            await SecureStore.setItemAsync('biometric_enabled', 'false');
            setIsFaceID(false);
            return;
        }

        // If user is turning it ON
        try {
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();

            if (!hasHardware || !isEnrolled) {
                Alert.alert("Error", "Biometrics not available or setup on this device.");
                return;
            }

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Confirm Biometrics to Enable',
                fallbackLabel: 'Use Passcode',
            });

            if (result.success) {
                // Save the preference securely
                await SecureStore.setItemAsync('biometric_enabled', 'true');
                setIsFaceID(true);
                Alert.alert("Success", "Biometric authentication enabled!");
            }
        } catch (error) {
            console.error("Biometric Error: ", error);
            Alert.alert("Error", "An unexpected error occurred.");
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            router.replace('/welcome');
        } catch (error: any) {
            console.error("Logout Error: ", error.message);
        }
    }

    const SettingItem = ({ icon: Icon, label, value, onPress, showChevron = true, color = colors.white }: any) => (
        <TouchableOpacity style={styles.row} onPress={onPress}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={styles.iconContainer}>
                    <Icon size={22} color={color} weight="fill" />
                </View>
                <Typo size={16} color={color}>{label}</Typo>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                {value && <Typo size={14} color={colors.neutral400}>{value}</Typo>}
                {showChevron && <Icons.CaretRight size={18} color={colors.neutral400} />}
            </View>
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper>
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                <Header title="Settings" leftIcon={<BackButton />} />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}>
                    
                    <Typo size={14} color={colors.neutral400} style={styles.sectionTitle}>ACCOUNT</Typo>
                    <View style={styles.sectionBox}>
                        <SettingItem icon={Icons.User} label="Profile Details" value="John Doe" />
                        <SettingItem icon={Icons.EnvelopeSimple} label="Email" value="john@example.com" />
                    </View>

                    <Typo size={14} color={colors.neutral400} style={styles.sectionTitle}>PREFERENCES</Typo>
                    <View style={styles.sectionBox}>
                        <SettingItem icon={Icons.CurrencyDollar} label="Currency" value="LKR (Rs.)" />
                        
                        {/* Notifications Toggle */}
                        <View style={styles.row}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                                <View style={styles.iconContainer}>
                                    <Icons.Bell size={22} color={colors.white} weight="fill" />
                                </View>
                                <Typo size={16}>Notifications</Typo>
                            </View>
                            <Switch 
                                value={isNotifications} 
                                onValueChange={setIsNotifications}
                                trackColor={{ false: colors.neutral700, true: colors.primary }}
                            />
                        </View>

                        {/* Security Toggle */}
                        <View style={[styles.row, { borderBottomWidth: 0 }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                                <View style={styles.iconContainer}>
                                    <Icons.Fingerprint size={22} color={colors.white} weight="fill" />
                                </View>
                                <Typo size={16}>Face ID / Biometrics</Typo>
                            </View>
                            <Switch 
                                value={isFaceID} 
                                onValueChange={handleBiometricToggle}
                                trackColor={{ false: colors.neutral700, true: colors.primary }}
                            />
                        </View>
                    </View>

                    <Typo size={14} color={colors.neutral400} style={styles.sectionTitle}>SUPPORT & LEGAL</Typo>
                    <View style={styles.sectionBox}>
                        <SettingItem icon={Icons.Lock} label="Privacy Policy" onPress={() => router.push('/privacyPolicy')} />
                        <SettingItem icon={Icons.Info} label="About Us" />
                        <SettingItem icon={Icons.FileText} label="Terms of Service" />
                    </View>

                    <Typo size={14} color={colors.neutral400} style={styles.sectionTitle}>ACTIONS</Typo>
                    <View style={styles.sectionBox}>
                        <SettingItem icon={Icons.ArrowSquareOut} label="Export Data (CSV)" />
                        <SettingItem 
                            icon={Icons.SignOut} 
                            label="Logout" 
                            color={colors.rose} 
                            showChevron={false} 
                            onPress={handleLogout}
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
        letterSpacing: 1,
        textTransform: 'uppercase'
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
});
import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import Typo from './Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { scale, verticalScale } from '@/utils/styling'
import { ImageBackground } from 'expo-image'
import * as Icons from 'phosphor-react-native';
import useFetchData from '@/hooks/useFetchData'
import { WalletType } from '@/types'
import { orderBy, where } from 'firebase/firestore'
import { useAuth } from '@/hooks/useAuth'
import { useFetchTransactions } from '@/hooks/useFetchTransactions'

const HomeCard = () => {
    
    const {user} = useAuth();
    const { transactions, loading } = useFetchTransactions();
    
    const {data: wallets , error} = useFetchData<WalletType>("wallets" , [
        where("uid", "==", user?.uid),
        orderBy("created" , "desc")
    ]);

    const getTotalBalance = () =>
        wallets.reduce((total, item) => total + (item.amount || 0), 0);

    const stats = useMemo(() => {
        return transactions.reduce((acc, curr) => {
            if (curr.type === 'income') acc.income += curr.amount;
            if (curr.type === 'expense') acc.expense += curr.amount;
            return acc;
        }, { income: 0, expense: 0 });
    }, [transactions]);

    return (
        <ImageBackground
            source={require('../assets/images/card.png')}
            resizeMode='stretch'
            style={styles.bgImage}
        >
            <View style={styles.container}>
                <View>
                    <View style={styles.totalBalanceRow}>
                        {/* Total balance */}
                        <Typo color={colors.neutral800} size={17} fontWeight={"500"}>
                            Total Balance 
                        </Typo>
                        <Icons.DotsThreeOutline
                            size={verticalScale(23)}
                            color={colors.black}
                            weight='fill'
                        />
                    </View>
                    <Typo color={colors.black} size={30} fontWeight={"bold"}>
                        {/* RS: 65475.00 */}
                        RS: {getTotalBalance()?.toFixed(2)}
                    </Typo>
                </View>

                {/* Total incomes and expences */}
                <View style={styles.stats}>
                    {/* incomes */}
                    <View style={{gap: verticalScale(5)}}>
                        <View style={styles.incomeExpense}>
                            <View style={styles.statsIcon}>
                                <Icons.ArrowDownIcon
                                    size={verticalScale(15)}
                                    color={colors.black}
                                    weight='bold'
                                />
                            </View>
                            <Typo size={16} color={colors.neutral700} fontWeight={"500"}>
                                Income
                            </Typo>
                        </View>
                        <View style={{alignSelf: "center"}}>
                            <Typo size={17} color={colors.green} fontWeight={"600"}>
                                {/* RS: 6565 */}
                                RS: {stats.income?.toLocaleString()}
                            </Typo>
                        </View>
                    </View>

                    {/* Expences */}
                    <View style={{gap: verticalScale(5)}}>
                        <View style={styles.incomeExpense}>
                            <View style={styles.statsIcon}>
                                <Icons.ArrowUpIcon
                                    size={verticalScale(15)}
                                    color={colors.black}
                                    weight='bold'
                                />
                            </View>
                            <Typo size={16} color={colors.neutral700} fontWeight={"500"}>
                                Expences
                            </Typo>
                        </View>
                        <View style={{alignSelf: "center"}}>
                            <Typo size={17} color={colors.rose} fontWeight={"600"}>
                                {/* RS: 11245 */}
                                RS: {stats.expense?.toLocaleString()}
                            </Typo>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default HomeCard

const styles = StyleSheet.create({
    bgImage: {
        height: scale(210),
        width: "100%"
    },
    container: {
        padding: spacingX._20,
        paddingHorizontal: scale(20),
        height: "87%",
        width: "100%",
        justifyContent: "space-between"
    },
    totalBalanceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacingY._5
    },
    stats: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    statsIcon: {
        backgroundColor: colors.neutral350,
        padding: spacingY._5,
        borderRadius: 50
    },
    incomeExpense: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacingY._7
    }
})
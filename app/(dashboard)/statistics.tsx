import { ScrollView, StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native'
import React, { useMemo } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import Header from '@/components/Header'
import { colors } from '@/constants/theme'
import { LineChart, PieChart } from "react-native-chart-kit";
import { useFetchTransactions } from '@/hooks/useFetchTransactions'
import { expenseCategories } from '@/constants/data'

const screenWidth = Dimensions.get("window").width;

const Statistics = () => {
    const { transactions, loading } = useFetchTransactions();

    const statsData = useMemo(() => {
        
        const monthlyData = new Array(12).fill(0);
        const categoryMap: { [key: string]: number } = {};
        let totalIncome = 0;
        let totalExpense = 0;

        transactions.forEach(item => {
            const amount = Number(item.amount);
            // const date = new Date(item.date);
            let transactionDate: Date;

            if (item.date && typeof (item.date as any).toDate === 'function') {
                // Firestore Timestamp
                transactionDate = (item.date as any).toDate();
            } else if (item.date instanceof Date) {
                // Date object
                transactionDate = item.date;
            } else {
                // String or Number
                transactionDate = new Date(item.date as any);
            }
            const monthIndex = transactionDate.getMonth();

            if (item.type === 'expense') {
                totalExpense += amount;
                // Line Chart : added the values to respective month
                monthlyData[monthIndex] += amount;

                // Pie Chart : Category wise adding
                const cat = item.category || 'others';
                categoryMap[cat] = (categoryMap[cat] || 0) + amount;
            } else {
                totalIncome += amount;
            }
        });

        // Pie Chart data formattting
        const pieChartData = Object.keys(categoryMap).map(key => {
            return {
                name: expenseCategories[key as keyof typeof expenseCategories]?.label || key,
                population: categoryMap[key],
                color: expenseCategories[key as keyof typeof expenseCategories]?.bgColor || "#525252",
                legendFontColor: "#7F7F7F",
                legendFontSize: 12
            };
        });

        return {
            monthlyExpenses: monthlyData,
            pieData: pieChartData,
            netBalance: totalIncome - totalExpense,
            totalExpense
        };
    }, [transactions]);

    const lineData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                data: statsData.monthlyExpenses,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                strokeWidth: 2 
            }
        ],
    };

    const chartConfig = {
        backgroundGradientFrom: colors.neutral800,
        backgroundGradientTo: colors.neutral900,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: { borderRadius: 16 },
        propsForDots: { r: "4", strokeWidth: "2", stroke: colors.primary }
    };

    if (loading) return (
        <ScreenWrapper>
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        </ScreenWrapper>
    );

    return (
        <ScreenWrapper>
            <View className="flex-1 px-5">
                <Header title="Statistics" />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                    
                    {/* Summary Cards */}
                    <View className="flex-row justify-between mb-6 mt-4">
                        <View className="bg-neutral-800 p-4 rounded-3xl flex-1 mr-2 border border-neutral-700">
                            <Typo color={colors.neutral400} size={14}>Net Balance</Typo>
                            <Typo size={22} fontWeight="700" color={colors.white}>
                                RS: {statsData.netBalance.toLocaleString()}
                            </Typo>
                        </View>
                        <View className="bg-neutral-800 p-4 rounded-3xl flex-1 ml-2 border border-neutral-700">
                            <Typo color={colors.neutral400} size={14}>Total Expense</Typo>
                            <Typo size={22} fontWeight="700" color={colors.rose}>
                                RS: {statsData.totalExpense.toLocaleString()}
                            </Typo>
                        </View>
                    </View>

                    {/* Expense Analytics (Line Chart) */}
                    <View className="mb-8">
                        <Typo size={18} fontWeight="600" style={{marginBottom: 8}} >Monthly Expenses</Typo>
                        {/* horizontal scroll becouse of not inough space to 12 months */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>   
                            <LineChart
                                data={lineData}
                                width={screenWidth * 1.5} // width increese
                                height={220}
                                chartConfig={chartConfig}
                                bezier  // circuler line
                                style={{ borderRadius: 16, paddingRight: 20 }}
                            />
                        </ScrollView>
                    </View>

                    {/* Category Distribution (Pie Chart) */}
                    <View className="mb-8">
                        <Typo size={18} fontWeight="600" style={{marginBottom: 8}}>Category Distribution</Typo>
                        <View className="bg-neutral-800 p-4 rounded-3xl border border-neutral-700 items-center">
                            {statsData.pieData.length > 0 ? (
                                <PieChart
                                    data={statsData.pieData}
                                    width={screenWidth - 40}
                                    height={200}
                                    chartConfig={chartConfig}
                                    accessor={"population"}
                                    backgroundColor={"transparent"}
                                    paddingLeft={"15"}
                                    absolute
                                />
                            ) : (
                                <Typo color={colors.neutral400}>No expense data available</Typo>
                            )}
                        </View>
                    </View>

                </ScrollView>
            </View>
        </ScreenWrapper>
    )
}

export default Statistics;
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import Header from '@/components/Header'
import { colors} from '@/constants/theme'
import { LineChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const Statistics = () => {

    const lineData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul" , "Aug" , "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43 , 25, 67, 89, 90, 100, 120],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Line color
                strokeWidth: 2 
            }
        ],
    };

    const pieData = [
        { name: "Food", population: 40, color: "#FF6384", legendFontColor: "#7F7F7F", legendFontSize: 12 },
        { name: "Rent", population: 30, color: "#36A2EB", legendFontColor: "#7F7F7F", legendFontSize: 12 },
        { name: "Travel", population: 20, color: "#FFCE56", legendFontColor: "#7F7F7F", legendFontSize: 12 },
        { name: "Other", population: 10, color: "#4BC0C0", legendFontColor: "#7F7F7F", legendFontSize: 12 },
    ];

    const chartConfig = {
        backgroundGradientFrom: colors.neutral800,
        backgroundGradientTo: colors.neutral900,
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: { borderRadius: 16 },
        propsForDots: { r: "6", strokeWidth: "2", stroke: "#ffa726" }  // line chart dot style
    };

    return (
        <ScreenWrapper>
            <View className="flex-1 px-5">
                <Header title="Statistics" />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                    
                    {/* Summary Cards */}
                    <View className="flex-row justify-between mb-6 mt-4">
                        <View className="bg-neutral-800 p-4 rounded-3xl flex-1 mr-2 border border-neutral-700">
                            <Typo color={colors.neutral400} size={14}>Net Balance</Typo>
                            <Typo size={22} fontWeight="700" color={colors.white}>$4,500</Typo>
                        </View>
                        <View className="bg-neutral-800 p-4 rounded-3xl flex-1 ml-2 border border-neutral-700">
                            <Typo color={colors.neutral400} size={14}>Total Expense</Typo>
                            <Typo size={22} fontWeight="700" color={colors.rose}>$1,200</Typo>
                        </View>
                    </View>

                    {/* Expense Analytics (Line Chart) */}
                    <View className="mb-8">
                        <Typo size={18} fontWeight="600" style={{marginBottom: 4}} >Monthly Expenses</Typo>
                        <LineChart
                            data={lineData}
                            width={screenWidth - 40}
                            height={220}
                            chartConfig={chartConfig}
                            bezier
                            style={{ borderRadius: 16, paddingRight: 40 }}
                        />
                    </View>

                    {/* Category Distribution (Pie Chart) */}
                    <View>
                        <Typo size={18} fontWeight="600" style={{marginBottom: 4}}>Category Distribution</Typo>
                        <View className="bg-neutral-800 p-4 rounded-3xl border border-neutral-700 items-center">
                            <PieChart
                                data={pieData}
                                width={screenWidth - 40}
                                height={200}
                                chartConfig={chartConfig}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                paddingLeft={"15"}
                                absolute
                            />
                        </View>
                    </View>

                </ScrollView>
            </View>
        </ScreenWrapper>
    )
}

export default Statistics;
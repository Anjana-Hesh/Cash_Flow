import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TransactionItemProps, TransactionListType } from '@/types'
import { verticalScale } from '@/utils/styling'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import Typo from './Typo'
import { FlashList } from '@shopify/flash-list'
import Loading from './Loading'
import { expenseCategories, incomeCategory } from '@/constants/data'
import Animated, { FadeInDown } from 'react-native-reanimated'

const TransactionList = ({
    data,
    title,
    loading,
    emptyListMessage,
    onItemPress
}: TransactionListType) => {

    // const handleClick = (item: any) => {
    //     console.log("Transaction Clicked: ", item);
    // }

    return (
        <View className="gap-y-4">
            {/* Logic safely checks for title */}
            {!!title && (
                <Typo size={20} fontWeight={"500"}>{title}</Typo>
            )}

            <View style={{ minHeight: 3 }}>
                <FlashList 
                    data={data}
                    renderItem={({item, index}) => (
                        <TransactionItem 
                            item={item} 
                            index={index} 
                            handleClick={() => onItemPress && onItemPress(item)}

                        />
                    )}
                    // @ts-ignore
                    estimatedItemSize={70}
                />
            </View>

            {!loading && data?.length === 0 && (
                <Typo size={15} color={colors.neutral400} style={{marginTop: 4 , alignItems: "center"}}>
                    {emptyListMessage}
                </Typo>
            )}

            {loading && (
                <View style={{ marginTop: verticalScale(50) }}>
                    <Loading />
                </View>
            )}
        </View>
    )
}

const TransactionItem = ({
    item, 
    index, 
    handleClick
}: TransactionItemProps) => {
    const isIncome = item.type === 'income';
    const category = isIncome 
        ? incomeCategory
        : expenseCategories[item.category as keyof typeof expenseCategories] || expenseCategories.others;
    
    const IconComponent = category.icon;

    // Date Fix
    const dateDisplay = item.date instanceof Date 
        ? item.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) 
        : item.date;

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 50)
                .springify()
                .damping(14)
            }
        >
            <TouchableOpacity 
                className="flex-row items-center justify-between p-3 mb-3 bg-neutral-800"
                style={{ borderRadius: radius._17 }}
                onPress={() => handleClick(item)}
            >
                {/* Icon */}
                <View 
                    className="items-center justify-center rounded-xl"
                    style={{ 
                        height: verticalScale(44), 
                        aspectRatio: 1, 
                        backgroundColor: category.bgColor,
                    }}
                >
                    {IconComponent && (
                        <IconComponent
                            size={verticalScale(25)}
                            weight='fill'
                            color={colors.white}
                        />
                    )}
                </View>

                {/* Description & Category - No extra spaces between tags */}
                <View className="flex-1 ml-3 gap-y-1">
                    <Typo size={17}>{category.label}</Typo>
                    <Typo size={12} color={colors.neutral400} textProps={{ numberOfLines: 1 }}>
                        {item.description || "No description"}
                    </Typo>
                </View>

                {/* Amount & Date - Concatenated inside brackets to avoid error */}
                <View className="items-end gap-y-1">
                    <Typo fontWeight={"500"} color={isIncome ? colors.primary : colors.rose}>
                        {`${isIncome ? '+ ' : '- '}RS: ${item.amount}`}
                    </Typo>
                    <Typo size={13} color={colors.neutral400}>
                        {dateDisplay}
                    </Typo>
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}

export default TransactionList;
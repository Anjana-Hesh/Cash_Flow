import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import Button from '@/components/Button'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { useRouter } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import ScreenWrapper from '@/components/ScreenWrapper'
import { verticalScale } from '@/utils/styling'
import * as Icons from 'phosphor-react-native';
import HomeCard from '@/components/HomeCard'
import TransactionList from '@/components/TransactionList'
import { useFetchTransactions } from '@/hooks/useFetchTransactions'

const Home = () => {
  const router = useRouter();
  const { user } = useAuth();

  const { transactions, loading } = useFetchTransactions();

  // Search state
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // const dummyTransactions = [
  //   { id: '1', walletId: 'wallet123', amount: 2500, category: 'food', type: 'expense', date: '12 Jan', description: 'Dinner' },
  //   { id: '2', walletId: 'wallet123', amount: 50000, category: 'salary', type: 'income', date: '10 Jan', description: 'Monthly Salary' },
  //   { id: '3', walletId: 'wallet123', amount: 1200, category: 'shopping', type: 'expense', date: '08 Jan', description: 'Grocery' },
  //   { id: '4', walletId: 'wallet123', amount: 800, category: 'rent', type: 'expense', date: '05 Jan', description: 'Electricity' },
  //   { id: '5', walletId: 'wallet123', amount: 9200, category: 'groceries', type: 'expense', date: '15 Jan', description: 'Gooods' },
  // ];

  // With UseMemo can speed up filtering for large data sets
  const filteredTransactions = useMemo(() => {
    if (!searchQuery) return transactions.slice(0, 6); // Return first 6 transactions if no search query

    return transactions.filter(item => {
      const categoryMatch = item.category?.toLowerCase().includes(searchQuery.toLowerCase());
      const descriptionMatch = item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const amountMatch = item.amount?.toString().includes(searchQuery);
      
      return categoryMatch || descriptionMatch || amountMatch;
    });
  }, [searchQuery, transactions]);

  const handleTransactionClick = (item: any) => {
    router.push({
      pathname: "/transactionModel",
      params: {
        id: item.id,
        type: item.type,
        amount: item.amount.toString(),
        category: item.category,
        description: item.description,
        // Firestore date send as string
        date: item.date instanceof Date ? item.date.toISOString() : item.date,
        walletId: item.walletId,
        image: item.image
      }
    });
  };

  if (!user) return (
    <View className="flex-1 bg-black justify-center items-center">
      <Typo>Loading...</Typo>
    </View>
  );

  return (
      <ScreenWrapper>
        <View className="flex-1 px-5" style={{ marginTop: verticalScale(8) }}>
          
          {/* Header Section */}
          {!isSearching ? (
            // Nomal header
            <View className="flex-row justify-between items-center mb-2.5">
              <View className="gap-1">
                <Typo size={16} color={colors.neutral400}>Hello,</Typo>
                <Typo size={20} fontWeight={"500"}>{user?.displayName}</Typo>
              </View>
              <TouchableOpacity 
                onPress={() => setIsSearching(true)}
                className="bg-neutral-700 p-2.5 rounded-full"
              >
                <Icons.MagnifyingGlassIcon
                  size={verticalScale(22)}
                  color={colors.neutral200}
                  weight='bold'
                />
              </TouchableOpacity>
            </View>
          ) : (
          
            // Header with search bar
            <View className="flex-row items-center bg-neutral-800 p-2 rounded-2xl mb-2.5 gap-2">
              <Icons.MagnifyingGlassIcon size={20} color={colors.neutral400} style={{marginLeft: 2}} />
              <TextInput
                autoFocus
                placeholder="Search category, note, amount..."
                placeholderTextColor={colors.neutral400}
                className="flex-1 text-white text-base"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity 
                onPress={() => {
                  setIsSearching(false);
                  setSearchQuery('');
                }}
                className="p-1"
              >
                <Icons.XCircleIcon size={24} color={colors.neutral400} weight="fill" />
              </TouchableOpacity>
            </View>
          )}

          <ScrollView
            contentContainerStyle={{
              marginTop: spacingY._10,
              paddingBottom: verticalScale(120),
              gap: spacingY._25
            }}
            showsVerticalScrollIndicator={false}
          >
            {!isSearching && <HomeCard />}

            <TransactionList 
              data={filteredTransactions}
              loading={loading}
              emptyListMessage='No matching transactions found' 
              title={isSearching ? 'Search Results' : 'Recent Transactions'}
              onItemPress={handleTransactionClick}
            />
          </ScrollView>

          {/* Floating Add Button */}
          <Button 
            className="absolute items-center justify-center shadow-lg"
            style={{
              height: verticalScale(50),
              width: verticalScale(50),
              borderRadius: 100,
              bottom: verticalScale(125), 
              left: 310,
            }} 
            onPress={() => router.push("/transactionModel")}
          >
            <Icons.PlusIcon 
              color={colors.black}
              weight='bold'
              size={verticalScale(24)}
            />
          </Button>
        </View>
      </ScreenWrapper>
    )
}

export default Home;
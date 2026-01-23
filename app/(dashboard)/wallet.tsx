import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import * as Icons from 'phosphor-react-native';
import { useRouter } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import useFetchData from '@/hooks/useFetchData'
import { WalletType } from '@/types'
import { orderBy, where } from 'firebase/firestore'
import Loading from '@/components/Loading'
import WalletListItem from '@/components/WalletListItem'

const Wallet = () => {
  const router = useRouter();
  const {user} = useAuth();

  const {data: wallets , error , loading} = useFetchData<WalletType>("wallets" , [
    where("uid", "==", user?.uid),
    orderBy("created" , "desc")
  ]);

  const getTotalBalance = () =>
    wallets.reduce((total, item) => total + (item.amount || 0), 0);

  return (
    <ScreenWrapper style={{backgroundColor: colors.black}}>
      {/* Tailwind classes me wage standard View walata witharak danna */}
      <View className="flex-1 justify-between">
        
        {/* balance view */}
        <View 
          style={{ height: verticalScale(200) }}
          className="justify-center items-center"
        >
          <View className="items-center">
            <Typo size={45} fontWeight={"500"}> 
              RS: {getTotalBalance()?.toFixed(2)}
            </Typo>
            <Typo size={16} color={colors.neutral300}>
              Total Balance
            </Typo>
          </View>
        </View>

        {/* Wallets Container */}
        <View 
            className="flex-1 bg-neutral-900 px-5 pt-6"
            style={{ 
                borderTopLeftRadius: radius._30, 
                borderTopRightRadius: radius._30 
            }}
        >
          {/* header */}
          <View className="flex-row justify-between items-center mb-3">
              <Typo size={20} fontWeight={"500"}> My Wallets </Typo>
              <TouchableOpacity onPress={() => router.push("/walletModel")}>
                <Icons.PlusCircle
                  weight='fill'
                  color={colors.primary}
                  size={verticalScale(33)}
                />
              </TouchableOpacity>
          </View>

          {loading && <Loading/>}
          
          <FlatList 
            data={wallets}
            renderItem={({item, index}) => (
              <WalletListItem item={item} index={index} router={router} />
            )}
            contentContainerStyle={{ paddingVertical: 25 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Wallet
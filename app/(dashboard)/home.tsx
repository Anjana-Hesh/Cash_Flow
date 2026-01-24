// import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useEffect } from 'react'
// import Button from '@/components/Button'
// import Typo from '@/components/Typo'
// import { colors, spacingX, spacingY } from '@/constants/theme'
// import { signOut } from 'firebase/auth'
// import { auth } from '@/service/firebaseConfig'
// import Loading from '@/components/Loading'
// import { useRouter } from 'expo-router'
// import { useAuth } from '@/hooks/useAuth'
// import { logout } from '@/service/authService'
// import ScreenWrapper from '@/components/ScreenWrapper'
// import { verticalScale } from '@/utils/styling'
// import * as Icons from 'phosphor-react-native';
// import HomeCard from '@/components/HomeCard'
// import TransactionList from '@/components/TransactionList'

// const Home = () => {

//   const router = useRouter();

//   const {user} = useAuth();

//   if (!user) return <Text>Loading...</Text>;

//   console.log(user.displayName); // "Anjana heshan"
//   console.log(user.email); // "anjanaheshan676@gmail.com"
//   console.log(user.uid); // "7k6G1wJ4BxSfZg8eusOstgnTzS82"

//   return (
//     <ScreenWrapper>
//       <View style={styles.container} >

//         {/* Header -- */}
//         <View style={styles.header}>
//           <View className='gap-4'>
//             <Typo size={16} color={colors.neutral400}>
//               Hello, 
//             </Typo>
//             <Typo size={20} fontWeight={"500"}>{user?.displayName}</Typo>
//           </View>
//           <TouchableOpacity style={styles.searchIcon}>
//             <Icons.MagnifyingGlass
//               size={verticalScale(22)}
//               color={colors.neutral200}
//               weight='bold'
//             />
//           </TouchableOpacity>
//         </View>


//         <ScrollView
//           contentContainerStyle={styles.scrollViewStyle}
//           showsVerticalScrollIndicator={false}
//         >
//           {/* card */}
//           <View>
//             <HomeCard />
//           </View>

//           <TransactionList data={[1,2,3 ,4,5,6]} loading={true} emptyListMessage='No Transaction added yet' title='Recent Transaction' />
//         </ScrollView>

//         <Button style={styles.floatingButton} onPress={() => router.push("/transactionModel")}>
//           <Icons.Plus 
//              color={colors.black}
//              weight='bold'
//              size={verticalScale(24)}
//           />
//         </Button>
//       </View>
//     </ScreenWrapper>
//   )
// }

// export default Home

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: spacingX._20,
//     marginTop: verticalScale(8)
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom:spacingY._10
//   },
//   searchIcon: {
//     backgroundColor: colors.neutral700,
//     padding: spacingX._10,
//     borderRadius: 50
//   },
//   floatingButton: {
//     height: verticalScale(50),
//     width: verticalScale(50),
//     borderRadius: 100,
//     position: "absolute",
//     bottom: verticalScale(150),
//     right: verticalScale(30)
//   },
//   scrollViewStyle:{
//     marginTop: spacingY._10,
//     paddingBottom: verticalScale(100),
//     gap: spacingY._25
//   }
// })


import { ScrollView, TouchableOpacity, View } from 'react-native'
import React from 'react'
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

const Home = () => {
  const router = useRouter();
  const { user } = useAuth();

  const dummyTransactions = [
    { id: '1', walletId: 'wallet123', amount: 2500, category: 'food', type: 'expense', date: '12 Jan', description: 'Dinner' },
    { id: '2', walletId: 'wallet123', amount: 50000, category: 'salary', type: 'income', date: '10 Jan', description: 'Monthly Salary' },
    { id: '3', walletId: 'wallet123', amount: 1200, category: 'shopping', type: 'expense', date: '08 Jan', description: 'Grocery' },
    { id: '4', walletId: 'wallet123', amount: 800, category: 'utilities', type: 'expense', date: '05 Jan', description: 'Electricity' },
    { id: '5', walletId: 'wallet123', amount: 9200, category: 'utilities', type: 'expense', date: '15 Jan', description: 'Gooods' },
  ];

  if (!user) return (
    <View className="flex-1 bg-black justify-center items-center">
      <Typo>Loading...</Typo>
    </View>
  );

  return (
    <ScreenWrapper>
      <View className="flex-1 px-5" style={{ marginTop: verticalScale(8) }}>
        
        <View className="flex-row justify-between items-center mb-2.5">
          <View className="gap-1">
            <Typo size={16} color={colors.neutral400}>Hello,</Typo>
            <Typo size={20} fontWeight={"500"}>{user?.displayName}</Typo>
          </View>
          
          <TouchableOpacity className="bg-neutral-700 p-2.5 rounded-full">
            <Icons.MagnifyingGlass
              size={verticalScale(22)}
              color={colors.neutral200}
              weight='bold'
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={{
            marginTop: spacingY._10,
            paddingBottom: verticalScale(120),
            gap: spacingY._25
          }}
          showsVerticalScrollIndicator={false}
        >
          <HomeCard />

          <TransactionList 
            data={dummyTransactions} 
            loading={false}
            emptyListMessage='No Transaction added yet' 
            title='Recent Transactions' 
          />
        </ScrollView>

        <Button 
          className="absolute items-center justify-center shadow-lg"
          style={{
            height: verticalScale(50),
            width: verticalScale(50),
            borderRadius: 100,
            bottom: verticalScale(125), 
            left: 300,
          }} 
          onPress={() => router.push("/transactionModel")}
        >
          <Icons.Plus 
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
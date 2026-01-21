import { tabs } from "@/app/(dashboard)/_layout";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity, View } from "react-native";

export const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View 
      className="absolute bottom-0 left-0 right-0 px-5 pb-6"
    >
      {/* Main Tab Bar Container */}
      <View 
        className="flex-row items-center justify-around bg-neutral-900/90 border border-white/10 rounded-[32px] overflow-hidden py-3 px-3 shadow-2xl shadow-black"
        style={{ elevation: 12 }}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const tabInfo = tabs.find((tab) => tab.name === route.name);

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              activeOpacity={0.8}
              className="flex-1 items-center justify-center py-2"
            >
              {isFocused ? (
                /* Focused Tab Style */
                <View className="items-center">
                  <View 
                    className="flex-row items-center bg-indigo-600 px-5 py-3 rounded-2xl border border-indigo-400/30"
                  >
                    <MaterialIcons
                      name={tabInfo?.icon as any}
                      size={22}
                      color="#ffffff"
                    />
                    <Text className="text-white text-[11px] font-bold ml-2">
                      {tabInfo?.title}
                    </Text>
                  </View>
                </View>
              ) : (
                /* Unfocused Tab Style */
                <View className="items-center opacity-60">
                  <View className="p-2 rounded-full">
                    <MaterialIcons
                      name={tabInfo?.icon as any}
                      size={24}
                      color="#a3a3a3" // neutral-400
                    />
                  </View>
                  <Text className="text-neutral-400 text-[10px] font-semibold mt-1">
                    {tabInfo?.title}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
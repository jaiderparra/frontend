// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "SQL Personajes",
          tabBarIcon: ({ color }) => <MaterialIcons name="storage" color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "NoSQL Personajes",
          tabBarIcon: ({ color }) => <MaterialIcons name="cloud" color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}

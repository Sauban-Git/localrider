import AnimatedBackground from "@/components/animatedBackground";
import Login from "@/components/login";
import { View, Text } from "react-native";

const RiderLogin = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <AnimatedBackground />
      <Login />
    </View>
  )
}

export default RiderLogin

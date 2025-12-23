import AnimatedBackground from "@/components/animatedBackground";
import Login from "@/components/login";
import { SafeAreaView } from "react-native-safe-area-context";

const RiderLogin = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#999" }}>
      <AnimatedBackground />
      <Login />
    </SafeAreaView>
  )
}

export default RiderLogin

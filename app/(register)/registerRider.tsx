
import AnimatedBackground from "@/components/animatedBackground"
import BecomeRider from "@/components/becomeRider"
import { View } from "react-native"

const RegisterRider = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <AnimatedBackground />
      <BecomeRider />
    </View>
  )
}

export default RegisterRider;

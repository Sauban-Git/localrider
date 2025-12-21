import { useEffect } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router"

const Index = () => {

  const router = useRouter()

  useEffect(() => {
    setTimeout(() => { router.replace('/(auth)/riderlogin') }, 500)
  }, [])

  return (
    <View>
    </View>
  )
}

export default Index

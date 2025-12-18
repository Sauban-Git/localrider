import { useEffect } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router"

const Index = () => {

  const router = useRouter()

  useEffect(() => {
    router.replace('/(auth)/riderlogin')
  }, [])

  return (
    <View>
    </View>
  )
}

export default Index

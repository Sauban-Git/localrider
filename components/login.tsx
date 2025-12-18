import { useState } from "react"
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native"

const Login = () => {

  const [phoneNumber, setPhoneNumber] = useState("")
  const [isSendingOtp, setIsSendingOtp] = useState(false)

  const handleSendOtp = () => { }
  const handleVerifyOtp = () => { }
  const [isVerifyingOtp, setVerifyingOtp] = useState(false)

  return (
    <View style={{ backgroundColor: "white", justifyContent: "center", padding: 30, borderRadius: 10 }}>
      <View style={{ backgroundColor: "white", justifyContent: "center", alignContent: "center", alignItems: "center", padding: 20 }}>
        <Image source={require("@/assets/images/full_logo.png")} resizeMode="contain" style={{ width: 200, height: 50 }} />
        <Text style={{ color: "green", fontWeight: "bold", fontSize: 40 }}>Driver</Text>
        <Text style={{ textAlign: "center" }}> Sign in with your phone</Text>
      </View>

      {/* Phone Verification */}

      <Text style={{ fontSize: 14, marginBottom: 6, textAlign: "left", }}>Phone Number</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            borderRadius: 10,
            marginRight: 8,
          }}
          placeholder="10-digit number"
          keyboardType="number-pad"
          value={phoneNumber}
          maxLength={10}
          onChangeText={setPhoneNumber}
        />

        <TouchableOpacity
          disabled={
            !phoneNumber ||
            phoneNumber.length !== 10 ||
            isSendingOtp
            // || otpCooldown > 0 ||
            // otpSendCount >= MAX_OTP_REQUESTS
          }
          onPress={handleSendOtp}
          style={{
            backgroundColor: "#16a34a",
            paddingHorizontal: 14,
            paddingVertical: 10,
            borderRadius: 10,
            opacity:
              !phoneNumber ||
                phoneNumber.length !== 10 ||
                isSendingOtp
                // || otpCooldown > 0 ||
                //   otpSendCount >= MAX_OTP_REQUESTS
                ? 0.5
                : 1,
          }}
        >
          {isSendingOtp ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: "white", fontWeight: "600" }}>
              {/* {otpSendCount >= MAX_OTP_REQUESTS */}
              {/*   ? "Limit" */}
              {/*   : otpCooldown > 0 */}
              {/*     ? `Wait ${otpCooldown}s` */}
              {/* :  */}
              Send OTP
              {/* } */}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* {otpFeedback && ( */}
      <Text
        style={{
          marginTop: 6,
          color:
            // otpFeedback.type === "error"
            //   ? "red"
            //   : otpFeedback.type === "success"
            //     ? "green"
            //     : 
            "#555",
        }}
      >
        feedback Message
        {/* {otpFeedback.message} */}
      </Text>
      {/* )} */}

      {/* OTP input */}
      {/* {otpSent && ( */}
      <View style={{ marginTop: 14 }}>
        <Text style={{ marginBottom: 6 }}>Enter OTP</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              borderRadius: 10,
              marginRight: 8,
            }}
            placeholder="6-digit OTP"
            keyboardType="number-pad"
            // value={}
            maxLength={6}
          // onChangeText={}
          />

          <TouchableOpacity
            // disabled={}
            onPress={handleVerifyOtp}
            style={{
              backgroundColor: "#2563eb",
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderRadius: 10,
              opacity: 1,
            }}
          >
            {isVerifyingOtp ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={{ color: "white", fontWeight: "600" }}>Verify</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      {/* )} */}
    </View>
  )
}

export default Login

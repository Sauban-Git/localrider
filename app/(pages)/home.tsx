
import api from "@/services/api"
import { useEffect, useState, useRef } from "react"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { RideRequests } from "@/types/types"
import {
  Animated,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native"
import { reqRides } from "@/utils/placebo"

const { width } = Dimensions.get("window")

const Home = () => {

  const insets = useSafeAreaInsets()

  const [rideRequests, setRideRequests] = useState<RideRequests[] | null>(null)
  const [assigningId, setAssigningId] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [available, setAvailable] = useState(true)

  const scrollY = useRef(new Animated.Value(0)).current

  // Opacity and height interpolation for collapsing effect
  const fadeOut = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0],
    extrapolate: "clamp",
  })

  const shrinkHeight = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [180, 0], // Original card height 180 → collapses
    extrapolate: "clamp",
  })

  const setAvailability = async () => {
    try {
      const res = await api.post("/riders/availability")
      if (res.data.available) setAvailable(res.data.available)
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  const assignRide = async (rideId: string) => {
    try {
      setAssigningId(rideId)
      const res = await api.post("/riders/assign", { rideId })
      if (res.data.success) {
        // NOTE: do something here.. idk what
      }
    } catch (error) {
      console.log("Assign error:", error)
    } finally {
      setAssigningId(null)
    }
  }

  const getRideReq = async () => {
    try {
      const res = await api.get("/riders/nearby-requests")
      if (res.data.requests) setRideRequests(reqRides)
    } catch (error) {
      console.log("Error while fetching requests", error)
    }
  }

  useEffect(() => {
    getRideReq()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await getRideReq()
    setRefreshing(false)
  }

  return (
    <SafeAreaView style={styles.safe}>

      {/* AVAILABILITY */}
      <View style={{ position: "absolute", top: insets.top, left: 0, right: 0, zIndex: 10 }}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Availability</Text>
          <View style={styles.availabilityRow}>
            <Text style={styles.statusText}>
              {available ? "🟢 Online" : "⚪ Offline"}
            </Text>
            <Switch value={available} onValueChange={setAvailability} />
          </View>
        </View>
      </View>

      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: 120 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false } // height animation cannot use native driver
        )}
        scrollEventThrottle={16}
      >


        {/* ONLINE DRIVERS - Fades and shrinks */}
        <Animated.View
          style={[
            styles.card,
            {
              opacity: fadeOut,
              height: shrinkHeight,
              overflow: "hidden",
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Online Drivers Nearby</Text>

          <View style={styles.driverRow}>
            <Text style={styles.driverCount}>12 drivers online</Text>
            <Text style={styles.driverSub}>Updated from recent pings</Text>
          </View>

          {/* Map Placeholder */}
          <View style={styles.mapPlaceholder}>
            <Text style={{ color: "#999" }}>Map preview</Text>
          </View>
        </Animated.View>

        {/* NOTE: Recent ride requests */}
        <View style={[styles.card, { marginBottom: 30 }]}>
          <Text style={styles.sectionTitle}>Nearby Ride Requests</Text>

          {/* Skeleton */}
          {rideRequests === null && (
            <>
              {[1, 2, 3].map((_, i) => (
                <View key={i} style={styles.skeletonCard} />
              ))}
            </>
          )}

          {/* Empty */}
          {rideRequests && rideRequests.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🚗</Text>
              <Text style={styles.emptyTitle}>No ride requests</Text>
              <Text style={styles.emptySub}>Pull down to refresh </Text>
            </View>
          )}

          {/* List */}
          {rideRequests &&
            rideRequests.length > 0 &&
            rideRequests.map((rh) => (
              <View key={rh.id} style={styles.rideCard}>
                <View style={styles.locationRow}>
                  <Text style={styles.icon}>📍</Text>
                  <Text style={styles.rideText}>{rh.pickup}</Text>
                  <Text style={styles.icon}> {"--->"} </Text>
                  <Text style={styles.icon}>🏁</Text>
                  <Text style={styles.rideText}>{rh.dropoff}</Text>
                </View>

                <View style={styles.locationRow}></View>

                {/* Extra metadata */}
                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>🚘 {rh.rideType}</Text>
                  <Text style={styles.metaText}>{rh.distanceKm}Km.</Text>
                </View>

                <View style={styles.footer}>
                  <View style={styles.fareBadge}>
                    <Text style={styles.fareText}>₹{rh.fare}</Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.assignBtn,
                      assigningId === rh.id && { opacity: 0.7 },
                    ]}
                    disabled={assigningId === rh.id}
                    onPress={() => assignRide(rh.id)}
                  >
                    {assigningId === rh.id ? (
                      <ActivityIndicator color="#FFF" size="small" />
                    ) : (
                      <Text style={styles.assignText}>Assign</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111",
  },

  availabilityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statusText: {
    fontSize: 15,
    fontWeight: "600",
  },

  driverRow: {
    marginBottom: 12,
  },

  driverCount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },

  driverSub: {
    fontSize: 13,
    color: "#777",
  },

  mapPlaceholder: {
    height: 120,
    backgroundColor: "#EEE",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  rideCard: {
    backgroundColor: "#F9F9F9",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  icon: {
    marginRight: 8,
  },

  rideText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#222",
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  metaText: {
    fontSize: 12,
    color: "#666",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  fareBadge: {
    backgroundColor: "#E8F7EE",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  fareText: {
    color: "#1E8E3E",
    fontWeight: "700",
  },

  viewText: {
    color: "#007AFF",
    fontWeight: "600",
  },

  emptyState: {
    alignItems: "center",
    marginTop: 40,
  },
  emptyIcon: {
    fontSize: 36,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  emptySub: {
    fontSize: 13,
    color: "#999",
  },

  skeletonCard: {
    height: 90,
    backgroundColor: "#EEE",
    borderRadius: 16,
    marginBottom: 12,
  },
  assignBtn: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  assignText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 13,
  },
})


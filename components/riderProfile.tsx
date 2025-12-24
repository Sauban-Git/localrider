
import api from "@/services/api";
import { useRiderInfoStore } from "@/stores/ridersInfoStore";
import { ridinghistory as placeboHistory } from "@/utils/placebo";
import { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, ScrollView } from "react-native";

const RiderProfile = () => {

  const id = useRiderInfoStore((state) => state.id);
  const name = useRiderInfoStore((state) => state.name);
  const phone = useRiderInfoStore((state) => state.phone);
  const vehicle_type = useRiderInfoStore((state) => state.vehicle_type);
  const avatarUrl = useRiderInfoStore((state) => state.avatarUrl);
  const status = useRiderInfoStore((state) => state.status);

  const rider = { id, name, phone, vehicle_type, avatarUrl, status }
  const isRejected = rider.status === 'rejected';
  const isPending = rider.status === 'pending';
  const [ridinghistory, setRidingHistory] = useState<{ id: string, pickup: string, dropoff: string, fare: number, status: string, createdAt: string }[]>(placeboHistory)

  const getRidingHistory = async () => {
    try {
      const res = await api.get("/riders/history")
      console.log("hist: ", res.data)
      if (res.data.rides) {
        setRidingHistory(placeboHistory)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRidingHistory()
  }, [])

  return (
    <View style={styles.container}>
      {/* Profile Card */}
      <View style={styles.card}>
        <View style={styles.center}>
          <Image
            source={rider.avatarUrl ? { uri: rider.avatarUrl } : require("@/assets/images/logo.png")}
            resizeMode="contain"
            style={styles.avatar}
          />
          <Text style={styles.nameText}>{rider.name}</Text>

          <View style={{ width: "100%", marginTop: 16 }}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>ID</Text>
              <Text style={styles.infoValue}>{rider.id}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone </Text>
              <Text style={styles.infoValue}>{rider.phone}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Vehicle </Text>
              <Text style={styles.infoValue}>{rider.vehicle_type}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Ride History */}
      {/* NOTE: Status indicator if application is pending or rejected */}
      {(rider.status === "verified" || rider.status === null) ?
        <View style={[styles.card, { flex: 1 }]}>
          <Text style={styles.sectionTitle}>Ride History</Text>

          <ScrollView style={{ flex: 1, paddingBottom: 20 }}>
            {ridinghistory.map((rh) => (
              <View key={rh.id} style={styles.historyRow}>
                <Text style={styles.rideTitle}>
                  {`${rh.pickup} → ${rh.dropoff}`}
                </Text>
                <Text style={styles.rideSub}>
                  {`${rh.status} • ₹${rh.fare} • ${new Date(rh.createdAt).toLocaleDateString()}`}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
        :
        <View style={[styles.card, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
          <View
            style={[
              styles.circle,
              isRejected ? styles.rejectedCircle : isPending ? styles.pendingCircle : {}
            ]}
          >
            <Text style={styles.icon}>
              {isRejected ? '✕' : isPending ? '⏳' : '-'}
            </Text>
          </View>

          <Text
            style={[
              styles.statusText,
              isRejected ? styles.rejectedText : isPending ? styles.pendingText : {},
            ]}
          >
            {isRejected ? 'Application Rejected' : isPending ? 'Application Pending' : 'No Status'}
          </Text>
        </View>
      }



    </View>
  );
};

export default RiderProfile;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    paddingTop: 60,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  center: {
    alignItems: "center",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 999,
    borderWidth: 1,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  infoLabel: { color: "#555" },
  infoValue: { fontWeight: "500", color: "#222" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  historyRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  rideTitle: { fontWeight: "600", color: "#222" },
  rideSub: { color: "#777", marginTop: 2 },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  pendingCircle: {
    backgroundColor: '#FFF3CD', // yellow
  },
  rejectedCircle: {
    backgroundColor: '#F8D7DA', // red
  },
  icon: {
    fontSize: 32,
    fontWeight: '700',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  pendingText: {
    color: '#856404',
  },
  rejectedText: {
    color: '#721C24',
  },
});


import { create } from "zustand"
interface RiderInfo {
  id: string | null
  name: string | null
  phone: string | null
  vehicle_type: string | null
  avatarUrl: string | null
  status: "verified" | "pending" | "rejected" | "not_registered" | null
  setRiderInfo: ({ id, name, phone, vehicle_type, avatarUrl, status }: { id: string, name: string, phone: string, vehicle_type: string, avatarUrl: string, status: "verified" | "pending" | "rejected" | "not_registered" | null }) => void
}
export const useRiderInfoStore = create<RiderInfo>((set) => ({
  id: null,
  name: null,
  phone: null,
  vehicle_type: null,
  avatarUrl: null,
  status: null,
  setRiderInfo: ({ id, name, phone, vehicle_type, avatarUrl, status }:
    { id: string, name: string, phone: string, vehicle_type: string, avatarUrl: string, status: "verified" | "pending" | "rejected" | "not_registered" | null }) => set({
      id,
      name,
      phone,
      vehicle_type,
      avatarUrl,
      status,
    }),
}))

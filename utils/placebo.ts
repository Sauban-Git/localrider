import api from "@/services/api"

export const ridinghistory = [
  {
    id: "R001",
    pickup: "Downtown Mall",
    dropoff: "Central Park",
    fare: 12.5,
    status: "completed",
    createdAt: "2025-12-10T09:15:00Z"
  },
  {
    id: "R002",
    pickup: "Airport Terminal 2",
    dropoff: "Sunset Avenue",
    fare: 28.75,
    status: "completed",
    createdAt: "2025-12-11T18:42:00Z"
  },
  {
    id: "R003",
    pickup: "City Library",
    dropoff: "North High School",
    fare: 8.2,
    status: "cancelled",
    createdAt: "2025-12-12T14:05:00Z"
  },
  {
    id: "R004",
    pickup: "Tech Park",
    dropoff: "Riverwalk Apartments",
    fare: 15.9,
    status: "completed",
    createdAt: "2025-12-13T20:30:00Z"
  },
  {
    id: "R005",
    pickup: "Main Street Station",
    dropoff: "Greenwood Plaza",
    fare: 10.0,
    status: "pending",
    createdAt: "2025-12-14T07:50:00Z"
  }
];

export const getRidingHistory = async () => {
  try {

    const res = await api.get("/riders/history")
    const ridingHistory = res.data.rides
    return ridingHistory
  } catch (error) {
    console.log("errror: ", error)
    const ridingHistory: any = []
    return ridingHistory
  }
}

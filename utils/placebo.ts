import { RideRequests } from "@/types/types";

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


export const reqRides: RideRequests[] = [
  {
    id: "a9f3k2",
    pickup: "Downtown",
    dropoff: "Airport",
    fare: 25.5,
    rideType: "solo",
    distanceKm: "18"
  },
  {
    id: "m4x8q1",
    pickup: "Mall",
    dropoff: "University",
    fare: 12.0,
    rideType: "sharing",
    distanceKm: "6"
  },
  {
    id: "z7p2n9",
    pickup: "Station",
    dropoff: "City Center",
    fare: 10.75,
    rideType: "solo",
    distanceKm: "5"
  },
  {
    id: "c8w5r0",
    pickup: "Hospital",
    dropoff: "Residential Area",
    fare: 15.0,
    rideType: "sharing",
    distanceKm: "9"
  },
  {
    id: "b1e6t7",
    pickup: "Office Park",
    dropoff: "Mall",
    fare: 8.5,
    rideType: "solo",
    distanceKm: "4"
  },
  {
    id: "k9s3d4",
    pickup: "Airport",
    dropoff: "Hotel",
    fare: 20.0,
    rideType: "solo",
    distanceKm: "14"
  },
  {
    id: "u5h2y8",
    pickup: "Beach",
    dropoff: "Cafe Street",
    fare: 9.25,
    rideType: "sharing",
    distanceKm: "3.5"
  },
  {
    id: "j6n0m4",
    pickup: "Library",
    dropoff: "Sports Complex",
    fare: 11.0,
    rideType: "solo",
    distanceKm: "7"
  },
  {
    id: "x2v9l1",
    pickup: "Tech Park",
    dropoff: "Metro Station",
    fare: 6.75,
    rideType: "sharing",
    distanceKm: "3"
  },
  {
    id: "q7f8a6",
    pickup: "Old Town",
    dropoff: "Museum",
    fare: 7.5,
    rideType: "solo",
    distanceKm: "4.2"
  }
];


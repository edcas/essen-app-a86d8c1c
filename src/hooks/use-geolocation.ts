import { useState, useCallback } from "react";

const OFFICE_LOCATION = { lat: 19.4326, lng: -99.1332 };
const GEOFENCE_RADIUS_METERS = 200;

function getDistanceMeters(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export type GeolocationStatus = "idle" | "loading" | "in-range" | "out-of-range" | "error";

export function useGeolocation() {
  const [status, setStatus] = useState<GeolocationStatus>("idle");
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  const checkLocation = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      setStatus("loading");
      if (!navigator.geolocation) { setStatus("error"); resolve(false); return; }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLat(latitude);
          setUserLng(longitude);
          const dist = getDistanceMeters(latitude, longitude, OFFICE_LOCATION.lat, OFFICE_LOCATION.lng);
          setDistance(Math.round(dist));
          if (dist <= GEOFENCE_RADIUS_METERS) { setStatus("in-range"); resolve(true); }
          else { setStatus("out-of-range"); resolve(false); }
        },
        () => { setStatus("error"); resolve(false); },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  }, []);

  return { status, userLat, userLng, distance, officeLat: OFFICE_LOCATION.lat, officeLng: OFFICE_LOCATION.lng, radius: GEOFENCE_RADIUS_METERS, checkLocation };
}

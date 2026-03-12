import { useState, useRef } from "react";
import { View, Text, Button, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";

export default function App() {

  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);

  const cameraRef = useRef<any>(null);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const picture = await cameraRef.current.takePictureAsync();
      setPhoto(picture.uri);
    }
  };

  const getLocation = async () => {

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Permiso de ubicación denegado");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };

  if (!permission) {
    return <Text>Solicitando permisos...</Text>;
  }

  if (!permission.granted) {
    return <Button title="Permitir Cámara" onPress={requestPermission} />;
  }

  return (
    <View style={{ marginTop: 50, alignItems: "center" }}>

      <Text>App con Cámara y GPS</Text>

      <CameraView
        ref={cameraRef}
        style={{ width: 300, height: 300 }}
      />

      <Button title="Tomar Foto" onPress={takePhoto} />

      {photo && (
        <Image
          source={{ uri: photo }}
          style={{ width: 200, height: 200 }}
        />
      )}

      <Button title="Obtener Ubicación" onPress={getLocation} />

      {location && (
        <Text>
          Lat: {location.latitude} {"\n"}
          Lon: {location.longitude}
        </Text>
      )}

    </View>
  );
}
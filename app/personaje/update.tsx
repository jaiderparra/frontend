import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { useRouter, useLocalSearchParams } from "expo-router";
import { API_SQL, API_NOSQL } from "../../constants/api";

export default function UpdatePersonaje() {
  const [personaje, setPersonaje] = useState({ nombre: "", edad: "", altura: "", peso: "", imagen: "" });
  const router = useRouter();
  const { id, type } = useLocalSearchParams();
  const api = type === "sql" ? API_SQL : API_NOSQL;

  useEffect(() => {
    axios
      .get(`${api}/id/${id}`)
      .then((res) => setPersonaje(res.data))
      .catch(() => Alert.alert("Error", "No se pudo cargar el personaje"));
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(`${api}/${id}`, personaje);
      Alert.alert("Éxito", "Personaje actualizado correctamente");
      router.back();
    } catch (err) {
      Alert.alert("Error", "No se pudo actualizar el personaje");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {["nombre", "edad", "altura", "peso", "imagen"].map((campo) => (
        <TextInput
          key={campo}
          placeholder={campo}
          value={personaje[campo]?.toString()}
          onChangeText={(t) => setPersonaje({ ...personaje, [campo]: t })}
          style={{ borderBottomWidth: 1, marginBottom: 12 }}
        />
      ))}
      <Button title="Actualizar" onPress={handleUpdate} />
    </View>
  );
}

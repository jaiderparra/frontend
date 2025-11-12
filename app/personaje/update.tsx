import React, { useEffect, useState } from "react";
import { View, TextInput, Button } from "react-native";
import axios from "axios";
import { useRouter, useLocalSearchParams } from "expo-router";
import { API_SQL, API_NOSQL } from "../../constants/api";

export default function UpdatePersonaje() {
  const [personaje, setPersonaje] = useState({ nombre: "", edad: "", altura: "", peso: "", imagen: "" });
  const router = useRouter();
  const { id, type } = useLocalSearchParams();

  const api = type === "sql"
    ? `${API_SQL}/id/${id}` // ✅ SQL obtiene por ID
    : `${API_NOSQL}/${id}`; // ✅ NoSQL ya usa esta ruta

  useEffect(() => {
    axios
      .get(api)
      .then((res) => setPersonaje(res.data))
      .catch(() => alert("Error al cargar personaje"));
  }, []);

  const handleUpdate = async () => {
    try {
      const updateApi = type === "sql" ? `${API_SQL}/${id}` : `${API_NOSQL}/${id}`;
      await axios.put(updateApi, personaje);
      alert("✅ Personaje actualizado");
      router.back();
    } catch {
      alert("Error al actualizar");
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

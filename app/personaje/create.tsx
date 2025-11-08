import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { useRouter, useLocalSearchParams } from "expo-router";
import { API_SQL, API_NOSQL } from "../../constants/api";

export default function CreatePersonaje() {
  const [personaje, setPersonaje] = useState({ nombre: "", edad: "", altura: "", peso: "", imagen: "" });
  const router = useRouter();
  const { type } = useLocalSearchParams();

  const handleSave = async () => {
    const api = type === "sql" ? API_SQL : API_NOSQL;
    try {
      await axios.post(api, personaje);
      window.alert("Éxito Personaje creado correctamente");
      router.back();
    } catch (err) {
      window.alert("Error No se pudo crear el personaje");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {["nombre", "edad", "altura", "peso", "imagen"].map((campo) => (
        <TextInput
          key={campo}
          placeholder={campo}
          value={personaje[campo]}
          onChangeText={(t) => setPersonaje({ ...personaje, [campo]: t })}
          style={{ borderBottomWidth: 1, marginBottom: 12 }}
        />
      ))}
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
}

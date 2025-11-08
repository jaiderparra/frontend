// components/PersonajeForm.tsx
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

export default function PersonajeForm({ onSubmit, initialData = {} }) {
  const [form, setForm] = useState({
    nombre: initialData.nombre || "",
    edad: initialData.edad || "",
    altura: initialData.altura || "",
    peso: initialData.peso || "",
    imagen: initialData.imagen || "",
  });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  return (
    <View style={styles.container}>
      {["nombre", "edad", "altura", "peso", "imagen"].map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={field.toUpperCase()}
          value={form[field]}
          onChangeText={(v) => handleChange(field, v)}
        />
      ))}
      <Button title="Guardar" onPress={() => onSubmit(form)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});

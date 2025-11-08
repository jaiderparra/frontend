// components/PersonajeCard.tsx
import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";

export default function PersonajeCard({ personaje, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: personaje.imagen }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{personaje.nombre}</Text>
        <Text>Edad: {personaje.edad}</Text>
        <Text>Altura: {personaje.altura}</Text>
        <Text>Peso: {personaje.peso}</Text>

        <View style={styles.buttons}>
          <Button title="Editar" onPress={() => onEdit(personaje)} />
          <Button title="Eliminar" color="red" onPress={() => onDelete(personaje.id || personaje._id)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
});

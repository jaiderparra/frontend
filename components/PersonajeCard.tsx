import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function PersonajeCard({ personaje, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: personaje.imagen }} style={styles.img} />
      <Text style={styles.name}>{personaje.nombre}</Text>
      <Text style={styles.detail}>Edad: {personaje.edad}</Text>
      <Text style={styles.detail}>Altura: {personaje.altura}</Text>
      <Text style={styles.detail}>Peso: {personaje.peso}</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.btnOrange} onPress={onEdit}>
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRed} onPress={onDelete}>
          <Text style={styles.btnText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#FF6600",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
  img: { width: "100%", height: 200, borderRadius: 10, marginBottom: 10 },
  name: { color: "#FF6600", fontSize: 20, fontWeight: "bold" },
  detail: { color: "#fff", marginBottom: 4 },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  btnOrange: { backgroundColor: "#FF6600", padding: 8, borderRadius: 8, flex: 1, marginRight: 5 },
  btnRed: { backgroundColor: "#FF3333", padding: 8, borderRadius: 8, flex: 1, marginLeft: 5 },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});

// app/(tabs)/index.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import axios from "axios";
import { API_SQL } from "../../constants/api";

export default function SQLPersonajes() {
  const [personaje, setPersonaje] = useState({
    nombre: "",
    edad: "",
    altura: "",
    peso: "",
    imagen: "",
  });
  const [busqueda, setBusqueda] = useState("");
  const [personajeEncontrado, setPersonajeEncontrado] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔍 Buscar personaje por nombre (ruta corregida)
  const fetchByName = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_SQL}/nombre/${encodeURIComponent(busqueda.trim())}`);
      console.log("🔍 Resultado búsqueda:", res.data);

      if (Array.isArray(res.data) && res.data.length > 0) {
        setPersonajeEncontrado(res.data[0]);
      } else {
        alert("⚠️ No se encontró ningún personaje con ese nombre");
        setPersonajeEncontrado(null);
      }
    } catch (err) {
      console.error("❌ Error al buscar:", err);
      alert("❌ Personaje no encontrado o error al buscar");
      setPersonajeEncontrado(null);
    } finally {
      setLoading(false);
    }
  };

  // ➕ Crear personaje
  const crearPersonaje = async () => {
    try {
      await axios.post(API_SQL, personaje);
      alert("✅ Personaje creado con éxito");
      setPersonaje({ nombre: "", edad: "", altura: "", peso: "", imagen: "" });
    } catch {
      alert("❌ Error al crear personaje");
    }
  };

  // ✏️ Actualizar personaje encontrado
  const actualizarPersonaje = async () => {
    try {
      await axios.put(`${API_SQL}/${personajeEncontrado.id}`, personajeEncontrado);
      alert("✅ Personaje actualizado correctamente");
    } catch {
      alert("❌ No se pudo actualizar");
    }
  };

  // 🗑️ Eliminar personaje
  const eliminarPersonaje = async () => {
    if (!confirm("¿Eliminar este personaje?")) return;
    try {
      await axios.delete(`${API_SQL}/${personajeEncontrado.id}`);
      setPersonajeEncontrado(null);
      alert("🗑️ Personaje eliminado");
    } catch {
      alert("❌ Error al eliminar");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎯 CRUD Personajes SQL</Text>

      {/* 🔎 BUSCAR */}
      <View style={styles.card}>
        <TextInput
          placeholder="Buscar personaje por nombre"
          placeholderTextColor="#888"
          value={busqueda}
          onChangeText={setBusqueda}
          style={styles.input}
        />
        <TouchableOpacity style={styles.btnOrange} onPress={fetchByName}>
          <Text style={styles.btnText}>Buscar</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#FF6600" style={{ marginTop: 10 }} />}

        {/* Mostrar personaje encontrado */}
        {personajeEncontrado && (
          <View style={styles.resultBox}>
            <Text style={styles.personajeName}>{personajeEncontrado.nombre}</Text>
            <Text style={styles.info}>Edad: {personajeEncontrado.edad}</Text>
            <Text style={styles.info}>Altura: {personajeEncontrado.altura}</Text>
            <Text style={styles.info}>Peso: {personajeEncontrado.peso}</Text>

            {personajeEncontrado.imagen ? (
              <Image
                source={{ uri: personajeEncontrado.imagen }}
                style={styles.personajeImg}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.info}>Sin imagen</Text>
            )}

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.btnOrange} onPress={actualizarPersonaje}>
                <Text style={styles.btnText}>Actualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnRed} onPress={eliminarPersonaje}>
                <Text style={styles.btnText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* ➕ CREAR NUEVO */}
      <View style={[styles.card, { marginTop: 30 }]}>
        <Text style={styles.subtitle}>➕ Crear nuevo personaje</Text>
        {["nombre", "edad", "altura", "peso", "imagen"].map((campo) => (
          <TextInput
            key={campo}
            placeholder={campo}
            placeholderTextColor="#888"
            value={personaje[campo]}
            onChangeText={(t) => setPersonaje({ ...personaje, [campo]: t })}
            style={styles.input}
          />
        ))}
        <TouchableOpacity style={styles.btnOrange} onPress={crearPersonaje}>
          <Text style={styles.btnText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  title: {
    color: "#FF6600",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: { color: "#FF6600", fontSize: 18, fontWeight: "600", marginBottom: 10 },
  card: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#FF6600",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 8,
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#FF6600",
  },
  btnOrange: {
    backgroundColor: "#FF6600",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  btnRed: {
    backgroundColor: "#FF3333",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  resultBox: { marginTop: 15, borderTopWidth: 1, borderTopColor: "#333", paddingTop: 15 },
  personajeName: { color: "#FF6600", fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  info: { color: "#fff", fontSize: 14, marginBottom: 4 },
  personajeImg: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#FF6600",
  },
  actionRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
});

// app/(tabs)/about.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { API_NOSQL, API_SQL } from "../../constants/api";
import PersonajeCard from "../../components/PersonajeCard";

export default function NoSQLPersonajes() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevoPersonaje, setNuevoPersonaje] = useState({
    nombre: "",
    edad: "",
    altura: "",
    peso: "",
    imagen: "",
  });

  const router = useRouter();

  // 🔄 Cargar personajes desde NoSQL
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_NOSQL);
      console.log("NoSQL GET:", res.data);
      setPersonajes(Array.isArray(res.data) ? res.data : (res.data.data ?? [res.data]));
    } catch (err) {
      console.error("Error NoSQL:", err);
      if (typeof window !== "undefined") window.alert("Error cargando NoSQL: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Eliminar personaje
  const deletePersonaje = async (id) => {
    const confirmed = window.confirm("¿Deseas eliminar este personaje (NoSQL)?");
    if (!confirmed) return;

    try {
      await axios.delete(`${API_NOSQL}/${id}`);
      fetchData();
    } catch (err) {
      console.error("Error eliminando NoSQL:", err);
      if (typeof window !== "undefined") window.alert("No se pudo eliminar (NoSQL)");
    }
  };

  // ➕ Crear personaje (desde SQL)
  const crearPersonajeSQL = async () => {
    try {
      if (
        !nuevoPersonaje.nombre ||
        !nuevoPersonaje.edad ||
        !nuevoPersonaje.altura ||
        !nuevoPersonaje.peso ||
        !nuevoPersonaje.imagen
      ) {
        window.alert("⚠️ Todos los campos son obligatorios");
        return;
      }

      await axios.post(API_SQL, nuevoPersonaje);
      window.alert("✅ Personaje creado correctamente (SQL)");
      setNuevoPersonaje({ nombre: "", edad: "", altura: "", peso: "", imagen: "" });
      fetchData();
    } catch (err) {
      console.error("Error creando personaje SQL:", err);
      window.alert("❌ Error al crear personaje SQL");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return <ActivityIndicator size="large" color="#FF6600" style={{ marginTop: 50 }} />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌌 Personajes NoSQL HUNTERxHUNTER</Text>

      {/* ➕ CREAR NUEVO PERSONAJE */}
      <View style={styles.card}>
        <Text style={styles.subtitle}>➕ Crear nuevo personaje (SQL)</Text>
        {["nombre", "edad", "altura", "peso", "imagen"].map((campo) => (
          <TextInput
            key={campo}
            placeholder={campo}
            placeholderTextColor="#888"
            value={nuevoPersonaje[campo]}
            onChangeText={(t) => setNuevoPersonaje({ ...nuevoPersonaje, [campo]: t })}
            style={styles.input}
          />
        ))}

        <TouchableOpacity style={styles.btnOrange} onPress={crearPersonajeSQL}>
          <Text style={styles.btnText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      {/* 🔥 LISTA DE PERSONAJES NoSQL */}
      <FlatList
        data={personajes}
        keyExtractor={(item) => item._id?.toString() ?? Math.random().toString()}
        renderItem={({ item }) => (
          <PersonajeCard
            personaje={item}
            onEdit={() => router.push(`/personaje/update?id=${item._id}&type=nosql`)}
            onDelete={() => deletePersonaje(item._id)}
          />
        )}
        style={{ marginTop: 20 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffffff", padding: 16 },
  title: {
    color: "#FF6600",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    color: "#FF6600",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
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
  btnText: { color: "#fff", fontWeight: "bold" },
});

// app/(tabs)/index.tsx
import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Button, Alert } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { API_SQL } from "../../constants/api";
import PersonajeCard from "../../components/PersonajeCard";

export default function SQLPersonajes() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_SQL);
      console.log("SQL GET:", res.data);
      setPersonajes(Array.isArray(res.data) ? res.data : (res.data.data ?? [res.data]));
    } catch (err) {
      console.error("Error SQL:", err);
      if (typeof window !== "undefined") window.alert("Error cargando SQL: " + (err.message || err));
      else Alert.alert("Error", "No se pudieron cargar los personajes SQL");
    } finally {
      setLoading(false);
    }
  };

  const deletePersonaje = async (id) => {
    // usar window.confirm en navegador, Alert en mobile (fallback)
    const confirmed = (typeof window !== "undefined")
      ? window.confirm("¿Deseas eliminar este personaje (SQL)?")
      : await new Promise((res) => Alert.alert("Eliminar", "¿Deseas eliminar este personaje?", [
          { text: "Cancelar", style: "cancel", onPress: () => res(false) },
          { text: "Eliminar", onPress: () => res(true) }
        ]));

    if (!confirmed) return;

    try {
      await axios.delete(`${API_SQL}/${id}`);
      fetchData();
    } catch (err) {
      console.error("Error eliminando SQL:", err);
      if (typeof window !== "undefined") window.alert("No se pudo eliminar (SQL)");
      else Alert.alert("Error", "No se pudo eliminar el personaje (SQL)");
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Agregar personaje (SQL)" onPress={() => router.push("/personaje/create?type=sql")} />
      <FlatList
        data={personajes}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        renderItem={({ item }) => (
          <PersonajeCard
            personaje={item}
            onEdit={() => router.push(`/personaje/update?id=${item.id}&type=sql`)}
            onDelete={() => deletePersonaje(item.id)}
          />
        )}
      />
    </View>
  );
}

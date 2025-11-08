import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Button } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { API_NOSQL } from "../../constants/api";
import PersonajeCard from "../../components/PersonajeCard";

export default function NoSQLPersonajes() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Agregar personaje (NoSQL)" onPress={() => router.push("/personaje/create?type=nosql")} />
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
      />
    </View>
  );
}

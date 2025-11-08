// app/personaje/edit/[id].tsx
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import PersonajeForm from "../../../components/PersonajeForm";

export default function EditPersonaje() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [personaje, setPersonaje] = useState(null);

  useEffect(() => {
    axios.get(`hunterxhunter-backendsql-production-eeb5.up.railway.app/personajes/${id}`)
      .then(res => setPersonaje(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (data) => {
    try {
      await axios.put(`hunterxhunter-backendsql-production-eeb5.up.railway.app/api/personajes/${id}`, data);
      router.push("/(tabs)/");
    } catch (error) {
      console.error(error);
    }
  };

  if (!personaje) return null;

  return <PersonajeForm onSubmit={handleSubmit} initialData={personaje} />;
}

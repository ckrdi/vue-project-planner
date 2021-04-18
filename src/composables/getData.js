import { ref } from "vue";

const getData = () => {
  const projects = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      const res = await fetch("http://localhost:3000/projects");
      if (!res.ok) {
        throw Error("no data available");
      }
      projects.value = await res.json();
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };
  return { projects, error, load };
};

export default getData;

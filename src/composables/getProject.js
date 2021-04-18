import { ref } from "vue";

const getProject = (id) => {
  const project = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      const res = await fetch("http://localhost:3000/projects/" + id);
      project.value = await res.json();
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };
  return { project, error, load };
};

export default getProject;

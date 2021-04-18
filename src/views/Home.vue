<template>
  <div class="home" v-if="projects.length">
    <div v-for="project in projects" :key="project.id">
      <SingleProject :project="project" />
    </div>
  </div>
</template>

<script>
import getData from "../composables/getData";
import SingleProject from "../components/SingleProject.vue";

export default {
  name: "Home",
  components: {
    SingleProject,
  },
  // data() {
  //   return {
  //     projects: [],
  //   };
  // },
  // mounted() {
  //   fetch("http://localhost:3000/projects")
  //     .then((res) => res.json())
  //     .then((data) => (this.projects = data))
  //     .catch((err) => console.log(err));
  // },
  setup() {
    const { projects, error, load } = getData();
    load();
    return { projects, error };
  },
};
</script>

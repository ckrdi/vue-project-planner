<template>
  <div class="home" v-if="projects.length">
    <Filternav @filterChange="filterChange" :current="current" />
    <div v-for="project in filteredProjects" :key="project.id">
      <SingleProject :id="project.id" @delete="deleteProject" />
    </div>
  </div>
</template>

<script>
import getData from "../composables/getData";
import SingleProject from "../components/SingleProject.vue";
import Filternav from "../components/Filternav.vue";

export default {
  name: "Home",
  components: {
    SingleProject,
    Filternav,
  },
  data() {
    return {
      current: "all",
    };
  },
  methods: {
    filterChange(by) {
      this.current = by;
    },
    deleteProject(id) {
      this.projects = this.projects.filter((project) => {
        return project.id !== id;
      });
    },
  },
  computed: {
    filteredProjects() {
      if (this.current === "completed") {
        return this.projects.filter((project) => project.complete);
      }
      if (this.current === "ongoing") {
        return this.projects.filter((project) => !project.complete);
      }
      return this.projects;
    },
  },
  setup() {
    const { projects, error, load } = getData();
    load();
    return { projects, error };
  },
};
</script>

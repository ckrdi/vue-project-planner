<template>
  <div class="home" v-if="projects.length">
    <div v-for="project in projects" :key="project.id">
      <SingleProject :id="project.id" @delete="deleteProject" />
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
  methods: {
    deleteProject(id) {
      this.projects = this.projects.filter((project) => {
        return project.id !== id;
      });
    },
  },
  setup() {
    const { projects, error, load } = getData();
    load();
    return { projects, error };
  },
};
</script>

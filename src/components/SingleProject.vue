<template>
  <div class="project" :class="{ complete: project.complete }">
    <div class="actions">
      <h3 @click="toggleDetails">{{ project.title }}</h3>
      <div>
        <router-link :to="{ name: 'EditProject', params: { id: id } }">
          <button class="btn">Edit</button>
        </router-link>

        <button @click="deleteProject" class="btn">Delete</button>
        <button v-if="!project.complete" @click="toggleComplete" class="btn">
          Done
        </button>
        <button v-if="project.complete" @click="toggleComplete" class="btn">
          Not Done
        </button>
      </div>
    </div>
    <div class="details" v-if="showDetails">
      <p>{{ project.details }}</p>
    </div>
  </div>
</template>

<script>
import getProject from "../composables/getProject";

export default {
  props: ["id"],
  setup(props) {
    const { project, error, load } = getProject(props.id);
    load();
    return { project, error };
  },
  data() {
    return {
      showDetails: false,
    };
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
    deleteProject() {
      this.$emit("delete", this.project.id);
      fetch(`http://localhost:3000/projects/${this.project.id}`, {
        method: "DELETE",
      });
    },
    toggleComplete() {
      this.$emit("toggle", this.project.id);
      this.project.complete = !this.project.complete;

      fetch(`http://localhost:3000/projects/${this.project.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          ...this.project,
          complete: this.project.complete,
        }),
      });
    },
  },
};
</script>

<style>
.project {
  margin: 20px auto;
  background: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #e90074;
}
h3 {
  cursor: pointer;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.complete {
  border-left: 4px solid #00ce89;
}
</style>

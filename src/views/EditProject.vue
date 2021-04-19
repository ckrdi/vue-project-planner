<template>
  <form @submit.prevent="handleSubmit">
    <label>Title:</label>
    <input type="text" required v-model="project.title" />
    <label>Details:</label>
    <textarea required v-model="project.details"></textarea>
    <button>Save Project</button>
  </form>
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
  methods: {
    handleSubmit() {
      const updateProject = {
        ...this.project,
        title: this.project.title,
        details: this.project.details,
      };
      fetch(`http://localhost:3000/projects/${this.project.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(updateProject),
      })
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
form {
  background: white;
  padding: 20px;
  border-radius: 10px;
}
label {
  display: block;
  color: #bbb;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 20px 0 10px 0;
}
input {
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}
textarea {
  border: 1px solid #ddd;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
}
form button {
  display: block;
  margin: 20px auto 0;
  background: #00ce89;
  color: white;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  font-size: 16px;
}
</style>

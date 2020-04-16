<template>
  <MonacoEditor
    :options="codeEditor.options"
    v-model="code"
    language="javascript"
    class="editor"
    ref="tutorial"
  />
</template>

<script>
import MonacoEditor from "vue-monaco";

export default {
  name: "Tutorial",
  components: {
    MonacoEditor
  },
  mounted() {
    setTimeout(this.resizeEditor, 200);
  },
  methods: {
    resizeEditor: function() {
      this.$refs.tutorial.getEditor().layout();
    }
  },
  computed: {
    codeEditor() {
      return {
        options: {
          wordWrap: "on",
          dragAndDrop: true,
          minimap: { enabled: false }
        }
      };
    }
  },
  data() {
    return {
      code:
        "class App extends Component { \n constructor() { /n super(); \n this.state = { \n name: 'React' \n }; \n }"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.editor {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <MonacoEditor
    :options="codeEditor.options"
    v-model="code"
    language="javascript"
    class="editor"
    ref="editor"
  />
</template>

<script>
import MonacoEditor from "vue-monaco";

export default {
  name: "Editor",
  components: {
    MonacoEditor
  },
  mounted() {
    setTimeout(this.resizeEditor, 200);
  },
  methods: {
    resizeEditor: function() {
      this.$refs.editor.getEditor().layout();
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
        "import React, { Component } from 'react'; \nimport {render } from 'react-dom'; \nimport './style.css' \n\nrender() { \n    return ( \n        <div> \n            <Hello name={this.state.name} /> \n            <p>Start editing to see some magic happen :)</p>\n        </div>\n    );\n}"
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

<template>
  <MonacoEditor
    :options="codeEditor.options"
    v-model="code"
    language="javascript"
    class="editor"
    ref="editor"
    @editorDidMount="editorDidMount"
  />
</template>

<script>
import MonacoEditor from "vue-monaco";

export default {
  name: "Editor",
  components: {
    MonacoEditor
  },
  props: ["selectedTextFromTutorial", "mousePos"],
  mounted() {
    setTimeout(this.resizeEditor, 200);
    window.addEventListener("mouseup", this.pasteDrop);
    window.addEventListener("mousemouse", this.mouseCursorForInsert);
  },
  methods: {
    resizeEditor: function() {
      this.$refs.editor.getEditor().layout();
    },
    editorDidMount(editor) {
      editor.onMouseMove(e => {
        this.mouseCursorForInsert(e);
      });
      editor.onMouseDown(() => {
        this.mouseDown = true;
      });
      editor.onMouseUp(e => {
        this.pasteDrop(e);
      });
    },

    pasteDrop: function() {
      if (this.selectedTextFromTutorial !== "" && this.mouseDown === true) {
        let editor = this.$refs.editor.getEditor();
        let id = { major: 1, minor: 1 };

        let op = {
          identifier: id,
          range: this.insertRange,
          text: this.selectedTextFromTutorial,
          forceMoveMarkers: true
        };
        editor.executeEdits("my-source", [op]);
        this.mouseDown = false;
      }
    },
    mouseCursorForInsert: function(e) {
      if (this.selectedTextFromTutorial !== "" && e.target) {
        this.mouseDown = true;
        let editor = this.$refs.editor.getEditor();
        let position = {
          lineNumber: e.target.position.lineNumber,
          column: e.target.position.column
        };
        editor.setPosition(position);
        editor.focus();
        this.insertPos = position;
        this.insertRange = e.target.range;
      }
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
      insertRange: {},
      insertPos: {},
      mouseDown: false,
      selectedText: "",
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

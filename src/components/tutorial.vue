<template>
  <MonacoEditor
    :options="codeEditor.options"
    v-model="code"
    language="javascript"
    class="editor"
    ref="tutorial"
    @editorDidMount="editorDidMount"
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
    },
    editorDidMount(editor) {
      editor.onDidChangeCursorSelection(e => {
        this.getSelection(e);
      });
      editor.onMouseDown(() => {
        this.mouseDown = true;
      });
      editor.onMouseUp(() => {
        this.mouseDown = false;
      });

      editor.onMouseLeave(e => {
        if (this.mouseDown === true && this.selectedText !== "") {
          let copyBlockDiv = document.createElement("div");
          copyBlockDiv.id = "copyBlock";
          copyBlockDiv.className = "block";
          copyBlockDiv.textContent = this.selectedText;
          copyBlockDiv.style.background = "transparent";
          copyBlockDiv.style.color = "lightGrey";
          copyBlockDiv.style.top = e.event.posy + "px";
          copyBlockDiv.style.left = e.event.posx + "px";
          copyBlockDiv.style.zIndex = "99";
          copyBlockDiv.style.padding = "10px";
          copyBlockDiv.style.width = "300px";
          copyBlockDiv.style.position = "absolute";
          document.getElementsByTagName("body")[0].appendChild(copyBlockDiv);
          this.mouseDown = false;
        }
      });
    },
    getSelection: function() {
      let editor = this.$refs.tutorial.getEditor();
      let selectedText = editor
        .getModel()
        .getValueInRange(editor.getSelection());
      this.selectedText = selectedText;
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
      mouseDown: false,
      selectedText: "",
      code:
        'class App extends Component {\n  constructor() {\n    super();\n    this.state = {\n      name: "React"\n    };\n  }\n}'
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

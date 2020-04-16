<template>
  <div class="container">
    <splitpanes horizontal class="default-theme" style="height: 100vh">
      <pane class="" max-size="8" size="4">
        <div class="topPaneContainer">
          <div class="menuItem" @click="showEditor = true">
            <img class="paneIcon" src="../assets/editorIcon.png" />
            <div class="menuText">Editor</div>
          </div>
          <div class="menuItem" @click="showTutorial = true">
            <img class="paneIcon" src="../assets/tutorialIcon.png" />
            <div class="menuText">Tutorial</div>
          </div>
        </div>
      </pane>
      <pane>
        <splitpanes
          class="default-theme"
          @ready="resizeEditor"
          @resize="resizeEditor"
        >
          <pane class="leftPane" v-if="showEditor" ref="editorPane">
            <div class="buttonContainer" ref="button">
              <img
                src="../assets/close.png"
                class="close"
                @click="showEditor = false"
              />
            </div>

            <Editor ref="editor" />
          </pane>
          <pane class="rightPane" v-if="showTutorial" ref="tutorialPane">
            <div class="buttonContainer">
              <img
                src="../assets/close.png"
                class="close"
                @click="showTutorial = false"
              />
            </div>
            <Tutorial ref="tutorial" />
          </pane>
        </splitpanes>
      </pane>
    </splitpanes>
  </div>
</template>

<script>
import Editor from "./editor";
import Tutorial from "./tutorial";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

export default {
  name: "Main",
  components: {
    Editor,
    Tutorial,
    Splitpanes,
    Pane
  },
  methods: {
    resizeEditor: function() {
      this.$refs.editor.$children[0].getEditor().layout();
      this.$refs.tutorial.$children[0].getEditor().layout();
    }
  },
  data() {
    return {
      showEditor: true,
      showTutorial: true
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.splitpanes__pane {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2) inset;
  justify-content: center;
  align-items: center;
  display: flex;
}

.splitpanes--vertical > .splitpanes__splitter {
  min-width: 6px;
  background: linear-gradient(90deg, #ccc, #111);
}

.splitpanes--horizontal > .splitpanes__splitter {
  min-height: 16px;
  background: linear-gradient(0deg, #ccc, #111);
}
.container {
  width: 100%;
  height: 100vh;
}
.menuItem {
  cursor: pointer;
  display: flex;
  font-size: 18px;
  font-weight: bold;
  align-items: center;
}
.paneIcon {
  height: 18px;
  padding: 0px 10px;
}
.close {
  height: 18px;
  width: 18px;
  cursor: pointer;
  padding: 5px 10px;
}

.buttonContainer {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  flex: 1;
  max-height: 20px;
  min-height: 20px;
  height: 20px;
  padding: 10px 0px;
  background: #f1f2f1;
}
.bottomContainer {
  display: flex;
  flex: 1;
  width: 100%;
}

.topPaneContainer {
  background: #b1b3b2;
  padding: 10px;
  height: 100%;
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: flex-end;
}
.rightPaneContainer {
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
.leftPaneContainer {
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
.leftPane {
  width: 100%;
  height: 100%;
  flex-direction: column;
  background: #eaebea;
}
.rightPane {
  width: 100%;
  height: 100%;
  flex-direction: column;
  background: #eaebea;
}
.editor {
  width: 100%;
  height: 100%;
}
</style>

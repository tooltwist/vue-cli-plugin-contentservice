<template>
  <div id="app">
    <button class="button is-primary" @click="toggleEdit">Toggle Editing</button>
    <br/>
    <br/>
    <content-layout-editor :editable="editable" :contentId="anchor" :editShortcut="true" ref="editor">
    </content-layout-editor>
  </div>
</template>

<script>
export default {
  name: 'ContentServiceExample',
  data: function () {
    return {
      leftPane: false,
      editable: true,
      anchor: 'contentservice.example.layout',
    }
  },
  methods: {
    toggleEdit: function() {
      this.$refs.editor.toggleEditMode()
    }
  }
}
</script>

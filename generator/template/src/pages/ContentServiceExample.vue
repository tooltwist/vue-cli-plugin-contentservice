<template>
  <div id="app">
    <content-layout-editor :editable="editable" :anchor="anchor">
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
  }
}
</script>

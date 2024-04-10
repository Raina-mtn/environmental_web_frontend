<template>
  <div class="h-full">
    <tagsView />
    <router-view style="height: calc(100% - 40px);" />
  </div>
</template>
<script>
import tagsView from "@/components/TagsView";
export default {
  components:{tagsView}
}
</script>

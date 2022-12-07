<template>
  <ScrollView>
    <StackLayout>
      <label class="h1">Maps</label>
      <label class="h2">{{currentMap.areaName}}</label>
      <Image :src="currentMap.areaMap" stretch="aspectFit" height="500" class="m-t-30"/>
      <GridLayout columns="*,*,*,*,*,*" rows="*" height="100">
        <Button v-for="map in maps" :id="maps.indexOf(map)" :col="maps.indexOf(map)" row="1" :text="map.char"
                @tap="changeMap(map)" :key="maps.indexOf(map)"></Button>
      </GridLayout>
    </StackLayout>
  </ScrollView>
</template>

<script>

export default {
  name: "MapPage",
  data(){
    return {
      "maps": this.$store.state.areas,
      "currentMap": this.$store.state.areas[0],
    }
  },

  methods: {
    changeMap(map){
      this.currentMap = map;
    }
  },
}
</script>

<style scoped lang="scss">
  @import "app/app-common";

  .selected{
    background-color: $complementary;
  }
</style>

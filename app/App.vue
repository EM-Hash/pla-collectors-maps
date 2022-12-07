<template>
  <Page class="page">
    <ActionBar title="PLA Maps" class="action-bar" />
    <StackLayout>
      <label class="h1">Pokemon Legends Arceus</label>
      <label class="h2">Collectors' Maps</label>
      <Button text="Maps" @tap="goToMapPage"></Button>
      <Button text="Caught Pokemon" @tap="goToPokemonPage"></Button>
      <Button text="Settings" @tap="goToSettingsPage"></Button>
      <Button text="Help" @tap="goToHelpPage"></Button>
      <Label alignSelf="baseline" textWrap="true" class="text-muted">Pokemon is property of Nintendo. Maps and locations sourced from game8.co</Label>
    </StackLayout>
  </Page>

</template>

<script>
import ContentPage from "~/pages/ContentPage";
import CaughtPokemonPage from "~/pages/CaughtPokemonPage";
export default {
  name: "App",
  data() {
    return {
    }
  },
  methods: {
    goToMapPage(){
      this.goToContentPage(0)
    },
    goToSettingsPage(){
      this.goToContentPage(2)
    },
    goToHelpPage(){
      this.goToContentPage(3);
    },
    goToContentPage(index){
      this.$navigateTo(ContentPage, {
        props: {currentIndex: index}
      });
    },
    goToPokemonPage(){
      this.goToContentPage(1)
    }
  },
}
</script>

<style scoped lang="scss">
@import "app/app-common";

Page{
  background-color: $primary;
  color: $primary-dark;
}

Button{
  background-color: $background;
  color: $primary;
}

Button:pressed{
  background-color: #d0c19c;
}

StackLayout{
  margin-left: 10px;
}

.h1, .h2{
  color: $primary-dark;
}
</style>

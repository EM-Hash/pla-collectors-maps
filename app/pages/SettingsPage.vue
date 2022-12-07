<template>
  <Page>
      <StackLayout>
        <GridLayout height="10%" rows="*" columns="*, auto">
          <label row="0" col="0" class="h1">Settings</label>
          <Button row="0" col="1" text="Save" @tap="save" />
        </GridLayout>
        <ScrollView height="90%">
          <GridLayout rows="*" columns="auto, *">
            <Label class="p-x-10" row="0" col="0" :text="settings.theme.text + ':'" />
            <ListPicker row="0" col="1" :items="themes" :selectedIndex="themeIndex" v-model="settings.theme.value">

            </ListPicker>
          </GridLayout>
        </ScrollView>
      </StackLayout>
  </Page>
</template>

<script>
export default {
  name: "SettingsPage",
  data(){
    let settings = this.$store.state.settings;
    return {
      "settings": {
        "theme": {text: "Theme", value: settings.theme},
        "isLight": {text: "Light Mode", value: settings.isLight},
        "defaultMap": {text: "Default Map", value: settings.defaultMap},
      },
      "themes": [
          "Default", "Lilligant"
      ],
      "themeIndex": 0,
      "pokemon": "",
    }
  },

  mounted(){
    this.load();
  },

  methods: {
    save(){
      let settings = this.settings;
      this.$store.commit("saveSettings", {
        theme: settings.theme.value,
        isLight: settings.isLight.value,
        defaultMap: settings.defaultMap.value,
      });
      console.log("New settings:", this.$store.state.settings);
      this.load();
    },

    load(){
      let newSettings = this.$store.state.settings;
      this.settings.theme.value = newSettings.theme;
      this.settings.isLight.value = newSettings.isLight;
      this.settings.defaultMap.value = newSettings.defaultMap;
    },

    reset(){
      this.settings = {
        "theme": {text: "Theme", value: "default"},
        "isLight": {text: "Light Mode", value: true},
        "defaultMap": {text: "Default Map", value: "Jubilife Village"},
      }
    },
  }
}
</script>

<style scoped>

</style>

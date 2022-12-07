<template>
  <Page>
    <ActionBar title="PLA Maps" class="action-bar">
      <NavigationButton text="Return" android.systemIcon="ic_menu_back" @tap="$navigateBack"/>
    </ActionBar>
    <TabView :selectedIndex="currentIndex" height="100%" androidTabsPosition="bottom">
      <TabViewItem title="Map">
        <MapPage></MapPage>
      </TabViewItem>
      <TabViewItem title="Pokemon">
        <CaughtPokemonPage></CaughtPokemonPage>
      </TabViewItem>
      <TabViewItem title="Settings">
        <SettingsPage></SettingsPage>
      </TabViewItem>
      <TabViewItem title="Help">
        <HelpPage></HelpPage>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
import MapPage from "~/pages/MapPage";
import SettingsPage from "~/pages/SettingsPage";
import HelpPage from "~/pages/HelpPage";
import CaughtPokemonPage from "~/pages/CaughtPokemonPage";
export default {
  name: "ContentPage",
  components: {CaughtPokemonPage, HelpPage, SettingsPage, MapPage},
  props: {
    "currentIndex": 0,
  },
}
</script>

<style scoped>

</style>

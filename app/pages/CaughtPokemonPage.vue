<template>
  <Page>
    <StackLayout>
      <GridLayout columns="*,auto" rows="*" height="10%">
        <label col="0" class="h1">Pokemon Caught in {{currentArea.areaName}}</label>
        <Button col="1" text="Add Pokemon" @tap="addPokemon" />
      </GridLayout>
      <GridLayout columns="*,*,*,*,*,*" rows="*" height="10%">
        <Button v-for="(area, index) of areas" :id="area.id" :col="index" row="1" :text="area.char"
                @tap="changeList(area)" :key="area.id"></Button>
      </GridLayout>
      <ScrollView height="80%">
        <ListView height="100%" v-for="pokemon in caughtPokemon">
          <v-template>
            <Label :text="pokemon.name" />
          </v-template>
        </ListView>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
import Pokemon from "~/models/Pokemon";

export default {
  name: "CaughtPokemonPage",
  data(){
    return {
      "areas": this.$store.state.areas,
      currentArea: this.$store.state.areas[0],
    }
  },
  computed: {
    caughtPokemon(){
      return this.$store.state.pokemon.filter((pokemon) => {
        return pokemon.areaIndex === this.currentArea.id;
      });
    }
  },
  methods: {
    changeList(area){
      this.currentArea = area;
    },

    addPokemon(){
      prompt({
        title:"Add a Pokemon",
        message:"Which pokemon did you catch in " + this.currentArea.areaName,
        okButtonText: "Save",
        cancelButtonText: "Cancel",
      }).then(result => {
        //If not empty, create new pokemon & add to db
        let newPokemon = new Pokemon(result.text, "", this.currentArea.id);
        this.$store.dispatch("insertPokemon", newPokemon);
      });
    },
  }
}
</script>

<style scoped>

</style>

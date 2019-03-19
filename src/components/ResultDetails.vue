<!--suppress ALL -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="home"></ion-back-button>
          <ion-title v-if="media.data">{{media.data[0].title}}</ion-title>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <!-- Bloc image -->
    <ion-content v-if="media.data && media.data[0].media_type === 'image' && asset !== ''">
      <img :alt="media.data[0].title" :src="asset.href">
      <p>{{media.data[0].description}}</p>
    </ion-content>

    <!-- Bloc audio -->
    <ion-content v-if="media.data && media.data[0].media_type === 'audio' && asset !== ''">
      <p>{{media.data[0].description}}</p>
    </ion-content>

    <!-- Bloc video -->
    <ion-content v-if="media.data && media.data[0].media_type === 'video' && asset !== ''">
      <iframe id="nasaVideo"
              title="Inline Frame Example"
              width="auto"
              height="200"
              :src="asset.href">
      </iframe>
      <p>{{media.data[0].description}}</p>

    </ion-content>
  </ion-page>
</template>

<script>
  import NasaAPI from '../API/nasa'

  export default {
    name: 'ResultDetails',
    data () {
      return {
        media: {},
        asset: ''
      }
    },
    methods: {
      getMediaAssets () {
        let payload = {
          id: this.media.data[0].nasa_id
        }
        NasaAPI.getMediaAssets(payload)
          .then((response) => {
            switch (this.media.data[0].media_type) {
              case 'video':
                this.asset = response.data.collection.items.find(item => item.href.endsWith('mp4'))
                break
              case 'image':
                this.asset = response.data.collection.items.find(item => item.href.endsWith('jpg'))
            }

          })
          .catch((error) => {
            throw error
          })
      }
    },
    mounted () {
      this.media = this.$store.getters.getCurrentMedia
      this.getMediaAssets()
    }
  }
</script>

<style lang="scss">
  #nasaVideo {
    margin-top: 30px;
    width: 100%;
    height: 200px;
  }
</style>

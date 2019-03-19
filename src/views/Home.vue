<!--suppress ALL -->
<template>
  <ion-page class="home">
    <ion-content class="home">
      <Header></Header>
      <div class="itemDetails">
        <p>Here, you can search in Nasa's images library.</p>
      </div>
      <ion-searchbar
        class="searchbar"
        :value="searchString"
        type="text"
        @ionChange="searchChanged"/>
      <ion-button @click="queryNasa(searchString)">Search !</ion-button>
      <div v-if="data.length > 0">
        <div class="filters">
          <ion-buttons>
            <ion-button @click="switchFilter('all')">All</ion-button>
            <ion-button @click="switchFilter('videos')">Videos</ion-button>
            <ion-button @click="switchFilter('images')">Images</ion-button>
            <!-- <ion-button @click="showDialogAlert" full>Show Alert Box</ion-button>-->
          </ion-buttons>
        </div>
        <div class="itemDetails" v-for="(item, key) in dataOnScreen" :key="key" @click="openDetailsPage(item)">
          <p>{{item.data[0].title}}</p>
          <p>{{item.data[0].hashedDescription}}</p>
          <div class="keywordsList" v-if="item.data[0].keywords">
            <p>Keywords : </p>
            <p v-for="(keyWord, keywordIndex) in item.data[0].keywords" :key="keywordIndex"> {{keyWord}},</p>
          </div>

        </div>
      </div>
      <div v-else>
        <div>sorry, nothing to display</div>
      </div>
      <ion-menu-controller></ion-menu-controller>
    </ion-content>
  </ion-page>
</template>

<script>
  // @ is an alias to /src

  import Header from './header/Header'
  import resultDetails from '../components/ResultDetails'
  import NasaAPI from '../API/nasa'
  import hasModal from '@/mixins/hasModal'
  import { Plugins } from '@capacitor/core'

  const { App, Share } = Plugins

  export default {
    name: 'home',
    components: {
      //ResultDetails,
      Header
    },
    mixins: [hasModal],
    data () {
      return {
        searchString: '',
        dataOnScreen: [],
        data: [],
        images: [],
        videos: [],
        filter: '',
      }
    },
    methods: {
      async showDialogAlert () {
        await Plugins.Modals.alert({
          title: 'Alert',
          message: 'This is an example alert box'
        })
      },
      switchFilter (item) {
        this.filter = item
        switch (item) {
          case 'images':
            this.dataOnScreen = this.images

            break
          case 'videos':
            this.dataOnScreen = this.videos

            break
          case 'all':
            this.dataOnScreen = this.data
            break
          default:
            console.log('yolo')
        }
      },
      searchChanged (event) {
        this.searchString = event.target.value
      },
      openModal () {
        this.toggleModal()
      },
      openDetailsPage (item) {
        let payload = {
          media: item
        }
        this.$store.dispatch('switchCurrentMedia', payload)
          .then(() => {
            this.$router.push({ name: 'details' })
          })
      },
      queryNasa (search) {
        const infiniteScroll = document.getElementById('infinite-scroll')
        let payload = {
          search: search,
        }
        NasaAPI.searchByIndexedMetadata(payload)
          .then(res => {
            console.log(res)
            this.data = res.data.collection.items
            this.data.forEach(item => {
              item.data[0].hashedDescription = item.data[0].description.substring(0, 80) + ' ...'
              if (item.data[0].media_type === 'video') {
                this.videos.push(item)
              } else {
                this.images.push(item)
              }
              this.dataOnScreen = this.data
              this.filter = ''
            })
          })
          .catch((error) => {
            throw error
          })

      }
    },
    mounted () {
      this.modal = () => import('@/components/ResultDetails.vue')
    },
  }
</script>
<style lang="scss">
  .filters {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
  }

  .home {
    background-color: black;
  }

  .searchbar {
    padding-top: 20px;
  }

  .itemDetails {
    box-shadow: -9px 10px 25px -4px rgba(0, 0, 0, 0.26);
    margin: 25px 15px;
    padding: 15px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }

  .keywordsList {
    display: flex;
    flex-direction: row;
  }
</style>

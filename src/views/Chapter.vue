<template>
  <div class="body">
    <div align="center">
      <div v-if="images == '' && !loading">
        <div style="height:100vh">
          <h5>Wait for the next chapter release.</h5>
        </div>
      </div>
      <div v-if="!loading && images != ''" class="pt-5 col-md-7">
				<h4 style="color:white;"> {{ title }}</h4>
        <div v-for="(m, i) in images" :key="i">
          <img :src="m" class="card-img-top" referrerpolicy="no-referrer" />
        </div>
      </div>
      <div v-else>
        <div class="col-md-6 load">
          <div class="mx-auto text-load">
            <img
              class="loading-img"
              src="https://media.giphy.com/media/a6pzK009rlCak/source.gif"
              alt=""
            />
            <h5 style="color:white;">Loading images....</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="sticky-button">
      <div>
        <button class="chapter" @click="nextChapter">Next</button>
      </div>
      <div>
        <button class="chapter" @click="prevChapter">Prev</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import router from "../router";

const url = "https://warm-refuge-03594.herokuapp.com/api/chapter/";

export default {
  name: "Chapter",
  props: ["link", "mangaTitle", "lastChapter"],
  data() {
    return {
      images: [],
      title: "Sample",
      loading: false
    };
  },
  created() {
    const currentRoute = router.currentRoute.params.chapter.split("-");
    const split = currentRoute.join(" ");
    this.title = split.replace(/\w\S*/g, w =>
      w.replace(/^\w/, c => c.toUpperCase())
    );
    document.title = `${this.title}`;
    this.getImages();
  },
  methods: {
    nextChapter() {
      const currentRoute = router.currentRoute.params.chapter.split("-");
      const nextChapter = Number(currentRoute[currentRoute.length - 1]) + 1;
      currentRoute[currentRoute.length - 1] = nextChapter.toString();
      const newVal = currentRoute.join("-");
      window.scrollTo(0, 0);
      this.$nextTick(() => {
        router.replace({
          name: "Chapter",
          params: {
            chapter: newVal
          }
        });
      });
    },
    prevChapter() {
      const currentRoute = router.currentRoute.params.chapter.split("-");
      const prevChapter = Number(currentRoute[currentRoute.length - 1]) - 1;
      currentRoute[currentRoute.length - 1] = prevChapter.toString();
      const newVal = currentRoute.join("-");
      window.scrollTo(0, 0);
      this.$nextTick(() => {
        router.replace({
          name: "Chapter",
          params: {
            chapter: newVal
          }
        });
      });
    },
    selectChapter(link) {
      let chapter = link.split("/");
      let chapterNumber = chapter[chapter.length - 1];
      router.replace({
        name: "Chapter",
        params: {
          chapter: chapterNumber,
          link: this.link,
          mangaTitle: this.mangaInfo.title
        }
      });
    },
    getImages() {
			window.scrollTo(0, 0);
      this.loading = true;
      const currentRoute = router.currentRoute.params.chapter;
      axios.get(`${url}${currentRoute}`).then(resp => {
        this.images = resp.data.data;
        this.loading = false;
      });
    }
  },
  watch: {
    $route() {
      const currentRoute = router.currentRoute.name;

      if (currentRoute === "Chapter") {
        this.getImages();
        const currentTitle = router.currentRoute.params.chapter.split("-");
        const split = currentTitle.join(" ");
        this.title = split.replace(/\w\S*/g, w =>
          w.replace(/^\w/, c => c.toUpperCase())
        );
        document.title = `${this.title}`;
      } else {
        document.title = "MangaSub";
      }
    }
  }
};
</script>
<style scoped>
@media only screen and (max-width: 764px) {
  .sticky-button {
    position: static !important;
    display: inline !important;
  }
  .chapter {
    width: 100px;
    background-color: white !important;
    color: white;
    border: none;
  }
}
.load {
  height: 100em;
}
.text-load {
  padding-top: 200px;
}
.loading-img {
  height: 200px;
  border-radius: 50px;
}
.body {
  background: linear-gradient(rgba(0, 0, 0, 0.9) 100%, rgba(0, 0, 0, 0.9) 100%),
    url("../assets/bg.png");
  background-attachment: fixed;
}

.chapter {
  width: 100px;
  background-color: #1a254f;
  font-weight: 600;
  color: white;
  border: none;
}

.chapter:hover {
  background-color: #e5e5e5;
  color: #bb25e8;
}
.sticky-button {
  border-color: 1px solid white;
  display: column;
  bottom: 100px;
  position: sticky;
}
select {
  width: 100px;
  background-color: #bb25e8;
  color: white;
}
select:hover {
  background-color: white;
  color: #bb25e8;
}
option {
  font-weight: 600;
}
option:hover {
  background-color: white;
  color: #bb25e8;
}
</style>

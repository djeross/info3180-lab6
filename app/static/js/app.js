const NewsList={
  name: 'NewsList',
  template: `

    <div class="news">
      

      <div class="form-inline d-flex justify-content-center">
        <h1>News</h1>
        <br>
        <div class="form-group mx-sm-3 mb-2">
          <label class="sr-only" for="search">Search</label>
          <div id="typingbelow">
            <div class="inputandbutton">
              <input type="search" name="search" v-model="searchTerm" id="search" class="form-control mb-2 mr-sm-2" placeholder="Enter search term here" />
              <button class="btn  mb-2" @click="searchNews">Search</button>
            </div>      
            <p>You are searching for <strong>{{ searchTerm }}</strong></p>
          </div>
        </div>
      </div>

      <div id="display-news">
        <div v-for="article in articles">
          <div class="card" style="width: 20rem;">
            <div class="card-top-color"></div>
            <div><h4>{{article.title}}</h4></div>
            <img class="card-img-top articleimages" :src="article.urlToImage" :alt="article.alt"/>
            <div><p>{{article.description}}</p></div>
          </div>


        <div>
      </div>
    </div>
  `,
  created() {
    let self = this;
    fetch('https://newsapi.org/v2/top-headlines?country=us',
      {
      headers: {
      'Authorization': 'Bearer '
      }
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      self.articles = data.articles;
    });
  },
  data() {
    return {
      articles: [],
      searchTerm: ''
    }
  },
  methods: {
    searchNews() {
      let self = this;
      fetch('https://newsapi.org/v2/everything?q='+ self.searchTerm + '&language=en', {
        headers: {
        'Authorization': 'Bearer '
        }
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        self.articles = data.articles;
      });
    }
  }
};

const Home = {
  name: 'Home',
  template: `
    <div class="home">
      <img id="vueimage" src="/static/images/logo.png" alt="VueJS Logo">
      <h1>{{ welcome }}</h1>
    </div>
  `,
  data() {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  }
};

/* Add your Application JavaScript */
const app = Vue.createApp({
  data() {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  },
  components: {
    'home': Home,
    'news-list': NewsList
  }
});

app.component('app-header', {
  name: 'AppHeader',
  template: `
      <header>
          <nav class="navbar navbar-expand-lg navbar-dark  fixed-top">
            <div id="headerimagetext">
              <img id="headerimg" src="/static/images/newspaper.png" alt="VueJS Logo">
              <a class="navbar-brand" href="#">VueJS News App</a>
            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/news" class="nav-link">News</router-link>
                </li>
              </ul>
            </div>
          </nav>
      </header>    
  `,
  data: function() {
    return {};
  }
});

app.component('app-footer', {
  name: 'AppFooter',
  template: `
      <footer>
          <div class="container">
              <p>Copyright &copy {{ year }} Flask Inc.</p>
          </div>
      </footer>
  `,
  data: function() {
      return {
          year: (new Date).getFullYear()
      }
  }
})


const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/news', component: NewsList }
  ]
});

app.use(router)

app.mount('#app');
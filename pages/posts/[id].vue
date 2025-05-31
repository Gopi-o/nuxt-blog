<template>
  <div>
    <Header />
    
    <!-- Загрузка -->
    <div v-if="loading">
      <p>Загрузка данных...</p>
    </div>
    
    <!-- Пост найден -->
    <div v-else-if="post">
      <div class="post-detail">
        <div class="post-header">
          <div class="post-meta">
            <span class="post-date">
              <span class="day">{{ post.date?.day || '15' }}</span>
              <span class="month">{{ post.date?.month || 'Jun' }}</span>
              <span class="year">{{ post.date?.year || '2023' }}</span>
            </span>
            <span class="post-author">{{ post.author || 'Автор неизвестен' }}</span>
          </div>
          
          <h1 class="post-title">{{ post.title || 'Название поста' }}</h1>
          
          <div class="post-stats">
            <span class="stat-item">
              <i class="far fa-eye"></i> {{ post.views || 0 }}
            </span>
            <span class="stat-item">
              <i class="far fa-heart"></i> {{ post.likes || 0 }}
            </span>
            <span class="stat-item">
              <i class="far fa-comment"></i> {{ post.comments?.length || 0 }}
            </span>
          </div>
        </div>

        <div class="post-content">
          <div class="post-image" v-if="post.image">
            <img :src="post.image" :alt="post.title">
          </div>
          
          <div class="post-body">
            <p v-for="(paragraph, index) in post.body.split('\n')" :key="index">
              {{ paragraph }}
            </p>
          </div>
          
          <div class="post-tags" v-if="post.tags?.length">
            <span class="tag" v-for="tag in post.tags" :key="tag">
              #{{ tag }}
            </span>
          </div>
        </div>

        <div class="post-actions">
          <button class="action-btn like-btn" @click="likeBtn">
            <i :class="[isLiked ? 'fas fa-heart' : 'far fa-heart']"></i>
            {{ isLiked ? 'Понравилось' : 'Нравится' }}
          </button>
          <button class="action-btn bookmark-btn" @click="bookmarkBtn">
            <i class="far fa-bookmark"></i> Сохранить
          </button>
          <NuxtLink to="/posts" class="action-btn back-btn">
            <i class="fas fa-arrow-left"></i> Назад к статьям
          </NuxtLink>
        </div>
      </div>
      
      <div class="actions">
        <NuxtLink :to="`/posts/edit-${post.id}`" class="button">Редактировать </NuxtLink>
      </div>
      <div class="comments-section">
        <h3 class="comments-heading">Обсуждение</h3>
  
        <form class="comment-form" @submit.prevent="submitComment">
          <textarea
            v-model="newComment.text"
            placeholder="Ваш коментарий"
            class="comment-input"
            rows="3">
          </textarea>
          <button class="comment-submit"><i class="fa fa-filter"></i></button>
        </form>
      </div>

      <div class="comments-list">
        <CommentBox
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
        />
      </div>
    </div>
    
    
    <!-- Пост не найден -->
    <div v-else>
      <h2>Пост не найден</h2>
      <NuxtLink to="/posts">Вернуться к списку</NuxtLink>
    </div>
    <Footer />
  </div>
</template>

<script setup>

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase || 'http://localhost:3001'

const filteredComments = ref([])
const post = ref(null)
const loading = ref(true)
const error = ref(null)





const { data: comments } = await useLazyAsyncData(
  'comments',
  () => $fetch(`${apiBase}/comments?postId=${route.params.id}`)
)


const newComment = reactive({
  date: '2023-06-15T14:30:00',
  postId: '1',
  text: '',
  author: 'Mentos',
})

const submitComment = async () => {
  try {
    await $fetch(`${apiBase}/comments`, {
      method: 'POST',
      body: {
        postId: route.params.id,
        date: Date.now(),
        text: newComment.text,
        author: newComment.author
      }
    })
    newComment.text = '';
    await refreshNuxtData();
  } catch (error) {
   console.error('Ошибка при создании коментария:', error) 
  }
}

const isLiked = ref(false);



// Функция загрузки поста
const fetchPost = async () => {
  try {
    loading.value = true
    const response = await fetch(`${apiBase}/posts/${route.params.id}`)
    
    if (!response.ok) {
      throw new Error('Пост не найден')
    }
    
    post.value = await response.json()
  } catch (err) {
    error.value = err.message
    console.error('Ошибка загрузки:', err)
  } finally {
    loading.value = false
  }
}

const likeBtn = async () => {
  try{
    const response = await fetch(`${apiBase}/posts/${route.params.id}`)
    const post = await response.json();
    const currentLikes = post.likes || 0;

    const updatedLikes = currentLikes + 1;
    if(!isLiked.value){
      const increment = await fetch(`${apiBase}/posts/${route.params.id}`, {
        method: 'PATCH',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({
          likes: updatedLikes
        })
      })
    }
    isLiked.value = !isLiked.value;
  } catch (err) {
    console.error('Ошибка', err)
  }
}


onMounted(fetchPost)
</script>

<style scoped>
.actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 5px 10px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

a {
  color: #42b983;
  text-decoration: none;
  padding: 5px 10px;
  border: 1px solid #42b983;
  border-radius: 4px;
}
</style>
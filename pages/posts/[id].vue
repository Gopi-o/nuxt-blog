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
          <button class="action-btn like-btn">
            <i class="far fa-heart"></i> Нравится
          </button>
          <button class="action-btn bookmark-btn">
            <i class="far fa-bookmark"></i> Сохранить
          </button>
          <NuxtLink to="/posts" class="action-btn back-btn">
            <i class="fas fa-arrow-left"></i> Назад к статьям
          </NuxtLink>
        </div>

        <div class="post-comments" v-if="post.comments?.length">
          <h3 class="comments-title">Комментарии ({{ post.comments.length }})</h3>
          <div class="comment" v-for="comment in post.comments" :key="comment.id">
            <div class="comment-author">{{ comment.author }}</div>
            <div class="comment-text">{{ comment.text }}</div>
            <div class="comment-date">{{ comment.date }}</div>
          </div>
        </div>
      </div>
      
      <div class="actions">
        <NuxtLink to="/posts">← Назад</NuxtLink>
        <NuxtLink :to="`/posts/edit-${post.id}`" class="button">Редактировать </NuxtLink>
      </div>
    </div>
    
    <!-- Пост не найден -->
    <div v-else>
      <h2>Пост не найден</h2>
      <NuxtLink to="/posts">Вернуться к списку</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const post = ref(null)
const loading = ref(true)
const error = ref(null)

// Функция загрузки поста
const fetchPost = async () => {
  try {
    loading.value = true
    const response = await fetch(`http://localhost:3001/posts/${route.params.id}`)
    
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

// Загружаем данные при монтировании компонента
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
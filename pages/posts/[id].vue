<template>
  <div>
    <Header />
    
    <!-- Загрузка -->
    <div v-if="loading">
      <p>Загрузка данных...</p>
    </div>
    
    <!-- Пост найден -->
    <div v-else-if="post">
      <h1>{{ post.title }}</h1>
      <p>{{ post.body }}</p>
      
      <div class="actions">
        <NuxtLink to="/posts">← Назад</NuxtLink>
        <button @click="deletePost">Удалить</button>
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

// Функция удаления
const deletePost = async () => {
  if (confirm('Удалить этот пост?')) {
    try {
      await fetch(`http://localhost:3001/posts/${route.params.id}`, {
        method: 'DELETE'
      })
      router.push('/posts')
    } catch (err) {
      console.error('Ошибка удаления:', err)
      alert('Не удалось удалить пост')
    }
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
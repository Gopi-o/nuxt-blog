<template>
    <Header />
    <div class="edit-page">
        
        <div class="edit-container">
            <h1 class="page-title">Редактировать пост</h1>
            
            <form @submit.prevent="submitForm" class="post-form" v-if="post">
                <div class="form-group">
                <label for="title" class="form-label">Заголовок</label>
                <input 
                    v-model="post.title" 
                    type="text" 
                    id="title" 
                    required
                    class="form-input"
                    placeholder="Введите заголовок поста"
                >
                </div>
                
                <div class="form-group">
                <label for="body" class="form-label">Содержание</label>
                <textarea 
                    v-model="post.body" 
                    id="body" 
                    required
                    class="form-textarea"
                    placeholder="Напишите содержание вашего поста..."
                    rows="8"
                ></textarea>
                </div>

                <div class="form-group">
                <label for="tags" class="form-label">Теги (через запятую)</label>
                <input 
                    v-model="post.tags" 
                    type="text" 
                    id="tags" 
                    class="form-input"
                    placeholder="Unreal Engine, Графика, Геймдизайн"
                >
                </div>
                
                <div class="form-actions">
                <button type="submit" class="submit-btn" @click="submitPost">
                    <i class="fas fa-save"></i> Сохранить изменения
                </button>
                
                <NuxtLink :to="`/posts/${post.id}`" class="cancel-btn">
                    <i class="fas fa-times"></i> Отмена
                </NuxtLink>

                <button type="button" class="delete-btn" @click="deletePost">
                    <i class="fas fa-trash-alt"></i> Удалить пост
                </button>
                
                </div>
            </form>

            <div class="loading" v-else>
                Загрузка данных поста...
            </div>
        </div>
    </div>
    <Footer />
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const post = ref(null)
const loading = ref(true)
const error = ref(null)
const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase || 'http://localhost:3001'

const formData = ref({
  title: '',
  body: '',
  tags: ''
})

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
// Загружаем данные при монтировании компонента
onMounted(fetchPost)

const updatePost = async () => {
  try {
    const response = await fetch(`${apiBase}/posts/${route.params.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: post.value.title,
        body: post.value.body,
        tags: post.value.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      })
    })

    const updatedPost = await response.json();
    console.log('Пост обновлен:', updatedPost);
    router.push(`/posts/${route.params.id}`);
  } catch(error) {
    console.log('Ошибка:', error);
  }
}

const submitForm = () => updatePost();



// Функция удаления
const deletePost = async () => {
  if (confirm('Удалить этот пост?')) {
    try {
      await fetch(`${apiBase}/posts/${route.params.id}`, {
        method: 'DELETE'
      })
      router.push('/posts')
    } catch (err) {
      console.error('Ошибка удаления:', err)
      alert('Не удалось удалить пост')
    }
  }
}
</script>
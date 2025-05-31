<template>
  <Header />
  <div class="create-page">
    
    <div class="create-container">
      <h1 class="page-title">Создать новый пост</h1>
      
      <form @submit.prevent="submitForm" class="post-form">
        <div class="form-group">
          <label for="title" class="form-label">Заголовок</label>
          <input 
            v-model="formData.title" 
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
            v-model="formData.body" 
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
            v-model="formData.tags" 
            type="text" 
            id="tags" 
            class="form-input"
            placeholder="Unreal Engine, Графика, Геймдизайн"
          >
        </div>
        
        <div class="form-actions">
          <button type="submit" class="submit-btn">
            <i class="fas fa-plus-circle"></i> Опубликовать
          </button>
          
          <NuxtLink to="/posts" class="cancel-btn">
            <i class="fas fa-times"></i> Отмена
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
  <Footer />
</template>

<script setup>
const formData = reactive({
  title: '',
  body: '',
  tags: ''
})

const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase || 'http://localhost:3001'

const submitForm = async () => {
  try {
    await $fetch(`${apiBase}/posts`, {
      method: 'POST',
      body: {
        title: formData.title,
        body: formData.body,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        author: "Новый пользователь",
        date: {
          day: new Date().getDate(),
          month: new Date().toLocaleString('default', { month: 'short' }),
          year: new Date().getFullYear()
        },
        likes: 0,
        comments: 0,
        views: 0
      }
    })
    
    router.push('/posts')
  } catch (error) {
    console.error('Ошибка при создании поста:', error)
    alert('Не удалось создать пост')
  }
}

</script>

<style scoped lang="scss">

</style>
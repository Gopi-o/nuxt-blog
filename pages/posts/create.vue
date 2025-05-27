<template>
  <div class="create-page">
    <Header />
    
    <h1>Создать новый пост</h1>
    
    <form @submit.prevent="submitForm" class="post-form">
      <div class="form-group">
        <label for="title">Заголовок:</label>
        <input 
          v-model="formData.title" 
          type="text" 
          id="title" 
          required
          class="form-input"
        >
      </div>
      
      <div class="form-group">
        <label for="body">Содержание:</label>
        <textarea 
          v-model="formData.body" 
          id="body" 
          required
          class="form-textarea"
        ></textarea>
      </div>
      
      <button type="submit" class="submit-btn">Создать пост</button>
      
      <NuxtLink to="/posts" class="cancel-link">Отмена</NuxtLink>
    </form>
  </div>
</template>

<script setup>
const formData = reactive({
  title: '',
  body: ''
})

const router = useRouter()

const submitForm = async () => {
  try {
    await $fetch('http://localhost:3001/posts', {
      method: 'POST',
      body: {
        ...formData,
        createdAt: new Date().toISOString(),
        id: Date.now() // Временное решение, json-server сам генерирует ID
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
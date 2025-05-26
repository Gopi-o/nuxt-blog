<template>
    <div>
        <h1>Тестовая страница</h1>
        <div v-if="pending">Загрузка...</div>
        <div v-else-if="posts">
            <div v-for="post in posts" :key="post.id">
                <h2>{{ post.title }}</h2>
                <!-- <p>{{ post.body }}</p> -->
            </div>
        </div>
        <div v-else>
            Нет данных для отображения
        </div>
    </div>    
</template>

<script setup>
const { data: posts, pending } = await useAsyncData(
    'posts',
    () => $fetch('http://localhost:3001/posts')
)
</script>

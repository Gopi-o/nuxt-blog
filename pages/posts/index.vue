<template>
    <div>
        <Header />
        <h1>Все посты</h1>
        <PostCard
            v-for="post in posts"
            :key="post.id"
            :post="post"
        />
    </div>
</template>

<script setup>
import { useFetch } from 'nuxt/app';

const { data: posts } = await useFetch('http://localhost:3001/posts')
</script>
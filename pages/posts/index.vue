<template>
    <Header />
    <div class="main-container">
        <div class="main-page">
            <h1 class="main-page__title">Все посты</h1>
            <div class="main-page__posts">
                <PostCard
                    v-for="post in posts "
                    :key="post.id"
                    :post="post"
                />
            </div>
        </div>
    </div>
    <Footer />
</template>

<script setup>
import { useFetch } from 'nuxt/app';

const { data: posts } = await useFetch('http://localhost:3001/posts')
</script>
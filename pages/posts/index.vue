<template>
    <Header />
    <div class="main-container">
        <div class="main-page">
            <h1 class="main-page__title">Все посты</h1>
            <div class="main-container__posts">
                <PostList :posts="posts" />
            </div>
        </div>
    </div>
    <Footer />
</template>

<script setup>
import { useFetch } from 'nuxt/app';
// const { data: posts } = await useFetch('http://localhost:3001/posts');
const postsPerPage = ref(5);


const page = ref(1);
const { data: posts } = await useFetch(`http://localhost:3001/posts?page=${page.value}&limit=6`);
</script>
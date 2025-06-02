<template>
    <Header />
    <div class="main-container">
        
        <main class="main-page">
            <h1 class="main-page__title">Последние посты</h1>

            <div v-if="pending" class="main-page__loading">
                Загрузка...
            </div>

            <div v-else class="main-page__posts">
                <PostCard
                    v-for="post in latestPosts" 
                    :key="post.id"
                    :post="post"
                />
            </div>

        </main>
    </div>
    <Footer />
</template>

<script setup>

const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase || 'http://localhost:3001'
const { getPosts } = useApi();

const { data: posts } = await useAsyncData(
  'main-posts',
  () => getPosts({ 
    sort: 'createdAt', 
    order: 'desc', 
    limit: 3 
  })
);

const latestPosts = computed(() => posts.value || [])
</script>

<style lang="scss">
    @import "/assets/main.scss"
</style>
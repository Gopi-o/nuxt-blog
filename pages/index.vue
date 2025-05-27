<template>
    <div>
        <Header />
        
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

            <NuxtLink to="/posts" class=main-page__all-links>
                Все посты ->
            </NuxtLink>
        </main>
    </div>
</template>

<script setup>
const {data: posts, pending } = await useAsyncData(
    'main-posts',
    () => $fetch(`http://localhost:3001/posts?_sort=createdAt&_order=desc&_limit=3`)
)

const latestPosts = computed(() => posts.value || [])
</script>

<style lang="scss">
    .main-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;

    &__title {
        font-size: 2rem;
        margin-bottom: 2rem;
        color: #1a365d;
    }

    &__posts {
        display: grid;
        gap: 1.5rem;
        margin-bottom: 2rem;
    }

    &__loading {
        padding: 2rem;
        text-align: center;
        color: #666;
    }

    &__all-link {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background-color: var(#00c58e);
        color: white;
        text-decoration: none;
        border-radius: 4px;
        transition: background-color 0.2s;

        &:hover {
        background-color: darken(#00c58e, 10%);
        }
    }
    }
</style>
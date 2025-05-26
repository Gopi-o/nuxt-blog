<template>
    <article class="post-card">
        <h2 class="post-card__title">{{ post.title }}</h2>
        <p class="post-card__subtitle">{{ post.body.slice(0, 100) }}...</p>
        <NuxtLink :to="'/posts/${post.id}'" class="post-card__link">
            Читать далее ->
        </NuxtLink>
    </article>
</template>


<script setup>
defineProps({
    post: {
        type: Object,
        required: true
    }
})
</script>


<template>
    <article class="post-card">
        <div class="post-card__row">
            <div class="post-card__example card" >
                <div class="wrapper">
                    <div class="post-card__header">
                        <div class="date">
                        <span class="day">{{ post.date?.day || 15 }}-</span>
                        <span class="month">{{ post.date?.month || "june" }}--</span>
                        <span class="year">{{ post.date?.year || 2027 }} </span>
                        </div>
                        <ul class="menu-content">
                        <li>
                            <a href="#" class="far fa-bookmark"></a>
                        </li>
                        <li><a href="#" class="far fa-heart"><span>{{ post.likes || 0 }}</span></a></li>
                        <li><a href="#" class="far fa-comment"><span>{{ post.comments || 0 }}</span></a></li>
                        </ul>
                    </div>
                    <div class="data">
                        <div class="content">
                        <span class="author">{{ post.author || "Неизвестный автор" }}</span>
                        <h1 class="title"><a href="#">{{ post.title || "Неправильное название" }}</a></h1>
                        <p class="text">{{ post.body.slice(0, 100) }}...</p>
                        <NuxtLink :to="`/posts/${post.id}`" class="button">
                            Читать далее
                        </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>




        <!-- <h2 class="post-card__title">{{ post.title }}</h2>
        <p class="post-card__subtitle">{{ post.body.slice(0, 100) }}...</p>
        <NuxtLink :to="`/posts/${post.id}`" class="post-card__link">
            Читать далее ->
        </NuxtLink> -->
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



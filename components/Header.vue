<template>
    <header class="header">
        <!-- <NuxtLink to="/" class="logo">Мой Блог</NuxtLink> -->
        <nav class="nav">
            <input type="checkbox" class="nav__cb" id="menu-cb"/>
            <div class="nav__content">
                <ul class="nav__items">
                    <li class="nav__item">
                        <span class="nav__item-text"><NuxtLink to="/">Мой блог</NuxtLink></span>
                    </li>
                    <li class="nav__item">
                        <NuxtLink to="/posts"><span class="nav__item-text">Все посты</span></NuxtLink>
                    </li>
                    <li class="nav__item">
                        <NuxtLink to="/posts/create"><span class="nav__item-text">Создать пост</span></NuxtLink>
                    </li>
                </ul>
            </div>
            <label class="nav__btn" for="menu-cb"></label>
        </nav>
    </header>
</template>
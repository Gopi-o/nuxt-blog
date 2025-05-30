<template>
  <div class="posts-container">
    <div class="posts-container__grid">
      <PostCard
        v-for="post in paginatedPosts"
        :key="post.id"
        :post="post"
      />
    </div>

    <Pagination
      v-if="totalPages > 1"
      :total-items="posts.length"
      :items-per-page="itemsPerPage"
      :current-page="currentPage"
      @page-changed="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const props = defineProps({
  posts: {
    type: Array,
    required: true,
    default: () => []
  }
});

const currentPage = ref(1);
const itemsPerPage = ref(6);

if (route.query.page) {
  currentPage.value = Number(route.query.page);
}

const totalPages = computed(() => 
  Math.ceil(props.posts.length / itemsPerPage.value)
);

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return props.posts.slice(start, end);
});

const handlePageChange = (page) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

watch(currentPage, (newPage) => {
  router.push({ 
    query: { 
      ...route.query, 
      page: newPage > 1 ? newPage : undefined 
    }
  });
});
</script>

<style scoped>
.posts-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
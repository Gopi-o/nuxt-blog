<template>
    <div class="comment-item">
        <div class="comment-header">
          <span class="comment-author">{{ comment.author }}</span>
          <span class="comment-date">{{ formatDate(comment.date) }}</span>
        </div>
        <div class="comment-text">{{ comment.text }}</div>
        <div class="comment-reply">
             <a href="#!">Reply</a>
         </div>
         <div class="comment-report">
             <a href="#!">Report</a>
         </div>
    </div>
</template>

<script setup>
defineProps({
    comment: {
        type: Object,
        required: true
    }
})

const formatDate = (dateString) => {
const options = { day: 'numeric', month: 'long', year: 'numeric' };
return new Date(dateString).toLocaleDateString('ru-RU', options);
};
</script>
<template>
  <div class="container py-5">
    <header class="pb-4 border-bottom">
      <h4>{{ typeKor }} {{ id ? "수정하기" : "새로 올리기" }}</h4>
    </header>
    <template v-if="type === 'archive'">
      <FormArchive
        :id="id"
        @submit="($event) => submit('archive', $event)"
        @update="($event) => update('archive', { id, ...$event })"
      />
    </template>
    <template v-if="type === 'member'">
      <FormMember
        :id="id"
        @submit="($event) => submit('member', $event)"
        @update="($event) => update('member', { id, ...$event })"
      />
    </template>
    <template v-if="type === 'news'">
      <FormNews
        :id="id"
        @submit="($event) => submit('news', $event)"
        @update="($event) => update('news', { id, ...$event })"
      />
    </template>

    <!-- 미리보기 -->
    <!-- <pre>
      form:: {{ form }}
    </pre> -->
  </div>
</template>

<script>
import { computed, inject, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import FormArchive from "@/components/Form/Archive.vue";
import FormMember from "@/components/Form/Member.vue";
import FormNews from "@/components/Form/News.vue";
export default {
  components: {
    FormArchive,
    FormMember,
    FormNews,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { boardAPI } = inject("firebase");

    const pending = ref({
      init: false,
    });

    // 수정 불러오기
    const id = computed(() => {
      return route?.query?.id;
    });
    const type = computed(() => {
      return route?.query?.type;
    });
    const typeKor = computed(() => {
      const types = {
        archive: "아카이브",
        member: "멤버",
        news: "뉴스",
      };
      return types[type.value] || "";
    });

    const submit = async (documentName, form) => {
      pending.value.init = true;
      try {
        const data = await boardAPI.addBoard(documentName, form);
        if (data) {
          window.toast("업로드되었습니다.");
          router.push(`/admin/${documentName}`);
        }
      } catch (error) {
        console.error("error:", error);
      }
      pending.value.init = false;
    };
    const update = async (documentName, form) => {
      pending.value.init = true;
      try {
        const data = await boardAPI.updateBoard(documentName, id.value, form);
        if (data) {
          window.toast("수정이 완료되었습니다.");
          router.push(`/admin/${documentName}`);
        }
      } catch (error) {
        console.error("error:", error);
        window.toast("업로드에 실패했습니다");
        router.push(`/admin/${documentName}`);
      }
      pending.value.init = false;
    };

    return {
      type,
      typeKor,
      id,
      submit,
      update,
    };
  },
};
</script>

<style lang="scss" scoped>
label {
  font-weight: 700;
}
</style>

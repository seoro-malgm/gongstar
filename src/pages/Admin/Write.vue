<template>
  <div class="container py-5">
    <header class="pb-4 border-bottom">
      <h4>{{ typeKor }} {{ id ? "수정하기" : "새로 올리기" }}</h4>
    </header>
    <div v-for="item in forms" :key="item.id">
      <template v-if="type === item.key">
        <component
          :id="id"
          :is="item.form"
          @submit="$event => submit(item.key, $event)"
          @update="$event => update(item.key, { id, ...$event })"
        ></component>
      </template>
    </div>
    <!-- 미리보기 -->
  </div>
</template>

<script>
import { computed, inject, ref, shallowRef } from "vue";
import { useRoute, useRouter } from "vue-router";

// 폼컴포넌트
import FormProject from "@/components/Form/Project.vue";
import FormInsights from "@/components/Form/Insights.vue";
import FormContact from "@/components/Form/Contact.vue";
import FormMembers from "@/components/Form/Members.vue";
export default {
  components: {
    FormProject,
    FormInsights,
    FormMembers,
    FormContact
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { boardAPI } = inject("firebase");

    const pending = ref({
      init: false
    });

    const forms = shallowRef([
      {
        key: "project",
        form: FormProject
      },
      {
        key: "insights",
        form: FormInsights
      },
      {
        key: "members",
        form: FormMembers
      },
      {
        key: "contact",
        form: FormContact
      }
    ]);

    // 수정 불러오기
    const id = computed(() => {
      return route?.query?.id;
    });
    const type = computed(() => {
      return route?.query?.type;
    });
    const typeKor = computed(() => {
      const types = {
        project: "프로젝트",
        insights: "인사이트",
        members: "멤버",
        contact: "견적"
      };
      return types[type.value] || "";
    });

    // 새로 추가
    const submit = async (documentName, form) => {
      pending.value.init = true;
      try {
        // console.log("%c Hello ", "background: #333399; color: #ededed");
        const data = await boardAPI.addBoard(documentName, form);
        if (data) {
          window.toast("업로드되었습니다.");
          // router.push(`/admin/${documentName}`);
        }
      } catch (error) {
        console.error("error:", error);
      }
      pending.value.init = false;
    };

    // 수정
    const update = async (documentName, form) => {
      pending.value.init = true;
      try {
        const data = await boardAPI.updateBoard(documentName, id.value, form);
        if (data) {
          window.toast("수정이 완료되었습니다.");
          // router.push(`/admin/${documentName}`);
        }
      } catch (error) {
        console.error("error:", error);
        window.toast("업로드에 실패했습니다");
        // router.push(`/admin/${documentName}`);
      }
      pending.value.init = false;
    };

    return {
      forms,
      type,
      typeKor,
      id,
      submit,
      update
    };
  }
};
</script>

<style lang="scss" scoped>
label {
  font-weight: 700;
}
</style>

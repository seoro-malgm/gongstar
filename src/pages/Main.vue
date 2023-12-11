<template>
  <div>
    <!-- sections -->
    <div :ref="item.name" v-for="(item, i) in sections" :key="i">
      <component
        :is="item.component"
        @sectionChange="$event => (currentSection = item.name)"
      />
    </div>
    <!-- btns -->
    <div class="floating-dots">
      <ul class="dots-section">
        <li
          class="dot-item"
          v-for="(item, i) in sections"
          :key="i"
          :class="{ active: item?.name === currentSection }"
        >
          <a :href="`#${item.name}`" class="btn btn-text p-0">
            <span class="dot"></span>
            <span class="dot"></span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SectionIntro from "@/components/Sections/Intro.vue";
import SectionMilkyWay from "@/components/Sections/MilkyWay.vue";
import SectionSolutions from "@/components/Sections/Solutions.vue";
import SectionStarship from "@/components/Sections/Starship.vue";
import SectionContact from "@/components/Sections/Contact.vue";
// old sections
// import SectionServices from "@/components/Sections/Services.vue";
import SectionPartners from "@/components/Sections/Partners.vue";
import { useIntersectionObserver, useIntervalFn } from "@vueuse/core";

const [intro, milkyWay, solutions, starship, contact] = [
  ref(null),
  ref(null),
  ref(null),
  ref(null),
  ref(null)
];

const currentSection = ref("intro");

const emit = defineEmits(["sectionChange"]);
for (
  let index = 0;
  index < [intro, milkyWay, solutions, starship, contact].length;
  index++
) {
  const section = [intro, milkyWay, solutions, starship, contact][index];
  const { stop } = useIntersectionObserver(
    section,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        // console.log("stop:", stop);
      }
      // targetIsVisible.value = isIntersecting;
    }
  );
}

// watch(
//   () => targetIsVisible.value,
//   (n) => {
//     if (n) {
//       emit("sectionChange");
//     }
//   }
// );
const sections = [
  {
    name: "intro",
    component: SectionIntro
  },
  {
    name: "milkyWay",
    component: SectionMilkyWay
  },
  {
    name: "solutions",
    component: SectionSolutions
  },
  {
    name: "starship",
    component: SectionStarship
  },
  {
    name: "partners",
    component: SectionPartners
  },
  {
    name: "contact",
    component: SectionContact
  }
];
</script>

<style lang="scss" scoped>
.floating-dots {
  position: fixed;
  top: 50%;
  right: 1rem;
  .dots-section {
    .dot-item {
      margin-bottom: 8px;
      a {
        display: block;
        position: relative;
        width: 16px;
        height: 16px;
        .dot {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: block;
          content: "";
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: black;
          transition: all 0.2s $default-ease;
        }
      }
      &.active {
        a {
          .dot {
            background-color: $primary;
            width: 20px;
            height: 6px;
            border-radius: 0;
            &:first-child {
              transform: translate(-50%, -50%) rotate(45deg);
            }
            &:last-child {
              transform: translate(-50%, -50%) rotate(-45deg);
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <section class="section section-gap-padding">
    <header class="container-fluid text-center">
      <h1 class="section-title">공스타의 클라이언트</h1>
      <p class="mt-3">공스타와 함께한 클라이언트입니다</p>
    </header>
    <div class="container my-4">
      <div class="bg-gray-3 rounded p-4">
        <div class="row justify-content-center">
          <div class="col-6 col-md-3 col-lg-2 my-2" v-for="(item, i) in items" :key="i">
            <template v-if="item.type === 'letter'">
              <div class="text-center p-3 h-100 d-flex align-items-center justify-content-center">
                <h6 class="text-16 text-md-20 fw-700">{{ item.name }}</h6>
              </div>
            </template>
            <template v-else>
              <figure class="logo-image p-3">
                <img
                  :src="getURL(`/assets/images/partners/${item.filename}.${item.filetype}`)"
                  :alt="`${item.name}의 로고이미지`"
                />
              </figure>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, inject } from "vue";
export default {
  setup() {
    const getURL = inject("getImageURL");

    const items = ref([
      {
        name: "DCS LAB",
        filename: "dcslab",
        filetype: "svg",
      },
      {
        name: "공주시청",
        filename: "gongju-city",
        filetype: "svg",
      },
      {
        name: "카이스트",
        filename: "kaist",
        filetype: "svg",
      },
      {
        name: "국립중앙박물관",
        filename: "national-museum-kor",
        filetype: "png",
      },
      {
        name: "공주국립박물관",
        filename: "gongju-museum",
        filetype: "svg",
      },
      {
        name: "부여박물관",
        filename: "buyeo-museum",
        filetype: "svg",
      },
      {
        name: "공주시 청소년문화센터",
        filename: "gongju-youth-culture-center",
        filetype: "svg",
      },
      {
        name: "공주시 가족센터",
        filename: "gongju-family-center",
        filetype: "png",
      },
      {
        name: "중부권미세먼지센터",
        filename: "national-air-emission-inventory",
        filetype: "png",
      },
      {
        name: "공동체세움",
        filename: "seum",
        filetype: "png",
      },
      {
        name: "공주학아카이브",
        filename: "gongjuhak-archive",
        filetype: "svg",
      },
      {
        name: "충남콘텐츠코리아랩",
        filename: "cckl",
        filetype: "svg",
      },
      {
        name: "연암대학교",
        filename: "yonam-ac",
        filetype: "svg",
      },
      {
        name: "공주대학교",
        filename: "kongju-ac",
        filetype: "svg",
      },
      {
        name: "정글메이커",
        filename: "jungle-maker",
        filetype: "svg",
      },

      {
        name: "공주산학연구관",
        filename: "sanhak-kongju",
        filetype: "png",
      },
      {
        name: "충청남도교육청",
        filename: "cnnse",
        filetype: "svg",
      },
      {
        name: "국립중앙도서관",
        filename: "nl-go",
        filetype: "png",
      },
      {
        name: "국립중앙과학관",
        filename: "science-go",
        filetype: "svg",
      },
      {
        name: "에드에이블",
        filename: "adable",
        filetype: "png",
      },
      {
        name: "공주시 청년센터",
        type: "letter",
      },
      {
        name: "수수네숲",
        filename: "forest-susu",
        filetype: "svg",
      },
      {
        name: "공주시 공동체종합지원센터",
        type: "letter",
      },
      {
        name: "공주시 소상공인연합회",
        filename: "kfme-gongju",
        filetype: "svg",
      },
      {
        name: "공주문화재단",
        filename: "gongjucf",
        filetype: "png",
      },
      {
        name: "논산계룡교육",
        filename: "cnnse",
        filetype: "png",
      },
      {
        name: "충남공주의료원",
        filename: "gjmc",
        filetype: "png",
      },
      {
        name: "로컬 공방",
        type: "letter",
      },
      {
        name: "다빈치창의융합연구소",
        filename: "gongju-digitage",
        filetype: "png",
      },
      {
        name: "충남문화재단",
        filename: "cacf",
        filetype: "png",
      },
      {
        name: "서산시",
        filename: "seosan",
        filetype: "png",
      },
      {
        name: "주식회사 HIM",
        filename: "him",
        filetype: "png",
      },
      {
        name: "충청남도국제교육원",
        filename: "ceti",
        filetype: "png",
      },
      {
        name: "충남교육청 안전수련원",
        filename: "cnstc",
        filetype: "png",
      },
    ]);
    return { getURL, items };
  },
};
</script>

<style lang="scss" scoped>
.logo-image {
  // filter: saturate(0%);
  text-align: center;
  img {
    height: 50px;
    width: auto;
    max-width: 100%;
    object-fit: contain;
  }
}
.section {
  background-color: white;
}
</style>

<template>
  <div class="app-container">
    <n-layout class="main-layout">
      <n-layout-content>
        <div class="hero-section hero-fullscreen">
          <n-carousel
            class="hero-carousel"
            :autoplay="true"
            :interval="2000"
            :show-dots="false"
            :show-arrow="true"
            :draggable="true"
            effect="card"
          >
            <n-carousel-item
              v-for="(image, index) in backgroundImages"
              :key="index"
            >
              <div
                class="hero-slide"
                :style="{ backgroundImage: `url(${image})` }"
              ></div>
            </n-carousel-item>
          </n-carousel>

          <div class="hero-content">
            <div class="hero-text">
              <span :style="{ fontSize: isMobile ? '32px' : '48px' }">
                MCSL 开发组
              </span>
              <div class="hero-subtitle-container">
                <transition name="fade" mode="out-in">
                  <p
                    :key="currentSubtitleIndex"
                    class="hero-subtitle"
                    :class="{ 'mobile-subtitle': isMobile }"
                  >
                    {{ subtitles[currentSubtitleIndex] }}
                  </p>
                </transition>
              </div>
            </div>

            <div class="hero-actions" :class="{ 'mobile-actions': isMobile }">
              <div class="button-group">
                <n-button
                  type="info"
                  size="large"
                  @click="scrollToMembers"
                  class="hero-button hero-button-left"
                >
                  <template #icon>
                    <n-icon><PeopleIcon /></n-icon>
                  </template>
                  了解更多
                </n-button>
                <n-button
                  type="primary"
                  size="large"
                  @click="showContactModal = true"
                  class="hero-button hero-button-right"
                >
                  <n-icon size="20"><MailIcon /></n-icon>
                </n-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 产品展示板块 -->
        <div class="products-section">
          <div class="products-container">
            <div class="products-header">
              <h2 class="products-title">
                <n-gradient-text gradient="linear-gradient(135deg, #19e3a2 0%, #16d195 100%)">
                  妙手生花，创意无限
                </n-gradient-text>
              </h2>
              <p class="products-subtitle">
                勇于创新，追求卓越，各种创意设计与新颖想法是我们执手的利刃。
              </p>
            </div>

            <div class="products-grid">
              <div
                v-for="product in products"
                :key="product.id"
                class="product-card"
                @click="openProduct(product.link)"
              >
                <div class="product-icon">
                  <img :src="product.icon" :alt="product.name" />
                </div>
                <div class="product-info">
                  <h3 class="product-name">{{ product.name }}</h3>
                  <p class="product-desc">{{ product.description }}</p>
                </div>
                <div class="product-arrow">
                  <n-icon size="20">
                    <ArrowForwardIcon />
                  </n-icon>
                </div>
              </div>
            </div>

            <div class="products-footer">
              <n-button
                type="primary"
                size="large"
                @click="viewAllProducts"
                class="view-all-button"
              >
                <template #icon>
                  <n-icon><AppsIcon /></n-icon>
                </template>
                查看所有产品
              </n-button>
            </div>
          </div>
        </div>

        <MemberView />
      </n-layout-content>
    </n-layout>

    <!-- 联系我们模态框 -->
    <n-modal v-model:show="showContactModal" preset="card" style="width: 600px; max-width: 90vw;" title="联系我们">
      <n-space vertical :size="24">
        <div class="contact-intro">
          <n-text>
            感谢您对 MCSL 开发组的关注！我们很高兴能与您建立联系。如果您有任何问题、建议或合作意向，请通过以下方式联系我们：
          </n-text>
        </div>
        
        <n-space vertical :size="16">
          <n-card embedded>
            <div class="contact-item">
              <n-icon size="24" color="#19e3a2">
                <MailIcon />
              </n-icon>
              <div class="contact-info">
                <div class="contact-label">邮箱地址</div>
                <div class="contact-value">
                  <a href="mailto:services@mcsl.com.cn" class="contact-link">services@mcsl.com.cn</a>
                </div>
              </div>
            </div>
          </n-card>

          <n-card embedded>
            <div class="contact-item">
              <n-icon size="24" color="#19e3a2">
                <ChatIcon />
              </n-icon>
              <div class="contact-info">
                <div class="contact-label">QQ 群聊</div>
                <div class="contact-value">
                  <a href="https://jq.qq.com/?_wv=1027&k=x2ISlviQ" target="_blank" class="contact-link">点击加入官方 QQ 群</a>
                </div>
              </div>
            </div>
          </n-card>

          <n-card embedded>
            <div class="contact-item">
              <n-icon size="24" color="#19e3a2">
                <GithubIcon />
              </n-icon>
              <div class="contact-info">
                <div class="contact-label">GitHub</div>
                <div class="contact-value">
                  <a href="https://github.com/MCSLTeam" target="_blank" class="contact-link">MCSLTeam</a>
                </div>
              </div>
            </div>
          </n-card>
        </n-space>

        <div class="contact-footer">
          <n-text depth="3" style="font-size: 14px;">
            我们通常会在 24 小时内回复您的消息。期待与您的交流！
          </n-text>
        </div>
      </n-space>
    </n-modal>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import MemberView from '../components/MemberView.vue'
import {
  NLayout,
  NLayoutContent,
  NButton,
  NIcon,
  NGradientText,
  NCarousel,
  NCarouselItem,
  NModal,
  NCard,
  NSpace,
  NText
} from 'naive-ui'
import {
  People as PeopleIcon,
  ArrowForward as ArrowForwardIcon,
  Apps as AppsIcon,
  Mail as MailIcon,
  Call as CallIcon,
  ChatbubbleEllipses as ChatIcon,
  LogoGithub as GithubIcon
} from '@vicons/ionicons5'

export default {
  name: 'Home',
  components: {
    NLayout,
    NLayoutContent,
    NButton,
    NIcon,
    NGradientText,
    NCarousel,
    NCarouselItem,
    NModal,
    NCard,
    NSpace,
    NText,
    MemberView,
    PeopleIcon,
    ArrowForwardIcon,
    AppsIcon,
    MailIcon,
    CallIcon,
    ChatIcon,
    GithubIcon
  },
  setup() {
    const router = useRouter()
    const isMobile = ref(false)
    const screenWidth = ref(window.innerWidth)
    const showContactModal = ref(false)

    // 背景图片数组
    const backgroundImages = ref([
      'https://images.mcsl.com.cn/new/mcsl2-preview.webp',
      'https://images.mcsl.com.cn/new/bg.webp',
      'https://images.mcsl.com.cn/new/mcsl-sync-preview.webp'
    ])

    // subtitle轮播数组
    const subtitles = ref([
      "以心相面，从心出发。",
      "活着就是为了改变世界。",
      "即使无法掌握未来，也请不要忘了明天。",
      "Welcome to future.",
      "你若盛开，清风自来。",
      "不忘初心，方得始终。"
    ])

    const currentSubtitleIndex = ref(0)
    let subtitleTimer = null

    // 产品数据
    const products = ref([
      {
        id: 1,
        name: 'MCServerLauncher 2 开服器',
        description: '简洁全能的 Minecraft 开服工具',
        icon: 'https://images.mcsl.com.cn/new/MCSL2.webp',
        link: 'https://v2.mcsl.com.cn/'
      },
      {
        id: 2,
        name: 'MCServerLauncher Future',
        description: '全新设计的下一代开服器',
        icon: 'https://images.mcsl.com.cn/new/MCServerLauncherFuture.webp',
        link: 'https://future.mcsl.com.cn/'
      },
      {
        id: 3,
        name: 'MCSL-Sync 核心镜像站',
        description: '全面的服务器核心镜像站',
        icon: 'https://images.mcsl.com.cn/new/MCSL-Sync.webp',
        link: 'https://sync.mcsl.com.cn/'
      }
    ])





    const checkScreenSize = () => {
      screenWidth.value = window.innerWidth
      isMobile.value = window.innerWidth < 768
    }

    // subtitle轮播逻辑
    const startSubtitleRotation = () => {
      subtitleTimer = setInterval(() => {
        currentSubtitleIndex.value = (currentSubtitleIndex.value + 1) % subtitles.value.length
      }, 3000) // 每3秒切换一次
    }

    const stopSubtitleRotation = () => {
      if (subtitleTimer) {
        clearInterval(subtitleTimer)
        subtitleTimer = null
      }
    }

    const scrollToMembers = () => {
      const membersSection = document.querySelector('.section-card')
      if (membersSection) {
        membersSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }

    // 产品相关方法
    const openProduct = (url) => {
      try {
        window.open(url, '_blank', 'noopener,noreferrer')
      } catch (error) {
        console.error('Failed to open product:', error)
        const newWindow = window.open()
        if (newWindow) {
          newWindow.location.href = url
        }
      }
    }

    const viewAllProducts = () => {
      router.push('/products')
    }

    onMounted(() => {
      checkScreenSize()
      window.addEventListener('resize', checkScreenSize)
      startSubtitleRotation()
    })

    onUnmounted(() => {
      window.removeEventListener('resize', checkScreenSize)
      stopSubtitleRotation()
    })

    return {
      isMobile,
      backgroundImages,
      subtitles,
      currentSubtitleIndex,
      scrollToMembers,
      products,
      openProduct,
      viewAllProducts,
      showContactModal
    }
  }
}


</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: var(--n-body-color);
  transition: background-color 0.3s var(--n-bezier);
}



.main-layout {
  background: transparent;
}

.hero-section {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin-bottom: 0;
}

.hero-fullscreen {
  position: relative;
}

.hero-carousel {
  position: absolute;
  left: 0;
  width: 100%;
  height: calc(100vh + 64px);
  z-index: 1;
}

.hero-carousel .n-carousel__slides {
  height: calc(100vh + 64px) !important;
}

.hero-carousel .n-carousel__slide {
  height: calc(100vh + 64px) !important;
}

.hero-carousel .n-carousel__slide > div {
  height: 100% !important;
}

.hero-slide {
  width: 100% !important;
  height: calc(100vh + 64px) !important;
  background-size: cover !important;
  background-position: center top !important;
  background-repeat: no-repeat !important;
  background-attachment: local;
  filter: blur(4px);
  transform: scale(1.1); /* 稍微放大以避免模糊边缘 */
  min-height: calc(100vh + 64px) !important;
}

.hero-content {
  position: relative;
  z-index: 10;
  text-align: left;
  padding: 60px;
  max-width: 600px;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
}

.hero-text {
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 25px;
}

.hero-subtitle-container {
  height: 30px;
  display: flex;
  align-items: center;
  margin-top: 16px;
}

.hero-subtitle {
  font-size: 20px;
  margin: 0;
  opacity: 0.95;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: 300;
  letter-spacing: 0.5px;
}

.mobile-subtitle {
  font-size: 16px;
  line-height: 1.5;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.hero-actions {
  display: flex;
  justify-content: flex-start;
  align-items: left;
  margin-top: 0;
}

.button-group {
  position: relative;
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.hero-button {
  font-size: 16px;
  font-weight: 600;
  border-radius: 0 !important;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: none !important;
  box-shadow: none !important;
  position: relative;
  z-index: 1;
  min-width: 140px;
}

  .hero-button-left {
    border-radius: 8px 0 0 0 !important;
    background: linear-gradient(135deg,  #40a9ff 50%, #69c0ff 100%) !important;
  }

  .hero-button-right {
    border-radius: 0 0 0 0 !important;
    background: linear-gradient(135deg,  #3dd1a0 50%, #09b06d 100%) !important;
    min-width: 60px !important;
    width: 60px !important;
    padding: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}

.hero-button:hover {
  transform: scale(1.02);
}

.button-group:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.content-container {
  position: relative;
  z-index: 5;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 24px 48px 24px;
  background: var(--n-body-color);
}

.section-card {
  margin-bottom: 32px;
  border-radius: 16px;
  box-shadow: var(--n-box-shadow-2);
  background: var(--n-color);
}

.message-form {
  margin-bottom: 24px;
}

.messages-container {
  margin-top: 24px;
}

.message-card {
  background: var(--n-color);
  border-radius: 12px;
  border: 1px solid var(--n-border-color);
}

.message-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.message-avatar {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  background-color: #18a058;
  color: white;
  font-weight: bold;
}

.message-avatar img {
  border-radius: 20%;
}

.message-avatar-container {
  flex-shrink: 0;
}

.message-avatar-wrapper {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 20%;
  overflow: hidden;
  border: 2px solid var(--n-border-color);
  transition: all 0.3s ease;
}

.message-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 20%;
}

.message-fallback-avatar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  align-items: center;
  justify-content: center;
  background-color: #18a058;
  color: white;
  font-weight: bold;
  font-size: 14px;
  border-radius: 20%;
}

.message-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.message-content {
  margin: 0;
  line-height: 1.6;
  color: var(--n-text-color);
}

.empty-state {
  padding: 48px 0;
}

/* 中等屏幕优化 (768px - 1080px) */
@media (min-width: 768px) and (max-width: 1079px) {
  .members-container .n-grid {
    gap: 12px;
  }
}

/* 移动端优化 */
@media (max-width: 767px) {
  .hero-section {
    height: 100vh;
    align-items: flex-end;
    justify-content: flex-start;
  }

  .hero-content {
    padding: 32px 24px;
    margin: 0 16px 40px 16px;
    max-width: calc(100% - 32px);
    text-align: left;
    min-height: auto;
  }

  .hero-text {
    margin-bottom: 24px;
  }

  .hero-subtitle-container {
    height: 50px;
    margin-top: 12px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .content-container {
    padding: 16px;
  }

  .hero-actions {
    padding: 0;
    justify-content: flex-start;
  }

  .button-group {
    flex-direction: row;
    width: 100%;
    max-width: 280px;
  }

  .hero-button {
    font-size: 15px;
    min-width: auto;
    width: auto;
    flex: 1;
  }

  .hero-button-left {
    border-radius: 8px 0 0 8px !important;
    background: linear-gradient(135deg,  #40a9ff 50%, #69c0ff 100%) !important;
  }

  .hero-button-right {
    border-radius: 0 8px 8px 0 !important;
    background: linear-gradient(135deg,  #3dd1a0 50%, #09b06d 100%) !important;
    width: 60px !important;
    min-width: 60px !important;
    flex: 0 0 60px !important;
    height: auto !important;
    padding: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
}



/* 超链接样式 */
.visit-link a {
  color: #18a058;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
  word-break: break-all;
}

.visit-link a:hover {
  color: #36ad6a;
  border-bottom-color: #36ad6a;
  background-color: rgba(24, 160, 88, 0.1);
  padding: 2px 4px;
  border-radius: 4px;
}

.visit-link a:active {
  color: #0e7a3e;
  transform: translateY(1px);
}

/* 暗色主题下的链接样式 */
[data-theme="dark"] .visit-link a {
  color: #63e2b7;
}

[data-theme="dark"] .visit-link a:hover {
  color: #7fe7c4;
  border-bottom-color: #7fe7c4;
  background-color: rgba(99, 226, 183, 0.1);
}

[data-theme="dark"] .visit-link a:active {
  color: #4fd49a;
}

/* 团队成员卡片样式 */
.members-container {
  margin-top: 24px;
}

.member-card {
  background: var(--n-color);
  border-radius: 12px;
  border: 1px solid var(--n-border-color);
  transition: all 0.3s ease;
  overflow: hidden;
}

.member-card:hover {
  box-shadow: var(--n-box-shadow-2);
  transform: translateY(-2px);
}

.member-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.member-avatar-container {
  flex-shrink: 0;
}

.member-avatar-wrapper {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--n-border-color);
  transition: all 0.3s ease;
}

.member-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.member-fallback-avatar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  align-items: center;
  justify-content: center;
  background-color: #18a058;
  color: white;
  font-weight: bold;
  font-size: 18px;
}

.member-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.member-info strong {
  font-size: 16px;
  color: var(--n-text-color);
}

.member-role {
  margin: 0;
  font-size: 14px;
  color: var(--n-text-color-2);
  line-height: 1.4;
}

.member-actions {
  display: flex;
  justify-content: flex-start;
  margin-top: 12px;
}

/* 移动端优化 */
@media (max-width: 767px) {

  /* 移动端链接优化 */
  .visit-link a {
    font-size: 14px;
    line-height: 1.5;
    display: inline-block;
    margin-top: 4px;
  }

  /* 移动端成员卡片优化 */
  .member-avatar-wrapper {
    width: 40px;
    height: 40px;
  }

  .member-fallback-avatar {
    font-size: 14px;
  }

  .member-info strong {
    font-size: 14px;
  }

  .member-role {
    font-size: 12px;
  }
}

/* 产品展示板块 */
.products-section {
  padding: 80px 0;
  background: var(--n-body-color);
}

.products-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.products-header {
  text-align: center;
  margin-bottom: 64px;
}

.products-title {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 24px;
  line-height: 1.1;
}

.products-subtitle {
  font-size: 1.2rem;
  color: var(--n-text-color-2);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}

.product-card {
  background: var(--n-card-color);
  border: 1px solid var(--n-border-color);
  border-radius: 16px;
  padding: 32px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.15),
    0 6px 20px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(25, 227, 162, 0.2);
  border-color: #19e3a2;
}

/* 深色主题优化 */
[data-theme="dark"] .product-card {
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.3),
    0 1px 3px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .product-card:hover {
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.4),
    0 6px 20px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(25, 227, 162, 0.3);
}

.product-card:hover .product-arrow {
  transform: translateX(4px);
  color: #19e3a2;
}

.product-icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid var(--n-border-color);
}

.product-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  flex: 1;
  min-width: 0;
}

.product-name {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--n-text-color);
}

.product-desc {
  font-size: 0.95rem;
  color: var(--n-text-color-2);
  line-height: 1.5;
  margin: 0;
}

.product-arrow {
  color: var(--n-text-color-3);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.products-footer {
  text-align: center;
}

.view-all-button {
  min-width: 200px;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
}

/* 产品板块移动端优化 */
@media (max-width: 768px) {
  .products-section {
    padding: 60px 0;
  }

  .products-container {
    padding: 0 16px;
  }

  .products-header {
    margin-bottom: 48px;
  }

  .products-title {
    font-size: 2.2rem;
  }

  .products-subtitle {
    font-size: 1rem;
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 40px;
  }

  .product-card {
    padding: 24px 20px;
    gap: 16px;
  }

  .product-icon {
    width: 56px;
    height: 56px;
  }

  .product-name {
    font-size: 1.1rem;
  }

  .product-desc {
    font-size: 0.9rem;
  }
}

/* 联系我们模态框样式 */
.contact-intro {
  text-align: left;
  line-height: 1.6;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
}

.contact-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-label {
  font-weight: 600;
  font-size: 16px;
  color: var(--n-text-color);
}

.contact-value {
  font-size: 14px;
  color: var(--n-text-color-2);
}

.contact-link {
  color: #19e3a2;
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 4px;
  padding: 2px 4px;
  margin: -2px -4px;
}

.contact-link:hover {
  color: #16d195;
  background-color: rgba(25, 227, 162, 0.1);
}

.contact-footer {
  text-align: center;
  padding-top: 8px;
}

/* 移动端联系模态框优化 */
@media (max-width: 768px) {
  .contact-item {
    gap: 12px;
  }
  
  .contact-label {
    font-size: 15px;
  }
  
  .contact-value {
    font-size: 13px;
  }
}
</style>

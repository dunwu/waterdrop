import { defineUserConfig } from 'vuepress'
import theme from './theme.js'

export default defineUserConfig({
  base: '/waterdrop/',
  port: 4000,
  lang: 'zh-CN',
  title: '钝悟',
  description: '钝悟的博客',

  theme

  // Enable it with pwa
  // shouldPrefetch: false,
})

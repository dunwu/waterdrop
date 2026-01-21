import { defineUserConfig } from 'vuepress'
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'
import theme from './theme.js'

export default defineUserConfig({
  base: '/waterdrop/',
  port: 4000,
  lang: 'zh-CN',
  title: '钝悟',
  description: '钝悟的博客',

  theme,

  plugins: [
    slimsearchPlugin({
      // 索引全部内容
      indexContent: false,
      // 为分类和标签添加索引
      customFields: [
        {
          name: 'category',
          getter: (page) => page.frontmatter.category,
          formatter: '分类：$content'
        },
        {
          name: 'tag',
          getter: (page) => page.frontmatter.tag,
          formatter: '标签：$content'
        }
      ]
    })
  ]

  // Enable it with pwa
  // shouldPrefetch: false,
})

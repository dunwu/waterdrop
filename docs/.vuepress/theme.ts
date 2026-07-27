import { hopeTheme } from 'vuepress-theme-hope'
import navbar from './navbar.js'
import sidebar from './sidebar.js'

export default hopeTheme({
  hostname: 'https://dunwu.github.io/waterdrop',

  author: {
    name: '钝悟',
    url: 'https://dunwu.github.io/waterdrop'
  },

  logo: '/logo.svg',

  repo: 'dunwu/waterdrop',

  docsDir: 'docs',

  // navbar
  navbar,

  // sidebar
  sidebar,

  // footer: "默认页脚",
  fullscreen: true,
  displayFooter: true,

  blog: {
    description: '10年+程序员',
    intro: '/intro.html',
    medias: {
      // Baidu: "https://example.com",
      // BiliBili: "https://example.com",
      // Bitbucket: "https://example.com",
      // Dingding: "https://example.com",
      // Discord: "https://example.com",
      // Dribbble: "https://example.com",
      Email: 'mailto:info@example.com',
      // Evernote: "https://example.com",
      // Facebook: "https://example.com",
      // Flipboard: "https://example.com",
      // Gitee: "https://example.com",
      GitHub: 'https://github.com/dunwu'
      // Gitlab: "https://example.com",
      // Gmail: "mailto:info@example.com",
      // Instagram: "https://example.com",
      // Lark: "https://example.com",
      // Lines: "https://example.com",
      // Linkedin: "https://example.com",
      // Pinterest: "https://example.com",
      // Pocket: "https://example.com",
      // QQ: "https://example.com",
      // Qzone: "https://example.com",
      // Reddit: "https://example.com",
      // Rss: "https://example.com",
      // Steam: "https://example.com",
      // Twitter: "https://example.com",
      // Wechat: "https://example.com",
      // Weibo: "https://example.com",
      // Whatsapp: "https://example.com",
      // Youtube: "https://example.com",
      // Zhihu: "https://example.com",
      // MrHope: ["https://dunwu.com", MR_HOPE_AVATAR],
    }
  },

  encrypt: {
    config: {
      '/demo/encrypt.html': ['1234']
    }
  },

  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    math: {
      type: 'katex'
    },
    stylize: [
      {
        matcher: 'Recommended',
        replacer: ({ tag }) => {
          if (tag === 'em')
            return {
              tag: 'Badge',
              attrs: { type: 'tip' },
              content: 'Recommended'
            }
        }
      }
    ],
    sub: true,
    sup: true,
    tabs: true,
    vPre: true
  },

  // page meta
  metaLocales: {
    editLink: '在 GitHub 上编辑此页'
  },

  plugins: {
    blog: true,

    icon: {
      assets: 'iconify'
    },

    slimsearch: {
      indexContent: false,
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
    }

    // uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  }
})

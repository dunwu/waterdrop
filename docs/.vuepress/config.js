const htmlModules = require('./config/htmlModules.js')

module.exports = {
  port: '4000',
  dest: 'docs/.temp',
  base: '/waterdrop/', // 默认'/'。如果你想将你的网站部署到如 https://foo.github.io/bar/，那么 base 应该被设置成 "/bar/",（否则页面将失去样式等文件）
  title: 'WATERDROP',
  description: '💧 waterdrop 是个人的技术文档归档仓库。',
  theme: 'vdoing', // 使用依赖包主题
  // theme: require.resolve('../../vdoing'), // 使用本地主题
  head: [
    // 注入到页面<head> 中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
    ['link', { rel: 'icon', href: '/img/favicon.ico' }], //favicons，资源放在public文件夹
    ['meta', { name: 'keywords', content: 'vuepress,theme,blog,vdoing' }],
    ['meta', { name: 'theme-color', content: '#11a8cd' }] // 移动浏览器主题颜色
  ],
  markdown: {
    // lineNumbers: true,
    extractHeaders: ['h2', 'h3', 'h4', 'h5', 'h6'], // 提取标题到侧边栏的级别，默认['h2', 'h3']
    externalLinks: {
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  },
  // 主题配置
  themeConfig: {
    nav: [
      {
        text: 'Java',
        link: '/01.Java/',
        items: [
          { text: 'JavaSE', link: '/01.Java/01.JavaSE/' },
          { text: 'JavaEE', link: '/01.Java/02.JavaEE/' },
          { text: '软件', link: '/01.Java/11.软件/' },
          { text: '工具', link: '/01.Java/12.工具/' },
          { text: '框架', link: '/01.Java/13.框架/' },
          { text: '中间件', link: '/01.Java/14.中间件/' }
        ]
      },
      {
        text: '编程',
        link: '/02.编程/'
      },
      {
        text: '设计',
        link: '/03.设计/',
        items: [
          {
            text: '架构',
            link: '/03.设计/01.架构/',
            items: [
              { text: '综合', link: '/03.设计/01.架构/00.综合/' },
              { text: '微服务', link: '/03.设计/01.架构/01.微服务/' },
              { text: '安全', link: '/03.设计/01.架构/02.安全/' },
              { text: '解决方案', link: '/03.设计/01.架构/99.解决方案/' }
            ]
          },
          { text: '设计模式', link: '/03.设计/02.设计模式/' },
          { text: '重构', link: '/03.设计/03.重构/' },
          { text: 'DDD', link: '/03.设计/04.DDD/' },
          { text: 'UML', link: '/03.设计/05.UML/' }
        ]
      },
      {
        text: 'DevOps',
        link: '/04.DevOps/'
      },
      {
        text: '数据结构和算法',
        link: '/11.数据结构和算法/'
      },
      {
        text: '数据库',
        link: '/12.数据库/',
        items: [
          { text: '数据库综合', link: '/12.数据库/01.数据库综合/' },
          { text: '数据库中间件', link: '/12.数据库/12.数据库中间件/' },
          {
            text: '关系型数据库',
            link: '/12.数据库/03.关系型数据库/',
            items: [
              { text: '综合', link: '/12.数据库/03.关系型数据库/01.综合/' },
              { text: 'Mysql', link: '/12.数据库/03.关系型数据库/02.Mysql/' },
              { text: '其他', link: '/12.数据库/03.关系型数据库/99.其他/' }
            ]
          },
          {
            text: '文档数据库',
            items: [{ text: 'MongoDB', link: '/12.数据库/04.文档数据库/01.MongoDB/' }]
          },
          {
            text: 'KV数据库',
            items: [{ text: 'Redis', link: '/12.数据库/05.KV数据库/01.Redis/' }]
          },
          {
            text: '列式数据库',
            items: [{ text: 'HBase', link: '/12.数据库/06.列式数据库/01.HBase/' }]
          },
          {
            text: '搜索引擎数据库',
            items: [
              { text: 'Elasticsearch', link: '/12.数据库/07.搜索引擎数据库/01.Elasticsearch/' },
              { text: 'Elastic技术栈', link: '/12.数据库/07.搜索引擎数据库/02.Elastic/' }
            ]
          }
        ]
      },
      {
        text: '网络',
        link: '/13.网络/'
      },
      {
        text: '分布式',
        link: '/15.分布式/',
        items: [
          { text: '分布式理论', link: '/15.分布式/01.分布式理论/' },
          { text: '分布式协同', link: '/15.分布式/11.分布式协同/' },
          { text: '分布式调度', link: '/15.分布式/12.分布式调度/' },
          { text: '分布式通信', link: '/15.分布式/21.分布式通信/' },
          { text: '分布式存储', link: '/15.分布式/22.分布式存储/' }
        ]
      },
      {
        text: '工作',
        link: '/96.工作/'
      },
      {
        text: '笔记',
        link: '/99.笔记/'
      }
    ],
    sidebarDepth: 2, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
    logo: 'https://raw.githubusercontent.com/dunwu/images/dev/common/dunwu-logo.png', // 导航栏logo
    repo: 'dunwu/waterdrop', // 导航栏右侧生成Github链接
    searchMaxSuggestions: 10, // 搜索结果显示最大数
    lastUpdated: '上次更新', // 更新的时间，及前缀文字   string | boolean (取值为git提交时间)

    docsDir: 'docs', // 编辑的文件夹
    editLinks: true, // 编辑链接
    editLinkText: '📝 帮助改善此页面！',

    // 以下配置是Vdoing主题改动的和新增的配置
    sidebar: { mode: 'structuring', collapsable: true }, // 侧边栏  'structuring' | { mode: 'structuring', collapsable:
    // Boolean} | 'auto' | 自定义    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页

    sidebarOpen: true, // 初始状态是否打开侧边栏，默认true
    updateBar: {
      // 最近更新栏
      showToArticle: true // 显示到文章页底部，默认true
      // moreArticle: '/archives' // “更多文章”跳转的页面，默认'/archives'
    },
    // titleBadge: false, // 文章标题前的图标是否显示，默认true
    // titleBadgeIcons: [ // 文章标题前图标的地址，默认主题内置图标
    //   '图标地址1',
    //   '图标地址2'
    // ],
    // bodyBgImg: [
    //   'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175828.jpeg',
    //   'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175845.jpeg',
    //   'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175846.jpeg'
    // ], // body背景大图，默认无。 单张图片 String || 多张图片 Array, 多张图片时每隔15秒换一张。

    // categoryText: '随笔', // 碎片化文章（_posts文件夹的文章）预设生成的分类值，默认'随笔'

    // contentBgStyle: 1,

    category: true, // 是否打开分类功能，默认true。 如打开，会做的事情有：1. 自动生成的frontmatter包含分类字段 2.页面中显示与分类相关的信息和模块 3.自动生成分类页面（在@pages文件夹）。如关闭，则反之。
    tag: true, // 是否打开标签功能，默认true。 如打开，会做的事情有：1. 自动生成的frontmatter包含标签字段 2.页面中显示与标签相关的信息和模块 3.自动生成标签页面（在@pages文件夹）。如关闭，则反之。
    archive: true, // 是否打开归档功能，默认true。 如打开，会做的事情有：1.自动生成归档页面（在@pages文件夹）。如关闭，则反之。

    author: {
      // 文章默认的作者信息，可在md文件中单独配置此信息 String | {name: String, href: String}
      name: 'dunwu', // 必需
      href: 'https://github.com/dunwu' // 可选的
    },
    social: {
      // 社交图标，显示于博主信息栏和页脚栏
      // iconfontCssFile: '//at.alicdn.com/t/font_1678482_u4nrnp8xp6g.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自由添加
      icons: [
        {
          iconClass: 'icon-youjian',
          title: '发邮件',
          link: 'mailto:forbreak@163.com'
        },
        {
          iconClass: 'icon-github',
          title: 'GitHub',
          link: 'https://github.com/dunwu'
        }
      ]
    },
    footer: {
      // 页脚信息
      createYear: 2019, // 博客创建年份
      copyrightInfo: '钝悟（dunwu） | CC-BY-SA-4.0' // 博客版权信息，支持a标签
    },
    htmlModules
  },

  // 插件
  plugins: [
    [
      require('./plugins/love-me'),
      {
        // 鼠标点击爱心特效
        color: '#11a8cd', // 爱心颜色，默认随机色
        excludeClassName: 'theme-vdoing-content' // 要排除元素的class, 默认空''
      }
    ],

    ['fulltext-search'], // 全文搜索

    // ['thirdparty-search', { // 可以添加第三方搜索链接的搜索框（原官方搜索框的参数仍可用）
    //   thirdparty: [ // 可选，默认 []
    //     {
    //       title: '在GitHub中搜索',
    //       frontUrl: 'https://github.com/search?q=', // 搜索链接的前面部分
    //       behindUrl: '' // 搜索链接的后面部分，可选，默认 ''
    //     },
    //     {
    //       title: '在npm中搜索',
    //       frontUrl: 'https://www.npmjs.com/search?q=',
    //     },
    //     {
    //       title: '在Bing中搜索',
    //       frontUrl: 'https://cn.bing.com/search?q='
    //     }
    //   ]
    // }],

    [
      'one-click-copy',
      {
        // 代码块复制按钮
        copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
        copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
        duration: 1000, // prompt message display time.
        showInMobile: false // whether to display on the mobile side, default: false.
      }
    ],
    [
      'demo-block',
      {
        // demo演示模块 https://github.com/xiguaxigua/vuepress-plugin-demo-block
        settings: {
          // jsLib: ['http://xxx'], // 在线示例(jsfiddle, codepen)中的js依赖
          // cssLib: ['http://xxx'], // 在线示例中的css依赖
          // vue: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js', // 在线示例中的vue依赖
          jsfiddle: false, // 是否显示 jsfiddle 链接
          codepen: true, // 是否显示 codepen 链接
          horizontal: false // 是否展示为横向样式
        }
      }
    ],
    [
      'vuepress-plugin-zooming', // 放大图片
      {
        selector: '.theme-vdoing-content img:not(.no-zoom)',
        options: {
          bgColor: 'rgba(0,0,0,0.6)'
        }
      }
    ],
    [
      '@vuepress/last-updated', // "上次更新"时间格式
      {
        transformer: (timestamp, lang) => {
          const dayjs = require('dayjs') // https://day.js.org/
          return dayjs(timestamp).format('YYYY/MM/DD, HH:mm:ss')
        }
      }
    ],
    [
      'vuepress-plugin-comment', // 评论
      {
        choosen: 'gitalk',
        options: {
          clientID: 'fc4fe65ebf0d9829e544',
          clientSecret: 'c026380eea4b4f1a308d39d6b556cdbd5e220139',
          repo: 'waterdrop', // GitHub 仓库
          owner: 'dunwu', // GitHub仓库所有者
          admin: ['dunwu'], // 对仓库有写权限的人
          // distractionFreeMode: true,
          pagerDirection: 'last', // 'first'正序 | 'last'倒序
          id: '<%- (frontmatter.permalink || frontmatter.to.path).slice(-16) %>', //  页面的唯一标识,长度不能超过50
          title: '「评论」<%- frontmatter.title %>', // GitHub issue 的标题
          labels: ['Gitalk', 'Comment'], // GitHub issue 的标签
          body: '页面：<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>' // GitHub issue 的内容
        }
      }
    ]
  ],

  // 监听文件变化并重新构建
  extraWatchFiles: ['.vuepress/config.js', '.vuepress/config/htmlModules.js']
}

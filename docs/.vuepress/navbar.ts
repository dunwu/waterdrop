import { navbar } from 'vuepress-theme-hope'

export default navbar([
  // '/',
  {
    text: '笔记',
    icon: 'mdi:notes',
    link: '/00.笔记/'
  },
  {
    text: 'Java',
    icon: 'ri:java-line',
    prefix: '/01.Java/',
    children: [
      {
        text: 'JavaCore',
        icon: 'mdi:numeric-1-box-multiple-outline',
        prefix: 'JavaCore/',
        link: 'JavaCore/',
        children: ['基础特性/', '高级特性/', '容器/', 'IO/', '并发/', 'JVM/', '面试/']
      },
      { text: 'JavaEE', icon: 'mdi:numeric-2-box-multiple-outline', link: '02.JavaEE/' },
      { text: '软件', icon: 'mdi:numeric-3-box-multiple-outline', link: '11.软件/' },
      { text: '工具', icon: 'mdi:numeric-4-box-multiple-outline', link: '12.工具/' },
      { text: '框架', icon: 'mdi:numeric-5-box-multiple-outline', link: '13.框架/' },
      { text: '中间件', icon: 'mdi:numeric-6-box-multiple-outline', link: '14.中间件/' }
    ]
  },
  {
    text: '编程',
    icon: 'mdi:microsoft-visual-studio-code',
    link: '/02.编程/'
  },
  {
    text: '设计',
    icon: 'mdi:design',
    prefix: '/03.设计/',
    children: [
      {
        text: '架构',
        prefix: '架构/',
        children: [
          { text: '综合', link: '综合/' },
          { text: '微服务', link: '微服务/' },
          { text: '安全', link: '安全/' },
          { text: '解决方案', link: '解决方案/' }
        ]
      },
      { text: '设计模式', link: '设计模式/' },
      { text: '重构', link: '重构/' },
      { text: 'DDD', link: 'DDD/' },
      { text: 'UML', link: 'UML/' }
    ]
  },
  {
    text: 'DevOps',
    icon: 'mdi:microsoft-azure-devops',
    link: '/04.DevOps/'
  },
  {
    text: '算法',
    icon: 'carbon:data-structured',
    link: '/11.算法/'
  },
  {
    text: '数据库',
    icon: 'mdi:database',
    link: '/12.数据库/',
    children: [
      { text: '数据库综合', link: '/12.数据库/01.数据库综合/' },
      { text: '数据库中间件', link: '/12.数据库/02.数据库中间件/' },
      {
        text: '关系型数据库',
        link: '/12.数据库/03.关系型数据库/',
        children: [{ text: 'MySQL', icon: 'logos:MySQL', link: '/12.数据库/03.关系型数据库/MySQL/' }]
      },
      {
        text: '文档数据库',
        link: '/12.数据库/04.文档数据库/',
        children: [{ text: 'MongoDB', icon: 'logos:MongoDB', link: '/12.数据库/04.文档数据库/MongoDB/' }]
      },
      {
        text: 'KV数据库',
        link: '/12.数据库/05.KV数据库/',
        children: [{ text: 'Redis', icon: 'logos:Redis', link: '/12.数据库/05.KV数据库/Redis/' }]
      },
      {
        text: '列式数据库',
        link: '/12.数据库/06.列式数据库/',
        children: [{ text: 'HBase', icon: 'logos:HBase', link: '/12.数据库/06.列式数据库/HBase/' }]
      },
      {
        text: '搜索引擎数据库',
        link: '/12.数据库/07.搜索引擎数据库/',
        children: [
          { text: 'Elasticsearch', icon: 'logos:Elasticsearch', link: '/12.数据库/07.搜索引擎数据库/Elasticsearch/' },
          {
            text: 'Elastic技术栈',
            icon: 'vscode-icons:file-type-Elastic',
            link: '/12.数据库/07.搜索引擎数据库/Elastic/'
          }
        ]
      }
    ]
  },
  {
    text: '网络',
    icon: 'mdi:network',
    link: '/13.网络/'
  },
  {
    text: '分布式',
    icon: 'mdi:resistor-nodes',
    prefix: '/15.分布式/',
    children: [
      { text: '分布式理论', link: '分布式理论/' },
      { text: '分布式协同', link: '分布式协同/' },
      { text: '分布式调度', link: '分布式调度/' },
      {
        text: '分布式通信',
        children: [
          { text: 'RPC', icon: 'file-icons:powerpc', link: '分布式通信/RPC' },
          { text: 'MQ', icon: 'mdi:mq', link: '分布式通信/MQ' }
        ]
      },
      { text: '分布式存储', link: '分布式存储/' }
    ]
  },
  {
    text: '大数据',
    icon: 'devicon-plain:hadoop',
    children: [
      { text: 'Hadoop', icon: 'devicon:hadoop', link: '/16.大数据/hadoop/' },
      { text: 'Hive', icon: 'simple-icons:apachehive', link: '/16.大数据/hive/' },
      { text: 'HBase', icon: 'logos:HBase', link: '/12.数据库/06.列式数据库/HBase/' },
      { text: 'ZooKeeper', link: '/15.分布式/分布式协同/ZooKeeper/' },
      { text: 'Kafka', icon: 'logos:kafka-icon', link: '/15.分布式/分布式通信/MQ/Kafka/' }
    ]
  },
  {
    text: '面试',
    icon: 'fluent-color:chat-bubbles-question-16',
    link: '/99.面试/'
  }
])

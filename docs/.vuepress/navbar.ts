import { navbar } from 'vuepress-theme-hope'

export default navbar([
  // '/',
  {
    text: '笔记',
    icon: 'streamline-ultimate-color:notes-book',
    link: '/00.笔记/'
  },
  {
    text: 'Java',
    icon: 'devicon:java',
    prefix: '/01.Java/',
    children: [
      {
        text: 'JavaCore',
        icon: 'devicon:java',
        prefix: 'JavaCore/',
        link: 'JavaCore/',
        children: ['基础特性/', '高级特性/', '容器/', 'IO/', '并发/', 'JVM/', '面试/']
      },
      { text: 'JavaWeb', icon: 'mdi:numeric-2-box-multiple-outline', link: 'JavaWeb/' },
      { text: '软件', icon: 'mdi:numeric-3-box-multiple-outline', link: '软件/' },
      { text: '工具', icon: 'mdi:numeric-4-box-multiple-outline', link: '工具/' },
      { text: '框架', icon: 'mdi:numeric-5-box-multiple-outline', link: '框架/' },
      { text: '中间件', icon: 'mdi:numeric-6-box-multiple-outline', link: '中间件/' }
    ]
  },
  {
    text: '编程',
    icon: 'streamline-ultimate-color:app-window-code',
    link: '/02.编程/'
  },
  {
    text: '设计',
    icon: 'streamline-ultimate-color:module-puzzle',
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
    icon: 'streamline-ultimate-color:medical-app-laptop-1',
    link: '/04.DevOps/'
  },
  {
    text: '算法',
    icon: 'streamline-ultimate-color:board-game-jenga',
    link: '/11.算法/'
  },
  {
    text: '数据库',
    icon: 'streamline-plump-color:database',
    link: '/12.数据库/',
    children: [
      { text: '数据库综合', link: '/12.数据库/数据库综合/' },
      { text: '数据库中间件', link: '/12.数据库/数据库中间件/' },
      {
        text: '关系型数据库',
        link: '/12.数据库/关系型数据库/',
        children: [{ text: 'MySQL', icon: 'logos:mysql', link: '/12.数据库/关系型数据库/MySQL/' }]
      },
      {
        text: '文档数据库',
        link: '/12.数据库/文档数据库/',
        children: [{ text: 'MongoDB', icon: 'logos:mongodb', link: '/12.数据库/文档数据库/MongoDB/' }]
      },
      {
        text: 'KV数据库',
        link: '/12.数据库/KV数据库/',
        children: [{ text: 'Redis', icon: 'logos:redis', link: '/12.数据库/KV数据库/Redis/' }]
      },
      {
        text: '列式数据库',
        link: '/12.数据库/列式数据库/',
        children: [{ text: 'HBase', icon: 'logos:hbase', link: '/12.数据库/列式数据库/HBase/' }]
      },
      {
        text: '搜索引擎数据库',
        link: '/12.数据库/搜索引擎数据库/',
        children: [
          { text: 'Elasticsearch', icon: 'logos:elasticsearch', link: '/12.数据库/搜索引擎数据库/Elasticsearch/' },
          {
            text: 'Elastic技术栈',
            icon: 'vscode-icons:file-type-Elastic',
            link: '/12.数据库/搜索引擎数据库/Elastic/'
          }
        ]
      }
    ]
  },
  {
    text: '网络',
    icon: 'streamline-ultimate-color:network',
    link: '/13.网络/'
  },
  {
    text: '分布式',
    icon: 'streamline-stickies-color:server-network',
    prefix: '/15.分布式/',
    children: [
      { text: '分布式理论', link: '分布式理论/' },
      { text: '分布式协同', link: '分布式协同/' },
      { text: '分布式调度', link: '分布式调度/' },
      { text: '分布式治理', link: '分布式治理/' },
      {
        text: '分布式通信',
        link: '分布式通信/'
        // prefix: '分布式通信/',
        // children: [
        //   { text: 'RPC', icon: 'file-icons:powerpc', link: 'RPC/' },
        //   { text: 'MQ', icon: 'mdi:mq', link: 'MQ/' }
        // ]
      },
      { text: '分布式存储', link: '分布式存储/' }
    ]
  },
  {
    text: '大数据',
    icon: 'streamline-ultimate-color:app-window-pie-chart',
    children: [
      { text: 'Hadoop', icon: 'devicon:hadoop', link: '/16.大数据/hadoop/' },
      { text: 'Hive', icon: 'simple-icons:apachehive', link: '/16.大数据/hive/' },
      { text: 'HBase', icon: 'logos:hbase', link: '/12.数据库/列式数据库/HBase/' },
      { text: 'ZooKeeper', link: '/15.分布式/分布式协同/ZooKeeper/' },
      { text: 'Kafka', icon: 'logos:kafka-icon', link: '/15.分布式/分布式通信/MQ/Kafka/' }
    ]
  },
  {
    text: '面试',
    icon: 'streamline-ultimate-color:award-ribbon-star-1',
    link: '/99.面试/'
  }
])

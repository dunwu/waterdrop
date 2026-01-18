import { sidebar } from 'vuepress-theme-hope'

export default sidebar({
  '/': [
    {
      text: '笔记',
      icon: 'streamline-ultimate-color:notes-book',
      prefix: '00.笔记/',
      children: 'structure',
      collapsible: true
    },
    {
      text: 'Java',
      icon: 'devicon:java',
      prefix: '01.Java/',
      collapsible: true,
      children: 'structure'
    },
    {
      text: '编程',
      icon: 'streamline-ultimate-color:app-window-code',
      prefix: '02.编程/',
      collapsible: true,
      children: 'structure'
    },
    {
      text: '设计',
      icon: 'streamline-ultimate-color:module-puzzle',
      prefix: '03.设计/',
      collapsible: true,
      children: 'structure'
    },
    {
      text: 'DevOps',
      icon: 'streamline-ultimate-color:medical-app-laptop-1',
      prefix: '04.DevOps/',
      collapsible: true,
      children: 'structure'
    },
    {
      text: '算法',
      icon: 'streamline-ultimate-color:board-game-jenga',
      prefix: '11.算法/',
      collapsible: true,
      children: 'structure'
    },
    {
      text: '数据库',
      icon: 'streamline-plump-color:database',
      prefix: '12.数据库/',
      collapsible: true,
      children: [
        { text: '数据库综合', prefix: '数据库综合', collapsible: true, children: 'structure' },
        { text: '数据库中间件', prefix: '数据库中间件', collapsible: true, children: 'structure' },
        { text: '关系型数据库', prefix: '关系型数据库', collapsible: true, children: 'structure' },
        { text: '文档数据库', prefix: '文档数据库', collapsible: true, children: 'structure' },
        { text: 'KV数据库', prefix: 'KV数据库', collapsible: true, children: 'structure' },
        { text: '列式数据库', prefix: '列式数据库', collapsible: true, children: 'structure' },
        { text: '搜索引擎数据库', prefix: '搜索引擎数据库', collapsible: true, children: 'structure' }
      ]
    },
    {
      text: '网络',
      icon: 'streamline-ultimate-color:network',
      prefix: '13.网络/',
      children: 'structure',
      collapsible: true
    },
    {
      text: '操作系统',
      icon: 'streamline-ultimate-color:settings-slider-desktop-horizontal',
      prefix: '14.操作系统/',
      children: 'structure',
      collapsible: true
    },
    {
      text: '分布式',
      icon: 'streamline-stickies-color:server-network',
      prefix: '15.分布式/',
      children: 'structure',
      collapsible: true
    },
    {
      text: '大数据',
      icon: 'streamline-ultimate-color:app-window-pie-chart',
      collapsible: true,
      children: [
        {
          text: 'Hadoop',
          icon: 'devicon:hadoop',
          prefix: '16.大数据/Hadoop/',
          collapsible: true,
          children: 'structure'
        },
        {
          text: 'Hive',
          icon: 'simple-icons:apachehive',
          prefix: '16.大数据/Hive/',
          collapsible: true,
          children: 'structure'
        },
        {
          text: 'Flink',
          icon: 'logos:apache-flink-icon',
          prefix: '16.大数据/Flink/',
          collapsible: true,
          children: 'structure'
        },
        {
          text: 'HBase',
          icon: 'logos:hbase',
          prefix: '12.数据库/列式数据库/HBase/',
          collapsible: true,
          children: 'structure'
        },
        {
          text: 'ZooKeeper',
          prefix: '15.分布式/分布式协同/ZooKeeper/',
          collapsible: true,
          children: 'structure'
        },
        {
          text: 'Kafka',
          icon: 'logos:kafka-icon',
          prefix: '15.分布式/分布式通信/MQ/Kafka/',
          collapsible: true,
          children: 'structure'
        }
      ]
    },
    {
      text: '工作',
      icon: 'streamline-emojis:briefcase',
      prefix: '96.工作/',
      children: 'structure',
      collapsible: true
    }
    // {
    //   text: '面试',
    //   icon: 'streamline-ultimate-color:award-ribbon-star-1',
    //   prefix: '99.面试/',
    //   children: 'structure',
    //   collapsible: true
    // }
    // "intro",
    // "slides",
  ]
})

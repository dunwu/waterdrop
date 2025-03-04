import { sidebar } from 'vuepress-theme-hope'

export default sidebar({
  '/': [
    '',
    {
      text: '归档',
      icon: 'mdi:archive',
      link: '/article/'
    },
    {
      text: 'Java',
      icon: 'mdi:language-java',
      prefix: '01.Java/',
      collapsible: true,
      children: 'structure'
    },
    {
      text: '编程',
      icon: 'mdi:microsoft-visual-studio-code',
      prefix: '02.编程/',
      collapsible: true,
      children: 'structure'
    },
    {
      text: '设计',
      icon: 'mdi:design',
      prefix: '03.设计/',
      collapsible: true,
      children: 'structure'
    },
    {
      text: 'DevOps',
      icon: 'mdi:microsoft-azure-devops',
      prefix: '04.DevOps/',
      collapsible: true,
      children: 'structure'
    },
    {
      text: '数据结构和算法',
      icon: 'carbon:data-structured',
      prefix: '11.数据结构和算法/',
      collapsible: true,
      children: 'structure'
    },
    {
      text: '数据库',
      icon: 'mdi:database',
      prefix: '12.数据库/',
      collapsible: true,
      children: [
        { text: '数据库综合', prefix: '01.数据库综合', collapsible: true, children: 'structure' },
        { text: '数据库中间件', prefix: '02.数据库中间件', collapsible: true, children: 'structure' },
        {
          text: '关系型数据库',
          prefix: '03.关系型数据库/',
          children: [{ text: 'Mysql', icon: 'logos:mysql', prefix: 'mysql', collapsible: true, children: 'structure' }]
        },
        {
          text: '文档数据库',
          prefix: '04.文档数据库/',
          children: [
            { text: 'MongoDB', icon: 'logos:mongodb', prefix: 'mongodb', collapsible: true, children: 'structure' }
          ]
        },
        {
          text: 'KV数据库',
          prefix: '05.KV数据库/',
          children: [{ text: 'Redis', icon: 'logos:redis', prefix: 'redis', collapsible: true, children: 'structure' }]
        },
        {
          text: '列式数据库',
          prefix: '06.列式数据库/',
          children: [{ text: 'HBase', icon: 'logos:hbase', prefix: 'hbase', collapsible: true, children: 'structure' }]
        },
        {
          text: '搜索引擎数据库',
          prefix: '07.搜索引擎数据库/',
          children: [
            {
              text: 'Elasticsearch',
              icon: 'logos:elasticsearch',
              prefix: 'elasticsearch',
              collapsible: true,
              children: 'structure'
            },
            {
              text: 'Elastic技术栈',
              icon: 'vscode-icons:file-type-elastic',
              prefix: 'elastic',
              collapsible: true,
              children: 'structure'
            }
          ]
        }
      ]
    },
    {
      text: '网络',
      icon: 'mdi:network',
      prefix: '13.网络/',
      children: 'structure',
      collapsible: true
    },
    {
      text: '分布式',
      icon: 'mdi:resistor-nodes',
      prefix: '15.分布式/',
      children: 'structure',
      collapsible: true
    },
    {
      text: '大数据',
      icon: 'devicon-plain:hadoop',
      children: [
        {
          text: 'Hadoop',
          icon: 'devicon:hadoop',
          prefix: '16.大数据/hadoop/',
          collapsible: true,
          children: 'structure'
        },
        {
          text: 'Hive',
          icon: 'simple-icons:apachehive',
          prefix: '16.大数据/hive/',
          collapsible: true,
          children: 'structure'
        },
        {
          text: 'HBase',
          icon: 'logos:hbase',
          prefix: '12.数据库/06.列式数据库/hbase/',
          collapsible: true,
          children: 'structure'
        },
        {
          text: 'ZooKeeper',
          prefix: '15.分布式/11.分布式协同/02.ZooKeeper/',
          collapsible: true,
          children: 'structure'
        },
        {
          text: 'Kafka',
          icon: 'logos:kafka-icon',
          prefix: '15.分布式/21.分布式通信/02.MQ/01.Kafka/',
          collapsible: true,
          children: 'structure'
        }
      ]
    },
    {
      text: '工作',
      icon: 'mdi:briefcase',
      prefix: '96.工作/',
      children: 'structure',
      collapsible: true
    },
    {
      text: '笔记',
      icon: 'mdi:note',
      prefix: '99.笔记/',
      children: 'structure',
      collapsible: true
    }
    // "intro",
    // "slides",
  ]
})

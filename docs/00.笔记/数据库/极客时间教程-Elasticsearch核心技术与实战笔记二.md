---
title: 《极客时间教程 - Elasticsearch 核心技术与实战》笔记二
date: 2024-11-12 07:58:46
categories:
  - 笔记
  - 数据库
tags:
  - 数据库
  - 搜索引擎数据库
  - Elasticsearch
permalink: /pages/6b24765f/
---

# 《极客时间教程 - Elasticsearch 核心技术与实战》笔记二

[极客时间教程 - Elasticsearch 核心技术与实战](https://time.geekbang.org/course/detail/100030501-102659) 学习笔记

<!-- more -->

## 第四章：深入搜索

### 基于词项和基于全文的搜索

#### 基于词项的查询

Term 是表达语意的最小单位。搜索和利用统计语言模型进行自然语言处理都需要处理 Term

Term 级别查询：Term / Range / Exists / Prefix / Wildcard

在 ES 中，Term 查询，对输入不做分词。会将输入作为一个整体，在倒排索引中查找准确的词项，并且使用相关度计算公式为每个包含该词项的文档进行相关度计算。

可以通过 Constant Score 将查询转换成一个 Filtering，避免算法，并利用缓存，提高性能。

#### 基于文本的查询

文本查询：match、match_phrase、query_string

索引和搜索时都会进行分词，查询字符串先传递到一个合适的分词器，然后生成一个供查询的词项列表。

查询时，会先对输入的查询进行分词，然后每个词项柱哥进行底层的查询，最终将结果进行合并，并为每个文档计算一个相关度分值。

【示例】

```shell
DELETE products
PUT products
{
  "settings": {
    "number_of_shards": 1
  }
}

POST /products/_bulk
{ "index": { "_id": 1 }}
{ "productID" : "XHDK-A-1293-#fJ3","desc":"iPhone" }
{ "index": { "_id": 2 }}
{ "productID" : "KDKE-B-9947-#kL5","desc":"iPad" }
{ "index": { "_id": 3 }}
{ "productID" : "JODL-X-1937-#pV7","desc":"MBP" }

GET /products

POST /products/_search
{
  "query": {
    "term": {
      "desc": {
        //"value": "iPhone"
        "value":"iphone"
      }
    }
  }
}

POST /products/_search
{
  "query": {
    "term": {
      "desc.keyword": {
        //"value": "iPhone"
        //"value":"iphone"
      }
    }
  }
}

POST /products/_search
{
  "query": {
    "term": {
      "productID": {
        "value": "XHDK-A-1293-#fJ3"
      }
    }
  }
}

POST /products/_search
{
  //"explain": true,
  "query": {
    "term": {
      "productID.keyword": {
        "value": "XHDK-A-1293-#fJ3"
      }
    }
  }
}

POST /products/_search
{
  "explain": true,
  "query": {
    "constant_score": {
      "filter": {
        "term": {
          "productID.keyword": "XHDK-A-1293-#fJ3"
        }
      }

    }
  }
}

#设置 position_increment_gap
DELETE groups
PUT groups
{
  "mappings": {
    "properties": {
      "names":{
        "type": "text",
        "position_increment_gap": 0
      }
    }
  }
}

GET groups/_mapping

POST groups/_doc
{
  "names": [ "John Water", "Water Smith"]
}

POST groups/_search
{
  "query": {
    "match_phrase": {
      "names": {
        "query": "Water Water",
        "slop": 100
      }
    }
  }
}

POST groups/_search
{
  "query": {
    "match_phrase": {
      "names": "Water Smith"
    }
  }
}
```

### 结构化搜索

结构化搜索是指对结构化数据的搜索。

日期、布尔、和数字类型都是结构化的。它们都有精确的格式，可以根据这些格式进行逻辑操作，如：比较范围、判定大小。

文本也可以是结构化的。结构化的文本可以精确匹配（term）或部分匹配（prefix）

结构化结果只有是或否两个选项。

【示例】

```shell
#结构化搜索，精确匹配
DELETE products
POST /products/_bulk
{ "index": { "_id": 1 }}
{ "price" : 10,"avaliable":true,"date":"2018-01-01", "productID" : "XHDK-A-1293-#fJ3" }
{ "index": { "_id": 2 }}
{ "price" : 20,"avaliable":true,"date":"2019-01-01", "productID" : "KDKE-B-9947-#kL5" }
{ "index": { "_id": 3 }}
{ "price" : 30,"avaliable":true, "productID" : "JODL-X-1937-#pV7" }
{ "index": { "_id": 4 }}
{ "price" : 30,"avaliable":false, "productID" : "QQPX-R-3956-#aD8" }

GET products/_mapping

#对布尔值 match 查询，有算分
POST products/_search
{
  "profile": "true",
  "query": {
    "term": {
      "avaliable": true
    }
  }
}

#对布尔值，通过 constant score 转成 filtering，没有算分
POST products/_search
{
  "profile": "true",
  "explain": true,
  "query": {
    "constant_score": {
      "filter": {
        "term": {
          "avaliable": true
        }
      }
    }
  }
}

#数字类型 Term
POST products/_search
{
  "profile": "true",
  "explain": true,
  "query": {
    "term": {
      "price": 30
    }
  }
}

#数字类型 terms
POST products/_search
{
  "query": {
    "constant_score": {
      "filter": {
        "terms": {
          "price": [
            "20",
            "30"
          ]
        }
      }
    }
  }
}

#数字 Range 查询
GET products/_search
{
    "query" : {
        "constant_score" : {
            "filter" : {
                "range" : {
                    "price" : {
                        "gte" : 20,
                        "lte"  : 30
                    }
                }
            }
        }
    }
}

# 日期 range
POST products/_search
{
    "query" : {
        "constant_score" : {
            "filter" : {
                "range" : {
                    "date" : {
                      "gte" : "now-1y"
                    }
                }
            }
        }
    }
}

#exists 查询
POST products/_search
{
  "query": {
    "constant_score": {
      "filter": {
        "exists": {
          "field": "date"
        }
      }
    }
  }
}

#处理多值字段
POST /movies/_bulk
{ "index": { "_id": 1 }}
{ "title" : "Father of the Bridge Part II","year":1995, "genre":"Comedy"}
{ "index": { "_id": 2 }}
{ "title" : "Dave","year":1993,"genre":["Comedy","Romance"] }

#处理多值字段，term 查询是包含，而不是等于
POST movies/_search
{
  "query": {
    "constant_score": {
      "filter": {
        "term": {
          "genre.keyword": "Comedy"
        }
      }
    }
  }
}

#字符类型 terms
POST products/_search
{
  "query": {
    "constant_score": {
      "filter": {
        "terms": {
          "productID.keyword": [
            "QQPX-R-3956-#aD8",
            "JODL-X-1937-#pV7"
          ]
        }
      }
    }
  }
}

POST products/_search
{
  "profile": "true",
  "explain": true,
  "query": {
    "match": {
      "price": 30
    }
  }
}

POST products/_search
{
  "profile": "true",
  "explain": true,
  "query": {
    "term": {
      "date": "2019-01-01"
    }
  }
}

POST products/_search
{
  "profile": "true",
  "explain": true,
  "query": {
    "match": {
      "date": "2019-01-01"
    }
  }
}

POST products/_search
{
  "profile": "true",
  "explain": true,
  "query": {
    "constant_score": {
      "filter": {
        "term": {
          "productID.keyword": "XHDK-A-1293-#fJ3"
        }
      }
    }
  }
}

POST products/_search
{
  "profile": "true",
  "explain": true,
  "query": {
    "term": {
      "productID.keyword": "XHDK-A-1293-#fJ3"
    }
  }
}

#对布尔数值
POST products/_search
{
  "query": {
    "constant_score": {
      "filter": {
        "term": {
          "avaliable": "false"
        }
      }
    }
  }
}

POST products/_search
{
  "query": {
    "term": {
      "avaliable": {
        "value": "false"
      }
    }
  }
}

POST products/_search
{
  "profile": "true",
  "explain": true,
  "query": {
    "term": {
      "price": {
        "value": "20"
      }
    }
  }
}

POST products/_search
{
  "profile": "true",
  "explain": true,
  "query": {
    "match": {
      "price": "20"
    }
}

POST products/_search
{
  "query": {
    "constant_score": {
      "filter": {
        "bool": {
          "must_not": {
            "exists": {
              "field": "date"
            }
          }
        }
      }
    }
  }
}
```

### 搜索相关性算分

ES5 前用 **TF-IDF**，ES5 后用 **BM25**（TF 增加时趋于平稳值）。

- **TF**（词频）：检索词在文档中出现频率
- **IDF**（逆文档频率）：log(全部文档数/含检索词文档数)
- **Stop Word**：高频但无意义的词（的、the、a）
- **Boosting**：`boost > 1` 权重提升，`0 < boost < 1` 权重降低，`boost < 0` 负分

【示例】

```shell
PUT testscore
{
  "settings": {
    "number_of_shards": 1
  },
  "mappings": {
    "properties": {
      "content": {
        "type": "text"
      }
    }
  }
}

PUT testscore/_bulk
{ "index": { "_id": 1 }}
{ "content":"we use Elasticsearch to power the search" }
{ "index": { "_id": 2 }}
{ "content":"we like elasticsearch" }
{ "index": { "_id": 3 }}
{ "content":"The scoring of documents is caculated by the scoring formula" }
{ "index": { "_id": 4 }}
{ "content":"you know, for search" }

POST /testscore/_search
{
  //"explain": true,
  "query": {
    "match": {
      "content":"you"
      //"content": "elasticsearch"
      //"content":"the"
      //"content": "the elasticsearch"
    }
  }
}

POST testscore/_search
{
    "query": {
        "boosting" : {
            "positive" : {
                "term" : {
                    "content" : "elasticsearch"
                }
            },
            "negative" : {
                 "term" : {
                     "content" : "like"
                }
            },
            "negative_boost" : 0.2
        }
    }
}

POST tmdb/_search
{
  "_source": [
    "title",
    "overview"
  ],
  "query": {
    "more_like_this": {
      "fields": [
        "title^10",
        "overview"
      ],
      "like": [
        {
          "_id": "14191"
        }
      ],
      "min_term_freq": 1,
      "max_query_terms": 12
    }
  }
}
```

### Query & Filtering

- **Query Context**：有相关性算分
- **Filter Context**：无算分，可利用缓存，性能更好

【示例】

```shell
POST /products/_bulk
{ "index": { "_id": 1 }}
{ "price" : 10,"avaliable":true,"date":"2018-01-01", "productID" : "XHDK-A-1293-#fJ3" }
{ "index": { "_id": 2 }}
{ "price" : 20,"avaliable":true,"date":"2019-01-01", "productID" : "KDKE-B-9947-#kL5" }
{ "index": { "_id": 3 }}
{ "price" : 30,"avaliable":true, "productID" : "JODL-X-1937-#pV7" }
{ "index": { "_id": 4 }}
{ "price" : 30,"avaliable":false, "productID" : "QQPX-R-3956-#aD8" }

#基本语法
POST /products/_search
{
  "query": {
    "bool" : {
      "must" : {
        "term" : { "price" : "30" }
      },
      "filter": {
        "term" : { "avaliable" : "true" }
      },
      "must_not" : {
        "range" : {
          "price" : { "lte" : 10 }
        }
      },
      "should" : [
        { "term" : { "productID.keyword" : "JODL-X-1937-#pV7" } },
        { "term" : { "productID.keyword" : "XHDK-A-1293-#fJ3" } }
      ],
      "minimum_should_match" :1
    }
  }
}

#改变数据模型，增加字段。解决数组包含而不是精确匹配的问题
POST /newmovies/_bulk
{ "index": { "_id": 1 }}
{ "title" : "Father of the Bridge Part II","year":1995, "genre":"Comedy","genre_count":1 }
{ "index": { "_id": 2 }}
{ "title" : "Dave","year":1993,"genre":["Comedy","Romance"],"genre_count":2 }

#must，有算分
POST /newmovies/_search
{
  "query": {
    "bool": {
      "must": [
        {"term": {"genre.keyword": {"value": "Comedy"}}},
        {"term": {"genre_count": {"value": 1}}}

      ]
    }
  }
}

#Filter。不参与算分，结果的 score 是 0
POST /newmovies/_search
{
  "query": {
    "bool": {
      "filter": [
        {"term": {"genre.keyword": {"value": "Comedy"}}},
        {"term": {"genre_count": {"value": 1}}}
        ]

    }
  }
}

#Filtering Context
POST _search
{
  "query": {
    "bool" : {

      "filter": {
        "term" : { "avaliable" : "true" }
      },
      "must_not" : {
        "range" : {
          "price" : { "lte" : 10 }
        }
      }
    }
  }
}

#Query Context
POST /products/_bulk
{ "index": { "_id": 1 }}
{ "price" : 10,"avaliable":true,"date":"2018-01-01", "productID" : "XHDK-A-1293-#fJ3" }
{ "index": { "_id": 2 }}
{ "price" : 20,"avaliable":true,"date":"2019-01-01", "productID" : "KDKE-B-9947-#kL5" }
{ "index": { "_id": 3 }}
{ "price" : 30,"avaliable":true, "productID" : "JODL-X-1937-#pV7" }
{ "index": { "_id": 4 }}
{ "price" : 30,"avaliable":false, "productID" : "QQPX-R-3956-#aD8" }

POST /products/_search
{
  "query": {
    "bool": {
      "should": [
        {
          "term": {
            "productID.keyword": {
              "value": "JODL-X-1937-#pV7"}}
        },
        {"term": {"avaliable": {"value": true}}
        }
      ]
    }
  }
}

#嵌套，实现了 should not 逻辑
POST /products/_search
{
  "query": {
    "bool": {
      "must": {
        "term": {
          "price": "30"
        }
      },
      "should": [
        {
          "bool": {
            "must_not": {
              "term": {
                "avaliable": "false"
              }
            }
          }
        }
      ],
      "minimum_should_match": 1
    }
  }
}

#Controll the Precision
POST _search
{
  "query": {
    "bool" : {
      "must" : {
        "term" : { "price" : "30" }
      },
      "filter": {
        "term" : { "avaliable" : "true" }
      },
      "must_not" : {
        "range" : {
          "price" : { "lte" : 10 }
        }
      },
      "should" : [
        { "term" : { "productID.keyword" : "JODL-X-1937-#pV7" } },
        { "term" : { "productID.keyword" : "XHDK-A-1293-#fJ3" } }
      ],
      "minimum_should_match" :2
    }
  }
}

POST /animals/_search
{
  "query": {
    "bool": {
      "should": [
        { "term": { "text": "brown" }},
        { "term": { "text": "red" }},
        { "term": { "text": "quick"   }},
        { "term": { "text": "dog"   }}
      ]
    }
  }
}

POST /animals/_search
{
  "query": {
    "bool": {
      "should": [
        { "term": { "text": "quick" }},
        { "term": { "text": "dog"   }},
        {
          "bool":{
            "should":[
               { "term": { "text": "brown" }},
                 { "term": { "text": "brown" }},
            ]
          }

        }
      ]
    }
  }
}

DELETE blogs
POST /blogs/_bulk
{ "index": { "_id": 1 }}
{"title":"Apple iPad", "content":"Apple iPad,Apple iPad" }
{ "index": { "_id": 2 }}
{"title":"Apple iPad,Apple iPad", "content":"Apple iPad" }

POST blogs/_search
{
  "query": {
    "bool": {
      "should": [
        {"match": {
          "title": {
            "query": "apple,ipad",
            "boost": 1.1
          }
        }},

        {"match": {
          "content": {
            "query": "apple,ipad",
            "boost":
          }
        }}
      ]
    }
  }
}

DELETE news
POST /news/_bulk
{ "index": { "_id": 1 }}
{ "content":"Apple Mac" }
{ "index": { "_id": 2 }}
{ "content":"Apple iPad" }
{ "index": { "_id": 3 }}
{ "content":"Apple employee like Apple Pie and Apple Juice" }

POST news/_search
{
  "query": {
    "bool": {
      "must": {
        "match":{"content":"apple"}
      }
    }
  }
}

POST news/_search
{
  "query": {
    "bool": {
      "must": {
        "match":{"content":"apple"}
      },
      "must_not": {
        "match":{"content":"pie"}
      }
    }
  }
}

POST news/_search
{
  "query": {
    "boosting": {
      "positive": {
        "match": {
          "content": "apple"
        }
      },
      "negative": {
        "match": {
          "content": "pie"
        }
      },
      "negative_boost": 0.5
    }
  }
}
```

### 单字符串多字段查询 - DisMaxQuery

**Disjunction Max Query**：将评分最高的字段作为结果返回（竞争关系场景）。可通过 `tie_breaker` 引入其他字段影响。

【示例】

```shell
PUT /blogs/_doc/1
{
    "title": "Quick brown rabbits",
    "body":  "Brown rabbits are commonly seen."
}

PUT /blogs/_doc/2
{
    "title": "Keeping pets healthy",
    "body":  "My quick brown fox eats rabbits on a regular basis."
}

POST /blogs/_search
{
    "query": {
        "bool": {
            "should": [
                { "match": { "title": "Brown fox" }},
                { "match": { "body":  "Brown fox" }}
            ]
        }
    }
}

POST blogs/_search
{
    "query": {
        "dis_max": {
            "queries": [
                { "match": { "title": "Quick pets" }},
                { "match": { "body":  "Quick pets" }}
            ]
        }
    }
}

POST blogs/_search
{
  "query": {
    "dis_max": {
      "queries": [
        {
          "match": {
            "title": "Quick pets"
          }
        },
        {
          "match": {
            "body": "Quick pets"
          }
        }
      ],
      "tie_breaker": 0.2
    }
  }
}
```

### 单字符串多字段查询 - Multi Match

场景：最佳字段（best_fields，默认）、多数字段、混合字段。`minimum_should_match` 等参数可传递到生成的 query 中。

【示例】

```shell
POST blogs/_search
{
    "query": {
        "dis_max": {
            "queries": [
                { "match": { "title": "Quick pets" }},
                { "match": { "body":  "Quick pets" }}
            ],
            "tie_breaker": 0.2
        }
    }
}

POST blogs/_search
{
  "query": {
    "multi_match": {
      "type": "best_fields",
      "query": "Quick pets",
      "fields": ["title","body"],
      "tie_breaker": 0.2,
      "minimum_should_match": "20%"
    }
  }
}

POST books/_search
{
    "multi_match": {
        "query":  "Quick brown fox",
        "fields": "*_title"
    }
}

POST books/_search
{
    "multi_match": {
        "query":  "Quick brown fox",
        "fields": [ "*_title", "chapter_title^2" ]
    }
}

DELETE /titles
PUT /titles
{
    "settings": { "number_of_shards": 1 },
    "mappings": {
        "my_type": {
            "properties": {
                "title": {
                    "type":     "string",
                    "analyzer": "english",
                    "fields": {
                        "std":   {
                            "type":     "string",
                            "analyzer": "standard"
                        }
                    }
                }
            }
        }
    }
}

PUT /titles
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "english"
      }
    }
  }
}

POST titles/_bulk
{ "index": { "_id": 1 }}
{ "title": "My dog barks" }
{ "index": { "_id": 2 }}
{ "title": "I see a lot of barking dogs on the road " }

GET titles/_search
{
  "query": {
    "match": {
      "title": "barking dogs"
    }
  }
}

DELETE /titles
PUT /titles
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "english",
        "fields": {"std": {"type": "text","analyzer": "standard"}}
      }
    }
  }
}

POST titles/_bulk
{ "index": { "_id": 1 }}
{ "title": "My dog barks" }
{ "index": { "_id": 2 }}
{ "title": "I see a lot of barking dogs on the road " }

GET /titles/_search
{
   "query": {
        "multi_match": {
            "query":  "barking dogs",
            "type":   "most_fields",
            "fields": [ "title", "title.std" ]
        }
    }
}

GET /titles/_search
{
  "query": {
    "multi_match": {
      "query": "barking dogs",
      "type": "most_fields",
      "fields": [
        "title^10",
        "title.std"
      ]
    }
  }
}
```

### 多语言及中文分词

自然语言处理优化：归一化词元、抽取词根、同义词、拼写纠错

中文分析器：elasticsearch-analysis-hanlp、elasticsearch-analysis-ik、elasticsearch-analysis-pinyin

### SpaceJam 一个全文搜索的实例

### 使用 SearchTemplate 和 IndexAlias 进行查询

### Function Score Query

查询后对匹配文档重新算分。内置函数：
- `weight`：简单权重
- `field_value_factor`：用字段值修改 `_score`
- `random_score`：随机算分
- 衰减函数：距离某值越近得分越高
- `script_score`：自定义脚本

**Boost Mode**：multiply / sum / min / max / replace

`max_boost` 控制算分最大值

【示例】

```shell
DELETE blogs
PUT /blogs/_doc/1
{
  "title":   "About popularity",
  "content": "In this post we will talk about...",
  "votes":   0
}

PUT /blogs/_doc/2
{
  "title":   "About popularity",
  "content": "In this post we will talk about...",
  "votes":   100
}

PUT /blogs/_doc/3
{
  "title":   "About popularity",
  "content": "In this post we will talk about...",
  "votes":   1000000
}

POST /blogs/_search
{
  "query": {
    "function_score": {
      "query": {
        "multi_match": {
          "query":    "popularity",
          "fields": [ "title", "content" ]
        }
      },
      "field_value_factor": {
        "field": "votes"
      }
    }
  }
}

POST /blogs/_search
{
  "query": {
    "function_score": {
      "query": {
        "multi_match": {
          "query":    "popularity",
          "fields": [ "title", "content" ]
        }
      },
      "field_value_factor": {
        "field": "votes",
        "modifier": "log1p"
      }
    }
  }
}

POST /blogs/_search
{
  "query": {
    "function_score": {
      "query": {
        "multi_match": {
          "query":    "popularity",
          "fields": [ "title", "content" ]
        }
      },
      "field_value_factor": {
        "field": "votes",
        "modifier": "log1p" ,
        "factor": 0.1
      }
    }
  }
}

POST /blogs/_search
{
  "query": {
    "function_score": {
      "query": {
        "multi_match": {
          "query":    "popularity",
          "fields": [ "title", "content" ]
        }
      },
      "field_value_factor": {
        "field": "votes",
        "modifier": "log1p" ,
        "factor": 0.1
      },
      "boost_mode": "sum",
      "max_boost": 3
    }
  }
}

POST /blogs/_search
{
  "query": {
    "function_score": {
      "random_score": {
        "seed": 911119
      }
    }
  }
}
```

### Term&PhraseSuggester

### 自动补全

**Completion Suggester**：采用 FST 数据结构（非倒排索引），加载到内存，速度极快。

精准度：Completion > Phrase > Term | 召回率：Term > Phrase > Completion | 性能：Completion > Phrase > Term

### 跨集群搜索

ES 5.3+ 支持跨集群搜索，任何节点可作为 federated 节点代理搜索请求，无需以 Client Node 形式加入其他集群。

## 第五章：分布式特性

### 集群分布式模型

**节点类型**：
- **Coordinating Node**：处理请求（默认所有节点）
- **Data Node**：保存分片数据
- **Master Node**：处理索引创建/删除、分片分配、维护集群状态

**选主**：节点互 ping，node id 最小的成为主节点。7.0 前需设 `minimum_master_nodes = N/2+1` 避免脑裂，7.0 起自动处理。

### 分片与故障转移

- **主分片**：水平扩展
- **副本分片**：高可用、冗余、故障转移

### 文档分布式存储

路由公式：`shard = hash(_routing) % number_of_primary_shards`

默认 `_routing` 是文档 ID，可定制。这也是主分片数不能随意修改的原因。

### 分片及其生命周期

分片是 ES 最小工作单元，是一个 Lucene 索引。

**倒排索引不可变性**：无需考虑并发写，避免锁机制；新文档需重建索引

**Lucene Segment**：单个倒排索引文件，不可变。多个 Segment = Lucene Index = ES shard

**Refresh**：Index buffer → Segment，默认 1 秒，刷新后可搜索

**事务日志**：写文档时同步写入，保证数据不丢失。Refresh 时不清空事务日志

**Flush**：refresh + fsync + 清空事务日志（默认 30 分钟或日志满 512MB）

**Merge**：Segment 过多时自动合并

### 分布式查询及相关性评分

**两阶段**：
1. **Query**：协调节点随机选主分片数个分片发送查询，各分片返回 `from+size` 个文档 ID 和排序值
2. **Fetch**：协调节点重排序后，通过 multi get 获取详细文档数据

**潜在问题**：
- **深度分页**：每个分片查 `from+size` 个文档，协调节点处理 `主分片数*(from+size)`
- **算分不准**：分片独立计算相关度，数据量少时偏差大。解决：主分片设为 1 或使用 `dfs_query_then_fetch`

#### 潜在问题

性能问题

- 每个分片上需要查的文档数 = from + size
- 最终协调节点需要处理 = 主分片数 \* ( from + size)
- 深度分页

相关性算分

每个分片都要基于自己分片上的数据进行相关度计算。这会导致打分偏离的情况，尤其是数据量很少时。当文档总数很少的情况下，主分片数越多，相关性计算会越不准。

解决算分不准的方法

将主分片数设为 1；

使用 `_search?search_type=dfs_query_then_fetch`，消耗更多 CPU 和内存，执行性能低下

```shell
DELETE message
PUT message
{
  "settings": {
    "number_of_shards": 20
  }
}

GET message

POST message/_doc?routing=1
{
  "content":"good"
}

POST message/_doc?routing=2
{
  "content":"good morning"
}

POST message/_doc?routing=3
{
  "content":"good morning everyone"
}

POST message/_search
{
  "explain": true,
  "query": {
    "match_all": {}
  }
}

POST message/_search
{
  "explain": true,
  "query": {
    "term": {
      "content": {
        "value": "good"
      }
    }
  }
}

POST message/_search?search_type=dfs_query_then_fetch
{

  "query": {
    "term": {
      "content": {
        "value": "good"
      }
    }
  }
}
```

### 排序 & DocValues/Fielddata

默认按 `_score` 降序排序。Text 字段排序需打开 `fielddata`，Keyword 字段默认开启 `doc_values`。

```shell
#单字段排序
POST /kibana_sample_data_ecommerce/_search
{
  "size": 5,
  "query": {
    "match_all": {

    }
  },
  "sort": [
    {"order_date": {"order": "desc"}}
  ]
}

#多字段排序
POST /kibana_sample_data_ecommerce/_search
{
  "size": 5,
  "query": {
    "match_all": {

    }
  },
  "sort": [
    {"order_date": {"order": "desc"}},
    {"_doc":{"order": "asc"}},
    {"_score":{ "order": "desc"}}
  ]
}

GET kibana_sample_data_ecommerce/_mapping

#对 text 字段进行排序。默认会报错，需打开 fielddata
POST /kibana_sample_data_ecommerce/_search
{
  "size": 5,
  "query": {
    "match_all": {

    }
  },
  "sort": [
    {"customer_full_name": {"order": "desc"}}
  ]
}

#打开 text 的 fielddata
PUT kibana_sample_data_ecommerce/_mapping
{
  "properties": {
    "customer_full_name" : {
          "type" : "text",
          "fielddata": true,
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        }
  }
}

#关闭 keyword 的 doc values
PUT test_keyword
PUT test_keyword/_mapping
{
  "properties": {
    "user_name":{
      "type": "keyword",
      "doc_values":false
    }
  }
}

DELETE test_keyword

PUT test_text
PUT test_text/_mapping
{
  "properties": {
    "intro":{
      "type": "text",
      "doc_values":true
    }
  }
}

DELETE test_text

DELETE temp_users
PUT temp_users
PUT temp_users/_mapping
{
  "properties": {
    "name":{"type": "text","fielddata": true},
    "desc":{"type": "text","fielddata": true}
  }
}

Post temp_users/_doc
{"name":"Jack","desc":"Jack is a good boy!","age":10}

#打开 fielddata 后，查看 docvalue_fields 数据
POST  temp_users/_search
{
  "docvalue_fields": [
    "name","desc"
    ]
}

#查看整型字段的 docvalues
POST  temp_users/_search
{
  "docvalue_fields": [
    "age"
    ]
}
```

### 分页与遍历

- **from + size**：深分页问题（默认限制 10000），每个分片先获取 `from+size` 个文档
- **search_after**：实时翻页，不支持指定页数，需指定 sort 且值唯一
- **scroll**：创建快照，新数据不可见，每次输入上次 scroll_id

```shell
POST tmdb/_search
{
  "from": 10000,
  "size": 1,
  "query": {
    "match_all": {

    }
  }
}

#Scroll API
DELETE users

POST users/_doc
{"name":"user1","age":10}

POST users/_doc
{"name":"user2","age":11}

POST users/_doc
{"name":"user2","age":12}

POST users/_doc
{"name":"user2","age":13}

POST users/_count

POST users/_search
{
    "size": 1,
    "query": {
        "match_all": {}
    },
    "sort": [
        {"age": "desc"} ,
        {"_id": "asc"}
    ]
}

POST users/_search
{
    "size": 1,
    "query": {
        "match_all": {}
    },
    "search_after":
        [
          10,
          "ZQ0vYGsBrR8X3IP75QqX"],
    "sort": [
        {"age": "desc"} ,
        {"_id": "asc"}
    ]
}

#Scroll API
DELETE users
POST users/_doc
{"name":"user1","age":10}

POST users/_doc
{"name":"user2","age":20}

POST users/_doc
{"name":"user3","age":30}

POST users/_doc
{"name":"user4","age":40}

POST /users/_search?scroll=5m
{
    "size": 1,
    "query": {
        "match_all" : {
        }
    }
}

POST users/_doc
{"name":"user5","age":50}
POST /_search/scroll
{
    "scroll" : "1m",
    "scroll_id" : "DXF1ZXJ5QW5kRmV0Y2gBAAAAAAAAAWAWbWdoQXR2d3ZUd2kzSThwVTh4bVE0QQ=="
}
```

### 并发读写

采用**乐观锁**机制：
- 内部版本控制：`_seq_no` + `primary_term`
- 外部版本控制：`version` + `version_type=external`

## 第六章：深入聚合分析

### Bucket&Metric聚合分析及嵌套聚合

Metric（统计） - 统计计算

Bucket（分组） - 按一定规则，将文档分配到不同的桶中。

Metric 聚合

- **单值聚合** - 只输出一个分析结果
  - min、max、avg、sum、cardinality
- **多值聚合** - 输出多个分析结果
  - stats、extended_stats、percentile、percentile_rank、top_hits

### Pipeline 聚合分析

对聚合结果再次聚合。分两类：
- **sibling**：与现有结果同级（max_bucket/min_bucket/avg_bucket 等）
- **parent**：内嵌到现有结果中（derivative/cumulative_sum 等）

### 聚合作用范围与排序

默认作用范围是 query 结果集。可通过 `filter`/`post_filter`/`global` 改变范围。按 `_count`/`_key` 排序。

### 聚合精准度问题

各分片独立聚合后汇总，非全量计算导致不准确。

**解决方案**：
1. 主分片设为 1（数据量不大时）
2. 设置 `shard_size` 参数（默认 `size * 1.5 + 10`），精准度提高但性能降低

## 第七章：数据建模（略）

## 第八章：保护你的数据（略）

## 第九章：水平扩展 Elasticsearch 集群

## 第十章：生产环境中的集群运维（略）

## 第十一章：索引生命周期管理（略）

## 第十二章：用Logstash和Beats构建数据管道（略）

## 第十三章：用Kibana进行数据可视化分析（略）

## 第十四章：探索X-Pack套件（略）

## 参考资料

- [极客时间教程 - Elasticsearch 核心技术与实战](https://time.geekbang.org/course/detail/100030501-102659)

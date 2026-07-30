---
title: Spring 笔记
date: 2022-06-14 09:37:30
categories:
  - Java
  - 框架
  - Spring
tags:
  - Java
  - 框架
  - Spring
  - SpringBoot
permalink: /pages/d1f190c9/
hidden: true
index: false
---

# Spring 笔记

![license](https://badgen.net/github/license/dunwu/spring-tutorial)
![build](https://travis-ci.com/dunwu/spring-tutorial.svg?branch=master)

> 🍃 **`spring-tutorial`** 是一个 Spring & Spring Boot 教程。
>
> - 🔁 项目同步维护：[Github](https://github.com/dunwu/spring-tutorial/) | [Gitee](https://gitee.com/turnon/spring-tutorial/)
> - 📖 电子书阅读：[Github Pages](https://dunwu.github.io/spring-tutorial/) | [Gitee Pages](http://turnon.gitee.io/spring-tutorial/)

## 📖 内容

### 综合

- [Spring 概述](Spring综合/Spring概述.md) - 关键词：`Spring`、`IoC`、`AOP`、`Bean`、`Spring Framework`
- [SpringBoot 知识图谱](Spring综合/SpringBoot知识图谱.md) - 关键词：`Spring Boot`、`自动配置`、`起步依赖`、`Actuator`、`IoC 容器`
- [SpringBoot 基本原理](Spring综合/SpringBoot基本原理.md) - 关键词：`Spring Boot`、`自动配置`、`SpringApplication`、`启动原理`、`@SpringBootApplication`
- [Spring 面试](Spring面试.md) - 💯

### 核心

- [Spring Bean](Spring核心/SpringBean.md) - 关键词：`Bean`、`BeanDefinition`、`@Bean`、`BeanFactory`、`FactoryBean`
- [Spring IoC](Spring核心/SpringIoC.md) - 关键词：`IoC`、`BeanFactory`、`ApplicationContext`、`依赖注入`、`配置元数据`
- [Spring 依赖查找](Spring核心/Spring依赖查找.md) - 关键词：`依赖查找`、`BeanFactory`、`ObjectProvider`、`ListableBeanFactory`、`getBean`
- [Spring 依赖注入](Spring核心/Spring依赖注入.md) - 关键词：`依赖注入`、`@Autowired`、`构造器注入`、`Setter 注入`、`自动装配`
- [Spring IoC 依赖来源](Spring核心/SpringIoC依赖来源.md) - 关键词：`依赖来源`、`BeanDefinition`、`单例对象`、`ResolvableDependency`、`registerSingleton`
- [Spring Bean 作用域](Spring核心/SpringBean作用域.md) - 关键词：`Scope`、`singleton`、`prototype`、`request`、`session`
- [Spring Bean 生命周期](Spring核心/SpringBean生命周期.md) - 关键词：`Bean 生命周期`、`BeanPostProcessor`、`@PostConstruct`、`@PreDestroy`、`InitializingBean`
- [Spring 配置元数据](Spring核心/Spring配置元数据.md) - 关键词：`配置元数据`、`BeanDefinition`、`@Configuration`、`@PropertySource`、`Extensible XML`
- [Spring AOP](Spring核心/SpringAop.md) - 关键词：`AOP`、`@Aspect`、`Pointcut`、`Advice`、`动态代理`
- [Spring 资源管理](Spring核心/Spring资源管理.md) - 关键词：`Resource`、`ResourceLoader`、`ResourcePatternResolver`、`classpath`、`ClassPathResource`
- [Spring 校验](Spring核心/Spring校验.md) - 关键词：`Validator`、`@Valid`、`@Validated`、`Hibernate Validator`、`ConstraintValidator`
- [Spring 数据绑定](Spring核心/Spring数据绑定.md) - 关键词：`DataBinder`、`BeanWrapper`、`PropertyValues`、`WebDataBinder`、`数据绑定`
- [Spring 类型转换](Spring核心/Spring类型转换.md) - 关键词：`类型转换`、`PropertyEditor`、`Converter`、`GenericConverter`、`ConversionService`
- [Spring EL 表达式](Spring核心/SpringEL.md) - 关键词：`SpEL`、`ExpressionParser`、`@Value`、`#{}`、`${}`
- [Spring 事件](Spring核心/Spring事件.md) - 关键词：`ApplicationEvent`、`ApplicationListener`、`@EventListener`、`事件发布`、`事件多播`
- [Spring 国际化](Spring核心/Spring国际化.md) - 关键词：`MessageSource`、`Locale`、`国际化`、`ResourceBundle`、`i18n`
- [Spring 泛型处理](Spring核心/Spring泛型处理.md) - 关键词：`泛型`、`ResolvableType`、`ParameterizedType`、`TypeVariable`、`类型擦除`
- [Spring 注解](Spring核心/Spring注解.md) - 关键词：`@Component`、`@Configuration`、`@ComponentScan`、`模式注解`、`元注解`
- [Spring Environment 抽象](Spring核心/SpringEnvironment抽象.md) - 关键词：`Environment`、`PropertySource`、`Profile`、`@Profile`、`占位符处理`
- [SpringBoot 教程之快速入门](Spring核心/SpringBoot之快速入门.md) - 关键词：`SpringBoot`、`@SpringBootApplication`、`自动配置`、`Starter`、`快速入门`
- [SpringBoot 之属性加载](Spring核心/SpringBoot之属性加载.md) - 关键词：`属性加载`、`application.properties`、`@Value`、`@ConfigurationProperties`、`PropertySource`
- [SpringBoot 之 Profile](Spring核心/SpringBoot之Profile.md) - 关键词：`Profile`、`@Profile`、`多环境配置`、`spring.profiles.active`、`条件装配`

### 数据

- [Spring 之数据源](Spring数据/Spring之数据源.md) - 关键词：`DataSource`、`HikariCP`、`Druid`、`数据源配置`、`连接池`
- [Spring 之 JDBC](Spring数据/Spring之JDBC.md) - 关键词：`JDBC`、`JdbcTemplate`、`NamedParameterJdbcTemplate`、`SQLException`、`数据访问`
- [Spring 之事务](Spring数据/Spring之事务.md) - 关键词：`事务`、`@Transactional`、`PlatformTransactionManager`、`传播行为`、`隔离级别`
- [Spring 之 JPA](Spring数据/Spring之JPA.md) - 关键词：`JPA`、`Hibernate`、`@Entity`、`JpaRepository`、`Spring Data JPA`
- [Spring 集成 Mybatis](Spring数据/Spring集成Mybatis.md) - 关键词：`MyBatis`、`Mapper`、`SqlSessionFactory`、`PageHelper`、`MyBatis-Spring`
- [Spring 访问 Redis](Spring数据/Spring访问Redis.md) - 关键词：`Redis`、`RedisTemplate`、`Spring Data Redis`、`Lettuce`、`Jedis`
- [Spring 访问 MongoDB](Spring数据/Spring访问MongoDB.md) - 关键词：`MongoDB`、`MongoTemplate`、`Spring Data MongoDB`、`MongoRepository`、`文档数据库`
- [Spring 访问 Elasticsearch](Spring数据/Spring访问Elasticsearch.md) - 关键词：`Elasticsearch`、`Spring Data Elasticsearch`、`搜索引擎`、`全文检索`、`Repository`

### Web

- [SpringWeb 综述](SpringWeb/SpringWeb综述.md) - 关键词：`Spring MVC`、`Web 应用`、`@RestController`、`@RequestMapping`、`HTTP`
- [SpringWeb 应用](SpringWeb/SpringWeb应用.md) - 关键词：`Controller`、`@Controller`、`@RequestMapping`、`请求映射`、`参数绑定`
- [DispatcherServlet](SpringWeb/DispatcherServlet.md) - 关键词：`DispatcherServlet`、`前端控制器`、`HandlerMapping`、`HandlerAdapter`、`ViewResolver`
- [Spring 过滤器](SpringWeb/Spring过滤器.md) - 关键词：`Filter`、`FilterRegistrationBean`、`OncePerRequestFilter`、`过滤器链`、`请求拦截`
- [Spring 跨域](SpringWeb/Spring跨域.md) - 关键词：`CORS`、`@CrossOrigin`、`CorsFilter`、`WebMvcConfigurer`、`跨域资源共享`
- [Spring 视图](SpringWeb/Spring视图.md) - 关键词：`ViewResolver`、`Thymeleaf`、`JSP`、`视图技术`、`ModelAndView`
- [SpringBoot 之应用 EasyUI](SpringWeb/SpringBoot之应用EasyUI.md) - 关键词：`EasyUI`、`SpringBoot`、`DataGrid`、`前后端交互`、`Web 页面`

### IO

- [SpringBoot 之异步请求](SpringIO/SpringBoot之异步请求.md) - 关键词：`异步请求`、`@Async`、`Callable`、`DeferredResult`、`CompletableFuture`
- [SpringBoot 之 Json](SpringIO/SpringBoot之Json.md) - 关键词：`JSON`、`Jackson`、`@JsonFormat`、`HttpMessageConverter`、`序列化`
- [SpringBoot 之邮件](SpringIO/SpringBoot之邮件.md) - 关键词：`邮件`、`JavaMailSender`、`@EnableAsync`、`MimeMessage`、`邮件模板`

### 集成

- [Spring 集成缓存中间件](Spring集成/Spring集成缓存.md) - 关键词：`缓存`、`@Cacheable`、`@CacheEvict`、`CacheManager`、`EhCache`
- [Spring 集成定时任务中间件](Spring集成/Spring集成调度器.md) - 关键词：`调度器`、`@Scheduled`、`ThreadPoolTaskScheduler`、`定时任务`、`Cron 表达式`
- [Spring 集成 Dubbo](Spring集成/Spring集成Dubbo.md) - 关键词：`Dubbo`、`@DubboService`、`@DubboReference`、`RPC`、`服务注册`

### 其他

- [Spring4 升级](Spring其他/Spring4升级.md) - 关键词：`Spring4`、`版本升级`、`Java 8`、`泛型注入`、`@Conditional`
- [SpringBoot 之 banner](Spring其他/SpringBoot之banner.md) - 关键词：`Banner`、`banner.txt`、`SpringApplication`、`启动横幅`、`定制`
- [SpringBoot 之 Actuator](Spring其他/SpringBoot之Actuator.md) - 关键词：`Actuator`、`Endpoint`、`健康检查`、`监控`、`生产就绪`

## 💻 示例

### 核心篇示例

- [spring-core-actuator](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/actuator) - Spring 应用监控示例。
- [spring-core-aop](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/aop) - Spring AOP 编程示例。
- [spring-core-async](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/async) - Spring 使用异步接口示例。
- [spring-core-banner](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/banner) - Spring 定制启动时的输出 Logo。
- [spring-core-bean](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/bean) - Spring 管理 JavaBean 生命周期示例。
- [spring-core-conversion](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/conversion) - Spring 数据转换示例。
- [spring-core-data-binding](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/data-binding) - Spring 数据绑定示例。
- [spring-core-ioc](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/ioc) - Spring IOC 示例。
- [spring-core-profile](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/profile) - 在 Spring 中根据 profile 在不同的环境下执行不同的行为。
- [spring-core-property](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/property) - 全方位的演示 Spring 加载属性的方式：记载 `properties` 和 `yaml` 两种文件；通过 `@Value`、`@ConfigurationProperties`、`Environment` 读取属性。
- [spring-core-resource](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/resource) - Spring 资源加载示例。
- [spring-core-validation](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/validation) - Spring 数据校验示例。

### 数据篇示例

- **JDBC**
  - [spring-data-jdbc-basics](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/jdbc/basics) - Spring Boot 以 JDBC 方式访问关系型数据库，通过 `JdbcTemplate` 执行基本的 CRUD 操作。
  - [spring-data-jdbc-druid](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/jdbc/druid) - SpringBoot 使用 [Druid](https://github.com/alibaba/druid) 作为数据库连接池。
  - [spring-data-jdbc-multi-datasource](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/jdbc/multi-datasource) - SpringBoot 连接多数据源示例。
  - [spring-data-jdbc-xml](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/jdbc/xml) - Spring 以 JDBC 方式访问关系型数据库，通过 `JdbcTemplate` 执行基本的 CRUD 操作。
- **ORM**
  - [spring-data-orm-jpa](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/orm/jpa) - SpringBoot 使用 JPA 作为 ORM 框架访问数据库示例。
  - [spring-data-orm-mybatis](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/orm/mybatis) - Spring 使用 [MyBatis](https://github.com/mybatis/mybatis-3) 作为 ORM 框架访问数据库示例。
  - [spring-data-orm-mybatis-mapper](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/orm/mybatis-mapper) - SpringBoot 使用 [MyBatis](https://github.com/mybatis/mybatis-3) + [Mapper](https://github.com/abel533/Mapper) + [PageHelper](https://github.com/pagehelper/Mybatis-PageHelper) 作为 ORM 框架访问数据库示例。
  - [spring-data-orm-mybatis-multi-datasource](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/orm/mybatis-multi-datasource) - SpringBoot 连接多数据源，并使用 [MyBatis Plus](https://github.com/baomidou/mybatis-plus) 作为 ORM 框架访问数据库示例。
  - [spring-data-orm-mybatis-plus](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/orm/mybatis-plus) - SpringBoot 使用 [MyBatis Plus](https://github.com/baomidou/mybatis-plus) 作为 ORM 框架访问数据库示例。
- **Nosql**
  - [spring-data-nosql-basics](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/nosql/basics) - Spring 访问各种 NoSQL 的示例。
  - [spring-data-nosql-mongodb](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/nosql/mongodb) - SpringBoot 访问 [MongoDB](https://www.mongodb.com/) 的示例。
  - [spring-data-nosql-redis](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/nosql/redis) - SpringBoot 访问 [Redis](https://redis.io/) 单节点、集群的示例。
  - [spring-data-nosql-elasticsearch](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/nosql/elasticsearch) - SpringBoot 访问 [Elasticsearch](https://www.elastic.co/guide/index.html) 的示例。
  - [spring-data-nosql-hdfs](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/nosql/hdfs) - SpringBoot 访问 HDFS 的示例。
- **Cache**
  - [spring-data-cache-basics](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/cache/basics) - SpringBoot 默认缓存框架的示例。
  - [spring-data-cache-j2cache](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/cache/j2cache) - SpringBoot 使用 [j2cache](https://gitee.com/ld/J2Cache) 作为缓存框架的示例。
  - [spring-data-cache-jetcache](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/cache/jetcache) - SpringBoot 使用 [jetcache](https://github.com/alibaba/jetcache) 作为缓存框架的示例。
- **中间件**
  - [spring-data-middleware-flyway](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/middleware/flyway) - Spring 使用版本管理中间件 Flyway 示例。
  - [spring-data-middleware-sharding](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/middleware/sharding) - Spring 使用分库分表中间件示例。

## 📚 资料

- **官方**
  - [Spring 官网](https://spring.io/)
  - [Spring Github](https://github.com/spring-projects/spring-framework)
  - [Spring Framework 官方文档](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/index.html)
  - [Spring Boot 官方文档](https://docs.spring.io/spring-boot/docs/current/reference/html/data.html)
- **书籍**
  - [《 Spring 实战（第 5 版）》](https://book.douban.com/subject/34949443/)
- **教程**
  - [《小马哥讲 Spring 核心编程思想》](https://time.geekbang.org/course/intro/265)
  - [geekbang-lessons](https://github.com/geektime-geekbang/geekbang-lessons)
  - [跟我学 Spring3](http://jinnianshilongnian.iteye.com/blog/1482071)

## 🚪 传送

◾ 💧 [钝悟的 IT 知识图谱](https://dunwu.github.io/waterdrop/) ◾

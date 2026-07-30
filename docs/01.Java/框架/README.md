---
title: Java 框架
date: 2022-02-18 08:53:11
categories:
  - Java
  - 框架
tags:
  - Java
  - 框架
permalink: /pages/ecabeba6/
hidden: true
index: false
---

# Java 框架

## 📖 内容

### Spring

#### 综合

- [Spring 概述](Spring/Spring综合/Spring概述.md) - 关键词：`Spring`、`IoC`、`AOP`、`Bean`、`Spring Framework`
- [SpringBoot 知识图谱](Spring/Spring综合/SpringBoot知识图谱.md) - 关键词：`Spring Boot`、`自动配置`、`起步依赖`、`Actuator`、`IoC 容器`
- [SpringBoot 基本原理](Spring/Spring综合/SpringBoot基本原理.md) - 关键词：`Spring Boot`、`自动配置`、`SpringApplication`、`启动原理`、`@SpringBootApplication`
- [Spring 面试](Spring/Spring面试.md) - 💯

#### 核心

- [Spring Bean](Spring/Spring核心/SpringBean.md) - 关键词：`Bean`、`BeanDefinition`、`@Bean`、`BeanFactory`、`FactoryBean`
- [Spring IoC](Spring/Spring核心/SpringIoC.md) - 关键词：`IoC`、`BeanFactory`、`ApplicationContext`、`依赖注入`、`配置元数据`
- [Spring 依赖查找](Spring/Spring核心/Spring依赖查找.md) - 关键词：`依赖查找`、`BeanFactory`、`ObjectProvider`、`ListableBeanFactory`、`getBean`
- [Spring 依赖注入](Spring/Spring核心/Spring依赖注入.md) - 关键词：`依赖注入`、`@Autowired`、`构造器注入`、`Setter 注入`、`自动装配`
- [Spring IoC 依赖来源](Spring/Spring核心/SpringIoC依赖来源.md) - 关键词：`依赖来源`、`BeanDefinition`、`单例对象`、`ResolvableDependency`、`registerSingleton`
- [Spring Bean 作用域](Spring/Spring核心/SpringBean作用域.md) - 关键词：`Scope`、`singleton`、`prototype`、`request`、`session`
- [Spring Bean 生命周期](Spring/Spring核心/SpringBean生命周期.md) - 关键词：`Bean 生命周期`、`BeanPostProcessor`、`@PostConstruct`、`@PreDestroy`、`InitializingBean`
- [Spring 配置元数据](Spring/Spring核心/Spring配置元数据.md) - 关键词：`配置元数据`、`BeanDefinition`、`@Configuration`、`@PropertySource`、`Extensible XML`
- [Spring AOP](Spring/Spring核心/SpringAop.md) - 关键词：`AOP`、`@Aspect`、`Pointcut`、`Advice`、`动态代理`
- [Spring 资源管理](Spring/Spring核心/Spring资源管理.md) - 关键词：`Resource`、`ResourceLoader`、`ResourcePatternResolver`、`classpath`、`ClassPathResource`
- [Spring 校验](Spring/Spring核心/Spring校验.md) - 关键词：`Validator`、`@Valid`、`@Validated`、`Hibernate Validator`、`ConstraintValidator`
- [Spring 数据绑定](Spring/Spring核心/Spring数据绑定.md) - 关键词：`DataBinder`、`BeanWrapper`、`PropertyValues`、`WebDataBinder`、`数据绑定`
- [Spring 类型转换](Spring/Spring核心/Spring类型转换.md) - 关键词：`类型转换`、`PropertyEditor`、`Converter`、`GenericConverter`、`ConversionService`
- [Spring EL 表达式](Spring/Spring核心/SpringEL.md) - 关键词：`SpEL`、`ExpressionParser`、`@Value`、`#{}`、`${}`
- [Spring 事件](Spring/Spring核心/Spring事件.md) - 关键词：`ApplicationEvent`、`ApplicationListener`、`@EventListener`、`事件发布`、`事件多播`
- [Spring 国际化](Spring/Spring核心/Spring国际化.md) - 关键词：`MessageSource`、`Locale`、`国际化`、`ResourceBundle`、`i18n`
- [Spring 泛型处理](Spring/Spring核心/Spring泛型处理.md) - 关键词：`泛型`、`ResolvableType`、`ParameterizedType`、`TypeVariable`、`类型擦除`
- [Spring 注解](Spring/Spring核心/Spring注解.md) - 关键词：`@Component`、`@Configuration`、`@ComponentScan`、`模式注解`、`元注解`
- [Spring Environment 抽象](Spring/Spring核心/SpringEnvironment抽象.md) - 关键词：`Environment`、`PropertySource`、`Profile`、`@Profile`、`占位符处理`
- [SpringBoot 教程之快速入门](Spring/Spring核心/SpringBoot之快速入门.md) - 关键词：`SpringBoot`、`@SpringBootApplication`、`自动配置`、`Starter`、`快速入门`
- [SpringBoot 之属性加载](Spring/Spring核心/SpringBoot之属性加载.md) - 关键词：`属性加载`、`application.properties`、`@Value`、`@ConfigurationProperties`、`PropertySource`
- [SpringBoot 之 Profile](Spring/Spring核心/SpringBoot之Profile.md) - 关键词：`Profile`、`@Profile`、`多环境配置`、`spring.profiles.active`、`条件装配`

#### 数据

- [Spring 之数据源](Spring/Spring数据/Spring之数据源.md) - 关键词：`DataSource`、`HikariCP`、`Druid`、`数据源配置`、`连接池`
- [Spring 之 JDBC](Spring/Spring数据/Spring之JDBC.md) - 关键词：`JDBC`、`JdbcTemplate`、`NamedParameterJdbcTemplate`、`SQLException`、`数据访问`
- [Spring 之事务](Spring/Spring数据/Spring之事务.md) - 关键词：`事务`、`@Transactional`、`PlatformTransactionManager`、`传播行为`、`隔离级别`
- [Spring 之 JPA](Spring/Spring数据/Spring之JPA.md) - 关键词：`JPA`、`Hibernate`、`@Entity`、`JpaRepository`、`Spring Data JPA`
- [Spring 集成 Mybatis](Spring/Spring数据/Spring集成Mybatis.md) - 关键词：`MyBatis`、`Mapper`、`SqlSessionFactory`、`PageHelper`、`MyBatis-Spring`
- [Spring 访问 Redis](Spring/Spring数据/Spring访问Redis.md) - 关键词：`Redis`、`RedisTemplate`、`Spring Data Redis`、`Lettuce`、`Jedis`
- [Spring 访问 MongoDB](Spring/Spring数据/Spring访问MongoDB.md) - 关键词：`MongoDB`、`MongoTemplate`、`Spring Data MongoDB`、`MongoRepository`、`文档数据库`
- [Spring 访问 Elasticsearch](Spring/Spring数据/Spring访问Elasticsearch.md) - 关键词：`Elasticsearch`、`Spring Data Elasticsearch`、`搜索引擎`、`全文检索`、`Repository`

#### Web

- [SpringWeb 综述](Spring/SpringWeb/SpringWeb综述.md) - 关键词：`Spring MVC`、`Web 应用`、`@RestController`、`@RequestMapping`、`HTTP`
- [SpringWeb 应用](Spring/SpringWeb/SpringWeb应用.md) - 关键词：`Controller`、`@Controller`、`@RequestMapping`、`请求映射`、`参数绑定`
- [DispatcherServlet](Spring/SpringWeb/DispatcherServlet.md) - 关键词：`DispatcherServlet`、`前端控制器`、`HandlerMapping`、`HandlerAdapter`、`ViewResolver`
- [Spring 过滤器](Spring/SpringWeb/Spring过滤器.md) - 关键词：`Filter`、`FilterRegistrationBean`、`OncePerRequestFilter`、`过滤器链`、`请求拦截`
- [Spring 跨域](Spring/SpringWeb/Spring跨域.md) - 关键词：`CORS`、`@CrossOrigin`、`CorsFilter`、`WebMvcConfigurer`、`跨域资源共享`
- [Spring 视图](Spring/SpringWeb/Spring视图.md) - 关键词：`ViewResolver`、`Thymeleaf`、`JSP`、`视图技术`、`ModelAndView`
- [SpringBoot 之应用 EasyUI](Spring/SpringWeb/SpringBoot之应用EasyUI.md) - 关键词：`EasyUI`、`SpringBoot`、`DataGrid`、`前后端交互`、`Web 页面`

#### IO

- [SpringBoot 之异步请求](Spring/SpringIO/SpringBoot之异步请求.md) - 关键词：`异步请求`、`@Async`、`Callable`、`DeferredResult`、`CompletableFuture`
- [SpringBoot 之 Json](Spring/SpringIO/SpringBoot之Json.md) - 关键词：`JSON`、`Jackson`、`@JsonFormat`、`HttpMessageConverter`、`序列化`
- [SpringBoot 之邮件](Spring/SpringIO/SpringBoot之邮件.md) - 关键词：`邮件`、`JavaMailSender`、`@EnableAsync`、`MimeMessage`、`邮件模板`

#### 集成

- [Spring 集成缓存中间件](Spring/Spring集成/Spring集成缓存.md) - 关键词：`缓存`、`@Cacheable`、`@CacheEvict`、`CacheManager`、`EhCache`
- [Spring 集成定时任务中间件](Spring/Spring集成/Spring集成调度器.md) - 关键词：`调度器`、`@Scheduled`、`ThreadPoolTaskScheduler`、`定时任务`、`Cron 表达式`
- [Spring 集成 Dubbo](Spring/Spring集成/Spring集成Dubbo.md) - 关键词：`Dubbo`、`@DubboService`、`@DubboReference`、`RPC`、`服务注册`

#### 其他

- [Spring4 升级](Spring/Spring其他/Spring4升级.md) - 关键词：`Spring4`、`版本升级`、`Java 8`、`泛型注入`、`@Conditional`
- [SpringBoot 之 banner](Spring/Spring其他/SpringBoot之banner.md) - 关键词：`Banner`、`banner.txt`、`SpringApplication`、`启动横幅`、`定制`
- [SpringBoot 之 Actuator](Spring/Spring其他/SpringBoot之Actuator.md) - 关键词：`Actuator`、`Endpoint`、`健康检查`、`监控`、`生产就绪`

### ORM

- [MyBatis 快速入门](ORM/MyBatis快速入门.md) - 关键词：`MyBatis`、`ORM`、`SQL 映射`、`Mapper`、`XML 配置`
- [MyBatis 原理](ORM/MyBatis原理.md) - 关键词：`MyBatis`、`源码分析`、`SqlSession`、`Executor`、`插件机制`
- [MyBatis 原理](ORM/MyBatis面试.md) - 💯

### 安全

> Java 领域比较流行的安全框架就是 Shiro 和 Spring-Security。
>
> Shiro 更为简单、轻便，容易理解，能满足大多数基本安全场景下的需要。
>
> Spring-Security 功能更丰富，也比 Shiro 更复杂。值得一提的是由于 Spring-Security 是 Spring 团队开发，所以集成 Spring 和 Spring-Boot 框架更容易。

- [Shiro](安全/Shiro.md) - 关键词：`Shiro`、`认证`、`授权`、`Realm`、`会话管理`
- [SpringSecurity](安全/SpringSecurity.md) - 关键词：`Spring Security`、`安全框架`、`认证授权`、`FilterChain`、`OAuth2`

### IO

- [Netty](IO/Netty.md) - 关键词：`Netty`、`NIO`、`网络通信`、`零拷贝`、`EventLoop`

## 📚 资料

- **MyBatis**
  - [MyBatis Github](https://github.com/mybatis/mybatis-3)
  - [MyBatis 官网](http://www.mybatis.org/mybatis-3/)
  - [MyBatis 官方代码生成（mybatis-generator）](https://github.com/mybatis/generator)
  - [MyBatis 官方集成 Spring（mybatis-spring）](https://github.com/mybatis/spring)
  - [MyBatis 官方集成 Spring Boot（mybatis-spring-boot）](https://github.com/mybatis/spring-boot-starter)
  - [MyBatis-Plus](https://github.com/baomidou/mybatis-plus) - CRUD 扩展插件、代码生成器、分页器等多功能
  - [Mapper](https://github.com/abel533/Mapper) - CRUD 扩展插件
  - [MyBatis-PageHelper](https://github.com/pagehelper/Mybatis-PageHelper) - MyBatis 通用分页插件

## 🚪 传送

◾ 💧 [钝悟的 IT 知识图谱](https://dunwu.github.io/waterdrop/) ◾

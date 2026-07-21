---
title: Reflections 快速入门
date: 2022-02-17 22:34:30
order: 03
categories:
  - Java
  - 工具
  - 其他
tags:
  - Java
  - 反射
  - Reflections
permalink: /pages/e033e51f/
---

# Reflections 快速入门

引入 pom

```xml
<dependency>
    <groupId>org.reflections</groupId>
    <artifactId>reflections</artifactId>
    <version>0.9.11</version>
</dependency>
```

典型应用

```java
Reflections reflections = new Reflections("my.project");
Set<Class<? extends SomeType>> subTypes = reflections.getSubTypesOf(SomeType.class);
Set<Class<?>> annotated = reflections.getTypesAnnotatedWith(SomeAnnotation.class);
```

## 使用

基本上，使用 Reflections 首先使用 urls 和 scanners 对其进行实例化

```java
//scan urls that contain 'my.package', include inputs starting with 'my.package', use the default scanners
Reflections reflections = new Reflections("my.package");

//or using ConfigurationBuilder
new Reflections(new ConfigurationBuilder()
     .setUrls(ClasspathHelper.forPackage("my.project.prefix"))
     .setScanners(new SubTypesScanner(),
                  new TypeAnnotationsScanner().filterResultsBy(optionalFilter), ...),
     .filterInputsBy(new FilterBuilder().includePackage("my.project.prefix"))
     ...);
```

然后，使用方便的查询方法

```java
// 子类型扫描
Set<Class<? extends Module>> modules =
    reflections.getSubTypesOf(com.google.inject.Module.class);
// 类型注解扫描
Set<Class<?>> singletons =
    reflections.getTypesAnnotatedWith(javax.inject.Singleton.class);
// 资源扫描
Set<String> properties =
    reflections.getResources(Pattern.compile(".*\\.properties"));
// 方法注解扫描
Set<Method> resources =
    reflections.getMethodsAnnotatedWith(javax.ws.rs.Path.class);
Set<Constructor> injectables =
    reflections.getConstructorsAnnotatedWith(javax.inject.Inject.class);
// 字段注解扫描
Set<Field> ids =
    reflections.getFieldsAnnotatedWith(javax.persistence.Id.class);
// 方法参数扫描
Set<Method> someMethods =
    reflections.getMethodsMatchParams(long.class, int.class);
Set<Method> voidMethods =
    reflections.getMethodsReturn(void.class);
Set<Method> pathParamMethods =
    reflections.getMethodsWithAnyParamAnnotated(PathParam.class);
// 方法参数名扫描
List<String> parameterNames =
    reflections.getMethodParamNames(Method.class)
// 方法使用扫描
Set<Member> usages =
    reflections.getMethodUsages(Method.class)
```

说明：

- 如果未配置扫描程序，则将使用默认值 - SubTypesScanner 和 TypeAnnotationsScanner。
- 还可以配置类加载器，它将用于从名称中解析运行时类。
- Reflection 默认情况下会扩展超类型。 这解决了传输 URL 不被扫描的一些问题。

## ReflectionUtils

```java
import static org.reflections.ReflectionUtils.*;

Set<Method> getters = getAllMethods(someClass,
  withModifier(Modifier.PUBLIC), withPrefix("get"), withParametersCount(0));

//or
Set<Method> listMethodsFromCollectionToBoolean =
  getAllMethods(List.class,
    withParametersAssignableTo(Collection.class), withReturnType(boolean.class));

Set<Field> fields = getAllFields(SomeClass.class, withAnnotation(annotation), withTypeAssignableTo(type));
```

## 典型应用场景

- **自动发现 SPI 实现**：扫描 classpath 下某个接口的所有实现类，实现插件机制的自动加载，如 Spring 的 `@Component` 扫描。
- **自定义注解处理**：扫描带有特定注解的类/方法/字段，实现自定义框架的声明式编程，如路由注册、权限标记。
- **资源文件扫描**：通过 `getResources()` 扫描 classpath 下的配置文件、模板文件等资源。
- **API 文档生成**：扫描带有 `@Path`、`@ApiOperation` 等注解的类和方法，自动生成 API 文档。

## 最佳实践

- **缩小扫描范围**：通过 `filterInputsBy` 限定包名范围，避免全 classpath 扫描导致启动缓慢。
- **缓存扫描结果**：Reflections 扫描是耗时操作，将结果缓存起来而不是每次使用时重新扫描。
- **指定 Scanner**：只配置需要的 Scanner（如 SubTypesScanner、TypeAnnotationsScanner），避免不必要的扫描开销。
- **生产环境预扫描**：在构建阶段预先扫描并序列化结果，运行时直接加载，避免启动时扫描。

## 常见问题

**扫描不到预期的类？**

检查：1）包名是否正确配置；2）类是否在当前 classpath 下；3）是否配置了正确的 Scanner；4）Filter 是否排除了目标包。

**Reflections 扫描性能差？**

扫描整个 classpath 是耗时操作。解决方案：1）限定扫描包范围；2）使用 `ConfigurationBuilder` 只配置需要的 Scanner；3）考虑使用 Spring 的 `ClassPathScanningCandidateComponentProvider` 替代。

**与 Spring 的 `@ComponentScan` 有什么区别？**

Spring 的组件扫描基于 Spring 容器，只扫描 Spring 管理的 Bean。Reflections 是独立工具，可扫描任意 classpath 下的类，不依赖 Spring 容器，适用于非 Spring 项目或框架层级的类发现。

## 参考资料

- [Reflections Github](https://github.com/ronmamo/reflections)
- [Reflections 官方文档](https://github.com/ronmamo/reflections/wiki)

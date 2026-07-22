---
icon: logos:maven
title: Maven 插件
date: 2019-12-16 17:09:26
order: 06
categories:
  - Java
  - 软件
  - 构建
  - Maven
tags:
  - Java
  - 构建
  - Maven
permalink: /pages/1e846e6f/
---

# Maven 插件

## 简介

**Maven 插件是 Maven 构建系统的核心执行单元。**

Maven 本身只是一个**构建生命周期的调度框架**，它定义了 clean、default、site 三套标准生命周期以及其中的各个阶段（phase），但每个阶段具体做什么，则由**插件（Plugin）**来决定。Maven 的设计哲学是"插件化"——几乎所有实际工作（编译、测试、打包、部署、代码检查、文档生成等）都由插件完成。

> 简而言之：**Maven 定义了"何时做"（生命周期阶段），插件决定了"做什么"和"怎么做"（goal 的具体实现）。**

## 特性

Maven 插件机制具有以下核心特性：

- **插件化架构**：Maven 核心仅负责生命周期调度，所有构建逻辑由插件实现，职责清晰，易于扩展。
- **Goal 粒度执行**：每个插件提供多个 `goal`（目标），一个 goal 对应一个具体任务，可以独立执行或绑定到生命周期阶段。
- **生命周期绑定**：通过 `<execution>` 配置，可将插件 goal 绑定到指定的生命周期阶段，实现"执行 `mvn install` 时自动执行代码检查"等自动化流程。
- **可配置性**：插件通过 `<configuration>` 标签接收参数，支持在 pom.xml 中灵活定制行为，无需修改插件源码。
- **可复用性**：插件以独立的 Maven artifact（GAV）发布到仓库，任何项目均可通过声明依赖引入。
- **多语言支持**：插件不仅支持 Java 项目的构建，还可用于编译 Groovy、Kotlin、Scala 等语言，或执行 Shell、SQL 等脚本。
- **生态丰富**：Apache 官方、CodeHaus、第三方社区提供了数百个成熟插件，覆盖编译、打包、测试、质量检查、部署等全流程。

## 原理

### 插件与生命周期的关系

Maven 有三套互相独立的生命周期（Lifecycle），每套包含多个有序的阶段（Phase）：

```
Clean 生命周期:  pre-clean → clean → post-clean
Default 生命周期: validate → compile → test → package → verify → install → deploy
Site 生命周期:   pre-site → site → post-site → site-deploy
```

**插件 goal 绑定到 phase 的机制**：

当执行 `mvn <phase>` 时，Maven 会从生命周期的第一个阶段开始，依次执行到指定阶段。每个阶段上绑定的所有插件 goal 会按声明顺序执行。

| 生命周期阶段 | 默认绑定的插件 goal | 说明 |
| :--- | :--- | :--- |
| `compile` | `maven-compiler-plugin:compile` | 编译主代码 |
| `test-compile` | `maven-compiler-plugin:testCompile` | 编译测试代码 |
| `test` | `maven-surefire-plugin:test` | 执行单元测试 |
| `package` | `maven-jar-plugin:jar` / `maven-war-plugin:war` | 打包 |
| `install` | `maven-install-plugin:install` | 安装到本地仓库 |
| `deploy` | `maven-deploy-plugin:deploy` | 部署到远程仓库 |

### Goal 的执行方式

Goal 有两种执行方式：

1. **命令行直接执行**：`mvn <plugin>:<goal>`，如 `mvn checkstyle:check`，不依赖生命周期。
2. **绑定到生命周期阶段**：在 pom.xml 的 `<executions>` 中配置，随 `mvn <phase>` 自动触发。

```xml
<!-- 示例：将 checkstyle:check 绑定到 validate 阶段 -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-checkstyle-plugin</artifactId>
    <version>3.3.1</version>
    <executions>
        <execution>
            <id>validate</id>
            <phase>validate</phase>           <!-- 绑定的阶段 -->
            <goals>
                <goal>check</goal>             <!-- 执行的 goal -->
            </goals>
        </execution>
    </executions>
</plugin>
```

### 插件的解析机制

Maven 解析插件时遵循与普通依赖类似的仓库查找机制，但有两点关键区别：

1. **插件组（groupId）默认列表**：Maven 默认会在以下 groupId 中查找插件，无需在 pom.xml 中显式声明 groupId：
   - `org.apache.maven.plugins`
   - `org.codehaus.mojo`
2. **插件版本**：Maven 3 要求显式指定插件版本。若未指定，Maven 会尝试从仓库的 `maven-metadata.xml` 中解析最新 release 版本（不推荐，可能导致不可重现构建）。

## 常用 Maven 插件一览

下表按功能分类列出常用的 Maven 插件：

| 分类 | 插件 | 主要 goal | 说明 |
| :--- | :--- | :--- | :--- |
| **编译构建** | `maven-compiler-plugin` | `compile`、`testCompile` | 编译 Java 源码，指定 JDK 版本 |
| | `maven-resources-plugin` | `resources`、`testResources` | 处理资源文件，支持过滤替换 |
| | `maven-jar-plugin` | `jar` | 打包成 JAR |
| | `maven-war-plugin` | `war` | 打包成 WAR |
| | `maven-assembly-plugin` | `assembly` | 自定义复杂打包格式（含依赖） |
| | `maven-shade-plugin` | `shade` | 打包 fat JAR（合并依赖） |
| **测试** | `maven-surefire-plugin` | `test` | 执行单元测试（JUnit/TestNG） |
| | `maven-failsafe-plugin` | `integration-test`、`verify` | 执行集成测试 |
| **代码质量** | `maven-checkstyle-plugin` | `check` | 代码规范检查 |
| | `maven-pmd-plugin` | `check` | 静态代码分析 |
| | `spotbugs-maven-plugin` | `check` | Bug 检测（FindBugs 继任者） |
| | `maven-enforcer-plugin` | `enforce` | 强制约束（如禁止某依赖） |
| **文档** | `maven-javadoc-plugin` | `javadoc`、`jar` | 生成 API 文档 |
| | `maven-source-plugin` | `jar` | 打包源码 JAR |
| | `maven-site-plugin` | `site` | 生成项目站点 |
| **部署发布** | `maven-deploy-plugin` | `deploy` | 部署到远程仓库 |
| | `maven-install-plugin` | `install` | 安装到本地仓库 |
| | `maven-gpg-plugin` | `sign` | GPG 签名（发布到中央仓库） |
| **其他** | `maven-dependency-plugin` | `tree`、`analyze`、`copy` | 依赖分析与管理 |
| | `maven-scm-plugin` | `checkout`、`commit` | SCM 集成 |
| | `exec-maven-plugin` | `exec` | 执行外部程序或 Java 类 |

## 核心插件详解

### maven-compiler-plugin

> 编译 Java 源代码，是 Maven 最核心的插件之一。

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.13.0</version>
    <configuration>
        <source>17</source>          <!-- 源码兼容的 JDK 版本 -->
        <target>17</target>          <!-- 编译生成的字节码版本 -->
        <encoding>UTF-8</encoding>   <!-- 源码编码 -->
        <compilerArgs>
            <arg>-Xlint:unchecked</arg>   <!-- 开启 unchecked 警告 -->
            <arg>-parameters</arg>          <!-- 保留参数名（反射用） -->
        </compilerArgs>
    </configuration>
</plugin>
```

> SpringBoot 3.x 项目的 `<source>` 和 `<target>` 至少为 17。

### maven-shade-plugin

> 打包"fat JAR"（uber-jar），将所有依赖打入一个 JAR 文件，常用于构建可独立运行的应用。

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <version>3.5.3</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
            <configuration>
                <!-- 合并冲突的 META-INF/services 文件 -->
                <transformers>
                    <transformer implementation="org.apache.maven.plugins.shade.resource.ServicesResourceTransformer"/>
                    <!-- 设置主类 -->
                    <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                        <mainClass>com.example.Main</mainClass>
                    </transformer>
                </transformers>
                <!-- 排除签名文件，避免打包后签名失效 -->
                <filters>
                    <filter>
                        <artifact>*:*</artifact>
                        <excludes>
                            <exclude>META-INF/*.SF</exclude>
                            <exclude>META-INF/*.DSA</exclude>
                            <exclude>META-INF/*.RSA</exclude>
                        </excludes>
                    </filter>
                </filters>
            </configuration>
        </execution>
    </executions>
</plugin>
```

### maven-assembly-plugin

> 用于更灵活的自定义打包，支持 zip、tar.gz 等多种格式，适合制作分发包。

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-assembly-plugin</artifactId>
    <version>3.7.1</version>
    <configuration>
        <descriptorRefs>
            <descriptorRef>jar-with-dependencies</descriptorRef>
        </descriptorRefs>
        <archive>
            <manifest>
                <mainClass>com.example.Main</mainClass>
            </manifest>
        </archive>
    </configuration>
    <executions>
        <execution>
            <id>make-assembly</id>
            <phase>package</phase>
            <goals>
                <goal>single</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

### maven-surefire-plugin

> 执行单元测试，默认绑定到 `test` 阶段。支持 JUnit 4/5、TestNG。

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>3.2.5</version>
    <configuration>
        <skipTests>false</skipTests>            <!-- 是否跳过测试 -->
        <testFailureIgnore>false</testFailureIgnore>  <!-- 测试失败是否继续 -->
        <parallel>methods</parallel>            <!-- 并行执行方法级 -->
        <threadCount>4</threadCount>            <!-- 并行线程数 -->
        <includes>
            <include>**/*Test.java</include>    <!-- 测试类命名规则 -->
        </includes>
        <argLine>-Xmx512m ${jacoco.agent.argLine}</argLine>  <!-- JVM 参数 -->
    </configuration>
</plugin>
```

### maven-dependency-plugin

> 依赖分析与管理工具，常用 goal 包括 `tree`、`analyze`、`copy`。

```bash
# 查看依赖树
mvn dependency:tree

# 分析未使用和未声明的依赖
mvn dependency:analyze

# 复制依赖到指定目录
mvn dependency:copy-dependencies -DoutputDirectory=target/lib
```

## 代码检查插件

> 以下插件用于保障代码质量，是 CI/CD 质量门禁的重要组成。

### maven-checkstyle-plugin

> **maven-checkstyle-plugin，用于检测代码中不符合规范的地方。**

### 定义 checkstyle.xml

```xml
<!DOCTYPE module PUBLIC
  "-//Checkstyle//DTD Checkstyle Configuration 1.3//EN"
  "https://checkstyle.org/dtds/configuration_1_3.dtd">

<!-- Generated by RHY @will_awoke -->

<module name="Checker">

  <property name="charset" value="UTF-8"/>
  <property name="severity" value="warning"/>

  <!-- Checks for Size Violations.  -->
  <!-- 检查文件的长度（行） default max=2000 -->
  <module name="FileLength">
    <property name="max" value="2500"/>
  </module>

  <!-- Checks that property files contain the same keys. -->
  <!-- 检查**.properties配置文件 是否有相同的key
  <module name="Translation">
  </module>
  -->

  <module name="TreeWalker">

    <!-- Checks for imports    -->
    <!-- 必须导入类的完整路径，即不能使用*导入所需的类 -->
    <module name="AvoidStarImport"/>

    <!-- 检查是否从非法的包中导入了类 illegalPkgs: 定义非法的包名称-->
    <module name="IllegalImport"/> <!-- defaults to sun.* packages -->

    <!-- 检查是否导入了不必显示导入的类-->
    <module name="RedundantImport"/>

    <!-- 检查是否导入的包没有使用-->
    <module name="UnusedImports"/>

    <!-- Checks for whitespace
    <module name="EmptyForIteratorPad"/>
    <module name="MethodParamPad"/>
    <module name="NoWhitespaceAfter"/>
    <module name="NoWhitespaceBefore"/>
    <module name="OperatorWrap"/>
    <module name="ParenPad"/>
    <module name="TypecastParenPad"/>
    <module name="WhitespaceAfter"/>
    <module name="WhitespaceAround"/>
    -->

    <!-- 检查类和接口的javadoc 默认不检查author 和version tags
      authorFormat: 检查author标签的格式
            versionFormat: 检查version标签的格式
            scope: 可以检查的类的范围，例如：public只能检查public修饰的类，private可以检查所有的类
            excludeScope: 不能检查的类的范围，例如：public，public的类将不被检查，但访问权限小于public的类仍然会检查，其他的权限以此类推
            tokens: 该属性适用的类型，例如：CLASS_DEF,INTERFACE_DEF -->
    <module name="JavadocType">
      <property name="authorFormat" value="\S"/>
      <property name="scope" value="protected"/>
      <property name="tokens" value="CLASS_DEF,INTERFACE_DEF"/>
    </module>

    <!-- 检查方法的javadoc的注释
            scope: 可以检查的方法的范围，例如：public只能检查public修饰的方法，private可以检查所有的方法
            allowMissingParamTags: 是否忽略对参数注释的检查
            allowMissingThrowsTags: 是否忽略对throws注释的检查
            allowMissingReturntags: 是否忽略对return注释的检查 -->
    <module name="JavadocMethod">
      <property name="scope" value="private"/>
      <property name="allowMissingParamTags" value="false"/>
      <property name="allowMissingThrowsTags" value="false"/>
      <property name="allowMissingReturnTag" value="false"/>
      <property name="tokens" value="METHOD_DEF"/>
      <property name="allowUndeclaredRTE" value="true"/>
      <property name="allowThrowsTagsForSubclasses" value="true"/>
      <!--允许get set 方法没有注释-->
      <property name="allowMissingPropertyJavadoc" value="true"/>
    </module>

    <!-- 检查类变量的注释
            scope: 检查变量的范围，例如：public只能检查public修饰的变量，private可以检查所有的变量 -->
    <module name="JavadocVariable">
      <property name="scope" value="private"/>
    </module>

    <!--option: 定义左大括号'{'显示位置，eol在同一行显示，nl在下一行显示
      maxLineLength: 大括号'{'所在行行最多容纳的字符数
      tokens: 该属性适用的类型，例：CLASS_DEF,INTERFACE_DEF,METHOD_DEF,CTOR_DEF -->
    <module name="LeftCurly">
      <property name="option" value="nl"/>
    </module>

    <!-- NeedBraces 检查是否应该使用括号的地方没有加括号
      tokens: 定义检查的类型 -->
    <module name="NeedBraces"/>

    <!-- Checks the placement of right curly braces ('}') for  else, try, and catch tokens. The policy to verify is specified using property  option.
      option: 右大括号是否单独一行显示
      tokens: 定义检查的类型  -->
    <module name="RightCurly">
      <property name="option" value="alone"/>
    </module>

    <!-- 检查在重写了equals方法后是否重写了hashCode方法 -->
    <module name="EqualsHashCode"/>

    <!--  Checks for illegal instantiations where a factory method is preferred.
      Rationale: Depending on the project, for some classes it might be preferable to create instances through factory methods rather than calling the constructor.
      A simple example is the java.lang.Boolean class. In order to save memory and CPU cycles, it is preferable to use the predefined constants TRUE and FALSE. Constructor invocations should be replaced by calls to Boolean.valueOf().
      Some extremely performance sensitive projects may require the use of factory methods for other classes as well, to enforce the usage of number caches or object pools. -->
    <module name="IllegalInstantiation">
      <property name="classes" value="java.lang.Boolean"/>
    </module>

    <!-- Checks for Naming Conventions.   命名规范   -->
    <!-- local, final variables, including catch parameters -->
    <module name="LocalFinalVariableName"/>

    <!-- local, non-final variables, including catch parameters-->
    <module name="LocalVariableName"/>

    <!-- static, non-final fields -->
    <module name="StaticVariableName">
      <property name="format" value="(^[A-Z0-9_]{0,19}$)"/>
    </module>

    <!-- packages -->
    <module name="PackageName">
      <property name="format" value="^[a-z]+(\.[a-z][a-z0-9]*)*$"/>
    </module>

    <!-- classes and interfaces -->
    <module name="TypeName">
      <property name="format" value="(^[A-Z][a-zA-Z0-9]{0,19}$)"/>
    </module>

    <!-- methods -->
    <module name="MethodName">
      <property name="format" value="(^[a-z][a-zA-Z0-9]{0,19}$)"/>
    </module>

    <!-- non-static fields -->
    <module name="MemberName">
      <property name="format" value="(^[a-z][a-z0-9][a-zA-Z0-9]{0,19}$)"/>
    </module>

    <!-- parameters -->
    <module name="ParameterName">
      <property name="format" value="(^[a-z][a-zA-Z0-9_]{0,19}$)"/>
    </module>

    <!-- constants (static,  final fields) -->
    <module name="ConstantName">
      <property name="format" value="(^[A-Z0-9_]{0,19}$)"/>
    </module>

    <!-- 代码缩进   -->
    <module name="Indentation">
    </module>

    <!-- Checks for redundant exceptions declared in throws clause such as duplicates, unchecked exceptions or subclasses of another declared exception.
      检查是否抛出了多余的异常
    <module name="RedundantThrows">
        <property name="logLoadErrors" value="true"/>
        <property name="suppressLoadErrors" value="true"/>
    </module>
    -->

    <!--  Checks for overly complicated boolean expressions. Currently finds code like  if (b == true), b || true, !false, etc.
      检查boolean值是否冗余的地方
      Rationale: Complex boolean logic makes code hard to understand and maintain. -->
    <module name="SimplifyBooleanExpression"/>

    <!--  Checks for overly complicated boolean return statements. For example the following code
       检查是否存在过度复杂的boolean返回值
       if (valid())
          return false;
       else
          return true;
       could be written as
          return !valid();
       The Idea for this Check has been shamelessly stolen from the equivalent PMD rule. -->
    <module name="SimplifyBooleanReturn"/>

    <!-- Checks that a class which has only private constructors is declared as final.只有私有构造器的类必须声明为final-->
    <module name="FinalClass"/>

    <!--  Make sure that utility classes (classes that contain only static methods or fields in their API) do not have a public constructor.
      确保Utils类（只提供static方法和属性的类）没有public构造器。
      Rationale: Instantiating utility classes does not make sense. Hence the constructors should either be private or (if you want to allow subclassing) protected. A common mistake is forgetting to hide the default constructor.
      If you make the constructor protected you may want to consider the following constructor implementation technique to disallow instantiating subclasses:
      public class StringUtils // not final to allow subclassing
      {
          protected StringUtils() {
              throw new UnsupportedOperationException(); // prevents calls from subclass
          }
          public static int count(char c, String s) {
              // ...
          }
      }
   <module name="HideUtilityClassConstructor"/>
   -->

    <!--  Checks visibility of class members. Only static final members may be public; other class members must be private unless property protectedAllowed or packageAllowed is set.
      检查class成员属性可见性。只有static final 修饰的成员是可以public的。其他的成员属性必需是private的，除非属性protectedAllowed或者packageAllowed设置了true.
       Public members are not flagged if the name matches the public member regular expression (contains "^serialVersionUID$" by default). Note: Checkstyle 2 used to include "^f[A-Z][a-zA-Z0-9]*$" in the default pattern to allow CMP for EJB 1.1 with the default settings. With EJB 2.0 it is not longer necessary to have public access for persistent fields, hence the default has been changed.
       Rationale: Enforce encapsulation. 强制封装 -->
    <module name="VisibilityModifier"/>

    <!-- 每一行只能定义一个变量 -->
    <module name="MultipleVariableDeclarations">
    </module>

    <!-- Checks the style of array type definitions. Some like Java-style: public static void main(String[] args) and some like C-style: public static void main(String args[])
      检查再定义数组时，采用java风格还是c风格，例如：int[] num是java风格，int num[]是c风格。默认是java风格-->
    <module name="ArrayTypeStyle">
    </module>

    <!-- Checks that there are no "magic numbers", where a magic number is a numeric literal that is not defined as a constant. By default, -1, 0, 1, and 2 are not considered to be magic numbers.
    <module name="MagicNumber">
    </module>
    -->

    <!-- A check for TODO: comments. Actually it is a generic regular expression matcher on Java comments. To check for other patterns in Java comments, set property format.
       检查是否存在TODO（待处理） TODO是javaIDE自动生成的。一般代码写完后要去掉。
     -->
    <module name="TodoComment"/>

    <!--  Checks that long constants are defined with an upper ell. That is ' L' and not 'l'. This is in accordance to the Java Language Specification,  Section 3.10.1.
      检查是否在long类型是否定义了大写的L.字母小写l和数字1（一）很相似。
      looks a lot like 1. -->
    <module name="UpperEll"/>

    <!--  Checks that switch statement has "default" clause. 检查switch语句是否有‘default’从句
       Rationale: It's usually a good idea to introduce a default case in every switch statement.
       Even if the developer is sure that all currently possible cases are covered, this should be expressed in the default branch,
        e.g. by using an assertion. This way the code is protected aginst later changes, e.g. introduction of new types in an enumeration type. -->
    <module name="MissingSwitchDefault"/>

    <!--检查switch中case后是否加入了跳出语句，例如：return、break、throw、continue -->
    <module name="FallThrough"/>

    <!-- Checks the number of parameters of a method or constructor. max default 7个. -->
    <module name="ParameterNumber">
      <property name="max" value="5"/>
    </module>

    <!-- 每行字符数 -->
    <module name="LineLength">
      <property name="max" value="200"/>
    </module>

    <!-- Checks for long methods and constructors. max default 150行. max=300 设置长度300 -->
    <module name="MethodLength">
      <property name="max" value="300"/>
    </module>

    <!-- ModifierOrder 检查修饰符的顺序，默认是 public,protected,private,abstract,static,final,transient,volatile,synchronized,native -->
    <module name="ModifierOrder">
    </module>

    <!-- 检查是否有多余的修饰符，例如：接口中的方法不必使用public、abstract修饰  -->
    <module name="RedundantModifier">
    </module>

    <!--- 字符串比较必须使用 equals() -->
    <module name="StringLiteralEquality">
    </module>

    <!-- if-else嵌套语句个数 最多4层 -->
    <module name="NestedIfDepth">
      <property name="max" value="3"/>
    </module>

    <!-- try-catch 嵌套语句个数 最多2层 -->
    <module name="NestedTryDepth">
      <property name="max" value="2"/>
    </module>

    <!-- 返回个数 -->
    <module name="ReturnCount">
      <property name="max" value="5"/>
      <property name="format" value="^$"/>
    </module>

  </module>
</module>
```

配置 `pom.xml`：

```xml

<project>
    ...
    <properties>
        <checkstyle.config.location>config/maven_checks.xml</checkstyle.config.location>
    </properties>
    ...
    <reporting>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-checkstyle-plugin</artifactId>
                <version>3.0</version>
                <executions>
                    <execution>
                        <!-- 绑定pmd:pmd到validate生命周期，在validate时会自动进行代码规范检查 -->
                        <id>validate</id>
                        <phase>validate</phase>
                        <configuration>
                            <!-- 配置文件的路径，在style文件夹下 -->
                            <configLocation>style/checkstyle.xml</configLocation>
                            <encoding>UTF-8</encoding>
                            <consoleOutput>true</consoleOutput>
                            <failsOnError>true</failsOnError>
                            <includeTestSourceDirectory>false</includeTestSourceDirectory>
                        </configuration>
                        <goals>
                            <goal>check</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-jxr-plugin</artifactId>
                <version>2.3</version>
            </plugin>
        </plugins>
    </reporting>
    ...
</project>
```

其中可以修改使用的检查规则文件路径，插件默认提供了四个规则文件可以直接使用，无需手动下载：

- config/sun_checks.xml - Sun Microsystems Definition (default).
- config/maven_checks.xml - Maven Development Definitions.
- config/turbine_checks.xml - Turbine Development Definitions.
- config/avalon_checks.xml - Avalon Development Definitions.

配置好后，可以执行 `mvn clean checkstyle:check` 检查代码。

## maven-pmd-plugin

> maven-pmd-plugin 是阿里编程规范检查插件。

配置 `pom.xml`：

参考 https://github.com/alibaba/p3c/blob/master/p3c-pmd/pom.xml 配置

```xml
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-pmd-plugin</artifactId>
        <version>3.11.0</version>
        <configuration>
          <sourceEncoding>${project.build.sourceEncoding}</sourceEncoding>
          <targetJdk>${maven.compiler.target}</targetJdk>
          <printFailingErrors>true</printFailingErrors>
          <rulesets>
            <ruleset>rulesets/java/ali-comment.xml</ruleset>
            <ruleset>rulesets/java/ali-concurrent.xml</ruleset>
            <ruleset>rulesets/java/ali-constant.xml</ruleset>
            <ruleset>rulesets/java/ali-exception.xml</ruleset>
            <ruleset>rulesets/java/ali-flowcontrol.xml</ruleset>
            <ruleset>rulesets/java/ali-naming.xml</ruleset>
            <ruleset>rulesets/java/ali-oop.xml</ruleset>
            <ruleset>rulesets/java/ali-orm.xml</ruleset>
            <ruleset>rulesets/java/ali-other.xml</ruleset>
            <ruleset>rulesets/java/ali-set.xml</ruleset>
          </rulesets>
          <printFailingErrors>true</printFailingErrors>
        </configuration>
        <executions>
          <execution>
            <phase>verify</phase>
            <goals>
              <goal>check</goal>
            </goals>
          </execution>
        </executions>
        <dependencies>
          <dependency>
            <groupId>com.alibaba.p3c</groupId>
            <artifactId>p3c-pmd</artifactId>
            <version>2.0.0</version>
          </dependency>
        </dependencies>
      </plugin>
    </plugins>
```

配置好后，可以执行 `mvn clean pmd:check` 检查代码。

## 典型应用场景

### 场景一：统一代码风格

通过 maven-checkstyle-plugin 强制团队遵循统一的代码规范（如阿里巴巴 Java 开发规范），在构建时自动检查并报告违规。

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-checkstyle-plugin</artifactId>
    <version>3.3.1</version>
    <executions>
        <execution>
            <id>checkstyle</id>
            <phase>validate</phase>
            <goals>
                <goal>check</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

### 场景二：静态代码分析

使用 PMD、SpotBugs 等工具发现潜在 bug、性能问题和安全漏洞，在代码提交前拦截问题。

```xml
<plugin>
    <groupId>com.github.spotbugs</groupId>
    <artifactId>spotbugs-maven-plugin</artifactId>
    <version>4.8.6.2</version>
    <executions>
        <execution>
            <goals>
                <goal>check</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <effort>Max</effort>          <!-- 分析深度: Min/Default/Max -->
        <threshold>Low</threshold>    <!-- 报告级别: Low/Medium/High -->
        <failOnError>true</failOnError>
    </configuration>
</plugin>
```

### 场景三：集成到 CI 流水线

在 Jenkins、GitLab CI 中执行代码检查插件，构建失败时自动阻断合并，确保代码质量门禁。

```yaml
# GitLab CI 示例
stages:
  - quality

checkstyle:
  stage: quality
  script:
    - mvn checkstyle:check -B
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'

spotbugs:
  stage: quality
  script:
    - mvn spotbugs:check -B
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
```

### 场景四：生成质量报告

配置 site 插件生成包含 Checkstyle、PMD、SpotBugs 等报告的站点，供团队定期 review。

```bash
# 生成项目站点（含所有报告）
mvn site

# 生成的报告在 target/site/ 目录下
```

### 场景五：构建可执行 JAR

使用 shade 或 assembly 插件打包包含所有依赖的 fat JAR，实现 `java -jar` 一键启动。

```bash
mvn clean package
java -jar target/myapp-1.0.0.jar
```

### 场景六：多环境配置打包

通过 `maven-resources-plugin` 的资源过滤功能，在打包时根据 profile 动态替换配置文件中的占位符。

```xml
<!-- pom.xml -->
<profiles>
    <profile>
        <id>dev</id>
        <properties>
            <env>dev</env>
        </properties>
    </profile>
    <profile>
        <id>prod</id>
        <properties>
            <env>prod</env>
        </properties>
    </profile>
</profiles>

<build>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <filtering>true</filtering>   <!-- 开启过滤 -->
        </resource>
    </resources>
</build>
```

```yaml
# src/main/resources/application.yml
spring:
  profiles:
    active: @env@
```

```bash
mvn clean package -Pprod   # 打包时激活 prod profile
```

## 最佳实践

- **渐进式引入**：新项目直接启用严格规则，老项目先用宽松规则逐步收紧，避免因大量违规导致构建频繁失败。
- **自定义规则集**：基于团队实际情况定制 checkstyle.xml 和 pmd-ruleset.xml，避免一刀切的标准降低开发效率。
- **failOnViolation 策略**：开发环境设置 `failOnViolation=false` 仅报告不阻断，生产环境设置为 true 强制拦截，平衡开发效率和代码质量。
- **与 IDE 联动**：在 IDE 中安装 Checkstyle、PMD 插件，使用与 Maven 相同的配置文件，实现编码时实时检查。
- **统一插件版本**：在父 POM 的 `<pluginManagement>` 中统一管理插件版本，确保所有子模块使用一致版本，避免构建差异。
- **锁定插件版本**：Maven 3+ 不推荐省略插件版本，应在 pom.xml 中显式指定，保证构建的可重现性。
- **利用 `pluginManagement`**：在父 POM 中统一配置插件参数，子模块只需声明引入即可继承配置，减少重复代码。

```xml
<!-- 父 POM 中的 pluginManagement 示例 -->
<build>
    <pluginManagement>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.13.0</version>
                <configuration>
                    <source>17</source>
                    <target>17</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>
        </plugins>
    </pluginManagement>
</build>

<!-- 子模块只需声明，无需重复配置 -->
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

## 常见问题

### 问题一：Checkstyle 报告中文乱码

**现象**：执行 `mvn checkstyle:check` 后，控制台或报告中中文显示为乱码。

**原因**：Checkstyle 读取源文件时使用的编码与文件实际编码不一致。

**解决**：

在 checkstyle.xml 中指定文件编码：

```xml
<module name="Checker">
    <property name="charset" value="UTF-8"/>
</module>
```

并确保 pom.xml 中也设置编码：

```xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
</properties>
```

### 问题二：PMD 误报太多怎么办

**现象**：PMD 报告了大量"问题"，但大部分是误报，影响开发效率。

**解决**：

1. **抑制单行误报**：在代码行末尾添加 `// NOPMD` 注释，PMD 会跳过该行的检查。
2. **排除特定规则**：在 pmd-ruleset.xml 中排除不适用的规则。
3. **定期 review**：建议定期 review 误报情况，优化规则配置而非简单抑制。

```xml
<ruleset name="Custom Rules">
    <rule ref="rulesets/java/ali-naming.xml">
        <!-- 排除特定规则 -->
        <exclude name="LowerCamelCaseVariableNamingRule"/>
    </rule>
</ruleset>
```

### 问题三：插件版本冲突导致构建失败

**现象**：不同模块使用不同版本的同一插件，导致构建行为不一致。

**原因**：未统一管理插件版本。

**解决**：

在父 POM 的 `<pluginManagement>` 中统一指定版本，子模块声明引入即可继承：

```xml
<!-- 父 POM -->
<build>
    <pluginManagement>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>3.2.5</version>
            </plugin>
        </plugins>
    </pluginManagement>
</build>
```

### 问题四：shade 打包后 META-INF/services 被覆盖

**现象**：使用 `maven-shade-plugin` 打包后，SPI 机制失效（如 `ServiceLoader` 找不到实现类）。

**原因**：多个依赖 JAR 中都有 `META-INF/services/` 目录，打包时后者覆盖前者。

**解决**：

使用 `ServicesResourceTransformer` 合并而非覆盖：

```xml
<transformers>
    <transformer implementation="org.apache.maven.plugins.shade.resource.ServicesResourceTransformer"/>
</transformers>
```

### 问题五：跳过测试加速构建

**现象**：开发调试时频繁构建，单元测试耗时较长。

**解决**：

```bash
# 方式一：命令行跳过（临时）
mvn clean install -DskipTests        # 编译测试代码但不执行
mvn clean install -Dmaven.test.skip=true  # 不编译也不执行测试

# 方式二：pom.xml 中配置（永久）
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <configuration>
        <skipTests>true</skipTests>
    </configuration>
</plugin>
```

> 生产构建不应跳过测试，仅在本地开发调试时使用。

## 参考资料

- **官方文档**
  - [Maven Plugins 官方列表](https://maven.apache.org/plugins/)
  - [maven-checkstyle-plugin](https://maven.apache.org/plugins/maven-checkstyle-plugin/)
  - [maven-pmd-plugin](https://maven.apache.org/plugins/maven-pmd-plugin/)
  - [maven-shade-plugin](https://maven.apache.org/plugins/maven-shade-plugin/)
  - [maven-assembly-plugin](https://maven.apache.org/plugins/maven-assembly-plugin/)
  - [maven-jxr-plugin](https://maven.apache.org/jxr/maven-jxr-plugin/)
  - [SpotBugs Maven Plugin](https://spotbugs.github.io/spotbugs-maven-plugin/)
- **阿里巴巴编程规范**
  - [p3c Github](https://github.com/alibaba/p3c)
  - [p3c-pmd pom.xml](https://github.com/alibaba/p3c/blob/master/p3c-pmd/pom.xml)
- **书籍**
  - [《Maven 实战》](https://book.douban.com/subject/5345682/) - 国内最经典的 Maven 书籍
  - [Maven: The Complete Reference](https://books.sonatype.com/mvnref-book/reference/) - Sonatype 出品的在线参考
- **其他**
  - [Baeldung - Maven Plugins Guide](https://www.baeldung.com/maven-plugins)
  - https://www.jianshu.com/p/557b975ae40d

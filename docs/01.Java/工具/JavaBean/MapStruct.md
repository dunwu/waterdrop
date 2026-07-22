---
title: MapStruct 快速入门
date: 2026-07-21 22:34:30
order: 03
categories:
  - Java
  - 工具
  - JavaBean
tags:
  - Java
  - JavaBean
  - MapStruct
permalink: /pages/f8d2c4b1/
---

# MapStruct 快速入门

## 简介

**MapStruct 是什么？**

**MapStruct 是一个代码生成器，用于生成类型安全、高性能且无依赖的 JavaBean 映射代码。**

在分层架构的 Java 应用中，不同层之间往往需要传递数据对象（如 DTO ↔ Entity ↔ VO）。手动编写这些映射代码既枯燥又容易出错。MapStruct 通过注解驱动的方式，在**编译期**自动生成映射代码，开发者只需定义 Mapper 接口，即可获得高效的属性拷贝实现。

MapStruct 遵从 [Apache 2.0 协议](https://www.apache.org/licenses/LICENSE-2.0)，是 [JSR 269](https://www.jcp.org/en/jsr/detail?id=269)（Pluggable Annotation Processing API）的典型应用。

## 特性

MapStruct 相比其他 Bean 映射工具（如 Dozer、BeanUtils）具有以下核心特性：

- **编译期生成代码**：基于 JSR 269 注解处理器在编译期生成映射实现类，不依赖反射，运行时零开销。
- **类型安全**：编译期即可发现映射错误（如类型不兼容、属性名拼写错误），而非等到运行时。
- **高性能**：生成的代码与手写 `setter/getter` 调用等价，性能远超基于反射的工具。
- **无运行时依赖**：生成的代码不依赖 MapStruct 运行时库，可独立部署。
- **灵活的映射配置**：支持字段重命名、类型转换、嵌套映射、集合映射、自定义转换逻辑等。
- **IDE 友好**：生成的实现类可被 IDE 直接跳转和调试，便于排查问题。

> 下表对比了主流 Bean 映射工具的特性差异：
>
> | 特性         | MapStruct        | Dozer      | BeanUtils(Apache) | BeanUtils(Spring) |
> | ------------ | ---------------- | ---------- | ----------------- | ----------------- |
> | 实现方式     | 编译期生成代码   | 运行时反射 | 运行时反射        | 运行时反射        |
> | 性能         | 极高（等同手写） | 低         | 中                | 中                |
> | 类型安全     | 是（编译期检查） | 否         | 否                | 否                |
> | 运行时依赖   | 无               | 有         | 有                | 有                |
> | 复杂映射支持 | 强               | 强         | 弱                | 弱                |

## 原理

MapStruct 的核心原理是 **JSR 269 注解处理器（Annotation Processor）**。

### 工作流程

```
源码(.java) ──javac──> 注解处理 ──> 生成实现类(.java) ──> 编译 ──> 字节码(.class)
```

1. **编译期触发**：`javac` 编译时扫描到 `@Mapper` 注解，触发 MapStruct 注解处理器。
2. **解析映射规则**：处理器解析 Mapper 接口方法上的 `@Mapping`、`@MappingTarget` 等注解，建立源属性与目标属性的映射关系。
3. **生成实现类**：根据映射规则生成 `<接口名>Impl.java` 源文件，内含纯 `setter/getter` 调用的映射代码。
4. **编译实现类**：生成的源文件被 `javac` 一并编译为 `.class`，纳入最终构建产物。

### 关键组件

- **`@Mapper`**：标记一个接口为 Mapper 接口，MapStruct 会为其生成实现类。
- **`@Mapper.componentModel`**：指定生成 Bean 的组件模型（如 `spring`、`cdi`、`jsr330`），便于与 IoC 容器集成。
- **`@Mapping`**：定义单个属性级别的映射规则（字段重命名、类型转换、表达式等）。
- **注解处理器**：在编译期执行，通过 `Filer` API 生成新的源文件。

### 与反射方案的本质区别

```java
// MapStruct 生成的代码（编译期生成，直接调用）
public class UserMapperImpl implements UserMapper {
    @Override
    public UserDTO toDto(User entity) {
        if (entity == null) return null;
        UserDTO dto = new UserDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        return dto;
    }
}

// BeanUtils 反射方案（运行时反射，每次都查找方法）
BeanUtils.copyProperties(entity, dto);
```

MapStruct 生成的代码与手写无异，JIT 可进一步优化；反射方案每次执行都要查找 `Method` 对象、做安全检查，性能差距可达 10 倍以上。

## 应用场景

本节以代码示例覆盖日常开发中 80% 以上的 Bean 映射场景。

### 引入依赖

Maven 依赖配置：

```xml
<dependencies>
    <dependency>
        <groupId>org.mapstruct</groupId>
        <artifactId>mapstruct</artifactId>
        <version>1.5.5.Final</version>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.1</version>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
                <annotationProcessorPaths>
                    <path>
                        <groupId>org.mapstruct</groupId>
                        <artifactId>mapstruct-processor</artifactId>
                        <version>1.5.5.Final</version>
                    </path>
                </annotationProcessorPaths>
            </configuration>
        </plugin>
    </plugins>
</build>
```

> **注意**：`mapstruct-processor` 必须配置在 `annotationProcessorPaths` 中，而非作为普通依赖引入，否则不会触发代码生成。

### 场景一：基本映射（同名字段）

最常见场景：两个对象的字段名和类型完全一致。

```java
// 源对象（Entity）
@Data
public class User {
    private Long id;
    private String name;
    private Integer age;
}

// 目标对象（DTO）
@Data
public class UserDTO {
    private Long id;
    private String name;
    private Integer age;
}

// Mapper 接口
@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO toDto(User user);
}

// 使用
User user = new User();
user.setId(1L);
user.setName("张三");
user.setAge(20);

UserDTO dto = UserMapper.INSTANCE.toDto(user);
// dto.getId() == 1L, dto.getName() == "张三", dto.getAge() == 20
```

MapStruct 会自动映射所有同名字段，生成的实现类就是简单的 `setter/getter` 调用。

### 场景二：字段名不同（@Mapping）

字段名不一致时，通过 `@Mapping` 指定映射关系。

```java
@Data
public class User {
    private Long id;
    private String username;   // 源字段名
    private Integer age;
}

@Data
public class UserDTO {
    private Long id;
    private String name;       // 目标字段名
    private Integer age;
}

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(source = "username", target = "name")
    UserDTO toDto(User user);
}
```

### 场景三：多源对象映射

将多个源对象合并映射到一个目标对象。

```java
@Data
public class User {
    private Long id;
    private String name;
}

@Data
public class Address {
    private String city;
    private String street;
}

@Data
public class UserVO {
    private Long id;
    private String name;
    private String city;
    private String street;
}

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(source = "user.id", target = "id")
    @Mapping(source = "user.name", target = "name")
    @Mapping(source = "address.city", target = "city")
    @Mapping(source = "address.street", target = "street")
    UserVO toVo(User user, Address address);
}

// 使用
User user = new User();
user.setId(1L);
user.setName("张三");

Address address = new Address();
address.setCity("北京");
address.setStreet("长安街");

UserVO vo = UserMapper.INSTANCE.toVo(user, address);
```

### 场景四：嵌套对象映射

源对象或目标对象包含其他对象类型。

```java
@Data
public class Address {
    private String city;
    private String street;
}

@Data
public class User {
    private Long id;
    private String name;
    private Address address;   // 嵌套对象
}

@Data
public class AddressDTO {
    private String city;
    private String street;
}

@Data
public class UserDTO {
    private Long id;
    private String name;
    private AddressDTO address;  // 嵌套对象（类型不同）
}

// Mapper 接口
@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO toDto(User user);

    // MapStruct 会自动调用此方法完成 Address -> AddressDTO 的映射
    AddressDTO toAddressDto(Address address);
}
```

如果嵌套对象的字段名相同，MapStruct 会自动识别并生成调用链；若类型不同，需提供对应的转换方法（如上例的 `toAddressDto`）。

### 场景五：集合映射

List、Set、Map 等集合的映射。

```java
@Data
public class User {
    private Long id;
    private String name;
}

@Data
public class UserDTO {
    private Long id;
    private String name;
}

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO toDto(User user);

    // 集合映射：MapStruct 自动遍历并调用 toDto
    List<UserDTO> toDtoList(List<User> users);

    Set<UserDTO> toDtoSet(Set<User> users);

    Map<Long, UserDTO> toDtoMap(Map<Long, User> userMap);
}

// 使用
List<User> users = Arrays.asList(
    createUser(1L, "张三"),
    createUser(2L, "李四")
);
List<UserDTO> dtos = UserMapper.INSTANCE.toDtoList(users);
```

### 场景六：类型转换

MapStruct 内置大量自动类型转换规则，无需手动处理。

```java
// 自动转换示例：String <-> Integer、Long <-> String、枚举 <-> String 等
@Data
public class Order {
    private Long id;
    private String amount;      // 字符串
    private Integer status;     // 数字
    private Date createTime;    // Date
}

@Data
public class OrderDTO {
    private String id;          // 转为 String
    private BigDecimal amount;  // 转为 BigDecimal
    private String status;      // 转为 String
    private String createTime;  // 转为格式化字符串
}

@Mapper
public interface OrderMapper {
    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    // id: Long -> String 自动转换
    // amount: String -> BigDecimal 自动转换
    // status: Integer -> String 自动转换
    // createTime: Date -> String 需指定日期格式
    @Mapping(source = "createTime", target = "createTime", dateFormat = "yyyy-MM-dd HH:mm:ss")
    OrderDTO toDto(Order order);
}
```

MapStruct 内置支持以下自动转换：

- 基本类型与包装类之间
- 基本类型与 String 之间
- BigDecimal/BigInteger 与 String 之间
- Date/LocalDate/LocalDateTime 与 String 之间（需 `dateFormat`）
- 枚举与 String 之间

### 场景七：自定义转换方法

当内置转换不满足时，通过 `default` 方法或 `@Named` 提供自定义逻辑。

```java
@Data
public class User {
    private String fullName;          // 全名
    private Integer gender;           // 0-男 1-女
}

@Data
public class UserDTO {
    private String firstName;         // 名
    private String lastName;          // 姓
    private String genderDesc;        // 性别描述
}

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(source = "fullName", target = "firstName", qualifiedByName = "toFirstName")
    @Mapping(source = "fullName", target = "lastName", qualifiedByName = "toLastName")
    @Mapping(source = "gender", target = "genderDesc", qualifiedByName = "genderToDesc")
    UserDTO toDto(User user);

    @Named("toFirstName")
    default String toFirstName(String fullName) {
        if (fullName == null || fullName.isEmpty()) return null;
        String[] parts = fullName.split(" ");
        return parts.length > 1 ? parts[1] : fullName;
    }

    @Named("toLastName")
    default String toLastName(String fullName) {
        if (fullName == null || fullName.isEmpty()) return null;
        String[] parts = fullName.split(" ");
        return parts.length > 1 ? parts[0] : "";
    }

    @Named("genderToDesc")
    default String genderToDesc(Integer gender) {
        if (gender == null) return null;
        switch (gender) {
            case 0: return "男";
            case 1: return "女";
            default: return "未知";
        }
    }
}
```

### 场景八：更新已有对象（@MappingTarget）

不创建新对象，而是将源对象的值更新到已有目标对象中。

```java
@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO toDto(User user);

    // 更新已有 DTO 对象，常用于 PATCH 更新场景
    void updateDto(User user, @MappingTarget UserDTO dto);
}

// 使用
UserDTO dto = new UserDTO();
dto.setId(1L);

User user = new User();
user.setName("更新后的名字");
user.setAge(25);

UserMapper.INSTANCE.updateDto(user, dto);
// dto.getId() 仍为 1L（未覆盖）
// dto.getName() 为 "更新后的名字"
// dto.getAge() 为 25
```

### 场景九：表达式映射与常量

通过 `expression` 或 `constant` 设置目标字段值。

```java
@Data
public class User {
    private String name;
}

@Data
public class UserDTO {
    private String name;
    private String source;       // 固定值
    private String createTimeStr;// 表达式生成
}

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "source", constant = "SYSTEM")
    @Mapping(target = "createTimeStr", expression = "java(new java.text.SimpleDateFormat(\"yyyy-MM-dd\").format(new java.util.Date()))")
    UserDTO toDto(User user);
}
```

### 场景十：忽略字段与默认值

忽略某些字段不映射，或在源字段为 null 时设置默认值。

```java
@Data
public class User {
    private Long id;
    private String name;
    private String password;   // 敏感字段
}

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String password;
    private String defaultRole;
}

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "password", ignore = true)                          // 忽略密码
    @Mapping(target = "defaultRole", constant = "USER")                   // 设置默认值
    UserDTO toDto(User user);
}
```

### 场景十一：与 Spring 集成

通过 `componentModel = "spring"` 让生成的 Mapper 成为 Spring Bean。

```java
@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toDto(User user);

    @Mapping(source = "fullName", target = "name")
    UserDTO toDtoWithRename(User user);
}

// 在 Service 中直接注入使用
@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public UserDTO getUser(Long id) {
        User user = userRepository.findById(id);
        return userMapper.toDto(user);
    }
}
```

生成的实现类会标注 `@Component` 注解，可被 Spring 容器扫描注册。

## 常见问题

### 问题一：编译报错 "UserMapperImpl 不存在" 或 "找不到符号"

**现象**：IDE 中报 Mapper 实现类找不到，或 Maven 编译失败。

**原因**：注解处理器未正确配置。

**解决**：

```xml
<!-- 错误：仅作为普通依赖引入，不会触发代码生成 -->
<dependency>
    <groupId>org.mapstruct</groupId>
    <artifactId>mapstruct-processor</artifactId>
    <version>1.5.5.Final</version>
</dependency>

<!-- 正确：必须配置在 annotationProcessorPaths 中 -->
<plugin>
    <artifactId>maven-compiler-plugin</artifactId>
    <configuration>
        <annotationProcessorPaths>
            <path>
                <groupId>org.mapstruct</groupId>
                <artifactId>mapstruct-processor</artifactId>
                <version>1.5.5.Final</version>
            </path>
        </annotationProcessorPaths>
    </configuration>
</plugin>
```

IntelliJ IDEA 中还需确保：Settings → Build → Compiler → Annotation Processors → 勾选 Enable annotation processing。

### 问题二：与 Lombok 一起使用时，生成的 Mapper 找不到 getter/setter

**现象**：编译报错 `User has no getXXX method`。

**原因**：Lombok 和 MapStruct 都是注解处理器，执行顺序不确定。若 MapStruct 先于 Lombok 执行，此时 getter/setter 尚未生成。

**解决**：在 `annotationProcessorPaths` 中同时声明两者，并确保 Lombok 在前。

```xml
<plugin>
    <artifactId>maven-compiler-plugin</artifactId>
    <configuration>
        <annotationProcessorPaths>
            <path>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>1.18.30</version>
            </path>
            <!-- lombok-mapstruct-binding 让 MapStruct 感知 Lombok 生成的代码 -->
            <path>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok-mapstruct-binding</artifactId>
                <version>0.2.0</version>
            </path>
            <path>
                <groupId>org.mapstruct</groupId>
                <artifactId>mapstruct-processor</artifactId>
                <version>1.5.5.Final</version>
            </path>
        </annotationProcessorPaths>
    </configuration>
</plugin>
```

### 问题三：集合映射后元素为 null

**现象**：`List<UserDTO>` 中部分元素为 null。

**原因**：源集合包含 null 元素，或元素类型映射方法缺失。

**解决**：

```java
@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    // 提供 null 检查的元素映射方法
    default UserDTO safeToDto(User user) {
        if (user == null) return null;
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        return dto;
    }

    // 集合映射会自动调用 safeToDto
    List<UserDTO> toDtoList(List<User> users);
}
```

### 问题四：日期/枚举转换失败

**现象**：`Date -> String` 或枚举映射抛出异常。

**原因**：未指定 `dateFormat`，或枚举值不匹配。

**解决**：

```java
@Mapper
public interface OrderMapper {
    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    // 日期转换必须指定格式
    @Mapping(source = "createTime", target = "createTime", dateFormat = "yyyy-MM-dd HH:mm:ss")
    @Mapping(source = "updateTime", target = "updateTime", dateFormat = "yyyy-MM-dd")
    OrderDTO toDto(Order order);

    // 枚举映射：枚举名相同可自动映射，不同需指定
    @Mapping(source = "status", target = "status")
    // 若 OrderStatusEnum 和 OrderStatusDTOEnum 的枚举值名不同，需自定义方法
    default OrderStatusDTOEnum map(OrderStatusEnum status) {
        if (status == null) return null;
        return OrderStatusDTOEnum.valueOf(status.name());
    }
}
```

### 问题五：循环引用导致代码生成失败

**现象**：两个对象互相引用，编译时 MapStruct 报错或生成循环调用代码。

**解决**：通过 `@Context` 或忽略字段打破循环。

```java
@Data
public class User {
    private Long id;
    private Department department;   // 引用部门
}

@Data
public class Department {
    private Long id;
    private List<User> users;        // 部门下的用户（循环引用）
}

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "department.users", ignore = true)   // 打破循环
    UserDTO toDto(User user);
}
```

### 问题六：Mapper 多实例 vs 单例的选择

**现象**：不确定该用 `Mappers.getMapper()` 还是 Spring 注入。

**解决**：

```java
// 方案一：非 Spring 环境，使用单例（线程安全，推荐）
@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
}
// 调用：UserMapper.INSTANCE.toDto(user)

// 方案二：Spring 环境，使用组件注入
@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toDto(User user);
}
// 调用：@Autowired private UserMapper userMapper;
```

两种方式生成的实现类都是无状态的，线程安全。Spring 环境推荐方案二，便于统一管理和 Mock 测试。

## 参考资料

- [MapStruct 官网](https://mapstruct.org/)
- [MapStruct 官方文档](https://mapstruct.org/documentation/stable/reference/html/)
- [MapStruct Github](https://github.com/mapstruct/mapstruct)
- [MapStruct FAQ](https://mapstruct.org/faq/)
- [JSR 269: Pluggable Annotation Processing API](https://www.jcp.org/en/jsr/detail?id=269)
- [Baeldung - MapStruct Guide](https://www.baeldung.com/mapstruct)
- [Dozer 官方文档](http://dozer.sourceforge.net/)（对比参考）

const e=JSON.parse('{"key":"v-32713d26","path":"/pages/312bd026/","title":"Shiro 快速入门","lang":"zh-CN","frontmatter":{"title":"Shiro 快速入门","date":"2022-02-17T22:34:30.000Z","order":1,"permalink":"/pages/312bd026/","category":["Java","框架","安全"],"tag":["Java","框架","安全","Shiro"],"description":"Shiro 快速入门 Shiro 是一个安全框架，具有认证、授权、加密、会话管理功能。 一、Shiro 简介 Shiro 特性 核心功能： Authentication - 认证。验证用户是不是拥有相应的身份。 Authorization - 授权。验证某个已认证的用户是否拥有某个权限；即判断用户是否能做事情，常见的如：验证某个用户是否拥有某个角色。或者细粒度的验证某个用户对某个资源是否具有某个权限。 Session Manager - 会话管理。即用户登录后就是一次会话，在没有退出之前，它的所有信息都在会话中。会话可以是普通 JavaSE 环境的，也可以是如 Web 环境的。 Cryptography - 加密。保护数据的安全性，如密码加密存储到数据库，而不是明文存储。","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/waterdrop/pages/312bd026/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"Shiro 快速入门"}],["meta",{"property":"og:description","content":"Shiro 快速入门 Shiro 是一个安全框架，具有认证、授权、加密、会话管理功能。 一、Shiro 简介 Shiro 特性 核心功能： Authentication - 认证。验证用户是不是拥有相应的身份。 Authorization - 授权。验证某个已认证的用户是否拥有某个权限；即判断用户是否能做事情，常见的如：验证某个用户是否拥有某个角色。或者细粒度的验证某个用户对某个资源是否具有某个权限。 Session Manager - 会话管理。即用户登录后就是一次会话，在没有退出之前，它的所有信息都在会话中。会话可以是普通 JavaSE 环境的，也可以是如 Web 环境的。 Cryptography - 加密。保护数据的安全性，如密码加密存储到数据库，而不是明文存储。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-18T15:46:22.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"框架"}],["meta",{"property":"article:tag","content":"安全"}],["meta",{"property":"article:tag","content":"Shiro"}],["meta",{"property":"article:published_time","content":"2022-02-17T22:34:30.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-18T15:46:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Shiro 快速入门\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-02-17T22:34:30.000Z\\",\\"dateModified\\":\\"2024-06-18T15:46:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"一、Shiro 简介","slug":"一、shiro-简介","link":"#一、shiro-简介","children":[{"level":3,"title":"Shiro 特性","slug":"shiro-特性","link":"#shiro-特性","children":[]},{"level":3,"title":"Shiro 架构概述","slug":"shiro-架构概述","link":"#shiro-架构概述","children":[]},{"level":3,"title":"SecurityManager","slug":"securitymanager","link":"#securitymanager","children":[]}]},{"level":2,"title":"二、Shiro 认证","slug":"二、shiro-认证","link":"#二、shiro-认证","children":[{"level":3,"title":"认证 Subject","slug":"认证-subject","link":"#认证-subject","children":[]},{"level":3,"title":"Remembered 和 Authenticated","slug":"remembered-和-authenticated","link":"#remembered-和-authenticated","children":[]},{"level":3,"title":"登出","slug":"登出","link":"#登出","children":[]},{"level":3,"title":"认证流程","slug":"认证流程","link":"#认证流程","children":[]},{"level":3,"title":"认证策略","slug":"认证策略","link":"#认证策略","children":[]}]},{"level":2,"title":"三、Shiro 授权","slug":"三、shiro-授权","link":"#三、shiro-授权","children":[{"level":3,"title":"授权元素","slug":"授权元素","link":"#授权元素","children":[]},{"level":3,"title":"基于角色的授权","slug":"基于角色的授权","link":"#基于角色的授权","children":[]},{"level":3,"title":"基于权限的授权","slug":"基于权限的授权","link":"#基于权限的授权","children":[]},{"level":3,"title":"基于注解的授权","slug":"基于注解的授权","link":"#基于注解的授权","children":[]},{"level":3,"title":"授权流程","slug":"授权流程","link":"#授权流程","children":[]}]},{"level":2,"title":"四、Shiro 会话管理","slug":"四、shiro-会话管理","link":"#四、shiro-会话管理","children":[{"level":3,"title":"会话超时","slug":"会话超时","link":"#会话超时","children":[]},{"level":3,"title":"会话监听","slug":"会话监听","link":"#会话监听","children":[]},{"level":3,"title":"会话存储","slug":"会话存储","link":"#会话存储","children":[]}]},{"level":2,"title":"五、Realm","slug":"五、realm","link":"#五、realm","children":[{"level":3,"title":"认证令牌","slug":"认证令牌","link":"#认证令牌","children":[]},{"level":3,"title":"加密","slug":"加密","link":"#加密","children":[]}]},{"level":2,"title":"六、配置","slug":"六、配置","link":"#六、配置","children":[{"level":3,"title":"过滤链","slug":"过滤链","link":"#过滤链","children":[]},{"level":3,"title":"RememberMe","slug":"rememberme","link":"#rememberme","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1655247928000,"updatedTime":1718725582000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":3}]},"readingTime":{"minutes":13.3,"words":3991},"filePathRelative":"01.Java/13.框架/12.安全/01.Shiro.md","localizedDate":"2022年2月17日","excerpt":"<h1> Shiro 快速入门</h1>\\n<blockquote>\\n<p>Shiro 是一个安全框架，具有认证、授权、加密、会话管理功能。</p>\\n</blockquote>\\n<h2> 一、Shiro 简介</h2>\\n<h3> Shiro 特性</h3>\\n<p align=\\"center\\">\\n  <img src=\\"https://raw.githubusercontent.com/dunwu/images/master/cs/java/javaweb/standalone/security/shiro/shiro-features.png\\">\\n</p>\\n<p>核心功能：</p>\\n<ul>\\n<li><strong>Authentication</strong> - <strong>认证</strong>。验证用户是不是拥有相应的身份。</li>\\n<li><strong>Authorization</strong> - <strong>授权</strong>。验证某个已认证的用户是否拥有某个权限；即判断用户是否能做事情，常见的如：验证某个用户是否拥有某个角色。或者细粒度的验证某个用户对某个资源是否具有某个权限。</li>\\n<li><strong>Session Manager</strong> - <strong>会话管理</strong>。即用户登录后就是一次会话，在没有退出之前，它的所有信息都在会话中。会话可以是普通 JavaSE 环境的，也可以是如 Web 环境的。</li>\\n<li><strong>Cryptography</strong> - <strong>加密</strong>。保护数据的安全性，如密码加密存储到数据库，而不是明文存储。</li>\\n</ul>","autoDesc":true}');export{e as data};
const e=JSON.parse('{"key":"v-b1ed84cc","path":"/pages/b535e4c0/","title":"JavaWeb 之 Cookie 和 Session","lang":"zh-CN","frontmatter":{"title":"JavaWeb 之 Cookie 和 Session","date":"2020-08-24T19:41:46.000Z","order":4,"permalink":"/pages/b535e4c0/","category":["Java","JavaEE","JavaWeb"],"tag":["Java","JavaWeb","Cookie","Session"],"description":"JavaWeb 之 Cookie 和 Session Cookie 由于 Http 是一种无状态的协议，服务器单从网络连接上无从知道客户身份。 会话跟踪是 Web 程序中常用的技术，用来跟踪用户的整个会话。常用会话跟踪技术是 Cookie 与 Session。 Cookie 是什么 Cookie 实际上是存储在客户端上的文本信息，并保留了各种跟踪的信息。 Cookie 工作步骤： 客户端请求服务器，如果服务器需要记录该用户的状态，就是用 response 向客户端浏览器颁发一个 Cookie。 客户端浏览器会把 Cookie 保存下来。 当浏览器再请求该网站时，浏览器把该请求的网址连同 Cookie 一同提交给服务器。服务器检查该 Cookie，以此来辨认用户状态。","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/waterdrop/pages/b535e4c0/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"JavaWeb 之 Cookie 和 Session"}],["meta",{"property":"og:description","content":"JavaWeb 之 Cookie 和 Session Cookie 由于 Http 是一种无状态的协议，服务器单从网络连接上无从知道客户身份。 会话跟踪是 Web 程序中常用的技术，用来跟踪用户的整个会话。常用会话跟踪技术是 Cookie 与 Session。 Cookie 是什么 Cookie 实际上是存储在客户端上的文本信息，并保留了各种跟踪的信息。 Cookie 工作步骤： 客户端请求服务器，如果服务器需要记录该用户的状态，就是用 response 向客户端浏览器颁发一个 Cookie。 客户端浏览器会把 Cookie 保存下来。 当浏览器再请求该网站时，浏览器把该请求的网址连同 Cookie 一同提交给服务器。服务器检查该 Cookie，以此来辨认用户状态。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-18T15:46:22.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"JavaWeb"}],["meta",{"property":"article:tag","content":"Cookie"}],["meta",{"property":"article:tag","content":"Session"}],["meta",{"property":"article:published_time","content":"2020-08-24T19:41:46.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-18T15:46:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JavaWeb 之 Cookie 和 Session\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-08-24T19:41:46.000Z\\",\\"dateModified\\":\\"2024-06-18T15:46:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"Cookie","slug":"cookie","link":"#cookie","children":[{"level":3,"title":"Cookie 是什么","slug":"cookie-是什么","link":"#cookie-是什么","children":[]},{"level":3,"title":"Cookie 剖析","slug":"cookie-剖析","link":"#cookie-剖析","children":[]},{"level":3,"title":"Cookie 类中的方法","slug":"cookie-类中的方法","link":"#cookie-类中的方法","children":[]},{"level":3,"title":"Cookie 的有效期","slug":"cookie-的有效期","link":"#cookie-的有效期","children":[]},{"level":3,"title":"Cookie 的域名","slug":"cookie-的域名","link":"#cookie-的域名","children":[]},{"level":3,"title":"Cookie 的路径","slug":"cookie-的路径","link":"#cookie-的路径","children":[]},{"level":3,"title":"Cookie 的安全属性","slug":"cookie-的安全属性","link":"#cookie-的安全属性","children":[]},{"level":3,"title":"Cookie 实例","slug":"cookie-实例","link":"#cookie-实例","children":[]}]},{"level":2,"title":"Session","slug":"session","link":"#session","children":[{"level":3,"title":"Session 是什么","slug":"session-是什么","link":"#session-是什么","children":[]},{"level":3,"title":"Session 类中的方法","slug":"session-类中的方法","link":"#session-类中的方法","children":[]},{"level":3,"title":"Session 的有效期","slug":"session-的有效期","link":"#session-的有效期","children":[]},{"level":3,"title":"Session 对浏览器的要求","slug":"session-对浏览器的要求","link":"#session-对浏览器的要求","children":[]},{"level":3,"title":"URL 地址重写","slug":"url-地址重写","link":"#url-地址重写","children":[]},{"level":3,"title":"Session 中禁用 Cookie","slug":"session-中禁用-cookie","link":"#session-中禁用-cookie","children":[]},{"level":3,"title":"Session 实例","slug":"session-实例","link":"#session-实例","children":[]}]},{"level":2,"title":"Cookie vs Session","slug":"cookie-vs-session","link":"#cookie-vs-session","children":[{"level":3,"title":"存取方式","slug":"存取方式","link":"#存取方式","children":[]},{"level":3,"title":"隐私安全","slug":"隐私安全","link":"#隐私安全","children":[]},{"level":3,"title":"有效期","slug":"有效期","link":"#有效期","children":[]},{"level":3,"title":"服务器的开销","slug":"服务器的开销","link":"#服务器的开销","children":[]},{"level":3,"title":"浏览器的支持","slug":"浏览器的支持","link":"#浏览器的支持","children":[]},{"level":3,"title":"跨域名","slug":"跨域名","link":"#跨域名","children":[]}]}],"git":{"createdTime":1655247928000,"updatedTime":1718725582000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":3}]},"readingTime":{"minutes":14.22,"words":4265},"filePathRelative":"01.Java/02.JavaEE/01.JavaWeb/04.JavaWeb之Cookie和Session.md","localizedDate":"2020年8月24日","excerpt":"<h1> JavaWeb 之 Cookie 和 Session</h1>\\n<h2> Cookie</h2>\\n<p>由于 Http 是一种无状态的协议，服务器单从网络连接上无从知道客户身份。</p>\\n<p>会话跟踪是 Web 程序中常用的技术，用来跟踪用户的整个会话。常用会话跟踪技术是 Cookie 与 Session。</p>\\n<h3> Cookie 是什么</h3>\\n<p>Cookie 实际上是存储在客户端上的文本信息，并保留了各种跟踪的信息。</p>\\n<p><strong>Cookie 工作步骤：</strong></p>\\n<ol>\\n<li>客户端请求服务器，如果服务器需要记录该用户的状态，就是用 response 向客户端浏览器颁发一个 Cookie。</li>\\n<li>客户端浏览器会把 Cookie 保存下来。</li>\\n<li>当浏览器再请求该网站时，浏览器把该请求的网址连同 Cookie 一同提交给服务器。服务器检查该 Cookie，以此来辨认用户状态。</li>\\n</ol>","autoDesc":true}');export{e as data};
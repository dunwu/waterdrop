const e=JSON.parse('{"key":"v-1784af7b","path":"/pages/a4dba16e/","title":"Java I/O 之工具类","lang":"zh-CN","frontmatter":{"title":"Java I/O 之工具类","date":"2020-06-30T21:34:59.000Z","order":5,"permalink":"/pages/a4dba16e/","category":["Java","JavaCore","IO"],"tag":["Java","JavaCore","IO","BIO","InputStream","OutputStream","Reader","Writer"],"description":"Java I/O 之 BIO BIO BIO（blocking IO） 即阻塞 IO。指的主要是传统的 java.io 包，它基于流模型实现。流从概念上来说是一个连续的数据流。当程序需要读数据的时候就需要使用输入流读取数据，当需要往外写数据的时候就需要输出流。 java.io 包提供了我们最熟知的一些 IO 功能，比如 File 抽象、输入输出流等。交互方式是同步、阻塞的方式，也就是说，在读取输入流或者写入输出流时，在读、写动作完成之前，线程会一直阻塞在那里，它们之间的调用是可靠的线性顺序。很多时候，人们也把 java.net 下面提供的部分网络 API，比如 Socket、ServerSocket、HttpURLConnection 也归类到同步阻塞 IO 类库，因为网络通信同样是 IO 行为。","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/waterdrop/pages/a4dba16e/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"Java I/O 之工具类"}],["meta",{"property":"og:description","content":"Java I/O 之 BIO BIO BIO（blocking IO） 即阻塞 IO。指的主要是传统的 java.io 包，它基于流模型实现。流从概念上来说是一个连续的数据流。当程序需要读数据的时候就需要使用输入流读取数据，当需要往外写数据的时候就需要输出流。 java.io 包提供了我们最熟知的一些 IO 功能，比如 File 抽象、输入输出流等。交互方式是同步、阻塞的方式，也就是说，在读取输入流或者写入输出流时，在读、写动作完成之前，线程会一直阻塞在那里，它们之间的调用是可靠的线性顺序。很多时候，人们也把 java.net 下面提供的部分网络 API，比如 Socket、ServerSocket、HttpURLConnection 也归类到同步阻塞 IO 类库，因为网络通信同样是 IO 行为。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-09-18T23:38:24.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"JavaCore"}],["meta",{"property":"article:tag","content":"IO"}],["meta",{"property":"article:tag","content":"BIO"}],["meta",{"property":"article:tag","content":"InputStream"}],["meta",{"property":"article:tag","content":"OutputStream"}],["meta",{"property":"article:tag","content":"Reader"}],["meta",{"property":"article:tag","content":"Writer"}],["meta",{"property":"article:published_time","content":"2020-06-30T21:34:59.000Z"}],["meta",{"property":"article:modified_time","content":"2024-09-18T23:38:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java I/O 之工具类\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-06-30T21:34:59.000Z\\",\\"dateModified\\":\\"2024-09-18T23:38:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"BIO","slug":"bio","link":"#bio","children":[{"level":3,"title":"字节流","slug":"字节流","link":"#字节流","children":[]},{"level":3,"title":"字符流","slug":"字符流","link":"#字符流","children":[]},{"level":3,"title":"字节流 vs. 字符流","slug":"字节流-vs-字符流","link":"#字节流-vs-字符流","children":[]}]},{"level":2,"title":"I/O 工具类","slug":"i-o-工具类","link":"#i-o-工具类","children":[{"level":3,"title":"File","slug":"file","link":"#file","children":[]},{"level":3,"title":"RandomAccessFile","slug":"randomaccessfile","link":"#randomaccessfile","children":[]},{"level":3,"title":"System","slug":"system","link":"#system","children":[]},{"level":3,"title":"Scanner","slug":"scanner","link":"#scanner","children":[]}]},{"level":2,"title":"网络编程","slug":"网络编程","link":"#网络编程","children":[{"level":3,"title":"Socket 和 ServerSocket","slug":"socket-和-serversocket","link":"#socket-和-serversocket","children":[]},{"level":3,"title":"DatagramSocket 和 DatagramPacket","slug":"datagramsocket-和-datagrampacket","link":"#datagramsocket-和-datagrampacket","children":[]},{"level":3,"title":"InetAddress","slug":"inetaddress","link":"#inetaddress","children":[]},{"level":3,"title":"URL","slug":"url","link":"#url","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1726702704000,"updatedTime":1726702704000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":1}]},"readingTime":{"minutes":22.56,"words":6769},"filePathRelative":"01.Java/01.JavaCore/04.IO/JavaIO之BIO.md","localizedDate":"2020年6月30日","excerpt":"<h1> Java I/O 之 BIO</h1>\\n<h2> BIO</h2>\\n<p>BIO（blocking IO） 即阻塞 IO。指的主要是传统的 <code>java.io</code> 包，它基于流模型实现。流从概念上来说是一个连续的数据流。当程序需要读数据的时候就需要使用输入流读取数据，当需要往外写数据的时候就需要输出流。</p>\\n<p><code>java.io</code> 包提供了我们最熟知的一些 IO 功能，比如 File 抽象、输入输出流等。交互方式是同步、阻塞的方式，也就是说，在读取输入流或者写入输出流时，在读、写动作完成之前，线程会一直阻塞在那里，它们之间的调用是可靠的线性顺序。很多时候，人们也把 <a href=\\"http://java.net\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">java.net</a> 下面提供的部分网络 API，比如 <code>Socket</code>、<code>ServerSocket</code>、<code>HttpURLConnection</code> 也归类到同步阻塞 IO 类库，因为网络通信同样是 IO 行为。</p>","autoDesc":true}');export{e as data};
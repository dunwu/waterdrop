import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as t,c as o,a as e,b as n,d as a,e as r}from"./app-6ed3f423.js";const c={},d=e("h1",{id:"kubernetes-快速入门",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#kubernetes-快速入门","aria-hidden":"true"},"#"),n(" Kubernetes 快速入门")],-1),p={href:"https://kubernetes.io/zh-cn/docs/concepts/overview/",target:"_blank",rel:"noopener noreferrer"},u=r(`<h2 id="k8s-简介" tabindex="-1"><a class="header-anchor" href="#k8s-简介" aria-hidden="true">#</a> K8S 简介</h2><p>K8S 主控组件（Master） 包含三个进程，都运行在集群中的某个节上，通常这个节点被称为 master 节点。这些进程包括：<code>kube-apiserver</code>、<code>kube-controller-manager</code> 和 <code>kube-scheduler</code>。</p><p>集群中的每个非 master 节点都运行两个进程：</p><ul><li>kubelet，和 master 节点进行通信。</li><li>kube-proxy，一种网络代理，将 Kubernetes 的网络服务代理到每个节点上。</li></ul><h3 id="k8s-功能" tabindex="-1"><a class="header-anchor" href="#k8s-功能" aria-hidden="true">#</a> K8S 功能</h3><figure><img src="https://www.opsramp.com/wp-content/uploads/2022/07/Kubernetes-Architecture.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>基于容器的应用部署、维护和滚动升级</li><li>负载均衡和服务发现</li><li>跨机器和跨地区的集群调度</li><li>自动伸缩</li><li>无状态服务和有状态服务</li><li>广泛的 Volume 支持</li><li>插件机制保证扩展性</li></ul><h3 id="k8s-核心组件" tabindex="-1"><a class="header-anchor" href="#k8s-核心组件" aria-hidden="true">#</a> K8S 核心组件</h3><p>Kubernetes 主要由以下几个核心组件组成：</p><ul><li>etcd 保存了整个集群的状态；</li><li>apiserver 提供了资源操作的唯一入口，并提供认证、授权、访问控制、API 注册和发现等机制；</li><li>controller manager 负责维护集群的状态，比如故障检测、自动扩展、滚动更新等；</li><li>scheduler 负责资源的调度，按照预定的调度策略将 Pod 调度到相应的机器上；</li><li>kubelet 负责维护容器的生命周期，同时也负责 Volume（CVI）和网络（CNI）的管理；</li><li>Container runtime 负责镜像管理以及 Pod 和容器的真正运行（CRI）；</li><li>kube-proxy 负责为 Service 提供 cluster 内部的服务发现和负载均衡</li></ul><figure><img src="https://www.opsramp.com/wp-content/uploads/2022/07/Kubernetes-Architecture.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="k8s-核心概念" tabindex="-1"><a class="header-anchor" href="#k8s-核心概念" aria-hidden="true">#</a> K8S 核心概念</h3><p>K8S 包含若干抽象用来表示系统状态，包括：已部署的容器化应用和负载、与它们相关的网络和磁盘资源以及有关集群正在运行的其他操作的信息。</p><figure><img src="https://raw.githubusercontent.com/dunwu/images/master/cs/os/kubernetes/pod.svg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li><code>Pod</code> - K8S 使用 Pod 来管理容器，每个 Pod 可以包含一个或多个紧密关联的容器。Pod 是一组紧密关联的容器集合，它们共享 PID、IPC、Network 和 UTS namespace，是 K8S 调度的基本单位。Pod 内的多个容器共享网络和文件系统，可以通过进程间通信和文件共享这种简单高效的方式组合完成服务。</li><li><code>Node</code> - Node 是 Pod 真正运行的主机，可以是物理机，也可以是虚拟机。为了管理 Pod，每个 Node 节点上至少要运行 container runtime（比如 docker 或者 rkt）、<code>kubelet</code> 和 <code>kube-proxy</code> 服务。</li><li><code>Namespace</code> - Namespace 是对一组资源和对象的抽象集合，比如可以用来将系统内部的对象划分为不同的项目组或用户组。常见的 pods, services, replication controllers 和 deployments 等都是属于某一个 namespace 的（默认是 default），而 node, persistentVolumes 等则不属于任何 namespace。</li><li><code>Service</code> - Service 是应用服务的抽象，通过 labels 为应用提供负载均衡和服务发现。匹配 labels 的 Pod IP 和端口列表组成 endpoints，由 kube-proxy 负责将服务 IP 负载均衡到这些 endpoints 上。每个 Service 都会自动分配一个 cluster IP（仅在集群内部可访问的虚拟地址）和 DNS 名，其他容器可以通过该地址或 DNS 来访问服务，而不需要了解后端容器的运行。</li><li><code>Label</code> - Label 是识别 K8S 对象的标签，以 key/value 的方式附加到对象上（key 最长不能超过 63 字节，value 可以为空，也可以是不超过 253 字节的字符串）。Label 不提供唯一性，并且实际上经常是很多对象（如 Pods）都使用相同的 label 来标志具体的应用。Label 定义好后其他对象可以使用 Label Selector 来选择一组相同 label 的对象（比如 ReplicaSet 和 Service 用 label 来选择一组 Pod）。Label Selector 支持以下几种方式： <ul><li>等式，如 <code>app=nginx</code> 和 <code>env!=production</code></li><li>集合，如 <code>env in (production, qa)</code></li><li>多个 label（它们之间是 AND 关系），如 <code>app=nginx,env=test</code></li></ul></li><li><code>Annotations</code> - Annotations 是 key/value 形式附加于对象的注解。不同于 Labels 用于标志和选择对象，Annotations 则是用来记录一些附加信息，用来辅助应用部署、安全策略以及调度策略等。比如 deployment 使用 annotations 来记录 rolling update 的状态。</li></ul><h2 id="k8s-命令" tabindex="-1"><a class="header-anchor" href="#k8s-命令" aria-hidden="true">#</a> K8S 命令</h2><h3 id="客户端配置" tabindex="-1"><a class="header-anchor" href="#客户端配置" aria-hidden="true">#</a> 客户端配置</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Setup autocomplete in bash; bash-completion package should be installed first</span>
<span class="token builtin class-name">source</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span>kubectl completion <span class="token function">bash</span><span class="token punctuation">)</span>

<span class="token comment"># View Kubernetes config</span>
kubectl config view

<span class="token comment"># View specific config items by json path</span>
kubectl config view <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">&#39;{.users[?(@.name == &quot;k8s&quot;)].user.password}&#39;</span>

<span class="token comment"># Set credentials for foo.kuberntes.com</span>
kubectl config set-credentials kubeuser/foo.kubernetes.com <span class="token parameter variable">--username</span><span class="token operator">=</span>kubeuser <span class="token parameter variable">--password</span><span class="token operator">=</span>kubepassword
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查找资源" tabindex="-1"><a class="header-anchor" href="#查找资源" aria-hidden="true">#</a> 查找资源</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># List all services in the namespace</span>
kubectl get services

<span class="token comment"># List all pods in all namespaces in wide format</span>
kubectl get pods <span class="token parameter variable">-o</span> wide --all-namespaces

<span class="token comment"># List all pods in json (or yaml) format</span>
kubectl get pods <span class="token parameter variable">-o</span> json

<span class="token comment"># Describe resource details (node, pod, svc)</span>
kubectl describe nodes my-node

<span class="token comment"># List services sorted by name</span>
kubectl get services --sort-by<span class="token operator">=</span>.metadata.name

<span class="token comment"># List pods sorted by restart count</span>
kubectl get pods --sort-by<span class="token operator">=</span><span class="token string">&#39;.status.containerStatuses[0].restartCount&#39;</span>

<span class="token comment"># Rolling update pods for frontend-v1</span>
kubectl rolling-update frontend-v1 <span class="token parameter variable">-f</span> frontend-v2.json

<span class="token comment"># Scale a replicaset named &#39;foo&#39; to 3</span>
kubectl scale <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">3</span> rs/foo

<span class="token comment"># Scale a resource specified in &quot;foo.yaml&quot; to 3</span>
kubectl scale <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">3</span> <span class="token parameter variable">-f</span> foo.yaml

<span class="token comment"># Execute a command in every pod / replica</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token number">0</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token keyword">do</span> kubectl <span class="token builtin class-name">exec</span> foo-<span class="token variable">$i</span> -- <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">&#39;echo $(hostname) &gt; /usr/share/nginx/html/index.html&#39;</span><span class="token punctuation">;</span> <span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="资源管理" tabindex="-1"><a class="header-anchor" href="#资源管理" aria-hidden="true">#</a> 资源管理</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Get documentation for pod or service</span>
kubectl explain pods,svc

<span class="token comment"># Create resource(s) like pods, services or daemonsets</span>
kubectl create <span class="token parameter variable">-f</span> ./my-manifest.yaml

<span class="token comment"># Apply a configuration to a resource</span>
kubectl apply <span class="token parameter variable">-f</span> ./my-manifest.yaml

<span class="token comment"># Start a single instance of Nginx</span>
kubectl run nginx <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx

<span class="token comment"># Create a secret with several keys</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> kubectl create <span class="token parameter variable">-f</span> -</span>
apiVersion: v1
kind: Secret
metadata:
 name: mysecret
type: Opaque
data:
 password: <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token string">&quot;s33msi4&quot;</span> <span class="token operator">|</span> base64<span class="token variable">)</span></span>
 username: <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token string">&quot;jane&quot;</span><span class="token operator">|</span> base64<span class="token variable">)</span></span>
EOF</span>

<span class="token comment"># Delete a resource</span>
kubectl delete <span class="token parameter variable">-f</span> ./my-manifest.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="监控和日志" tabindex="-1"><a class="header-anchor" href="#监控和日志" aria-hidden="true">#</a> 监控和日志</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Deploy Heapster from Github repository</span>
kubectl create <span class="token parameter variable">-f</span> deploy/kube-config/standalone/

<span class="token comment"># Show metrics for nodes</span>
kubectl <span class="token function">top</span> <span class="token function">node</span>

<span class="token comment"># Show metrics for pods</span>
kubectl <span class="token function">top</span> pod

<span class="token comment"># Show metrics for a given pod and its containers</span>
kubectl <span class="token function">top</span> pod pod_name <span class="token parameter variable">--containers</span>

<span class="token comment"># Dump pod logs (stdout)</span>
kubectl logs pod_name

<span class="token comment"># Stream pod container logs (stdout, multi-container case)</span>
kubectl logs <span class="token parameter variable">-f</span> pod_name <span class="token parameter variable">-c</span> my-container
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,25),m=e("strong",null,"官方",-1),b={href:"https://github.com/kubernetes/kubernetes",target:"_blank",rel:"noopener noreferrer"},v={href:"https://kubernetes.io/",target:"_blank",rel:"noopener noreferrer"},k=e("strong",null,"教程",-1),h={href:"https://jimmysong.io/kubernetes-handbook/",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/rootsongjc/kubernetes-handbook",target:"_blank",rel:"noopener noreferrer"},f=e("strong",null,"文章",-1),_={href:"https://github.com/LeCoupa/awesome-cheatsheets/blob/master/tools/kubernetes.sh",target:"_blank",rel:"noopener noreferrer"},y=e("strong",null,"更多资源",-1),x={href:"https://github.com/ramitsurana/awesome-kubernetes",target:"_blank",rel:"noopener noreferrer"};function w(S,K){const s=l("ExternalLinkIcon");return t(),o("div",null,[d,e("p",null,[e("a",p,[n("Kubernetes"),a(s)]),n(" 也称为 K8s，是用于自动部署、扩缩和管理容器化应用程序的开源系统。")]),u,e("ul",null,[e("li",null,[m,e("ul",null,[e("li",null,[e("a",b,[n("Kubernetes Github"),a(s)])]),e("li",null,[e("a",v,[n("Kubernetes 官网"),a(s)])])])]),e("li",null,[k,e("ul",null,[e("li",null,[e("a",h,[n("Kubernetes 中文指南"),a(s)])]),e("li",null,[e("a",g,[n("kubernetes-handbook"),a(s)])])])]),e("li",null,[f,e("ul",null,[e("li",null,[e("a",_,[n("https://github.com/LeCoupa/awesome-cheatsheets/blob/master/tools/kubernetes.sh"),a(s)])])])]),e("li",null,[y,e("ul",null,[e("li",null,[e("a",x,[n("awesome-kubernetes"),a(s)])])])])])])}const N=i(c,[["render",w],["__file","index.html.vue"]]);export{N as default};

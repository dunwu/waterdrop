import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as r,c as t,a as e,b as n,d as a,e as c}from"./app-00fbea27.js";const s={},l=e("h1",{id:"java-并发面试二",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#java-并发面试二","aria-hidden":"true"},"#"),n(" Java 并发面试二")],-1),p=e("h2",{id:"jmm-java-内存模型",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#jmm-java-内存模型","aria-hidden":"true"},"#"),n(" JMM(Java 内存模型）")],-1),u={href:"https://github.com/Snailclimb/JavaGuide/blob/main/docs/java/concurrent/jmm.md",target:"_blank",rel:"noopener noreferrer"},h=c(`<h2 id="乐观锁和悲观锁" tabindex="-1"><a class="header-anchor" href="#乐观锁和悲观锁" aria-hidden="true">#</a> 乐观锁和悲观锁</h2><h3 id="什么是悲观锁" tabindex="-1"><a class="header-anchor" href="#什么是悲观锁" aria-hidden="true">#</a> 什么是悲观锁？</h3><p>悲观锁总是假设最坏的情况，认为共享资源每次被访问的时候就会出现问题（比如共享数据被修改），所以每次在获取资源操作的时候都会上锁，这样其他线程想拿到这个资源就会阻塞直到锁被上一个持有者释放。也就是说，<strong>共享资源每次只给一个线程使用，其它线程阻塞，用完后再把资源转让给其它线程</strong>。</p><p>像 Java 中 <code>synchronized</code> 和 <code>ReentrantLock</code> 等独占锁就是悲观锁思想的实现。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public void performSynchronisedTask() {
    synchronized (this) {
        // 需要同步的操作
    }
}

private Lock lock = new ReentrantLock();
lock.lock();
try {
   // 需要同步的操作
} finally {
    lock.unlock();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>高并发的场景下，激烈的锁竞争会造成线程阻塞，大量阻塞线程会导致系统的上下文切换，增加系统的性能开销。并且，悲观锁还可能会存在死锁问题，影响代码的正常运行。</p><h3 id="什么是乐观锁" tabindex="-1"><a class="header-anchor" href="#什么是乐观锁" aria-hidden="true">#</a> 什么是乐观锁？</h3><p>乐观锁总是假设最好的情况，认为共享资源每次被访问的时候不会出现问题，线程可以不停地执行，无需加锁也无需等待，只是在提交修改的时候去验证对应的资源（也就是数据）是否被其它线程修改了（具体方法可以使用版本号机制或 CAS 算法）。</p>`,8),m=e("code",null,"java.util.concurrent.atomic",-1),v=e("code",null,"AtomicInteger",-1),b=e("code",null,"LongAdder",-1),f=e("strong",null,"CAS",-1),g={href:"https://camo.githubusercontent.com/dc483c985184b7b69b8c73f0c98fd522da1c51eccf4638410b86a0b04944c2c8/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f4a55432545352538452539462545352541442539302545372542312542422545362541362538322545382541372538382d32303233303831343030353231313936382e706e67",target:"_blank",rel:"noopener noreferrer"},k=e("img",{src:"https://camo.githubusercontent.com/dc483c985184b7b69b8c73f0c98fd522da1c51eccf4638410b86a0b04944c2c8/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f4a55432545352538452539462545352541442539302545372542312542422545362541362538322545382541372538382d32303233303831343030353231313936382e706e67",alt:"JUC 原子类概览",loading:"lazy"},null,-1),L=c(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// LongAdder 在高并发场景下会比 AtomicInteger 和 AtomicLong 的性能更好
// 代价就是会消耗更多的内存空间（空间换时间）
LongAdder sum = new LongAdder();
sum.increment();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>高并发的场景下，乐观锁相比悲观锁来说，不存在锁竞争造成线程阻塞，也不会有死锁的问题，在性能上往往会更胜一筹。但是，如果冲突频繁发生（写占比非常多的情况），会频繁失败和重试，这样同样会非常影响性能，导致 CPU 飙升。</p><p>不过，大量失败重试的问题也是可以解决的，像我们前面提到的 <code>LongAdder</code> 以空间换时间的方式就解决了这个问题。</p><p>理论上来说：</p><ul><li>悲观锁通常多用于写比较多的情况（多写场景，竞争激烈），这样可以避免频繁失败和重试影响性能，悲观锁的开销是固定的。不过，如果乐观锁解决了频繁失败和重试这个问题的话（比如 <code>LongAdder</code>），也是可以考虑使用乐观锁的，要视实际情况而定。</li><li>乐观锁通常多用于写比较少的情况（多读场景，竞争较少），这样可以避免频繁加锁影响性能。不过，乐观锁主要针对的对象是单个共享变量（参考 <code>java.util.concurrent.atomic</code> 包下面的原子变量类）。</li></ul><h3 id="如何实现乐观锁" tabindex="-1"><a class="header-anchor" href="#如何实现乐观锁" aria-hidden="true">#</a> 如何实现乐观锁？</h3><p>乐观锁一般会使用版本号机制或 CAS 算法实现，CAS 算法相对来说更多一些，这里需要格外注意。</p><h4 id="版本号机制" tabindex="-1"><a class="header-anchor" href="#版本号机制" aria-hidden="true">#</a> 版本号机制</h4><p>一般是在数据表中加上一个数据版本号 <code>version</code> 字段，表示数据被修改的次数。当数据被修改时，<code>version</code> 值会加一。当线程 A 要更新数据值时，在读取数据的同时也会读取 <code>version</code> 值，在提交更新时，若刚才读取到的 version 值为当前数据库中的 <code>version</code> 值相等时才更新，否则重试更新操作，直到更新成功。</p><p><strong>举一个简单的例子</strong>：假设数据库中帐户信息表中有一个 version 字段，当前值为 1 ；而当前帐户余额字段（ <code>balance</code> ）为 $100 。</p><ol><li>操作员 A 此时将其读出（ <code>version</code>=1 ），并从其帐户余额中扣除 $50（ $100-$50 ）。</li><li>在操作员 A 操作的过程中，操作员 B 也读入此用户信息（ <code>version</code>=1 ），并从其帐户余额中扣除 $20 （ $100-$20 ）。</li><li>操作员 A 完成了修改工作，将数据版本号（ <code>version</code>=1 ），连同帐户扣除后余额（ <code>balance</code>=$50 ），提交至数据库更新，此时由于提交数据版本等于数据库记录当前版本，数据被更新，数据库记录 <code>version</code> 更新为 2 。</li><li>操作员 B 完成了操作，也将版本号（ <code>version</code>=1 ）试图向数据库提交数据（ <code>balance</code>=$80 ），但此时比对数据库记录版本时发现，操作员 B 提交的数据版本号为 1 ，数据库记录当前版本也为 2 ，不满足 “ 提交版本必须等于当前版本才能执行更新 “ 的乐观锁策略，因此，操作员 B 的提交被驳回。</li></ol><p>这样就避免了操作员 B 用基于 <code>version</code>=1 的旧数据修改的结果覆盖操作员 A 的操作结果的可能。</p><h4 id="cas-算法" tabindex="-1"><a class="header-anchor" href="#cas-算法" aria-hidden="true">#</a> CAS 算法</h4><p>CAS 的全称是 <strong>Compare And Swap（比较与交换）</strong> ，用于实现乐观锁，被广泛应用于各大框架中。CAS 的思想很简单，就是用一个预期值和要更新的变量值进行比较，两值相等才会进行更新。</p><p>CAS 是一个原子操作，底层依赖于一条 CPU 的原子指令。</p><blockquote><p>** 原子操作 ** 即最小不可拆分的操作，也就是说操作一旦开始，就不能被打断，直到操作完成。</p></blockquote><p>CAS 涉及到三个操作数：</p><ul><li><strong>V</strong>：要更新的变量值 (Var)</li><li><strong>E</strong>：预期值 (Expected)</li><li><strong>N</strong>：拟写入的新值 (New)</li></ul><p>当且仅当 V 的值等于 E 时，CAS 通过原子方式用新值 N 来更新 V 的值。如果不等，说明已经有其它线程更新了 V，则当前线程放弃更新。</p><p><strong>举一个简单的例子</strong>：线程 A 要修改变量 i 的值为 6，i 原值为 1（V = 1，E=1，N=6，假设不存在 ABA 问题）。</p><ol><li>i 与 1 进行比较，如果相等， 则说明没被其他线程修改，可以被设置为 6 。</li><li>i 与 1 进行比较，如果不相等，则说明被其他线程修改，当前线程放弃更新，CAS 操作失败。</li></ol><p>当多个线程同时使用 CAS 操作一个变量时，只有一个会胜出，并成功更新，其余均会失败，但失败的线程并不会被挂起，仅是被告知失败，并且允许再次尝试，当然也允许失败的线程放弃操作。</p><p>Java 语言并没有直接实现 CAS，CAS 相关的实现是通过 C++ 内联汇编的形式实现的（JNI 调用）。因此， CAS 的具体实现和操作系统以及 CPU 都有关系。</p><p><code>sun.misc</code> 包下的 <code>Unsafe</code> 类提供了 <code>compareAndSwapObject</code>、<code>compareAndSwapInt</code>、<code>compareAndSwapLong</code> 方法来实现的对 <code>Object</code>、<code>int</code>、<code>long</code> 类型的 CAS 操作</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
  *  CAS
  * @param o         包含要修改 field 的对象
  * @param offset    对象中某 field 的偏移量
  * @param expected  期望值
  * @param update    更新值
  * @return          true | false
  */
public final native boolean compareAndSwapObject(Object o, long offset,  Object expected, Object update);

public final native boolean compareAndSwapInt(Object o, long offset, int expected,int update);

public final native boolean compareAndSwapLong(Object o, long offset, long expected, long update);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,25),x=e("code",null,"Unsafe",-1),S={href:"https://javaguide.cn/java/basis/unsafe.html",target:"_blank",rel:"noopener noreferrer"},_=c(`<h3 id="cas-算法存在哪些问题" tabindex="-1"><a class="header-anchor" href="#cas-算法存在哪些问题" aria-hidden="true">#</a> CAS 算法存在哪些问题？</h3><p>ABA 问题是 CAS 算法最常见的问题。</p><h4 id="aba-问题" tabindex="-1"><a class="header-anchor" href="#aba-问题" aria-hidden="true">#</a> ABA 问题</h4><p>如果一个变量 V 初次读取的时候是 A 值，并且在准备赋值的时候检查到它仍然是 A 值，那我们就能说明它的值没有被其他线程修改过了吗？很明显是不能的，因为在这段时间它的值可能被改为其他值，然后又改回 A，那 CAS 操作就会误认为它从来没有被修改过。这个问题被称为 CAS 操作的 <strong>&quot;ABA&quot;问题。</strong></p><p>ABA 问题的解决思路是在变量前面追加上 <strong>版本号或者时间戳</strong>。JDK 1.5 以后的 <code>AtomicStampedReference</code> 类就是用来解决 ABA 问题的，其中的 <code>compareAndSet()</code> 方法就是首先检查当前引用是否等于预期引用，并且当前标志是否等于预期标志，如果全部相等，则以原子方式将该引用和该标志的值设置为给定的更新值。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public boolean compareAndSet(V   expectedReference,
                             V   newReference,
                             int expectedStamp,
                             int newStamp) {
    Pair&lt;V&gt; current = pair;
    return
        expectedReference == current.reference &amp;&amp;
        expectedStamp == current.stamp &amp;&amp;
        ((newReference == current.reference &amp;&amp;
          newStamp == current.stamp) ||
         casPair(current, Pair.of(newReference, newStamp)));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="循环时间长开销大" tabindex="-1"><a class="header-anchor" href="#循环时间长开销大" aria-hidden="true">#</a> 循环时间长开销大</h4><p>CAS 经常会用到自旋操作来进行重试，也就是不成功就一直循环执行直到成功。如果长时间不成功，会给 CPU 带来非常大的执行开销。</p><p>如果 JVM 能支持处理器提供的 pause 指令那么效率会有一定的提升，pause 指令有两个作用：</p><ol><li>可以延迟流水线执行指令，使 CPU 不会消耗过多的执行资源，延迟的时间取决于具体实现的版本，在一些处理器上延迟时间是零。</li><li>可以避免在退出循环的时候因内存顺序冲突而引起 CPU 流水线被清空，从而提高 CPU 的执行效率。</li></ol><h4 id="只能保证一个共享变量的原子操作" tabindex="-1"><a class="header-anchor" href="#只能保证一个共享变量的原子操作" aria-hidden="true">#</a> 只能保证一个共享变量的原子操作</h4><p>CAS 只对单个共享变量有效，当操作涉及跨多个共享变量时 CAS 无效。但是从 JDK 1.5 开始，提供了 <code>AtomicReference</code> 类来保证引用对象之间的原子性，你可以把多个变量放在一个对象里来进行 CAS 操作。所以我们可以使用锁或者利用 <code>AtomicReference</code> 类把多个共享变量合并成一个共享变量来操作。</p><h2 id="reentrantlock" tabindex="-1"><a class="header-anchor" href="#reentrantlock" aria-hidden="true">#</a> ReentrantLock</h2><h3 id="reentrantlock-是什么" tabindex="-1"><a class="header-anchor" href="#reentrantlock-是什么" aria-hidden="true">#</a> ReentrantLock 是什么？</h3><p><code>ReentrantLock</code> 实现了 <code>Lock</code> 接口，是一个可重入且独占式的锁，和 <code>synchronized</code> 关键字类似。不过，<code>ReentrantLock</code> 更灵活、更强大，增加了轮询、超时、中断、公平锁和非公平锁等高级功能。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ReentrantLock implements Lock, java.io.Serializable {}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>ReentrantLock</code> 里面有一个内部类 <code>Sync</code>，<code>Sync</code> 继承 AQS（<code>AbstractQueuedSynchronizer</code>），添加锁和释放锁的大部分操作实际上都是在 <code>Sync</code> 中实现的。<code>Sync</code> 有公平锁 <code>FairSync</code> 和非公平锁 <code>NonfairSync</code> 两个子类。</p>`,17),A={href:"https://camo.githubusercontent.com/d08903b8450071ab6280dfd9ff0ed74ebcfd0a3ebba6ba26eee3c596e7f366aa/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f7265656e7472616e746c6f636b2d636c6173732d6469616772616d2e706e67",target:"_blank",rel:"noopener noreferrer"},R=e("img",{src:"https://camo.githubusercontent.com/d08903b8450071ab6280dfd9ff0ed74ebcfd0a3ebba6ba26eee3c596e7f366aa/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f7265656e7472616e746c6f636b2d636c6173732d6469616772616d2e706e67",alt:"img",tabindex:"0",loading:"lazy"},null,-1),y=e("figcaption",null,"img",-1),C=c(`<p><code>ReentrantLock</code> 默认使用非公平锁，也可以通过构造器来显式的指定使用公平锁。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 传入一个 boolean 值，true 时为公平锁，false 时为非公平锁
public ReentrantLock(boolean fair) {
    sync = fair ? new FairSync(): new NonfairSync();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),w=e("code",null,"ReentrantLock",-1),j={href:"https://javaguide.cn/java/concurrent/aqs.html",target:"_blank",rel:"noopener noreferrer"},z=c(`<h3 id="公平锁和非公平锁有什么区别" tabindex="-1"><a class="header-anchor" href="#公平锁和非公平锁有什么区别" aria-hidden="true">#</a> 公平锁和非公平锁有什么区别？</h3><ul><li><strong>公平锁</strong> : 锁被释放之后，先申请的线程先得到锁。性能较差一些，因为公平锁为了保证时间上的绝对顺序，上下文切换更频繁。</li><li><strong>非公平锁</strong>：锁被释放之后，后申请的线程可能会先获取到锁，是随机或者按照其他优先级排序的。性能更好，但可能会导致某些线程永远无法获取到锁。</li></ul><h3 id="synchronized-和-reentrantlock-有什么区别" tabindex="-1"><a class="header-anchor" href="#synchronized-和-reentrantlock-有什么区别" aria-hidden="true">#</a> synchronized 和 ReentrantLock 有什么区别？</h3><h4 id="两者都是可重入锁" tabindex="-1"><a class="header-anchor" href="#两者都是可重入锁" aria-hidden="true">#</a> 两者都是可重入锁</h4><p><strong>可重入锁</strong> 也叫递归锁，指的是线程可以再次获取自己的内部锁。比如一个线程获得了某个对象的锁，此时这个对象锁还没有释放，当其再次想要获取这个对象的锁的时候还是可以获取的，如果是不可重入锁的话，就会造成死锁。</p><p>JDK 提供的所有现成的 <code>Lock</code> 实现类，包括 <code>synchronized</code> 关键字锁都是可重入的。</p><p>在下面的代码中，<code>method1()</code> 和 <code>method2()</code> 都被 <code>synchronized</code> 关键字修饰，<code>method1()</code> 调用了 <code>method2()</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class SynchronizedDemo {
    public synchronized void method1() {
        System.out.println(&quot;方法 1&quot;);
        method2();
    }

    public synchronized void method2() {
        System.out.println(&quot;方法 2&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于 <code>synchronized</code> 锁是可重入的，同一个线程在调用 <code>method1()</code> 时可以直接获得当前对象的锁，执行 <code>method2()</code> 的时候可以再次获取这个对象的锁，不会产生死锁问题。假如 <code>synchronized</code> 是不可重入锁的话，由于该对象的锁已被当前线程所持有且无法释放，这就导致线程在执行 <code>method2()</code> 时获取锁失败，会出现死锁问题。</p><h4 id="synchronized-依赖于-jvm-而-reentrantlock-依赖于-api" tabindex="-1"><a class="header-anchor" href="#synchronized-依赖于-jvm-而-reentrantlock-依赖于-api" aria-hidden="true">#</a> synchronized 依赖于 JVM 而 ReentrantLock 依赖于 API</h4><p><code>synchronized</code> 是依赖于 JVM 实现的，前面我们也讲到了 虚拟机团队在 JDK1.6 为 <code>synchronized</code> 关键字进行了很多优化，但是这些优化都是在虚拟机层面实现的，并没有直接暴露给我们。</p><p><code>ReentrantLock</code> 是 JDK 层面实现的（也就是 API 层面，需要 lock() 和 unlock() 方法配合 try/finally 语句块来完成），所以我们可以通过查看它的源代码，来看它是如何实现的。</p><h4 id="reentrantlock-比-synchronized-增加了一些高级功能" tabindex="-1"><a class="header-anchor" href="#reentrantlock-比-synchronized-增加了一些高级功能" aria-hidden="true">#</a> ReentrantLock 比 synchronized 增加了一些高级功能</h4><p>相比 <code>synchronized</code>，<code>ReentrantLock</code> 增加了一些高级功能。主要来说主要有三点：</p><ul><li><strong>等待可中断</strong> : <code>ReentrantLock</code> 提供了一种能够中断等待锁的线程的机制，通过 <code>lock.lockInterruptibly()</code> 来实现这个机制。也就是说正在等待的线程可以选择放弃等待，改为处理其他事情。</li><li><strong>可实现公平锁</strong> : <code>ReentrantLock</code> 可以指定是公平锁还是非公平锁。而 <code>synchronized</code> 只能是非公平锁。所谓的公平锁就是先等待的线程先获得锁。<code>ReentrantLock</code> 默认情况是非公平的，可以通过 <code>ReentrantLock</code> 类的 <code>ReentrantLock(boolean fair)</code> 构造方法来指定是否是公平的。</li><li><strong>可实现选择性通知（锁可以绑定多个条件）</strong>: <code>synchronized</code> 关键字与 <code>wait()</code> 和 <code>notify()</code>/<code>notifyAll()</code> 方法相结合可以实现等待 / 通知机制。<code>ReentrantLock</code> 类当然也可以实现，但是需要借助于 <code>Condition</code> 接口与 <code>newCondition()</code> 方法。</li></ul><p>如果你想使用上述功能，那么选择 <code>ReentrantLock</code> 是一个不错的选择。</p><p>关于 <code>Condition</code> 接口的补充：</p><blockquote><p><code>Condition</code> 是 JDK1.5 之后才有的，它具有很好的灵活性，比如可以实现多路通知功能也就是在一个 <code>Lock</code> 对象中可以创建多个 <code>Condition</code> 实例（即对象监视器），<strong>线程对象可以注册在指定的 <code>Condition</code> 中，从而可以有选择性的进行线程通知，在调度线程上更加灵活。 在使用 <code>notify()/notifyAll()</code> 方法进行通知时，被通知的线程是由 JVM 选择的，用 <code>ReentrantLock</code> 类结合 <code>Condition</code> 实例可以实现“选择性通知”</strong> ，这个功能非常重要，而且是 <code>Condition</code> 接口默认提供的。而 <code>synchronized</code> 关键字就相当于整个 <code>Lock</code> 对象中只有一个 <code>Condition</code> 实例，所有的线程都注册在它一个身上。如果执行 <code>notifyAll()</code> 方法的话就会通知所有处于等待状态的线程，这样会造成很大的效率问题。而 <code>Condition</code> 实例的 <code>signalAll()</code> 方法，只会唤醒注册在该 <code>Condition</code> 实例中的所有等待线程。</p></blockquote><h3 id="可中断锁和不可中断锁有什么区别" tabindex="-1"><a class="header-anchor" href="#可中断锁和不可中断锁有什么区别" aria-hidden="true">#</a> 可中断锁和不可中断锁有什么区别？</h3><ul><li><strong>可中断锁</strong>：获取锁的过程中可以被中断，不需要一直等到获取锁之后 才能进行其他逻辑处理。<code>ReentrantLock</code> 就属于是可中断锁。</li><li><strong>不可中断锁</strong>：一旦线程申请了锁，就只能等到拿到锁以后才能进行其他的逻辑处理。 <code>synchronized</code> 就属于是不可中断锁。</li></ul><h2 id="reentrantreadwritelock" tabindex="-1"><a class="header-anchor" href="#reentrantreadwritelock" aria-hidden="true">#</a> ReentrantReadWriteLock</h2><p><code>ReentrantReadWriteLock</code> 在实际项目中使用的并不多，面试中也问的比较少，简单了解即可。JDK 1.8 引入了性能更好的读写锁 <code>StampedLock</code> 。</p><h3 id="reentrantreadwritelock-是什么" tabindex="-1"><a class="header-anchor" href="#reentrantreadwritelock-是什么" aria-hidden="true">#</a> ReentrantReadWriteLock 是什么？</h3><p><code>ReentrantReadWriteLock</code> 实现了 <code>ReadWriteLock</code> ，是一个可重入的读写锁，既可以保证多个线程同时读的效率，同时又可以保证有写入操作时的线程安全。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ReentrantReadWriteLock
        implements ReadWriteLock, java.io.Serializable{
}
public interface ReadWriteLock {
    Lock readLock();
    Lock writeLock();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>一般锁进行并发控制的规则：读读互斥、读写互斥、写写互斥。</li><li>读写锁进行并发控制的规则：读读不互斥、读写互斥、写写互斥（只有读读不互斥）。</li></ul><p><code>ReentrantReadWriteLock</code> 其实是两把锁，一把是 <code>WriteLock</code> （写锁），一把是 <code>ReadLock</code>（读锁） 。读锁是共享锁，写锁是独占锁。读锁可以被同时读，可以同时被多个线程持有，而写锁最多只能同时被一个线程持有。</p><p>和 <code>ReentrantLock</code> 一样，<code>ReentrantReadWriteLock</code> 底层也是基于 AQS 实现的。</p>`,28),J={href:"https://camo.githubusercontent.com/0105b54599441118d430cf64703e34eb8fb9a1cd29de1b8e08d3a2485935a482/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f7265656e7472616e747265616477726974656c6f636b2d636c6173732d6469616772616d2e706e67",target:"_blank",rel:"noopener noreferrer"},W=e("img",{src:"https://camo.githubusercontent.com/0105b54599441118d430cf64703e34eb8fb9a1cd29de1b8e08d3a2485935a482/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f7265656e7472616e747265616477726974656c6f636b2d636c6173732d6469616772616d2e706e67",alt:"img",tabindex:"0",loading:"lazy"},null,-1),V=e("figcaption",null,"img",-1),B=c(`<p><code>ReentrantReadWriteLock</code> 也支持公平锁和非公平锁，默认使用非公平锁，可以通过构造器来显示的指定。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 传入一个 boolean 值，true 时为公平锁，false 时为非公平锁
public ReentrantReadWriteLock(boolean fair) {
    sync = fair ? new FairSync(): new NonfairSync();
    readerLock = new ReadLock(this);
    writerLock = new WriteLock(this);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="reentrantreadwritelock-适合什么场景" tabindex="-1"><a class="header-anchor" href="#reentrantreadwritelock-适合什么场景" aria-hidden="true">#</a> ReentrantReadWriteLock 适合什么场景？</h3><p>由于 <code>ReentrantReadWriteLock</code> 既可以保证多个线程同时读的效率，同时又可以保证有写入操作时的线程安全。因此，在读多写少的情况下，使用 <code>ReentrantReadWriteLock</code> 能够明显提升系统性能。</p><h3 id="共享锁和独占锁有什么区别" tabindex="-1"><a class="header-anchor" href="#共享锁和独占锁有什么区别" aria-hidden="true">#</a> 共享锁和独占锁有什么区别？</h3><ul><li><strong>共享锁</strong>：一把锁可以被多个线程同时获得。</li><li><strong>独占锁</strong>：一把锁只能被一个线程获得。</li></ul><h3 id="线程持有读锁还能获取写锁吗" tabindex="-1"><a class="header-anchor" href="#线程持有读锁还能获取写锁吗" aria-hidden="true">#</a> 线程持有读锁还能获取写锁吗？</h3><ul><li>在线程持有读锁的情况下，该线程不能取得写锁（因为获取写锁的时候，如果发现当前的读锁被占用，就马上获取失败，不管读锁是不是被当前线程持有）。</li><li>在线程持有写锁的情况下，该线程可以继续获取读锁（获取读锁时如果发现写锁被占用，只有写锁没有被当前线程占用的情况才会获取失败）。</li></ul>`,8),q={href:"https://mp.weixin.qq.com/s/h3VIUyH9L0v14MrQJiiDbw",target:"_blank",rel:"noopener noreferrer"},I=c(`<h3 id="读锁为什么不能升级为写锁" tabindex="-1"><a class="header-anchor" href="#读锁为什么不能升级为写锁" aria-hidden="true">#</a> 读锁为什么不能升级为写锁？</h3><p>写锁可以降级为读锁，但是读锁却不能升级为写锁。这是因为读锁升级为写锁会引起线程的争夺，毕竟写锁属于是独占锁，这样的话，会影响性能。</p><p>另外，还可能会有死锁问题发生。举个例子：假设两个线程的读锁都想升级写锁，则需要对方都释放自己锁，而双方都不释放，就会产生死锁。</p><h2 id="stampedlock" tabindex="-1"><a class="header-anchor" href="#stampedlock" aria-hidden="true">#</a> StampedLock</h2><p><code>StampedLock</code> 面试中问的比较少，不是很重要，简单了解即可。</p><h3 id="stampedlock-是什么" tabindex="-1"><a class="header-anchor" href="#stampedlock-是什么" aria-hidden="true">#</a> StampedLock 是什么？</h3><p><code>StampedLock</code> 是 JDK 1.8 引入的性能更好的读写锁，不可重入且不支持条件变量 <code>Condition</code>。</p><p>不同于一般的 <code>Lock</code> 类，<code>StampedLock</code> 并不是直接实现 <code>Lock</code> 或 <code>ReadWriteLock</code> 接口，而是基于 <strong>CLH 锁</strong> 独立实现的（AQS 也是基于这玩意）。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class StampedLock implements java.io.Serializable {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>StampedLock</code> 提供了三种模式的读写控制模式：读锁、写锁和乐观读。</p><ul><li><strong>写锁</strong>：独占锁，一把锁只能被一个线程获得。当一个线程获取写锁后，其他请求读锁和写锁的线程必须等待。类似于 <code>ReentrantReadWriteLock</code> 的写锁，不过这里的写锁是不可重入的。</li><li><strong>读锁</strong> （悲观读）：共享锁，没有线程获取写锁的情况下，多个线程可以同时持有读锁。如果己经有线程持有写锁，则其他线程请求获取该读锁会被阻塞。类似于 <code>ReentrantReadWriteLock</code> 的读锁，不过这里的读锁是不可重入的。</li><li><strong>乐观读</strong>：允许多个线程获取乐观读以及读锁。同时允许一个写线程获取写锁。</li></ul><p>另外，<code>StampedLock</code> 还支持这三种锁在一定条件下进行相互转换 。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>long tryConvertToWriteLock(long stamp){}
long tryConvertToReadLock(long stamp){}
long tryConvertToOptimisticRead(long stamp){}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>StampedLock</code> 在获取锁的时候会返回一个 long 型的数据戳，该数据戳用于稍后的锁释放参数，如果返回的数据戳为 0 则表示锁获取失败。当前线程持有了锁再次获取锁还是会返回一个新的数据戳，这也是 <code>StampedLock</code> 不可重入的原因。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 写锁
public long writeLock() {
    long s, next;  // bypass acquireWrite in fully unlocked case only
    return ((((s = state) &amp; ABITS) == 0L &amp;&amp;
             U.compareAndSwapLong(this, STATE, s, next = s + WBIT)) ?
            next : acquireWrite(false, 0L));
}
// 读锁
public long readLock() {
    long s = state, next;  // bypass acquireRead on common uncontended case
    return ((whead == wtail &amp;&amp; (s &amp; ABITS) &lt; RFULL &amp;&amp;
             U.compareAndSwapLong(this, STATE, s, next = s + RUNIT)) ?
            next : acquireRead(false, 0L));
}
// 乐观读
public long tryOptimisticRead() {
    long s;
    return (((s = state) &amp; WBIT)== 0L) ? (s &amp; SBITS) : 0L;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stampedlock-的性能为什么更好" tabindex="-1"><a class="header-anchor" href="#stampedlock-的性能为什么更好" aria-hidden="true">#</a> StampedLock 的性能为什么更好？</h3><p>相比于传统读写锁多出来的乐观读是 <code>StampedLock</code> 比 <code>ReadWriteLock</code> 性能更好的关键原因。<code>StampedLock</code> 的乐观读允许一个写线程获取写锁，所以不会导致所有写线程阻塞，也就是当读多写少的时候，写线程有机会获取写锁，减少了线程饥饿的问题，吞吐量大大提高。</p><h3 id="stampedlock-适合什么场景" tabindex="-1"><a class="header-anchor" href="#stampedlock-适合什么场景" aria-hidden="true">#</a> StampedLock 适合什么场景？</h3><p>和 <code>ReentrantReadWriteLock</code> 一样，<code>StampedLock</code> 同样适合读多写少的业务场景，可以作为 <code>ReentrantReadWriteLock</code> 的替代品，性能更好。</p><p>不过，需要注意的是 <code>StampedLock</code> 不可重入，不支持条件变量 <code>Condition</code>，对中断操作支持也不友好（使用不当容易导致 CPU 飙升）。如果你需要用到 <code>ReentrantLock</code> 的一些高级性能，就不太建议使用 <code>StampedLock</code> 了。</p>`,20),U=e("code",null,"StampedLock",-1),T=e("code",null,"StampedLock",-1),M={href:"https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/locks/StampedLock.html",target:"_blank",rel:"noopener noreferrer"},N=c('<h3 id="stampedlock-的底层原理了解吗" tabindex="-1"><a class="header-anchor" href="#stampedlock-的底层原理了解吗" aria-hidden="true">#</a> StampedLock 的底层原理了解吗？</h3><p><code>StampedLock</code> 不是直接实现 <code>Lock</code> 或 <code>ReadWriteLock</code> 接口，而是基于 <strong>CLH 锁</strong> 实现的（AQS 也是基于这玩意），CLH 锁是对自旋锁的一种改良，是一种隐式的链表队列。<code>StampedLock</code> 通过 CLH 队列进行线程的管理，通过同步状态值 <code>state</code> 来表示锁的状态和类型。</p><p><code>StampedLock</code> 的原理和 AQS 原理比较类似，这里就不详细介绍了，感兴趣的可以看看下面这两篇文章：</p>',3),P={href:"https://javaguide.cn/java/concurrent/aqs.html",target:"_blank",rel:"noopener noreferrer"},Q={href:"https://segmentfault.com/a/1190000015808032",target:"_blank",rel:"noopener noreferrer"},D=e("p",null,[n("如果你只是准备面试的话，建议多花点精力搞懂 AQS 原理即可，"),e("code",null,"StampedLock"),n(" 底层原理在面试中遇到的概率非常小。")],-1),O=e("h2",{id:"atomic-原子类",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#atomic-原子类","aria-hidden":"true"},"#"),n(" Atomic 原子类")],-1),E={href:"https://github.com/Snailclimb/JavaGuide/blob/main/docs/java/concurrent/atomic-classes.md",target:"_blank",rel:"noopener noreferrer"},$=c('<h2 id="死锁-deadlock" tabindex="-1"><a class="header-anchor" href="#死锁-deadlock" aria-hidden="true">#</a> 死锁（Deadlock）</h2><h3 id="什么是死锁" tabindex="-1"><a class="header-anchor" href="#什么是死锁" aria-hidden="true">#</a> 什么是死锁</h3><p>多个线程互相等待对方释放锁。</p><p>死锁是当线程进入无限期等待状态时发生的情况，因为所请求的锁被另一个线程持有，而另一个线程又等待第一个线程持有的另一个锁。</p><p align="center"><img src="https://raw.githubusercontent.com/dunwu/images/master/cs/java/javacore/concurrent/deadlock.png"></p><h3 id="避免死锁" tabindex="-1"><a class="header-anchor" href="#避免死锁" aria-hidden="true">#</a> 避免死锁</h3><p>（1）按序加锁</p><p>当多个线程需要相同的一些锁，但是按照不同的顺序加锁，死锁就很容易发生。</p><p>如果能确保所有的线程都是按照相同的顺序获得锁，那么死锁就不会发生。</p><p>按照顺序加锁是一种有效的死锁预防机制。但是，这种方式需要你事先知道所有可能会用到的锁(译者注：并对这些锁做适当的排序)，但总有些时候是无法预知的。</p><p>（2）超时释放锁</p><p>另外一个可以避免死锁的方法是在尝试获取锁的时候加一个超时时间，这也就意味着在尝试获取锁的过程中若超过了这个时限该线程则放弃对该锁请求。若一个线程没有在给定的时限内成功获得所有需要的锁，则会进行回退并释放所有已经获得的锁，然后等待一段随机的时间再重试。这段随机的等待时间让其它线程有机会尝试获取相同的这些锁，并且让该应用在没有获得锁的时候可以继续运行(译者注：加锁超时后可以先继续运行干点其它事情，再回头来重复之前加锁的逻辑)。</p><p>（3）死锁检测</p><p>死锁检测是一个更好的死锁预防机制，它主要是针对那些不可能实现按序加锁并且锁超时也不可行的场景。</p><p>每当一个线程获得了锁，会在线程和锁相关的数据结构中（map、graph 等等）将其记下。除此之外，每当有线程请求锁，也需要记录在这个数据结构中。</p><p>当一个线程请求锁失败时，这个线程可以遍历锁的关系图看看是否有死锁发生。</p><p>如果检测出死锁，有两种处理手段：</p><ul><li>释放所有锁，回退，并且等待一段随机的时间后重试。这个和简单的加锁超时类似，不一样的是只有死锁已经发生了才回退，而不会是因为加锁的请求超时了。虽然有回退和等待，但是如果有大量的线程竞争同一批锁，它们还是会重复地死锁（编者注：原因同超时类似，不能从根本上减轻竞争）。</li><li>一个更好的方案是给这些线程设置优先级，让一个（或几个）线程回退，剩下的线程就像没发生死锁一样继续保持着它们需要的锁。如果赋予这些线程的优先级是固定不变的，同一批线程总是会拥有更高的优先级。为避免这个问题，可以在死锁发生的时候设置随机的优先级。</li></ul>',18);function K(H,F){const d=i("ExternalLinkIcon");return r(),t("div",null,[l,p,e("p",null,[n("JMM（Java 内存模型）相关的问题比较多，也比较重要，于是我单独抽了一篇文章来总结 JMM 相关的知识点和问题："),e("a",u,[n("JMM（Java 内存模型）详解"),a(d)]),n(" 。")]),h,e("p",null,[n("在 Java 中 "),m,n(" 包下面的原子变量类（比如 "),v,n("、"),b,n("）就是使用了乐观锁的一种实现方式 "),f,n(" 实现的。 "),e("a",g,[k,a(d)])]),L,e("p",null,[n("关于 "),x,n(" 类的详细介绍可以看这篇文章："),e("a",S,[n("Java 魔法类 Unsafe 详解 - JavaGuide - 2022"),a(d)]),n(" 。")]),_,e("figure",null,[e("a",A,[R,a(d)]),y]),C,e("p",null,[n("从上面的内容可以看出， "),w,n(" 的底层就是由 AQS 来实现的。关于 AQS 的相关内容推荐阅读 "),e("a",j,[n("AQS 详解"),a(d)]),n(" 这篇文章。")]),z,e("figure",null,[e("a",J,[W,a(d)]),V]),B,e("p",null,[n("读写锁的源码分析，推荐阅读 "),e("a",q,[n("聊聊 Java 的几把 JVM 级锁 - 阿里巴巴中间件"),a(d)]),n(" 这篇文章，写的很不错。")]),I,e("p",null,[n("另外，"),U,n(" 性能虽好，但使用起来相对比较麻烦，一旦使用不当，就会出现生产问题。强烈建议你在使用 "),T,n(" 之前，看看 "),e("a",M,[n("StampedLock 官方文档中的案例"),a(d)]),n("。")]),N,e("ul",null,[e("li",null,[e("a",P,[n("AQS 详解"),a(d)])]),e("li",null,[e("a",Q,[n("StampedLock 底层原理分析"),a(d)])])]),D,O,e("p",null,[n("Atomic 原子类部分的内容我单独写了一篇文章来总结："),e("a",E,[n("Atomic 原子类总结"),a(d)]),n(" 。")]),$])}const Y=o(s,[["render",K],["__file","index.html.vue"]]);export{Y as default};
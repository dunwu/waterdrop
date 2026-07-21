---
title: ZXing 快速入门
date: 2022-02-17 22:34:30
order: 07
categories:
  - Java
  - 工具
  - 其他
tags:
  - Java
  - 条形码
  - ZXing
permalink: /pages/434edec6/
---

# ZXing 快速入门

## 简介

`ZXing` 是一个开源 Java 类库用于解析多种格式的 1D/2D 条形码。目标是能够对 QR 编码、Data Matrix、UPC 的 1D 条形码进行解码。 其提供了多种平台下的客户端包括：J2ME、J2SE 和 Android。

官网：[<u>ZXing github 仓库</u>](https://github.com/zxing/zxing)

## 实战

**_本例演示如何在一个非 android 的 Java 项目中使用 ZXing 来生成、解析二维码图片。_**

### 安装

maven 项目只需引入依赖：

```xml
<dependency>
  <groupId>com.google.zxing</groupId>
  <artifactId>core</artifactId>
  <version>3.3.0</version>
</dependency>
<dependency>
  <groupId>com.google.zxing</groupId>
  <artifactId>javase</artifactId>
  <version>3.3.0</version>
</dependency>
```

如果非 maven 项目，就去官网下载发布版本：[<u>下载地址</u>](https://github.com/zxing/zxing/releases)

### 生成二维码图片

ZXing 生成二维码图片有以下步骤：

1. `com.google.zxing.MultiFormatWriter` 根据内容以及图像编码参数生成图像 2D 矩阵。
2. ​ `com.google.zxing.client.j2se.MatrixToImageWriter` 根据图像矩阵生成图片文件或图片缓存 `BufferedImage` 。

```java
public void encode(String content, String filepath) throws WriterException, IOException {
 int width = 100;
 int height = 100;
 Map<EncodeHintType, Object> encodeHints = new HashMap<EncodeHintType, Object>();
 encodeHints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
 BitMatrix bitMatrix = new MultiFormatWriter().encode(content, BarcodeFormat.QR_CODE, width, height, encodeHints);
 Path path = FileSystems.getDefault().getPath(filepath);
 MatrixToImageWriter.writeToPath(bitMatrix, "png", path);
}
```

### 解析二维码图片

ZXing 解析二维码图片有以下步骤：

1. 使用 `javax.imageio.ImageIO` 读取图片文件，并存为一个 `java.awt.image.BufferedImage` 对象。

2. 将 `java.awt.image.BufferedImage` 转换为 ZXing 能识别的 `com.google.zxing.BinaryBitmap` 对象。

3. `com.google.zxing.MultiFormatReader` 根据图像解码参数来解析 `com.google.zxing.BinaryBitmap` 。

```java
public String decode(String filepath) throws IOException, NotFoundException {
 BufferedImage bufferedImage = ImageIO.read(new FileInputStream(filepath));
 LuminanceSource source = new BufferedImageLuminanceSource(bufferedImage);
 Binarizer binarizer = new HybridBinarizer(source);
 BinaryBitmap bitmap = new BinaryBitmap(binarizer);
 HashMap<DecodeHintType, Object> decodeHints = new HashMap<DecodeHintType, Object>();
 decodeHints.put(DecodeHintType.CHARACTER_SET, "UTF-8");
 Result result = new MultiFormatReader().decode(bitmap, decodeHints);
 return result.getText();
}
```

完整参考示例：[<u>测试例代码</u>](https://github.com/dunwu/JavaParty/blob/master/toolbox/image/src/test/java/org/zp/image/QRCodeUtilTest.java)

以下是一个生成的二维码图片示例：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/1a6f2fba5522499e964cc108a9957740.webp)

## 典型应用场景

- **支付二维码生成**：生成包含订单信息的支付二维码，用户扫码即可完成支付，广泛应用于电商、线下收银场景。
- **电子票务验证**：将订单号、座位信息编码为二维码，入场时通过扫码快速验证票务真伪。
- **商品条形码管理**：生成和解析 EAN/UPC 等条形码，用于商品库存管理、物流追踪和扫码购物。
- **登录扫码认证**：生成合动态 token 的二维码，用户扫码后服务端验证 token 完成登录。

## 最佳实践

- **设置合适的容错级别**：通过 `ErrorCorrectionLevel` 设置容错级别（L/M/Q/H），场景越复杂建议越高，H 级可容忍 30% 损坏。
- **指定字符集为 UTF-8**：生成和解析时均设置 `CHARACTER_SET` 为 `UTF-8`，避免中文内容乱码。
- **控制二维码尺寸**：根据场景选择合适的宽高，太小会影响识别率，太大浪费空间。一般 200x200 以上为宜。
- **添加 Logo 时提高容错**：在二维码中心添加 Logo 时，将容错级别设为 H，确保遮挡部分不影响识别。

## 常见问题

**解析二维码报 NotFoundException？**

可能原因：1）图片分辨率太低；2）二维码损坏或遮挡过多；3）未设置正确的字符集。尝试提高图片分辨率或使用 `TryHarder` 提示。

**生成的二维码扫描不出来？**

检查：1）内容是否过长（QR Code 有容量上限，约 2953 字节）；2）容错级别是否足够；3）图片尺寸是否过小；4）背景是否有干扰。

**ZXing 支持哪些编码格式？**

ZXing 支持 QR Code、Data Matrix、PDF417、EAN-13、EAN-8、UPC-A、UPC-E、Code 39、Code 128 等主流 1D/2D 编码格式。

## 参考

[ZXing github 仓库](https://github.com/zxing/zxing)

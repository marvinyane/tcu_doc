##AddressSanitizer
###1. 简介
AddressSanitizer (ASan) 是一种基于编译器的快速检测工具，用于检测原生代码中的内存错误，包括以下几种：  

- 出界内存访问  
- 双重释放  
- 释放后再使用  
###2. 使用步骤
1. 在`Android.mk`中加入以下内容:

		LOCAL_CFLAGS += -fno-omit-frame-pointer -O0
		LOCAL_CLANG := true
		LOCAL_SANITIZE := address
2. 编译需要调试的程序
3. 将`out/target/product/tcu/symbols/`目录下生成的对应文件推入TCU中
4. 执行程序，检测到错误时，ASan会向标准输出和logcat发送一份详细报告，然后让进程崩溃。
###3. 参考demo
minitcu/frameworks/base/test/TestAsan
##GDB
###1. 准备工作
执行`development/scripts/gdbclient`脚本，这个脚本会加载`gdbclient`命令
###2. 调试运行中的进程
如果需要调试TCU上正在运行的进程，可以在PC上执行

		gdbclient pid
其中pid为需要调试的进程在TCU上的pid，然后就可以对进程进行调试了
###3. 调试进程启动
如果需要在进程启动时进行调试，首先需要用`adb forward`指令将本机端口重定向至`gdbserver`在TCU上将要使用的端口

		adb forward tcp:2000 tcp:2000
然后在TCU上运行`gdbserver`:

		gdbserver :2000 /system/bin/test
这个指令是在TCU的2000端口启动`gdbserver`调试`/system/bin/test`  
运行`gdbserver`之后，在TCU上会出现以下log：

		Process /system/bin/test created; pid = 661
		Listening on port 2000
		Remote debugging from host 127.0.0.1
由log可知进程pid为661，因此在PC上用以下指令启动`gdbclient`：

		gdbclient 661 2000
之后就可以对该程序进行调试了
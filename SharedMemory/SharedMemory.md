##共享内存
###1. 简介
共享内存是通过`MemoryBase`类实现的，server端初始化`MemoryBase`并将其进行`publish`，client端将接收到的`binder`转换成`Imemory`
###2. 使用步骤
#####server端：
1. 初始化一个`MemoryHeapBase`实例，参数分别为内存大小，flag，以及名字

		android::sp<android::MemoryHeapBase> heap = new android::MemoryHeapBase(sizeof(SharedContext), 0, SHARED_BUFFER_SERVICE);
2. 初始化`MemoryBase`，参数分别为之前初始化的`MemoryHeapBase`实例，偏移与内存大小

		mMemory = new android::MemoryBase(heap, 0, sizeof(SharedContext));
3. 调用`MemoryBase->pointer()`获取内存，并初始化

		void* data = mMemory->pointer();
        if (data != NULL) {
            memset(data, 0, sizeof(SharedContext));
        }
4. 以`MemoryBase`实例为参数调用`publish`

		publish(mMemory);
#####client端：
1. bind server

		bindService(android::String16("TestSharedMemoryServer"), this);
2. 2.在`onServiceConnected`函数中将`binder`转换成`Imemory`，然后调用`pointer`函数获取内存

		android::sp<android::IMemory> memory = android::interface_cast<android::IMemory>(binder);
    	mContext = (SharedContext*)memory->pointer();
###3. 参考demo
minitcu/frameworks/base/test/TestSharedMemory
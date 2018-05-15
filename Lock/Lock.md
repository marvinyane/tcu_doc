##互斥锁
###1. 简介
互斥锁是通过类`Mutex`实现的
###2. 使用步骤
1. 持有一个`android::Mutex`实例并初始化

		android::Mutex m_eventLock;
2. 在需要上锁的地方，定义一个`android::Mutex::Autolock`变量并且用`m_eventLock`初始化，`Autolock`类在其构造函数中会调用`m_eventLock`的`lock`函数，在其析构函数中调用其`unlock`函数，因此在该函数中从此处直到函数结束时使用的所有变量都会被上锁

		android::Mutex::Autolock _l(m_eventLock);
当然也可以直接使用`Mutex`的`lock`与`unlock`函数进行上锁与解锁
###3 参考demo
minitcu/frameworks/base/test/TestLock
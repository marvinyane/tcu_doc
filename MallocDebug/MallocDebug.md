##本地内存调试
###一. get\_malloc\_leak\_info
####1. 简介
`get_malloc_leak_info`函数能够得到`malloc`的大小和调用堆栈等信息，其定义如下：

	extern "C" void get_malloc_leak_info(uint8_t** info, size_t* overall_size, size_t* info_size, size_t* total_memory, size_t* backtrace_size);
参数意义如下：  
`info`：该变量中包含所有的malloc信息，其中`info`的格式如下：

	size_t size_of_original_allocation
	size_t num_allocations
	uintptr_t pc1
	uintptr_t pc2
	uintptr_t pc3
	.
	.
	.
其中，`size_of_original_allocation`为此次`malloc`分配的内存大小，`num_allocations`为堆栈大小，`pc`为堆栈地址，其数量为`num_allocations`个  
`overall_size`：`info`的总长度  
`info_size`：单个信息长度  
`total_memory`：当前为止所有被分配的内存的大小总和  
`backtrace_size`：最大堆栈大小
####2. 使用方法
1. 通过命令行将`libc.debug.malloc.options`设置为`backtrace`

		setprop libc.debug.malloc.options backtrace
2. 在文件开头声明`get_malloc_leak_info`函数，并且调用`get_malloc_leak_info`函数

		extern "C" void get_malloc_leak_info(uint8_t** info, size_t* overall_size, size_t* info_size, size_t* total_memory, size_t* backtrace_size);
		...
		void displayMallInfo()
		{
			uint8_t* info;
	        size_t overall_size;
	        size_t info_size;
	        size_t total_memory;
	        size_t backtrace_size;
	        size_t count = 0;

	        get_malloc_leak_info(&info, &overall_size, &info_size, &total_memory, &backtrace_size);
			...
		}
3. 计算`info`中有多少个`malloc`信息，并对其进行解析

		void displayMallInfo()
		{
			...
			if ((info == NULL) || (overall_size == 0) || (info_size == 0) || ((count = overall_size / info_size) == 0)) {
	            printf("get info fail!\n");
	            return;
	        }
			for (size_t i = 0; i < count; ++i) {
	            printf("i = %d\n", i);
	            struct AllocEntry {
	                size_t size;
	                size_t allocations;
	                uintptr_t backtrace[];
	            };

	            const AllocEntry* const e = (AllocEntry *)(info + i * info_size);
	            printf("size = %d, allocations = %d\n", e->size, e->allocations);
	            std::string backtrace_str = backtrace_string(e->backtrace, e->allocations);
	            printf("%s\n", backtrace_str.c_str());
	        }
			...
		}
4. 释放得到地`info`的内存

		void displayMallInfo()
		{
			...
			free_malloc_leak_info(info);
		}
###二. mallinfo
####1. 简介
`mallinfo`函数可以获得由`malloc`函数分配的内存信息  
`mallinfo`函数包含在头文件`malloc.h`中，其定义如下：

	struct mallinfo mallinfo(void);
其中，`mallinfo`结构定义如下：

	struct mallinfo {
		int arena;     /* Non-mmapped space allocated (bytes) */
		int ordblks;   /* Number of free chunks */
		int smblks;    /* Number of free fastbin blocks */
		int hblks;     /* Number of mmapped regions */
		int hblkhd;    /* Space allocated in mmapped regions (bytes) */
		int usmblks;   /* Maximum total allocated space (bytes) */
		int fsmblks;   /* Space in freed fastbin blocks (bytes) */
		int uordblks;  /* Total allocated space (bytes) */
		int fordblks;  /* Total free space (bytes) */
		int keepcost;  /* Top-most, releasable space (bytes) */
	};
####2. 使用方法
在需要的地方调用`mallinfo`函数，并且对返回值进行分析

	struct mallinfo mi;

	mi = mallinfo();
	
	printf("Total non-mmapped bytes (arena):       %d\n", mi.arena);
	printf("# of free chunks (ordblks):            %d\n", mi.ordblks);
	printf("# of free fastbin blocks (smblks):     %d\n", mi.smblks);
	printf("# of mapped regions (hblks):           %d\n", mi.hblks);
	printf("Bytes in mapped regions (hblkhd):      %d\n", mi.hblkhd);
	printf("Max. total allocated space (usmblks):  %d\n", mi.usmblks);
	printf("Free bytes held in fastbins (fsmblks): %d\n", mi.fsmblks);
	printf("Total allocated space (uordblks):      %d\n", mi.uordblks);
	printf("Total free space (fordblks):           %d\n", mi.fordblks);
	printf("Topmost releasable block (keepcost):   %d\n", mi.keepcost);
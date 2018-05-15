$(function () {
    $(menu).height($(document).height());
    $(ThreadAndLooperInfo).height($(document).height() - 5);
    $(LockInfo).height($(document).height() - 5);
    $(SharedMemoryInfo).height($(document).height() - 5);
    $(GdbInfo).height($(document).height() - 5);
    $(AddressSanitizerInfo).height($(document).height() - 5);
    $(MallocDebugInfo).height($(document).height() - 5);

    $(document).on('click', '.ThreadAndLooperBotton', function () {
        $('#ThreadAndLooperInfo').css('display', 'block');
        $('#LockInfo').css('display', 'none');
        $('#SharedMemoryInfo').css('display', 'none');
        $('#GdbInfo').css('display', 'none');
        $('#AddressSanitizerInfo').css('display', 'none');
        $('#MallocDebugInfo').css('display', 'none');
    });

    $(document).on('click', '.LockBotton', function () {
        $('#ThreadAndLooperInfo').css('display', 'none');
        $('#LockInfo').css('display', 'block');
        $('#SharedMemoryInfo').css('display', 'none');
        $('#GdbInfo').css('display', 'none');
        $('#AddressSanitizerInfo').css('display', 'none');
        $('#MallocDebugInfo').css('display', 'none');
    });

    $(document).on('click', '.SharedMemoryBotton', function () {
        $('#ThreadAndLooperInfo').css('display', 'none');
        $('#LockInfo').css('display', 'none');
        $('#SharedMemoryInfo').css('display', 'block');
        $('#GdbInfo').css('display', 'none');
        $('#AddressSanitizerInfo').css('display', 'none');
        $('#MallocDebugInfo').css('display', 'none');
    });

    $(document).on('click', '.GdbBotton', function () {
        $('#ThreadAndLooperInfo').css('display', 'none');
        $('#LockInfo').css('display', 'none');
        $('#SharedMemoryInfo').css('display', 'none');
        $('#GdbInfo').css('display', 'block');
        $('#AddressSanitizerInfo').css('display', 'none');
        $('#MallocDebugInfo').css('display', 'none');
    });

    $(document).on('click', '.AddressSanitizerBotton', function () {
        $('#ThreadAndLooperInfo').css('display', 'none');
        $('#LockInfo').css('display', 'none');
        $('#SharedMemoryInfo').css('display', 'none');
        $('#GdbInfo').css('display', 'none');
        $('#AddressSanitizerInfo').css('display', 'block');
        $('#MallocDebugInfo').css('display', 'none');
    });

    $(document).on('click', '.MallocDebugBotton', function () {
        $('#ThreadAndLooperInfo').css('display', 'none');
        $('#LockInfo').css('display', 'none');
        $('#SharedMemoryInfo').css('display', 'none');
        $('#GdbInfo').css('display', 'none');
        $('#AddressSanitizerInfo').css('display', 'none');
        $('#MallocDebugInfo').css('display', 'block');
    });
});
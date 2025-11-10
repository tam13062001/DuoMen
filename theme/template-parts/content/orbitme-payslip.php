<div class="p-6 ">
  <h2 class="text-2xl font-bold">Payslip Management</h2>
  <p class="text-gray-700">
    Xem và tải bảng lương hàng tháng
  </p>
</div>

<div class="space-y-6">
  <!-- Payslip Selection -->
  <div class="bg-white shadow rounded-lg">
    <div class="border-b px-4 py-3">
      <h2 class="flex items-center gap-2 font-semibold text-gray-700">
        <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m-9 8h12a2 2 0 002-2V6a2 2 0 00-2-2H9l-6 6v12a2 2 0 002 2z"/>
        </svg>
        Bảng lương
      </h2>
    </div>
    <div class="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div class="space-y-2">
        <label class="text-sm font-medium">Chọn tháng</label>
        <select class="w-48 border rounded-lg px-3 py-2 text-sm">
          <option>Tháng 11/2024</option>
          <option>Tháng 10/2024</option>
        </select>
      </div>
      <div class="flex gap-2">
        <button class="px-4 py-2 border rounded-lg text-sm flex items-center gap-1">
          👁 Xem chi tiết
        </button>
        <button class="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm flex items-center gap-1">
          ⬇ Tải về PDF
        </button>
      </div>
    </div>
  </div>

  <!-- Payslip Summary -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="bg-white p-4 shadow rounded-lg">
      <p class="text-sm text-gray-500 pb-[50px]">Lương cơ bản</p>
      <p class="text-xl font-bold">25.000.000 ₫</p>
    </div>
    <div class="bg-white p-4 shadow rounded-lg">
      <p class="text-sm text-gray-500 pb-[50px]">Tổng thu nhập</p>
      <p class="text-xl font-bold text-green-600">28.800.000 ₫</p>
    </div>
    <div class="bg-white p-4 shadow rounded-lg">
      <p class="text-sm text-gray-500 pb-[50px]">Tổng khấu trừ</p>
      <p class="text-xl font-bold text-red-600">4.250.000 ₫</p>
    </div>
    <div class="bg-white p-4 shadow rounded-lg">
      <p class="text-sm text-gray-500 pb-[50px]">Thực lĩnh</p>
      <p class="text-xl font-bold text-blue-600">24.375.000 ₫</p>
    </div>
  </div>

  <!-- Earnings & Deductions -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="bg-white shadow rounded-lg p-4">
      <h3 class="font-semibold mb-3 text-green-700">Thu nhập</h3>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between "><span class="pb-[20px]">Lương cơ bản</span><span class="text-green-600">25.000.000 ₫</span></div>
        <div class="flex justify-between "><span class="pb-[20px]">Phụ cấp ăn trưa</span><span class="text-green-600">1.000.000 ₫</span></div>
        <div class="flex justify-between "><span class="pb-[20px]">Phụ cấp xăng xe</span><span class="text-green-600">800.000 ₫</span></div>
        <div class="flex justify-between "><span class="pb-[20px]">Thưởng hiệu suất</span><span class="text-green-600">2.000.000 ₫</span></div>
        <hr>
        <div class="flex justify-between font-semibold"><span>Tổng thu nhập</span><span class="text-green-600">28.800.000 ₫</span></div>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg p-4">
      <h3 class="font-semibold mb-3 text-red-700">Khấu trừ</h3>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between"><span class="pb-[20px]">Bảo hiểm xã hội (8%)</span><span class="text-red-600">2.000.000 ₫</span></div>
        <div class="flex justify-between"><span class="pb-[20px]">BHYT (1.5%)</span><span class="text-red-600">375.000 ₫</span></div>
        <div class="flex justify-between"><span class="pb-[20px]">BHTN (1%)</span><span class="text-red-600">250.000 ₫</span></div>
        <div class="flex justify-between"><span class="pb-[20px]">Thuế TNCN</span><span class="text-red-600">1.800.000 ₫</span></div>
        <hr>
        <div class="flex justify-between font-semibold"><span>Tổng khấu trừ</span><span class="text-red-600">4.425.000 ₫</span></div>
      </div>
    </div>
  </div>

  <!-- Net Salary -->
  <div class="bg-blue-50 border rounded-lg p-4 text-lg font-bold flex justify-between">
    <span>THỰC LĨNH</span>
    <span class="text-blue-600 text-2xl">24.375.000 ₫</span>
  </div>
</div>

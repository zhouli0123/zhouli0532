// 周丽 2026-11-02 GLM-5.3-Flash 功能：zhouli_initTabs —— 可复用选项卡初始化函数
// 用法：zhouli_initTabs(选项卡导航id, 面板容器id, 选中类名)
// 说明：导航内的按钮与面板容器内的面板按顺序一一对应；
//       点击时先清除所有选项卡的选中状态，再设置当前元素的选中状态。
//       同一页面可多次调用，绑定多组互不干扰的选项卡。
function zhouli_initTabs(zhouliNavId, zhouliPanelsWrapId, zhouliActiveClass) {
  var zhouliNav = document.getElementById(zhouliNavId);
  var zhouliPanelsWrap = document.getElementById(zhouliPanelsWrapId);
  if (!zhouliNav || !zhouliPanelsWrap) return;

  var zhouliBtns = zhouliNav.querySelectorAll(".zhouli_tab-btn");
  var zhouliPanels = zhouliPanelsWrap.querySelectorAll(".zhouli_tab-panel");

  // 事件监听：事件委托，把点击事件统一绑定在导航容器上
  zhouliNav.addEventListener("click", function (zhouliEvent) {
    var zhouliTarget = zhouliEvent.target;
    if (!zhouliTarget.classList || !zhouliTarget.classList.contains("zhouli_tab-btn")) return;

    // 找到被点击按钮在导航中的位置
    var zhouliIndex = Array.prototype.indexOf.call(zhouliBtns, zhouliTarget);

    // 第一步：清除所有选项卡和面板的选中状态
    for (var zhouliI = 0; zhouliI < zhouliBtns.length; zhouliI++) {
      zhouliBtns[zhouliI].classList.remove(zhouliActiveClass);
      zhouliPanels[zhouliI].classList.remove(zhouliActiveClass);
    }

    // 第二步：设置当前元素的选中状态
    zhouliTarget.classList.add(zhouliActiveClass);
    zhouliPanels[zhouliIndex].classList.add(zhouliActiveClass);
  });
}

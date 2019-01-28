/**
 * 初始化初始测试详情对话框
 */
var TTblHouseInfoDlg = {
    tTblHouseInfoData : {}
};

/**
 * 清除数据
 */
TTblHouseInfoDlg.clearData = function() {
    this.tTblHouseInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
TTblHouseInfoDlg.set = function(key, val) {
    this.tTblHouseInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
TTblHouseInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
TTblHouseInfoDlg.close = function() {
    parent.layer.close(window.parent.TTblHouse.layerIndex);
}

/**
 * 收集数据
 */
TTblHouseInfoDlg.collectData = function() {
    this
    .set('id')
    .set('houseUser')
    .set('houseAddress')
    .set('houseDate')
    .set('houseDesc');
}

/**
 * 提交添加
 */
TTblHouseInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/tTblHouse/add", function(data){
        Feng.success("添加成功!");
        window.parent.TTblHouse.table.refresh();
        TTblHouseInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.tTblHouseInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
TTblHouseInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/tTblHouse/update", function(data){
        Feng.success("修改成功!");
        window.parent.TTblHouse.table.refresh();
        TTblHouseInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.tTblHouseInfoData);
    ajax.start();
}

$(function() {

});

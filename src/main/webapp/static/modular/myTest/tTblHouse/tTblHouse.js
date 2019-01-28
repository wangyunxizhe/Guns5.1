/**
 * 初始测试管理初始化
 */
var TTblHouse = {
    id: "TTblHouseTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
TTblHouse.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '房屋编号', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '业主名称', field: 'houseUser', visible: true, align: 'center', valign: 'middle'},
            {title: '房屋地址', field: 'houseAddress', visible: true, align: 'center', valign: 'middle'},
            {title: '房屋交付时间', field: 'houseDate', visible: true, align: 'center', valign: 'middle'},
            {title: '房屋描述', field: 'houseDesc', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
TTblHouse.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        TTblHouse.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加初始测试
 */
TTblHouse.openAddTTblHouse = function () {
    var index = layer.open({
        type: 2,
        title: '添加初始测试',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/tTblHouse/tTblHouse_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看初始测试详情
 */
TTblHouse.openTTblHouseDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '初始测试详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/tTblHouse/tTblHouse_update/' + TTblHouse.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除初始测试
 */
TTblHouse.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/tTblHouse/delete", function (data) {
            Feng.success("删除成功!");
            TTblHouse.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("tTblHouseId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询初始测试列表
 */
TTblHouse.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    TTblHouse.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = TTblHouse.initColumn();
    var table = new BSTable(TTblHouse.id, "/tTblHouse/list", defaultColunms);
    table.setPaginationType("client");
    TTblHouse.table = table.init();
});

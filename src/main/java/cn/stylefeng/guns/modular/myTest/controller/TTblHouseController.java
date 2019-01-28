package cn.stylefeng.guns.modular.myTest.controller;

import cn.stylefeng.roses.core.base.controller.BaseController;
import cn.stylefeng.roses.core.util.ToolUtil;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import cn.stylefeng.guns.core.log.LogObjectHolder;
import org.springframework.web.bind.annotation.RequestParam;
import cn.stylefeng.guns.modular.system.model.TTblHouse;
import cn.stylefeng.guns.modular.myTest.service.ITTblHouseService;

import java.util.UUID;

/**
 * 初始测试控制器
 *
 * @author fengshuonan
 * @Date 2019-01-04 11:06:33
 */
@Controller
@RequestMapping("/tTblHouse")
public class TTblHouseController extends BaseController {

    private String PREFIX = "/myTest/tTblHouse/";

    @Autowired
    private ITTblHouseService tTblHouseService;

    /**
     * 跳转到初始测试首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "tTblHouse.html";
    }

    /**
     * 跳转到添加初始测试
     */
    @RequestMapping("/tTblHouse_add")
    public String tTblHouseAdd() {
        return PREFIX + "tTblHouse_add.html";
    }

    /**
     * 跳转到修改初始测试
     */
    @RequestMapping("/tTblHouse_update/{tTblHouseId}")
    public String tTblHouseUpdate(@PathVariable String tTblHouseId, Model model) {
        TTblHouse tTblHouse = tTblHouseService.selectById(tTblHouseId);
        model.addAttribute("item", tTblHouse);
        LogObjectHolder.me().set(tTblHouse);
        return PREFIX + "tTblHouse_edit.html";
    }

    /**
     * 获取初始测试列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        //自己添加的关于自己业务逻辑的代码：实现页面上的条件查询
        //判断condition是否有值，有，则按业务名称进行模糊查询；没有，则查询全部。
        if (ToolUtil.isEmpty(condition)) {//没值
            return tTblHouseService.selectList(null);
        } else {//有值
            EntityWrapper<TTblHouse> entityWrapper = new EntityWrapper<>();
            Wrapper<TTblHouse> wrapper = entityWrapper.like("house_user", condition);
            return tTblHouseService.selectList(wrapper);
        }
    }

    /**
     * 新增初始测试
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(TTblHouse tTblHouse) {
        tTblHouse.setId(UUID.randomUUID().toString());
        tTblHouseService.insert(tTblHouse);
        return SUCCESS_TIP;
    }

    /**
     * 删除初始测试
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam String tTblHouseId) {
        tTblHouseService.deleteById(tTblHouseId);
        return SUCCESS_TIP;
    }

    /**
     * 修改初始测试
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(TTblHouse tTblHouse) {
        tTblHouseService.updateById(tTblHouse);
        return SUCCESS_TIP;
    }

    /**
     * 初始测试详情
     */
    @RequestMapping(value = "/detail/{tTblHouseId}")
    @ResponseBody
    public Object detail(@PathVariable("tTblHouseId") String tTblHouseId) {
        return tTblHouseService.selectById(tTblHouseId);
    }
}

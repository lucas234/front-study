;(function ($) {
    $.fn.plugin = function(options) {  //fn.plugin，任意xx可调用plugin函数
        let defaults = {
            //以下为该插件的属性及其默认值
            // selected:"省",
            name : {
                prov : 'province',
                city : 'city',
                county : 'county'
            },
            selectClassName : 'region', //select class名称
        };
        let ops = $.extend(defaults,options);  //将options和dft进行拼接，组合成新的对象
        let objProvince = $('<select class="'+ops.selectClassName+'" name="'+ops.name.prov+'" required></select>');
        let _this = $(this);

        $.each(province,function (i, val){
            objProvince.append("<option value='"+val.id+"'>"+val.name+"</option>");
        })

        objProvince.change(function (){
            //删除元素
            try{
                $("[name='"+ops.name.city+"']").remove();
                $("[name='"+ops.name.county+"']").remove();
            }catch (e){}
            var pid = $(this).val(); //获取省份id
            let objCity = $('<select class="'+ops.selectClassName+'" name="'+ops.name.city+'" required></select>');
            if(pid){
                let cities = city[pid]
                $.each(cities, function (i, val){
                    objCity.append("<option value='"+val.id+"'>"+val.name+"</option>");
                })
                objCity.change(function (){
                    try { $("[name='"+ops.name.county+"']").remove();} catch (e) {}
                    let cid = $(this).val();
                    let objCounty = $('<select class="'+ops.selectClassName+'" name="'+ops.name.county+'" required></select>');
                    if(cid){
                        let counties = county[cid]
                        $.each(counties, function (i, val){
                            objCounty.append("<option value='"+val.id+"'>"+val.name+"</option>");
                        })
                    }
                    _this.append(objCounty)
                })
            }
            _this.append(objCity);
            objCity.trigger('change');
        })
        _this.append(objProvince);
        objProvince.trigger('change');
        return this
    }
})(jQuery);

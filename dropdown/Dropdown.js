;(function ($) {
    $.fn.plugin = function(options) {  //fn.plugin，任意xx可调用plugin函数
        let obj = {};
        let $container = $(this);
        let defaults = {
            //以下为该插件的属性及其默认值
            provinces:[
                {
                    "name": "北京市",
                    "id": "110000000000"
                },
                {
                    "name": "天津市",
                    "id": "120000000000"
                }]
        };
        let ops = $.extend(defaults,options);  //将options和dft进行拼接，组合成新的对象
        obj.create = function() {

            let dropdown = '<div class="dropdown" tabindex="-1"> ' +
                '<input class="search" autocomplete="on" tabindex="0" > ' +
                '<i class="icon ion-arrow-down-b"></i> ' +
                '<div class="text">省</div> ' +
                '<div class="menu" style="display: none"> ' +
                '<div class="message" >No results found.</div> ' +
                '</div> </div>'

            $container.append(dropdown)
            $.each(ops.provinces, function (i, val){
                $(".menu").prepend("<div class='item' data-value='"+val.id+"'>"+val.name+"</div>");
            });

            const selected  = '省'
            let getItemText = selected;
            let mentHeight = $('.menu').css('height');
            //输入框输入关键字时动态匹配
            $(".search").on("input",function(e){
                let search = $('.search ');
                let key=search.val();
                let text = $(".text");
                let message = $('.message');
                let flagCount = 0;
                text.text("");
                message.css({"display":"none"});
                $('.item').each(function(i,item){
                    if($(this).text().indexOf(key)>-1){
                        $(this).show();
                        flagCount +=1;
                        e.stopPropagation();
                    }else
                        $(this).hide();
                    e.stopPropagation();
                });
                if(flagCount===0){
                    message.css({"display":"block"});
                    $('.menu').css('height','auto')
                }
                if (search.val()===""){
                    message.css({"display":"none"});
                    $('.menu').css('height',mentHeight)
                    text.text(getItemText);
                }
            })

            $(function (){
                let menu = $(".menu");
                let search = $(".search");
                let text = $(".text")
                //点击输入框 显示 dropdown
                search.click(function (e){
                    menu.show()
                    e.stopPropagation();
                });
                //点击其他地方dropdown消失
                $(document).click(function(e){
                    menu.hide();
                    e.stopPropagation();
                });
                // 选择option
                $(".item").click(function (e){
                    menu.hide();
                    e.stopPropagation();
                    search.val('');
                    text.text($(this).html());
                    text.css("color", "black");
                    $(".item").css({"font-weight":"normal"});
                    getItemText =  $(this).html();
                    $(this).css({"font-weight":"bold"});
                });
                //点击小图标 显示/消失 dropdown
                $('.icon').click(function (e){
                    if(menu.css('display') === 'none'){
                        menu.show();
                        e.stopPropagation();
                    }else {
                        menu.hide();
                    }
                })
            })

            //聚焦时显示、样式
            $('.search').focus(function(e){
                let message = $('.message');
                // message.css({"display":"none"});
                let key=$('.search ').val();
                let flagCount = 0;
                $('.item').each(function(i,item){
                    if($(this).text().indexOf(key)>-1){
                        $(this).show();
                        flagCount +=1;
                        e.stopPropagation();
                    }else
                        $(this).hide();
                    e.stopPropagation();
                });
                if(flagCount===0){
                    message.css({"display":"block"});
                    $('.menu').css('height','auto')
                }else {
                    $('.menu').css('height',mentHeight)
                }
                $(".text").css("color", "#aba9a9");
            })
                .blur(function(){
                    let text = $(".text")
                    if (text.text()!==selected) {
                        text.css("color", "black");
                    }else {
                        text.css("color", "#cdcbcb");
                    }
                })
        }

        obj.getDropdownString=function (){
            let html = "";
            html = $(".text").html();
            return html
        }

        obj.create();
        return obj;
    }
})(jQuery);

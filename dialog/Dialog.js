;(function($) {

    $.fn.dialogPlugin = function(options) {

        let obj = {};
        let $container = $(this);

        //初始化参数
        let defaults = {
            type:"",          // confirm,message,tips,form
            isShowMask: false, // 弹窗的时候是否显示遮罩
            // clickOk 自定义点击Ok按钮的函数
            // hideDialog  自定义点击X、取消、遮罩后 弹窗消失的函数
            message:"",
            lang:"zh-CN",  // zh-CN, en
            // toastLevel 自定义info,success, warning, error
            confirmConfig:{title:"",clickOk:'clickOk',hideDialog:'testHide'},
            messageConfig:{title:"",clickOk:'clickOk',},
            toastConfig:{toastLevel: "", timeout: 1500},
        };

        /* 合并参数 */
        options = $.extend(defaults, options);

        //创建元素
        obj.create = function() {
            let containerForButtons = '<div id="containerForButtons">' +
                '<input type="button" value="Ok" class="confirm-dialog-btn ok" onclick="'+options.confirmConfig.clickOk+'()"> ' +
                '<input type="button" value="Cancel" class="confirm-dialog-btn cancel" onclick="'+options.confirmConfig.hideDialog+'()"> ' +
                '</div>'
            switch(options.type) {
                case "message":
                    obj.messageDialog = $('<div class="message-dialog" ></div>');
                    obj.messageDialog.append('<div class="message-title">'+options.messageConfig.title+'</div>')
                    obj.messageDialog.append('<div class="message-content">'+options.message+'</div>')
                    obj.messageDialog.append('<div class="message-btn"><button onclick="'+options.messageConfig.clickOk+'()">确定</button></div>')
                    $container.append(obj.messageDialog)
                    // mask
                    obj.mask = $('<div class="overlay" onclick="'+options.messageConfig.clickOk+'()"></div>');
                    $container.append(obj.mask);
                    break;
                case "confirm":
                    obj.confirmDialog = $('<div class="confirm-dialog" ></div>');
                    obj.confirmDialog.append('<div class="confirm-title" >'+options.confirmConfig.title+'</div>')
                    obj.confirmDialog.append('<div id="confirm-close" onclick="'+options.confirmConfig.hideDialog+'()">&times;</div>');
                    obj.confirmDialog.append('<div id="confirm-message" >'+options.message+'</div>');
                    obj.confirmDialog.append(containerForButtons);
                    $container.append(obj.confirmDialog)
                    // mask
                    obj.mask = $('<div class="overlay" onclick="'+options.confirmConfig.hideDialog+'()"></div>');
                    $container.append(obj.mask);
                    break;
                case "toast":
                    obj.toast = $('<div class="toast" ></div>');
                    obj.toast.append('<div class="toast-content '+options.toastConfig.toastLevel+'">'+options.message+'</div>')
                    $container.append(obj.toast)
                    break;
                default:
                    $container.append(obj.confirmDialog)
            }
        }
        // 显示弹窗
        obj.showDialog = function() {
            // 弹窗的时候是否显示遮罩
            if (options.isShowMask){
                obj.mask.fadeIn(30);
            }
            switch(options.type) {
                case "message":
                    obj.messageDialog.fadeIn(30);
                    break;
                case "confirm":
                    obj.confirmDialog.fadeIn(30);
                    break;
                case "toast":
                    obj.toast.fadeIn(30);
                    setTimeout(function () {
                        obj.toast.fadeOut(30);
                    }, options.toastConfig.timeout)
                    break;
                default:
                    obj.confirmDialog.fadeIn(30);
            }

        }

        obj.hideDialog = function (){
            if(options.isShowMask){
                obj.mask.fadeOut(30);
            }
            switch(options.type) {
                case "message":
                    obj.messageDialog.fadeOut(30);
                    break;
                case "confirm":
                    obj.confirmDialog.fadeOut(30);
                    break;
                default:
                    obj.confirmDialog.fadeOut(30);
            }
        }

        obj.dialogDraggable=function (){

        }

        obj.create();
        return obj;
    }

})(jQuery);

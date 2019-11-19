var hospitalCommon = {}

hospitalCommon.resCodeProcess = function (code, codeMsg) {
    debugger
    if (code == 20) {
        if (confirm('现在去登录>>>')) {
            $(`<a href="/hospital/login.html"  >123</a>`)[0].click()
        }
    }

}


hospitalCommon.newTab = function (title, url) {
    parent.$('#tabPad').tabs('add', {
        title: title,
        closable: true,
        width: '100%',
        content: `<iframe src="${url}" style="width:100%;height:100%;border:none;"/>`,
        tools: [{
            iconCls: 'icon-mini-refresh',
            handler: function () {
                var current_tab = parent.$('#tabPad').tabs('getSelected');
                parent.$('#tabPad').tabs('update', {
                    tab: current_tab,
                    options: {
                        content: current_tab.panel('options', 'content'),
                    }
                });
            }
        }
        ]
    });
}


hospitalCommon.uploadImage = function (inputDom, ook) {
    var r = prompt('已选的图片大小' + common.prettyFileSize(inputDom.files[0].size) + '，如需压缩，请输入质量0-10，取消则直接上传。', '8')
    var compressIs = false
    if (r != null) {
        r = parseInt(r);
        if (isNaN(r) || r < 0 || r > 10) {
            alert('输入有误')
            return;
        }
        compressIs = true
    }
    var file = inputDom.files[0];
    var fd = new FormData()
    fd.append('file', file);
    $.ajax({
        url: '/imgupload?' + $.param({ quality: r }),
        type: 'POST',
        data: fd,
        cache: false,
        processData: false,
        contentType: false,
        async: true,
        success: function (res) {
            if (res.codeMsg)
                alert(res.codeMsg)
            if (res.code != 0) {
                hospitalCommon.resCodeProcess(res.code, res.codeMsg)
            } else {
                if (compressIs)
                    alert('压缩后文件大小' + common.prettyFileSize(res.data.size))
                ook(res.data.url)
            }
        }
    })
}






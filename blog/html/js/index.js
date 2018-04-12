
$(function () {
    $('#loginBox .colMint').click(function () {
        $('#loginBox').hide()
        $('#registerBox').show()
    })
    $('#registerBox .colMint').click(function () {
        $('#registerBox').hide()
        $('#loginBox').show()
    })

    $('#registerBox button').click(function () {
        $.ajax({
            url:'/api/user/register',
            type:'POST',
            dataType:'json',
            data:{
                userName:$('#registerBox [name="userName"]').val(),
                password:$('#registerBox [name="password"]').val(),
                rePassword:$('#registerBox [name="rePassword"]').val()
            },
            success:function (data) {
                $('#registerBox .colWarning').html(data.message)
                if(data.code === 0){
                    setTimeout(function () {
                        $('#registerBox').hide()
                        $('#loginBox').show()
                    },1000)
                }
            }
        })
    })

    $('#loginBox button').click(function () {
        $.ajax({
            url:'/api/user/login',
            type:'POST',
            data:{
                userName:$('#loginBox [name="userName"]').val(),
                password:$('#loginBox [name="password"]').val()
            },
            dataType:'json',
            success:function (data) {
                console.log(data)
                $('#loginBox .colWarning').html(data.message)
                if(data.code === 0){
                    window.location.reload()
                }
            }
        })
    })

    $('#logoutBtn').click(function () {
        $.ajax({
            url:'/api/user/loginOut',
            success:function () {
                window.location.reload()
            }
        })
    })
})


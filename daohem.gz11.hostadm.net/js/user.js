/* $Id : user.js 4865 2007-01-31 14:04:10Z paulgao $ */

/* *
 * 修改会员信息
 */
function userEdit()
{
  var frm = document.forms['formEdit'];
  var email = frm.elements['email'].value;
  var msg = '';
  var reg = null;
  var passwd_answer = frm.elements['passwd_answer'] ? Utils.trim(frm.elements['passwd_answer'].value) : '';
  var sel_question =  frm.elements['sel_question'] ? Utils.trim(frm.elements['sel_question'].value) : '';

  if (email.length == 0)
  {
    msg += email_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      msg += email_error + '\n';
    }
  }

  if (passwd_answer.length > 0 && sel_question == 0 || document.getElementById('passwd_quesetion') && passwd_answer.length == 0)
  {
    msg += no_select_question + '\n';
  }

  for (i = 7; i < frm.elements.length - 2; i++) // 从第七项开始循环检查是否为必填项
  {
  needinput = document.getElementById(frm.elements[i].name + 'i') ? document.getElementById(frm.elements[i].name + 'i') : '';

  if (needinput != '' && frm.elements[i].value.length == 0)
  {
    msg += '- ' + needinput.innerHTML + msg_blank + '\n';
  }
  }

  if (msg.length > 0)
  {
    layer.alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* 会员修改密码 */
function editPassword()
{
  var frm              = document.forms['formPassword'];
  var old_password     = frm.elements['old_password'].value;
  var new_password     = frm.elements['new_password'].value;
  var confirm_password = frm.elements['comfirm_password'].value;

  var msg = '';
  var reg = null;

  if (old_password.length == 0)
  {
    msg += old_password_empty + '\n';
  }

  if (new_password.length == 0)
  {
    msg += new_password_empty + '\n';
  }

  if (confirm_password.length == 0)
  {
    msg += confirm_password_empty + '\n';
  }

  if (new_password.length > 0 && confirm_password.length > 0)
  {
    if (new_password != confirm_password)
    {
      msg += both_password_error + '\n';
    }
  }

  if (msg.length > 0)
  {
    layer.alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 对会员的留言输入作处理
 */
function submitMsg()
{
  var frm         = document.forms['formMsg'];
  var msg_title   = frm.elements['msg_title'].value;
  var msg_content = frm.elements['msg_content'].value;
  var msg = '';

  if (msg_title.length == 0)
  {
    msg += msg_title_empty + '\n';
  }
  if (msg_content.length == 0)
  {
    msg += msg_content_empty + '\n'
  }

  if (msg_title.length > 200)
  {
    msg += msg_title_limit + '\n';
  }

  if (msg.length > 0)
  {
    layer.alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 会员找回密码时，对输入作处理
 */
function submitPwdInfo()
{
  var frm = document.forms['getPassword'];
  var user_name = frm.elements['user_name'].value;
  var email     = frm.elements['email'].value;

  var errorMsg = '';
  if (user_name.length == 0)
  {
    errorMsg += user_name_empty + '\n';
  }

  if (email.length == 0)
  {
    errorMsg += email_address_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      errorMsg += email_address_error + '\n';
    }
  }

  if (errorMsg.length > 0)
  {
    layer.alert(errorMsg);
    return false;
  }

  return true;
}


function get_pwd_check_phone( phone )
{
  var stype = document.getElementById('type').value;
  var submit_disabled = false;
  if ((phone == ''))
    {
        document.getElementById('phone_notice').innerHTML = '手机号不能为空';
        var submit_disabled = true;
    }
    else if ( !/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(phone) )
    {
        document.getElementById('phone_notice').innerHTML = '无效的手机号码';
        var submit_disabled = true;
    }
  else{
    $.ajax({
     url:'http://daohem.gz11.hostadm.net/js/user.php?act=is_registered',
     type:'get',
     async: false,
     data:'username=' + phone,
     dataType:'text',
     success:function(res){
      //console.log(res);
      if(res == 'true'){
         if(stype==1){

        }else{
          $("#get_code").removeAttr('onclick');
          document.getElementById('phone_notice').innerHTML = '该手机号码还未注册';
          submit_disabled = true;
        }
      }else{
        if(stype==1){
           $("#get_code").removeAttr('onclick');
          document.getElementById('phone_notice').innerHTML = '该手机号码已注册';
          submit_disabled = true;
        }
      }
     }
     });
  }
  
    if ( submit_disabled )
    {get_pwd_check_code
    document.forms['getPassword'].elements['Submit'].disabled = 'disabled';
    // document.getElementById('phone').focus();
        return false;
    }
    else
    {
    $('#get_code').attr('onclick', "send_pwd_code(this);");
    document.forms['getPassword'].elements['Submit'].disabled = '';
    document.getElementById('phone_notice').innerHTML = '<img src="themes/default/images/yes.gif"/*tpa=http://daohem.gz11.hostadm.net/js/themes/default/images/yes.gif*/ align="absmiddle" style="margin-top: 13px;width: 14px;height: 14px;"/>';
    return true;
    }
}

function get_pwd_check_email( email )
{
  var stype = document.getElementById('type').value;
  var submit_disabled = false;
  if ((email == ''))
    {
        document.getElementById('phone_notice').innerHTML = '邮箱不能为空';
        var submit_disabled = true;
    }
     else if ( !/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/.test(email) )
    {
        document.getElementById('phone_notice').innerHTML = '无效的邮箱';
        var submit_disabled = true;
    }
  else{
    $.ajax({
     url:'http://daohem.gz11.hostadm.net/js/user.php?act=is_registered',
     type:'get',
     async: false,
     data:'username=' + email,
     dataType:'text',
     success:function(res){
      //console.log(res);
      if(res == 'true'){
         if(stype==1){

        }else{
          $("#get_code").removeAttr('onclick');
          document.getElementById('phone_notice').innerHTML = '该邮箱还未注册';
          submit_disabled = true;
        }
      }else{
        if(stype==1){
           $("#get_code").removeAttr('onclick');
          document.getElementById('phone_notice').innerHTML = '该邮箱已注册';
          submit_disabled = true;
        }
      }
     }
     });
  }
  
    if ( submit_disabled )
    {get_pwd_check_code
    document.forms['getPassword'].elements['Submit'].disabled = 'disabled';
    // document.getElementById('phone').focus();
        return false;
    }
    else
    {
    $('#get_code').attr('onclick', "send_pwd_code(this);");
    document.forms['getPassword'].elements['Submit'].disabled = '';
    document.getElementById('phone_notice').innerHTML = '<img src="themes/default/images/yes.gif"/*tpa=http://daohem.gz11.hostadm.net/js/themes/default/images/yes.gif*/ align="absmiddle" style="margin-top: 13px;width: 14px;height: 14px;"/>';
    return true;
    }
}

/* *
 * 会员绑定手机，对输入作处理
 */
function submitPhoneInfo()
{ 
  var frm = document.forms['getPassword'];
  var phone = frm.elements['phone'].value;
  //var captcha = frm.elements['captcha'].value;
  var captcha = $('#captcha').val();
  //alert(captcha.length)
  //var phone = $('#phone').val();
  var getp_code = frm.elements['getp_code'].value;

  var errorMsg = '';
 

  if (phone.length == 0)
  {
    errorMsg += '手机不能为空' + '\n';
  }
  else
  {
    if ( ! (Utils.isPhone(phone)))
    {
      errorMsg += '无效的手机号码' + '\n';
    }
  }

  if (captcha.length == 0)
  {
    errorMsg += '验证码不能为空' + '\n';
  }

  if (errorMsg.length > 0)
  {
    layer.alert(errorMsg);
    return false;
  }

  return true;
}

/* *
 * 会员提现验证，对输入作处理
 */
function submitAccountInfo()
{ 
  var frm = document.forms['getPassword'];
  var captcha = $('#captcha').val();
  var getp_code = frm.elements['getp_code'].value;

  var errorMsg = '';

  if (captcha.length == 0)
  {
    errorMsg += '图片验证码不能为空' + '\n';
  }

  if (getp_code.length == 0)
  {
    errorMsg += '验证码不能为空' + '\n';
  }

  if (errorMsg.length > 0)
  {
    layer.alert(errorMsg);
    return false;
  }

  return true;
}

function get_pwd_check_code( code )
{
  var submit_disabled = false;
  if ((code == ''))
    {
        document.getElementById('code_notice').innerHTML = '验证码不能为空';
        var submit_disabled = true;
      //document.getElementById('captcha').focus();
    }
  else{
    $.ajax({
     url:'http://daohem.gz11.hostadm.net/js/user.php?act=get_password_check_captcha',
     type:'get',
     async: false,
     data:'captcha=' + code,
     dataType:'text',
     success:function(msgs){
      if(msgs == 'false'){
        $("#get_code").removeAttr('onclick');
        document.getElementById('code_notice').innerHTML = '验证码不正确。';
        document.getElementById('captcha').value = '';
        submit_disabled = true;
      }
      else if(msgs=='ture'){
        
        return true;
      }
     }
     });
  }
  
    if ( submit_disabled )
    {
    document.forms['getPassword'].elements['Submit'].disabled = 'disabled';
    // document.getElementById('captcha').focus();
        return false;
    }
    else
    {
    $('#get_code').attr('onclick', "send_pwd_code(this);");
    document.forms['getPassword'].elements['Submit'].disabled = '';
    document.getElementById('code_notice').innerHTML = '<img src="themes/default/images/yes.gif"/*tpa=http://daohem.gz11.hostadm.net/js/themes/default/images/yes.gif*/ align="absmiddle" style="margin-top:0px; width: 14px;height: 14px;"/>';
    return true;
    }
}
function get_pwd_check_code2( code )
{
  var submit_disabled = false;
  if ((code == ''))
    {
        document.getElementById('code_notice').innerHTML = '验证码不能为空';
        var submit_disabled = true;
      document.getElementById('captcha').focus();
    }
  else{
    $.ajax({
     url:'http://daohem.gz11.hostadm.net/js/user.php?act=get_password_check_captcha',
     type:'get',
     async: false,
     data:'captcha=' + code,
     dataType:'text',
     success:function(msgs){
      if(msgs == 'false'){
        $("#get_code").removeAttr('onclick');
        document.getElementById('code_notice').innerHTML = '验证码不正确。';
        document.getElementById('captcha').value = '';
        submit_disabled = true;
      }
      else if(msgs=='ture'){
        
        return true;
      }
     }
     });
  }
  
    if ( submit_disabled )
    {
    document.forms['getPassword'].elements['Submit'].disabled = 'disabled';
    // document.getElementById('captcha').focus();
        return false;
    }
    else
    {
    $('#get_code').attr('onclick', "send_pwd_code(this);");
    document.forms['getPassword'].elements['Submit'].disabled = '';
    document.getElementById('code_notice').innerHTML = '<img src="themes/default/images/yes.gif"/*tpa=http://daohem.gz11.hostadm.net/js/themes/default/images/yes.gif*/ align="absmiddle" style="margin-top:0px; width: 14px;height: 14px;"/>';
    return true;
    }
}
function send_pwd_code(_this){
  var captcha = $('#captcha').val();
  var phone = $('#phone').val();
  var rand_key = $('#randKey').val();
  var utype = $('#utype').val();
  var email = $('#email').val();
  if(utype==1){
    if((get_pwd_check_phone(phone) && get_pwd_check_code(captcha))){
      $.ajax({
        url:'http://daohem.gz11.hostadm.net/js/user.php?act=get_password_code',
        type:'get',
        async: false,
         // data:'phone=' + phone,
        data:{'phone':phone, 'rand_key':rand_key, 'utype':utype},
        dataType:'text',
        success:function(msgs){
          if(msgs == 'true'){
            fix_reg_code2(_this);
          }else if(msgs == 'false'){
            $('#get_pwd_code_notice').html('验证失败，请稍后再试！');
          }else if(msgs=='true'){
            return true;
          }else{
            $('#get_pwd_code_notice').html('验证码发送异常，请稍后再试！');
          }
        }
      });
    }
  }else{
    if((get_pwd_check_email(email) && get_pwd_check_code(captcha))){
      $.ajax({
        url:'http://daohem.gz11.hostadm.net/js/user.php?act=get_password_code',
        type:'get',
        async: false,
         // data:'phone=' + phone,
        data:{'email':email, 'rand_key':rand_key, 'utype':utype},
        dataType:'text',
        success:function(msgs){
          if(msgs == 'true'){
            fix_reg_code2(_this);
          }else if(msgs == 'false'){
            $('#get_pwd_code_notice').html('验证失败，请稍后再试！');
          }else if(msgs=='true'){
            return true;
          }else{
            $('#get_pwd_code_notice').html('验证码发送异常，请稍后再试！');
          }
        }
      });
    }
  }
}

function send_pwd_code2(_this){
  //var captcha = $('#captcha').val();
  var t = document.getElementById("select"); 
  var kk=t.options[t.selectedIndex].value;
  if (/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(kk)){
    var utype =1;
    var phone=kk;
  }else{
    var utype =2;
    var email=kk;
  }
  var rand_key = $('#randKey').val();
  if(utype==1){
      $.ajax({
        url:'http://daohem.gz11.hostadm.net/js/user.php?act=get_password_code',
        type:'get',
        async: false,
         // data:'phone=' + phone,
        data:{'phone':phone, 'rand_key':rand_key, 'utype':utype},
        dataType:'text',
        success:function(msgs){
          if(msgs == 'true'){
            fix_reg_code3(_this);
          }else if(msgs == 'false'){
            $('#get_pwd_code_notice').html('验证失败，请稍后再试！');
          }else if(msgs=='true'){
            return true;
          }else{
            $('#get_pwd_code_notice').html('验证码发送异常，请稍后再试！');
          }
        }
      });
  }else{
      $.ajax({
        url:'http://daohem.gz11.hostadm.net/js/user.php?act=get_password_code',
        type:'get',
        async: false,
         // data:'phone=' + phone,
        data:{'email':email, 'rand_key':rand_key, 'utype':utype},
        dataType:'text',
        success:function(msgs){
          if(msgs == 'true'){
            fix_reg_code3(_this);
          }else if(msgs == 'false'){
            $('#get_pwd_code_notice').html('验证失败，请稍后再试！');
          }else if(msgs=='true'){
            return true;
          }else{
            $('#get_pwd_code_notice').html('验证码发送异常，请稍后再试！');
          }
        }
      });
  }
}

//锁定按钮3
function fix_reg_code3(_this){
  $(_this).removeAttr('onclick');
  $(_this).css('backgroundColor', '#CCC');
  var secs = 1;
  var stt  = window.setInterval(function(){
  if(secs==121){
    window.clearInterval(stt);
    $(_this).attr('onclick', "fix_reg_code3(this);");
    $(_this).css('backgroundColor', '#ffa100');
    $(_this).html('获取验证码');
    secs = 1;
  }else{
    $(_this).html((120-secs)+'秒后可重发');
    secs++;
  }
  },1000);
}
//锁定按钮2
function fix_reg_code2(_this){
  $(_this).removeAttr('onclick');
  $(_this).css('backgroundColor', '#CCC');
  var secs = 1;
  var stt  = window.setInterval(function(){
  if(secs==121){
    window.clearInterval(stt);
    $(_this).attr('onclick', "send_pwd_code(this);");
    $(_this).css('backgroundColor', '#ffa100');
    $(_this).html('获取验证码');
    secs = 1;
  }else{
    $(_this).html((120-secs)+'秒后可重发');
    secs++;
  }
  },1000);
}
/* *
 * 会员找回密码时，对输入作处理
 */
function submitPwd()
{
  var frm = document.forms['getPassword2'];
  var password = frm.elements['new_password'].value;
  var confirm_password = frm.elements['confirm_password'].value;

  var errorMsg = '';
  if (password.length == 0)
  {
    errorMsg += new_password_empty + '\n';
  }

  if (confirm_password.length == 0)
  {
    errorMsg += confirm_password_empty + '\n';
  }

  if (confirm_password != password)
  {
    errorMsg += both_password_error + '\n';
  }

  if (errorMsg.length > 0)
  {
    layer.alert(errorMsg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 处理会员提交的缺货登记
 */
function addBooking()
{
  var frm  = document.forms['formBooking'];
  var goods_id = frm.elements['id'].value;
  var rec_id  = frm.elements['rec_id'].value;
  var number  = frm.elements['number'].value;
  var desc  = frm.elements['desc'].value;
  var linkman  = frm.elements['linkman'].value;
  var email  = frm.elements['email'].value;
  var tel  = frm.elements['tel'].value;
  var msg = "";

  if (number.length == 0)
  {
    msg += booking_amount_empty + '\n';
  }
  else
  {
    var reg = /^[0-9]+/;
    if ( ! reg.test(number))
    {
      msg += booking_amount_error + '\n';
    }
  }

  if (desc.length == 0)
  {
    msg += describe_empty + '\n';
  }

  if (linkman.length == 0)
  {
    msg += contact_username_empty + '\n';
  }

  if (email.length == 0)
  {
    msg += email_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      msg += email_error + '\n';
    }
  }

  if (tel.length == 0)
  {
    msg += contact_phone_empty + '\n';
  }

  if (msg.length > 0)
  {
    layer.alert(msg);
    return false;
  }

  return true;
}

/* *
 * 会员登录
 */
function userLogin()
{
  var frm      = document.forms['formLogin'];
  var username = frm.elements['username'].value;
  var password = frm.elements['password'].value;
  var msg = '';

  if (username.length == 0)
  {
    msg += username_empty + '\n';
  }

  if (password.length == 0)
  {
    msg += password_empty + '\n';
  }

  if (msg.length > 0)
  {
    layer.alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

function chkstr(str)
{
  for (var i = 0; i < str.length; i++)
  {
    if (str.charCodeAt(i) < 127 && !str.substr(i,1).match(/^\w+$/ig))
    {
      return false;
    }
  }
  return true;
}

function check_password( password )
{
    if ( password.length < 6 )
    {
        document.getElementById('password_notice').innerHTML = password_shorter;
    }
    else
    {
        document.getElementById('password_notice').innerHTML = '<img src="themes/default/images/yes.gif"/*tpa=http://daohem.gz11.hostadm.net/js/themes/default/images/yes.gif*/ align="absmiddle" style="margin-top:0px;width:14px;height:14px"/>';
    }
}

function check_conform_password( conform_password )
{
    password = document.getElementById('password').value;
    
    if ( conform_password.length < 6 )
    {
        document.getElementById('conform_password_notice').innerHTML = password_shorter;
        return false;
    }
    if ( conform_password != password )
    {
        document.getElementById('conform_password_notice').innerHTML = confirm_password_invalid;
    }
    else
    {
        document.getElementById('conform_password_notice').innerHTML = '<img src="themes/default/images/yes.gif"/*tpa=http://daohem.gz11.hostadm.net/js/themes/default/images/yes.gif*/ align="absmiddle" style="margin-top:0px;width:14px;height:14px"/>';
    }
}

function check_old_password( password )
{
    var uid = document.getElementById('uid').value;
    var submit_disabled = false;
    $.ajax({
      url:'http://daohem.gz11.hostadm.net/js/user.php?act=check_password',
      type:'get',
      async: false,
      //data:'password=' + password,
      data:{'password':password, 'uid':uid},
      dataType:'text',
      success:function(msgs){
        if(msgs == 'false'){
          document.getElementById('old_password_notice').innerHTML = '原密码不正确。';
          submit_disabled = true;
        }
      }
    });
  
    if ( submit_disabled )
    {
    document.forms['getPassword2'].elements['Submit'].disabled = 'disabled';
        return false;
    }
    else
    {
      document.forms['getPassword2'].elements['Submit'].disabled = '';
      document.getElementById('old_password_notice').innerHTML = '<img src="themes/default/images/yes.gif"/*tpa=http://daohem.gz11.hostadm.net/js/themes/default/images/yes.gif*/ align="absmiddle" style="margin-top:0px;width:14px;height:14px"/>';
    }
}

function check_password2( password )
{
    var submit_disabled = false;
  if (password.length < 6)
    {
        document.getElementById('password_notice').innerHTML = '- 登录密码不能少于 6 个字符。';
        submit_disabled = true;
    }
    if ( password.length > 20 )
    {
        document.getElementById('password_notice').innerHTML = '- 登录密码不能大于 20 个字符。';
        submit_disabled = true;
    }
  
    if ( submit_disabled )
    {
    document.forms['getPassword2'].elements['Submit'].disabled = 'disabled';
        return false;
    }
    else
    {
    document.forms['getPassword2'].elements['Submit'].disabled = '';
    document.getElementById('password_notice').innerHTML = '<img src="themes/default/images/yes.gif"/*tpa=http://daohem.gz11.hostadm.net/js/themes/default/images/yes.gif*/ align="absmiddle" style="margin-top:0px;width:14px;height:14px"/>';
    }
}

function check_confirm_password2( conform_password )
{
    var submit_disabled = false;
    password = document.getElementById('new_password').value;
    
    if ( (conform_password.length < 6) || (conform_password == '重复输入密码' ))
    {
        document.getElementById('conform_password_notice').innerHTML = '- 登录密码不能少于 6 个字符。';
        submit_disabled = true;
    }
    if ( conform_password.length > 20 )
    {
        document.getElementById('conform_password_notice').innerHTML = '- 登录密码不能大于 20 个字符。';
        submit_disabled = true;
    }
    if ( conform_password != password )
    {
        document.getElementById('conform_password_notice').innerHTML = '- 两次输入密码不一致';
       submit_disabled = true;
    }
    else
    {
        document.getElementById('conform_password_notice').innerHTML = '<img src="themes/default/images/yes.gif"/*tpa=http://daohem.gz11.hostadm.net/js/themes/default/images/yes.gif*/ align="absmiddle" style="margin-top:0px; width:14px; height:14px;"/>';
    }

    if ( submit_disabled )
    {
      document.forms['getPassword2'].elements['Submit'].disabled = 'disabled';
        return false;
    }
    else
    {
      document.forms['getPassword2'].elements['Submit'].disabled = '';
      document.getElementById('password_notice').innerHTML = '<img src="themes/default/images/yes.gif"/*tpa=http://daohem.gz11.hostadm.net/js/themes/default/images/yes.gif*/ align="absmiddle" style="margin-top:0px;width:14px;height:14px"/>';
    }
}

function is_registered( username )
{
    var submit_disabled = false;
  var unlen = username.replace(/[^\x00-\xff]/g, "**").length;

    if ( username == '' )
    {
        document.getElementById('username_notice').innerHTML = '用户名不能为空';
        var submit_disabled = true;
    }

    if ( !chkstr( username ) )
    {
        document.getElementById('username_notice').innerHTML = msg_un_format;
        var submit_disabled = true;
    }
    if ( unlen < 3 )
    { 
        document.getElementById('username_notice').innerHTML = username_shorter;
        var submit_disabled = true;
    }
    if ( unlen > 14 )
    {
        document.getElementById('username_notice').innerHTML = msg_un_length;
        var submit_disabled = true;
    }
    if ( submit_disabled )
    {
        document.forms['formUser'].elements['Submit'].disabled = 'disabled';
        return false;
    }
    Ajax.call( 'http://daohem.gz11.hostadm.net/js/user.php?act=is_registered', 'username=' + username, registed_callback , 'GET', 'TEXT', true, true );
}



function registed_callback(result)
{
  if ( result == "true" )
  {
    document.getElementById('username_notice').innerHTML = msg_can_rg;
    document.forms['formUser'].elements['Submit'].disabled = '';
  }
  else
  {
    document.getElementById('username_notice').innerHTML = '用户名已经存在,请重新输入';
    document.forms['formUser'].elements['Submit'].disabled = 'disabled';
  }
}

function checkEmail(email)
{
  var submit_disabled = false;
  
  if (email == '')
  {
    document.getElementById('email_notice').innerHTML = msg_email_blank;
    submit_disabled = true;
  }
  else if (!Utils.isEmail(email))
  {
    document.getElementById('email_notice').innerHTML = msg_email_format;
    submit_disabled = true;
  }
 
  if( submit_disabled )
  {
    document.forms['formUser'].elements['Submit'].disabled = 'disabled';
    return false;
  }
  Ajax.call( 'http://daohem.gz11.hostadm.net/js/user.php?act=check_email', 'email=' + email, check_email_callback , 'GET', 'TEXT', true, true );
}

function check_email_callback(result)
{
  if ( result == 'ok' )
  {
    document.getElementById('email_notice').innerHTML = msg_can_rg;
    document.forms['formUser'].elements['Submit'].disabled = '';
  }
  else
  {
    document.getElementById('email_notice').innerHTML = msg_email_registered;
    document.forms['formUser'].elements['Submit'].disabled = 'disabled';
  }
}

/* *
 * 处理注册用户
 */
function register()
{
  var frm  = document.forms['formUser'];
  var username  = Utils.trim(frm.elements['username'].value);
  var email  = frm.elements['email'].value;
  var password  = Utils.trim(frm.elements['password'].value);
  var confirm_password = Utils.trim(frm.elements['confirm_password'].value);
  var checked_agreement = frm.elements['agreement'].checked;
  var msn = frm.elements['extend_field1'] ? Utils.trim(frm.elements['extend_field1'].value) : '';
  var qq = frm.elements['extend_field2'] ? Utils.trim(frm.elements['extend_field2'].value) : '';
  var home_phone = frm.elements['extend_field4'] ? Utils.trim(frm.elements['extend_field4'].value) : '';
  var office_phone = frm.elements['extend_field3'] ? Utils.trim(frm.elements['extend_field3'].value) : '';
  var mobile_phone = frm.elements['extend_field5'] ? Utils.trim(frm.elements['extend_field5'].value) : '';
  var passwd_answer = frm.elements['passwd_answer'] ? Utils.trim(frm.elements['passwd_answer'].value) : '';
  var sel_question =  frm.elements['sel_question'] ? Utils.trim(frm.elements['sel_question'].value) : '';


  var msg = "";
  // 检查输入
  var msg = '';
  if (username.length == 0)
  {
    msg += username_empty + '\n';
  }
  else if (username.match(/^\s*$|^c:\\con\\con$|[%,\'\*\"\s\t\<\>\&\\]/))
  {
    msg += username_invalid + '\n';
  }
  else if (username.length < 3)
  {
    //msg += username_shorter + '\n';
  }

  if (email.length == 0)
  {
    msg += email_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      msg += email_invalid + '\n';
    }
  }
  if (password.length == 0)
  {
    msg += password_empty + '\n';
  }
  else if (password.length < 6)
  {
    msg += password_shorter + '\n';
  }
  if (/ /.test(password) == true)
  {
  msg += passwd_balnk + '\n';
  }
  if (confirm_password != password )
  {
    msg += confirm_password_invalid + '\n';
  }
  if(checked_agreement != true)
  {
    msg += agreement + '\n';
  }

  if (msn.length > 0 && (!Utils.isEmail(msn)))
  {
    msg += msn_invalid + '\n';
  }

  if (qq.length > 0 && (!Utils.isNumber(qq)))
  {
    msg += qq_invalid + '\n';
  }

  if (office_phone.length>0)
  {
    var reg = /^[\d|\-|\s]+$/;
    if (!reg.test(office_phone))
    {
      msg += office_phone_invalid + '\n';
    }
  }
  if (home_phone.length>0)
  {
    var reg = /^[\d|\-|\s]+$/;

    if (!reg.test(home_phone))
    {
      msg += home_phone_invalid + '\n';
    }
  }
  if (mobile_phone.length>0)
  {
    var reg = /^[\d|\-|\s]+$/;
    if (!reg.test(mobile_phone))
    {
      msg += mobile_phone_invalid + '\n';
    }
  }
  if (passwd_answer.length > 0 && sel_question == 0 || document.getElementById('passwd_quesetion') && passwd_answer.length == 0)
  {
    msg += no_select_question + '\n';
  }

  for (i = 4; i < frm.elements.length - 4; i++) // 从第五项开始循环检查是否为必填项
  {
  needinput = document.getElementById(frm.elements[i].name + 'i') ? document.getElementById(frm.elements[i].name + 'i') : '';

  if (needinput != '' && frm.elements[i].value.length == 0)
  {
    msg += '- ' + needinput.innerHTML + msg_blank + '\n';
  }
  }

  if (msg.length > 0)
  {
    layer.alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 用户中心订单保存地址信息
 */
function saveOrderAddress(id)
{
  var frm           = document.forms['formAddress'];
  var consignee     = frm.elements['consignee'].value;
  var email         = frm.elements['email'].value;
  var address       = frm.elements['address'].value;
  var zipcode       = frm.elements['zipcode'].value;
  var tel           = frm.elements['tel'].value;
  var mobile        = frm.elements['mobile'].value;
  var sign_building = frm.elements['sign_building'].value;
  var best_time     = frm.elements['best_time'].value;

  if (id == 0)
  {
    layer.alert(current_ss_not_unshipped);
    return false;
  }
  var msg = '';
  if (address.length == 0)
  {
    msg += address_name_not_null + "\n";
  }
  if (consignee.length == 0)
  {
    msg += consignee_not_null + "\n";
  }

  if (msg.length > 0)
  {
    layer.alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 会员余额申请
 */
function submitSurplus()
{
  
  var frm            = document.forms['formSurplus'];
  var surplus_type   = frm.elements['surplus_type'].value;
  var surplus_amount = frm.elements['amount'].value;
  var process_notic  = frm.elements['user_note'].value;
  var payment_id     = 0;
  var msg = '';

  if (surplus_amount.length == 0 )
  {
    msg += surplus_amount_empty + "\n";
  }
  else
  {
    var reg = /^[\.0-9]+/;
    if ( ! reg.test(surplus_amount))
    {
      msg += surplus_amount_error + '\n';
    }
  }

  if (process_notic.length == 0)
  {
    msg += process_desc + "\n";
  }

  if (msg.length > 0)
  {
    layer.alert(msg);
    return false;
  }

  if (surplus_type == 0)
  {
    for (i = 0; i < frm.elements.length ; i ++)
    {
      if (frm.elements[i].name=="payment_id" && frm.elements[i].checked)
      {
        payment_id = frm.elements[i].value;
        break;
      }
    }

    if (payment_id == 0)
    {
      layer.alert(payment_empty);
      return false;
    }
  }

  return true;
}

/* *
 * 会员提现申请
 */
function submitSurplus2()
{
  
  var frm                 = document.forms['formSurplus'];
  var surplus_type        = frm.elements['surplus_type'].value;
  var surplus_amount      = frm.elements['amount'].value;
  var surplus_amount_type = frm.elements['amount_type'].value;
  var surplus_amount_num  = frm.elements['amount_num'].value;
  var surplus_amount_name = frm.elements['amount_name'].value;
  //var process_notic  = frm.elements['user_note'].value;
  var payment_id     = 0;
  var msg = '';

  if (surplus_amount.length == 0 )
  {
    msg += surplus_amount_empty + "\n";
  }
  else
  {
    var reg = /^[\.0-9]+/;
    if ( ! reg.test(surplus_amount))
    {
      msg += surplus_amount_error + '\n';
    }
  }

  if (surplus_amount_type.length == 0)
  {
    msg += '填写对应银行或者支付宝、财付通' + "\n";
  }

if (surplus_amount_num.length == 0)
  {
    msg += '填写银行账号或者支付宝、财付通账号' + "\n";
  }
if (surplus_amount_name.length == 0)
  {
    msg += '填写开户姓名' + "\n";
  }
  if (msg.length > 0)
  {
    layer.alert(msg);
    return false;
  }

  if (surplus_type == 0)
  {
    for (i = 0; i < frm.elements.length ; i ++)
    {
      if (frm.elements[i].name=="payment_id" && frm.elements[i].checked)
      {
        payment_id = frm.elements[i].value;
        break;
      }
    }

    if (payment_id == 0)
    {
      layer.alert(payment_empty);
      return false;
    }
  }

  return true;
}

/* *
 *  处理用户添加一个红包
 */
function addBonus()
{
  var frm      = document.forms['addBouns'];
  var bonus_sn = frm.elements['bonus_sn'].value;

  if (bonus_sn.length == 0)
  {
    layer.alert(bonus_sn_empty);
    return false;
  }
  else
  {
    var reg = /^[0-9]{10}$/;
    if ( ! reg.test(bonus_sn))
    {
      layer.alert(bonus_sn_error);
      return false;
    }
  }

  return true;
}

/* *
 *  合并订单检查
 */
function mergeOrder()
{
  if (!confirm(confirm_merge))
  {
    return false;
  }

  var frm        = document.forms['formOrder'];
  var from_order = frm.elements['from_order'].value;
  var to_order   = frm.elements['to_order'].value;
  var msg = '';

  if (from_order == 0)
  {
    msg += from_order_empty + '\n';
  }
  if (to_order == 0)
  {
    msg += to_order_empty + '\n';
  }
  else if (to_order == from_order)
  {
    msg += order_same + '\n';
  }
  if (msg.length > 0)
  {
    layer.alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 订单中的商品返回购物车
 * @param       int     orderId     订单号
 */
function returnToCart(orderId)
{
  Ajax.call('http://daohem.gz11.hostadm.net/js/user.php?act=return_to_cart', 'order_id=' + orderId, returnToCartResponse, 'POST', 'JSON');
}

function returnToCartResponse(result)
{
  layer.alert(result.message);
}

/* *
 * 检测密码强度
 * @param       string     pwd     密码
 */
function checkIntensity(pwd)
{
  var Mcolor = "#FFF",Lcolor = "#FFF",Hcolor = "#FFF";
  var m=0;

  var Modes = 0;
  for (i=0; i<pwd.length; i++)
  {
    var charType = 0;
    var t = pwd.charCodeAt(i);
    if (t>=48 && t <=57)
    {
      charType = 1;
    }
    else if (t>=65 && t <=90)
    {
      charType = 2;
    }
    else if (t>=97 && t <=122)
      charType = 4;
    else
      charType = 4;
    Modes |= charType;
  }

  for (i=0;i<4;i++)
  {
    if (Modes & 1) m++;
      Modes>>>=1;
  }

  if (pwd.length<=4)
  {
    m = 1;
  }

  switch(m)
  {
    case 1 :
      Lcolor = "2px solid red";
      Mcolor = Hcolor = "2px solid #DADADA";
    break;
    case 2 :
      Mcolor = "2px solid #f90";
      Lcolor = Hcolor = "2px solid #DADADA";
    break;
    case 3 :
      Hcolor = "2px solid #3c0";
      Lcolor = Mcolor = "2px solid #DADADA";
    break;
    case 4 :
      Hcolor = "2px solid #3c0";
      Lcolor = Mcolor = "2px solid #DADADA";
    break;
    default :
      Hcolor = Mcolor = Lcolor = "";
    break;
  }
  if (document.getElementById("pwd_lower"))
  {
    document.getElementById("pwd_lower").style.borderBottom  = Lcolor;
    document.getElementById("pwd_middle").style.borderBottom = Mcolor;
    document.getElementById("pwd_high").style.borderBottom   = Hcolor;
  }


}

function changeType(obj)
{
  if (obj.getAttribute("min") && document.getElementById("ECS_AMOUNT"))
  {
    document.getElementById("ECS_AMOUNT").disabled = false;
    document.getElementById("ECS_AMOUNT").value = obj.getAttribute("min");
    if (document.getElementById("ECS_NOTICE") && obj.getAttribute("to") && obj.getAttribute('fee'))
    {
      var fee = parseInt(obj.getAttribute("fee"));
      var to = parseInt(obj.getAttribute("to"));
      if (fee < 0)
      {
        to = to + fee * 2;
      }
      document.getElementById("ECS_NOTICE").innerHTML = notice_result + to;
    }
  }
}

function calResult()
{
  var amount = document.getElementById("ECS_AMOUNT").value;
  var notice = document.getElementById("ECS_NOTICE");

  reg = /^\d+$/;
  if (!reg.test(amount))
  {
    notice.innerHTML = notice_not_int;
    return;
  }
  amount = parseInt(amount);
  var frm = document.forms['transform'];
  for(i=0; i < frm.elements['type'].length; i++)
  {
    if (frm.elements['type'][i].checked)
    {
      var min = parseInt(frm.elements['type'][i].getAttribute("min"));
      var to = parseInt(frm.elements['type'][i].getAttribute("to"));
      var fee = parseInt(frm.elements['type'][i].getAttribute("fee"));
      var result = 0;
      if (amount < min)
      {
        notice.innerHTML = notice_overflow + min;
        return;
      }

      if (fee > 0)
      {
        result = (amount - fee) * to / (min -fee);
      }
      else
      {
        //result = (amount + fee* min /(to+fee)) * (to + fee) / min ;
        result = amount * (to + fee) / min + fee;
      }

      notice.innerHTML = notice_result + parseInt(result + 0.5);
    }
  }
}

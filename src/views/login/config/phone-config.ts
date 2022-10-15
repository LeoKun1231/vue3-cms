export const rules = {
  num: [
    {
      required: true,
      message: '手机账号不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{10,}$/,
      message: '请输入正确的手机账号',
      trigger: 'blur'
    }
  ],
  verificationCode: [
    {
      required: true,
      message: '验证码不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{6}$/,
      message: '请输入6位数正确的验证码',
      trigger: 'blur'
    }
  ]
}

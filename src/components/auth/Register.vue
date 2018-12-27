<template>
    <div class ="login-form">
      <div class="login-border">
        <h2>Register</h2>
          <div class="login-width">
            <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="120px" class="demo-ruleForm1" :label-position="labelPosition">
              <el-form-item label="Username" prop="username">
                  <el-input v-model="ruleForm1.username" placeholder="username"></el-input>
              </el-form-item>
              <el-form-item label="Email" prop="email">
                  <el-input v-model="ruleForm1.email" placeholder="you@example.com"></el-input>
              </el-form-item>
              <el-form-item label="Password" prop="pass">
                  <el-input type="password" v-model="ruleForm1.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Confirm" prop="checkPass">
                  <el-input type="password" v-model="ruleForm1.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="success" @click="submitForm('ruleForm1')">Sing Up</el-button>
              </el-form-item>
            </el-form>
          </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'register',
    props: {
    dataSuccessMessage: {
      type: String,
    }
  }, 
    data() {
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else {
          if (this.ruleForm1.checkPass !== '') {
            callback();
          }
          callback();
        }
      };
            var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password again'));
        } else if (value !== this.ruleForm1.pass) {
          callback(new Error('The inputs don\'t match!'));
        } else {
          callback();
        }
      };
      return {
        labelPosition: 'top',
        ruleForm1: {
          username:'',  
          email: '',
          pass: '',
          checkPass:''
        },
        rules1: {
          username: [
            { required: true, message: 'Please input Username', trigger: 'blur' }  
          ],
          email: [
            { required: true, message: 'Please input Email', trigger: 'blur' },
            {type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change']}
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
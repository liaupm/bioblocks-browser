<template>
    <div class ="login-form">
      <div class="login-border">
        <h2>Login</h2>
        <div class="login-width">
        <el-form :model="ruleForm" status-icon :rules="rules3" ref="ruleForm" label-width="120px" class="demo-ruleForm" :label-position="labelPosition">
            <el-form-item label="Username or Email " prop="name">
                <el-input v-model="ruleForm.name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item>
                <el-button type="success" @click="submitForm('ruleForm')">Sing In</el-button>
            </el-form-item>
        </el-form>
        </div>
      </div>
      <div class="form-log-reg">
        <a><router-link :to="{ name: 'register' }">Create an account</router-link></a>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'login',
    props: {
    dataSuccessMessage: {
      type: String,
    }
  },
    data() {
        var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else{
          callback();
        }
      };
      return {
        labelPosition: 'top',
        ruleForm: {
          name: '',
          pass: ''
        },
        rules3: {
          name: [
            { required: true, message: 'Please input Username or Email', trigger: 'blur' }  
          ],
          pass: [
            { validator: validatePass3, trigger: 'blur' }
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
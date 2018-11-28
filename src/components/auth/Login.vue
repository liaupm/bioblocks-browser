<template>
    <div class ="login-form">
        <h2>Login</h2>
        
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" :label-position="labelPosition">
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
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        labelPosition: 'top',
        ruleForm: {
          name: '',
          pass: ''
        },
        rules: {
          name: [
            { message: 'Please input Username or Email', trigger: 'blur' }  
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
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
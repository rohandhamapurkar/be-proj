<template>
<div>
  <h3>YOUR AUTHENTICATOR CODE IS</h3>
  <h1>{{otp}}</h1>
  <span>TOKEN I/P</span>  <input v-model="token"></input>
  <button @click="submit">VERIFY</button>
</div>
</template>

<script>
import otplib from 'otplib';
import axios from 'axios';
otplib.authenticator.options = {
      step: 5
}
export default {
  name: 'HelloWorld',
  data () {
    return {
      otp: 'TEST',
      secret:"",
      token:""
    }
  },
  created(){
    let that = this;

    axios.get('https://beproject.tk/auth/v0.1/otp',{},)
    .then(function (response) {
        //  console.log(response);
      console.log(response.data)
      that.secret = response.data.secret;
      that.repeat();
    })
    .catch(function (error) {
        alert(error);
        console.error(error);
    });
    

  },
  methods: {
    repeat: function(){
      let that = this;
      that.otp = otplib.authenticator.generate(that.secret);
      setInterval(function(){
        that.otp = otplib.authenticator.generate(that.secret);
      },5000)
    },
    submit: function(){
      axios.post('https://beproject.tk/auth/v0.1/verify',{token:this.token,secret:this.secret})
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
            alert(error);
            console.error(error);
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

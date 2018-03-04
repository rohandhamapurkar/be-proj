<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login Form</v-toolbar-title>
                <v-spacer></v-spacer>
                <h3 class="link" @click="updateRoute('/adminsignup')">Admin SignUp?</h3>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-text-field prepend-icon="person" name="email" label="Email" :rules="emailRules" type="email" v-model="email"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" v-model="password" id="password" type="password" :rules="passwordRules" :append-icon="e1 ? 'visibility' :'visibility_off'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'"></v-text-field>               
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="updateRoute('/signup')" color="cyan darken-3">SignUp</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="clear" color="error">clear</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" :disabled="!valid" @click="submit">Login</v-btn>
                <v-spacer></v-spacer> 
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
    import http from '@/Services/http';
    import router from '../router';
    export default {
        name: 'login',
        data() {
            return {
                valid: true,
                e1: true,
                email: '',
                password: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],
                passwordRules: [
                    (v) => !!v || 'Password is required',
                    
                           
                    (v) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/.test(v) || 'Password Must be atleast 8 char, 1 lowercase, 1 Uppercase char and 1 number'
                ],
            }
        },
        methods: {
            async submit() {
                if (this.$refs.form.validate()) {
                    let result = await http.login({id:this.email,password:this.password});
                    if(result.ok) {
                        this.$store.commit('auth', result.token);
                        this.updateRoute('/mainapp/profile');
                    } else {
                        alert("Invalid username or password");
                    }
                }
            },
            clear() {
                this.$refs.form.reset()
            },
            updateRoute(path) {
                router.replace(path);
            }
        }
    }
</script>

<style scoped>
    .link {
        cursor: pointer
    }
</style>
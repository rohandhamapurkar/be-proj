<template>
    <div class="login">
        <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
                <v-flex xs12 sm3 md3>
                </v-flex>
                <v-flex xs12 sm6 md6>
                    <img class="logo" src="../assets/logo.png">
                    <v-form v-model="valid" ref="form" lazy-validation>
                        <v-text-field label="Username" v-model="username" required></v-text-field>
                        <v-text-field label="Password" type="password" v-model="password" :rules="passwordRules" required></v-text-field>
                        <v-btn @click="submit" color="primary" :disabled="!valid">
                            submit
                        </v-btn>
                        <v-btn @click="clear" color="error">clear</v-btn>
                    </v-form>
                </v-flex>
                <v-flex xs12 sm3 md3>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import http from '@/Services/http';
    import router from '../router';
    export default {
        name: 'login',
        data() {
            return {
                valid: true,
                username: '',
                password: '',
                passwordRules: [
                    (v) => !!v || 'Password is required',
                    (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(v) || 'Password Must be atleast 8 char, 1 lowercase, 1 Uppercase char and 1 number'
                ],
            }
        },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    console.log('login done', this.name, this.email);
                }
            },
            clear() {
                this.$refs.form.reset()
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
    align: 'center';
    height: 250px;
  }
</style>

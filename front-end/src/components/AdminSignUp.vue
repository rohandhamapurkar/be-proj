<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <br>
                <h1 class="text-center">Developer Registration</h1><br>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-form v-model="valid" ref="form">
                                <v-layout justify-space-between>
                                    <v-flex xs5>
                                        <v-text-field label="First Name" id="firstName" v-model="firstName" :rules="nameRules" type="text" required>
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-text-field label="Last Name" id="lastName" v-model="lastName" :rules="nameRules" type="text" required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row justify-space-between>
                                    <v-flex xs5>
                                        <v-text-field label="Email" id="email" v-model="email" :rules="emailRules" type="email" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-text-field label="Mobile Number" id="mobileNumber" v-model="mobileNumber" :rules="mobileNumberRules" type="number" required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field label="Password" id="password" v-model="password" :rules="passwordRules"  :append-icon="e1 ? 'visibility' :'visibility_off'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'" required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field label="Confirm Password" id="confirmPassword" v-model="confirmPassword"  :append-icon="e2 ? 'visibility' :'visibility_off'" :append-icon-cb="() => (e2 = !e2)" :type="e2 ? 'password' : 'text'" required :rules="confirmPasswordRules"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="submit" color="primary" :disabled="!valid">SignUp</v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="clear" color="error">Clear</v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="updateRoute('/')" color="cyan darken-3">Back</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    import router from '../router';
    import http from '@/Services/http';
    export default {
        data: () => ({
            valid: true,
            e1: true,
            e2: true,
            firstName: '',
            lastName: '',
            email: '',
            mobileNumber: '',
            password: '',
            confirmPassword: '',
            nameRules: [
                (v) => !!v || 'Name is required',
                (v) => v && v.length <= 12 || 'Name must be less than 10 characters'
            ],
            passwordRules: [
                (v) => !!v || 'Password is required',
                (v) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/.test(v) || 'Password Must be atleast 8 char, 1 lowercase, 1 Uppercase char and 1 number'
            ],
            confirmPasswordRules: [
                (v) => {
                    if (v == password.value && password.value != '') {
                        return true;
                    } else {
                        return 'Passwords do not match'
                    }
                },
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            mobileNumberRules: [
                v => !!v || 'Number is required',
                v => /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(v) || 'Number must be valid'
            ]
        }),
        methods: {
            async submit() {

                let admin = {
                    id: this.email,
                    password: this.password,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    mobileNumber: this.mobileNumber
                }

                let result = await http.signupAdmin(admin);
                if(result.ok) {
                    alert('Created Developer Account Login in to continue')
                    router.replace('/')
                } else {
                    alert('Could not Created Developer Account try again')
                    this.clear();
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

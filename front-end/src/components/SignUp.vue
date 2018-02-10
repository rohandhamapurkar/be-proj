<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <br>
                <h1 class="text-center">User Registration</h1><br>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-form v-model="valid" ref="form">
                                <v-layout justify-space-between>
                                    <v-flex xs5>
                                        <v-text-field name="firstName" label="First Name" id="firstName" v-model="firstName" :rules="nameRules" type="text" required>
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-text-field name="lastName" label="Last Name" id="lastName" v-model="lastName" :rules="nameRules" type="text" required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field name="username" label="Username" id="username" v-model="username" type="text" required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row justify-space-between>
                                    <v-flex xs5>
                                        <v-text-field name="email" label="Email" id="email" v-model="email" :rules="emailRules" type="email" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-text-field name="mobileNumber" label="Mobile Number" id="mobileNumber" v-model="mobileNumber" type="text" required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field name="password" label="Password" id="password" v-model="password" :rules="passwordRules" type="password" required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field name="confirmPassword" label="Confirm Password" id="confirmPassword" v-model="confirmPassword" type="password" required :rules="[comparePasswords]"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <h3>Upload image for embedded key</h3>
                                </v-layout>
                                <v-layout row>
                                    <v-btn name="uploadImage">Upload Image</v-btn>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-checkbox label="Upload later?" v-model="checkbox" :rules="[v => !!v || 'You must check to submit!']" required></v-checkbox>
                                    </v-flex>
                                </v-layout>
                                <v-btn type="submit" @click="submit" color="primary" :disabled="!valid">Sign Up</v-btn>
                                <v-btn @click="clear" color="error">Clear</v-btn>
                            </v-form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    export default {
        data: () => ({
            valid: true,
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            mobileNumber: '',
            password: '',
            confirmPassword: '',
            uploadImage: '',
            nameRules: [
                (v) => !!v || 'Name is required',
                (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
            ],
            passwordRules: [
                (v) => !!v || 'Password is required',
                (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(v) || 'Password Must be atleast 8 char, 1 lowercase, 1 Uppercase char and 1 number'
            ],
            checkbox: false
        }),
        computed: {
            comparePasswords() {
                return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
            }
        },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    // Native form submission is not yet supported
                    //          axios.post('/api/submit', {
                    //            name: this.name,
                    //            email: this.email,
                    //            select: this.select,
                    //            checkbox: this.checkbox
                    //          })
                }
            },
            clear() {
                this.$refs.form.reset()
            }
        }
    }
</script>


<style>
    
</style>

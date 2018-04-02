<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm8 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <h3>Name</h3>
                            <v-form v-model="nameValid">
                                <v-layout>
                                    <v-flex>
                                        <v-text-field :disabled="editName" label="First Name" id="firstName" v-model="firstName" :rules="nameRules" type="text" required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex>
                                        <v-text-field :disabled="editName" label="Last Name" id="lastName" v-model="lastName" :rules="nameRules" type="text" required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-form>
                            <v-btn @click="editFields(1)" color="accent" v-if="editName">Edit</v-btn>
                            <v-btn @click="editFields(2)" color="error" v-else>Cancel</v-btn>
                            <v-btn @click="updateFields(1)" color="primary" :disabled="!nameValid || editName">Update</v-btn>
                        </v-container>
                    </v-card-text>
                </v-card>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <h3>API Key</h3>
                            <v-form>
                                <v-layout justify-space-between>
                                    <v-flex>
                                        <v-text-field type="text" id="key" :value="apiKey" disabled></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-form>
                            <v-btn @click="generateNewApiKey" color="accent">Refresh</v-btn>
                        </v-container>
                    </v-card-text>
                </v-card>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <h3>Contact Details</h3>
                            <v-form v-model="contactValid">
                                <v-layout justify-space-between>
                                    <v-flex>
                                        <v-text-field :disabled="true" label="Email" v-model="email" type="email"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout justify-space-between>
                                    <v-flex>
                                        <v-text-field :disabled="editContact" label="Mobile Number" id="mobileNumber" v-model="mobileNumber" :rules="mobileNumberRules" type="number" required></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-form>
                            <v-btn @click="editFields(3)" color="accent" v-if="editContact">Edit</v-btn>
                            <v-btn @click="editFields(4)" color="error" v-else>Cancel</v-btn>
                            <v-btn @click="updateFields(2)" color="primary" :disabled="!contactValid || editContact">Update</v-btn>
                        </v-container>
                    </v-card-text>
                </v-card>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <h3>Password</h3>
                            <v-form v-model="passwordValid">
                                <v-layout justify-space-between>
                                    <v-flex>
                                        <v-text-field :disabled="editPassword" label="Password" id="password" v-model="password" :rules="passwordRules" type="password" required></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-form>
                            <v-btn @click="editFields(5)" color="accent" v-if="editPassword">Edit</v-btn>
                            <v-btn @click="editFields(6)" color="error" v-else>Cancel</v-btn>
                            <v-btn @click="updateFields(3)" color="primary" :disabled="!passwordValid || editPassword">Update</v-btn>
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
            editName: true,
            nameValid: true,
            contactValid: true,
            domainValid: true,
            passwordValid: true,
            editDomain: true,
            editContact: true,
            editPassword: true,
            valid: true,
            apiKey:"",
            temp: [],
            newInput: false,
            domainName: '',
            firstName: '',
            lastName: '',
            email: '',
            mobileNumber: '',
            password: '',
            dialog: false,
            nameRules: [
                (v) => !!v || 'Name is required',
                (v) => v && v.length <= 12 || 'Name must be less than 12 characters'
            ],
            passwordRules: [
                (v) => !!v || 'Password is required',
                (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(v) || 'Password Must be atleast 8 char, 1 lowercase, 1 Uppercase char and 1 number'
            ],
            mobileNumberRules: [
                v => !!v || 'Number is required',
                v => /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(v) || 'Number must be valid'
            ],
        }),
        created() {
            this.$emit('updateTitle', 'My Profile')
            if (this.$store.getters.auth != null) {
                this.init();
            } else {
                this.updateRoute('/');
            }
        },

        methods: {
            async init() {
                let result = Object.assign(await http.getAdminProfile());
                if (result.ok) {
                    this.firstName = result.profile.firstName;
                    this.lastName = result.profile.lastName;
                    this.domainName = result.profile.domainName;
                    this.editDomain = true
                    this.email = result.profile.id;
                    this.mobileNumber = result.profile.mobileNumber;
                    this.password = '';
                    this.apiKey = result.profile.apiKey;
                    this.editName = true;
                    this.editContact = true;
                    this.editPassword = true;
                } else {
                    alert('Something went wrong please refresh the page');
                }
            },
            async generateNewApiKey(){
                let result = await http.generateNewApiKey();
                if(result.ok){
                    this.apiKey = result.apiKey;
                } else {
                    alert(result.message)
                }
            },
            editFields(choice) {

                switch (choice) {
                    case 1:
                        this.editName = false;
                        this.temp[0] = this.firstName;
                        this.temp[1] = this.lastName;
                        break;
                    case 2:
                        this.editName = true;
                        this.firstName = this.temp[0];
                        this.lastName = this.temp[1];
                        break;
                    case 3:
                        this.editContact = false;
                        this.temp[2] = this.mobileNumber;
                        break;
                    case 4:
                        this.editContact = true;
                        this.mobileNumber = this.temp[2];
                        break;
                    case 5:
                        this.editPassword = false;
                        this.temp[3] = this.password;
                        break;
                    case 6:
                        this.editPassword = true;
                        this.password = this.temp[3];
                        break;
                    case 7:
                        this.editDomain = false;
                        this.temp[4] = this.domainName;
                        break;
                    case 8:
                        this.editDomain = true;
                        this.domainName = this.temp[4];
                        break;
                }
            },
            async updateFields(choice) {
                let result;
                switch (choice) {
                    case 1:
                        result = await http.updateAdminProfile({
                            firstName: this.firstName,
                            lastName: this.lastName
                        });
                        if (result.ok) {
                            this.init()
                        } else {
                            alert(result.message);
                        }
                        break;
                    case 2:
                        result = await http.updateAdminProfile({
                            mobileNumber: this.mobileNumber
                        });
                        if (result.ok) {
                            this.init()
                        } else {
                            alert(result.message);
                        }
                        break;
                    case 3:
                        result = await http.updateAdminProfile({
                            password: this.password,
                        });
                        if (result.ok) {
                            this.init()
                        } else {
                            alert(result.message);
                        }
                        break;
                    case 4:
                        result = await http.updateAdminProfile({
                            domainName: this.domainName,
                        });
                        console.log(result);
                        if (result.ok) {
                            this.init()
                        } else {
                            alert(result.message);
                        }
                        break;
                }
            }
        }
    }
</script>

<style>
#key {
    text-align: center;
}
</style>

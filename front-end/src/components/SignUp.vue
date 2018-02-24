<template>
    <v-container>
        <v-layout v-if="!displayGrid">
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
                                        <v-text-field name="mobileNumber" label="Mobile Number" id="mobileNumber" v-model="mobileNumber" :rules="mobileNumberRules" type="number" required></v-text-field>
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
                                    <input type="file"  accept="image/x-png,image/gif,image/jpeg" name="uploadImage" value="Upload Image"/>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-checkbox label="Upload later?" v-model="checkbox" :rules="[checkIfImageIsAdded]"></v-checkbox>
                                    </v-flex>
                                </v-layout>
                                <v-btn @click="updateView" color="primary" :disabled="!valid">Next</v-btn>
                                <v-btn @click="clear" color="error">Clear</v-btn>
                                <v-btn @click="updateRoute('/')" color="cyan darken-3">Login</v-btn>
                            </v-form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout v-else>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-container fluid v-bind="{ [`grid-list-${size}`]: true }">
                        <h1>Select any 2 category images</h1>
                        <v-layout row wrap>
                            <v-flex xs4 v-for="n in 9" :key="n">
                                <v-card flat tile v-bind:class="{redBorderClass: imageClassName[n]}">
                                    <v-card-media @click="updateImageClass(n)" :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`" height="150px">
                                    </v-card-media>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
                <v-card>
                    <v-container fluid v-bind="{ [`grid-list-${size}`]: true }">
                        <h1>Select any 2 Colors to tint the image</h1>
                        <v-layout row wrap>
                            <v-flex xs4>
                                <v-card flat tile v-bind:class="{blackBorderClass: colorClassName[1], red:true}">
                                    <v-card-media @click="updateColorClass(1)" height="150px">
                                    </v-card-media>
                                </v-card>
                            </v-flex>
                            <v-flex xs4>
                                <v-card flat tile  v-bind:class="{blackBorderClass: colorClassName[2], blue:true}">
                                    <v-card-media @click="updateColorClass(2)" height="150px">
                                    </v-card-media>
                                </v-card>
                            </v-flex>
                            <v-flex xs4>
                                <v-card flat tile  v-bind:class="{blackBorderClass: colorClassName[3], green:true}">
                                    <v-card-media @click="updateColorClass(3)" height="150px">
                                    </v-card-media>
                                </v-card>
                            </v-flex>
                            <v-flex xs4>
                                <v-card flat tile  v-bind:class="{blackBorderClass: colorClassName[4], yellow:true}">
                                    <v-card-media @click="updateColorClass(4)" height="150px">
                                    </v-card-media>
                                </v-card>
                            </v-flex>
                            <v-flex xs4>
                                <v-card flat tile  v-bind:class="{blackBorderClass: colorClassName[5], pink:true}">
                                    <v-card-media @click="updateColorClass(5)" height="150px">
                                    </v-card-media>
                                </v-card>
                            </v-flex>
                            <v-flex xs4>
                                <v-card flat tile  v-bind:class="{blackBorderClass: colorClassName[6], purple:true}">
                                    <v-card-media @click="updateColorClass(6)" height="150px">
                                    </v-card-media>
                                </v-card>
                            </v-flex>
                            <v-flex xs4>
                                <v-card flat tile  v-bind:class="{blackBorderClass: colorClassName[7], brown:true}">
                                    <v-card-media @click="updateColorClass(7)" height="150px">
                                    </v-card-media>
                                </v-card>
                            </v-flex>
                            <v-flex xs4>
                                <v-card flat tile  v-bind:class="{blackBorderClass: colorClassName[8], gray:true}">
                                    <v-card-media @click="updateColorClass(8)" height="150px">
                                    </v-card-media>
                                </v-card>
                            </v-flex>
                            <v-flex xs4>
                                <v-card flat tile  v-bind:class="{blackBorderClass: colorClassName[9], orange:true}">
                                    <v-card-media @click="updateColorClass(9)" height="150px">
                                    </v-card-media>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
                <v-btn @click="updateView" color="primary" :disabled="!valid">Complete</v-btn>
                <v-btn @click="clear" color="error">Clear</v-btn>
                <v-btn @click="updateRoute('/')" color="cyan darken-3">Login</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    import router from '../router';
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
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            mobileNumberRules: [
                v => !!v || 'Number is required',
                v => /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(v) || 'Number must be valid'
            ],
            checkbox: false,
            size: 'xs',
            imageClassName: {
                '1': false,
                '2': false,
                '3': false,
                '4': false,
                '5': false,
                '6': false,
                '7': false,
                '8': false,
                '9': false
            },
            colorClassName: {
                '1': false,
                '2': false,
                '3': false,
                '4': false,
                '5': false,
                '6': false,
                '7': false,
                '8': false,
                '9': false
            },
            displayGrid: false,
            imageSelectionCounter: 0,
            colorSelectionCounter: 0
        }),
        computed: {
            comparePasswords() {
                return this.password !== this.confirmPassword ? 'Passwords do not match' : true
            },
            checkIfImageIsAdded() {
                // return  ? :
            }
        },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {

                }
            },
            clear() {
                this.$refs.form.reset()
            },
            updateRoute(path) {
                router.replace(path);
            },
            updateImageClass(num) {
                if (this.imageSelectionCounter < 2 || this.imageClassName[num]) {
                    if (this.imageClassName[num] == true) {
                        this.imageSelectionCounter--;
                    } else {
                        this.imageSelectionCounter++;
                    }
                    this.imageClassName[num] = !this.imageClassName[num];
                } else {
                    alert('Cannot select more than 2 images');
                }
            },
            updateColorClass(num) {
                if (this.colorSelectionCounter < 2 || this.colorClassName[num]) {
                    if (this.colorClassName[num] == true) {
                        this.colorSelectionCounter--;
                    } else {
                        this.colorSelectionCounter++;
                    }
                    this.colorClassName[num] = !this.colorClassName[num];
                } else {
                    alert('Cannot select more than 2 colors');
                }
            },
            updateView() {
                this.displayGrid = true;
            }
        }
    }
</script>


<style scoped>
    .redBorderClass {
        border: 2.5px solid red !important;
    }

    .blackBorderClass {
        border: 4px solid black !important;
    }

    .red {
        background-color: red !important;
    }
    .blue {
        background-color: blue !important;
    }
    .green {
        background-color: green !important;
    }
    .yellow {
        background-color: #FFFF00 !important;
    }
    .purple {
        background-color: purple !important;
    }
    .pink {
        background-color: #D81B60 !important;
    }
    .orange {
        background-color: #F4511E !important;
    }
    .gray {
        background-color: gray !important;
    }
    .brown {
        background-color: #3E2723 !important;
    }
</style>
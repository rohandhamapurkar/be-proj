<template>
    <v-container>
        <v-layout v-if="!displayGrid">
            <v-flex xs12 sm6 offset-sm3>
                <br>
                <h1 class="text-center">User Registration</h1><br>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-form v-model="valid">
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
                                        <v-text-field label="Password" id="password" v-model="password" :rules="passwordRules" type="password" required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field label="Confirm Password" id="confirmPassword" v-model="confirmPassword" type="password" required :rules="confirmPasswordRules"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <h3>Upload image for embedded key (optional)</h3>
                                </v-layout>
                                <v-layout row>
                                    <input type="file" @change="onFileChange" accept="image/x-png,image/gif,image/jpeg" name="uploadImage" value="Upload Image" />
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
                            <v-flex xs4 v-for="n in Object.keys(imageClassName)" :key="n">
                                <v-card flat tile v-bind:class="{redBorderClass: imageClassName[n]['set']}">
                                    <v-card-media @click="updateImageClass(n)" :src="imageClassName[n]['url']" height="150px">
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
                                <v-card flat tile v-bind:class="{blackBorderClass: colorClassName[1]['set'], red:true}">
                                    <v-card-media @click="updateColorClass(1)" height="150px">
                                    </v-card-media>
                                </v-card>
                            </v-flex>
                            <v-flex xs4>
                                <v-card flat tile v-bind:class="{blackBorderClass: colorClassName[2]['set'], blue:true}">
                                    <v-card-media @click="updateColorClass(2)" height="150px">
                                    </v-card-media>
                                </v-card>
                            </v-flex>
                            <v-flex xs4>
                                <v-card flat tile v-bind:class="{blackBorderClass: colorClassName[3]['set'], green:true}">
                                    <v-card-media @click="updateColorClass(3)" height="150px">
                                    </v-card-media>
                                </v-card>
                            </v-flex>
                            <v-flex xs4>
                                <v-card flat tile v-bind:class="{blackBorderClass: colorClassName[4]['set'], yellow:true}">
                                    <v-card-media @click="updateColorClass(4)" height="150px">
                                    </v-card-media>
                                </v-card>
                            </v-flex>
                            <v-flex xs4>
                                <v-card flat tile v-bind:class="{blackBorderClass: colorClassName[5]['set'], pink:true}">
                                    <v-card-media @click="updateColorClass(5)" height="150px">
                                    </v-card-media>
                                </v-card>
                            </v-flex>
                            <v-flex xs4>
                                <v-card flat tile v-bind:class="{blackBorderClass: colorClassName[6]['set'], purple:true}">
                                    <v-card-media @click="updateColorClass(6)" height="150px">
                                    </v-card-media>
                                </v-card>
                            </v-flex>
                            <v-flex xs4>
                                <v-card flat tile v-bind:class="{blackBorderClass: colorClassName[7]['set'], brown:true}">
                                    <v-card-media @click="updateColorClass(7)" height="150px">
                                    </v-card-media>
                                </v-card>
                            </v-flex>
                            <v-flex xs4>
                                <v-card flat tile v-bind:class="{blackBorderClass: colorClassName[8]['set'], gray:true}">
                                    <v-card-media @click="updateColorClass(8)" height="150px">
                                    </v-card-media>
                                </v-card>
                            </v-flex>
                            <v-flex xs4>
                                <v-card flat tile v-bind:class="{blackBorderClass: colorClassName[9]['set'], orange:true}">
                                    <v-card-media @click="updateColorClass(9)" height="150px">
                                    </v-card-media>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
                <v-btn @click="submit" color="primary" :disabled="!valid">Complete</v-btn>
                <v-btn @click="clear" color="error">Clear</v-btn>
                <v-btn @click="updateRoute('/')" color="cyan darken-3">Login</v-btn>
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
            firstName: '',
            lastName: '',
            email: '',
            mobileNumber: '',
            password: '',
            confirmPassword: '',
            nameRules: [
                (v) => !!v || 'Name is required',
                (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
            ],
            passwordRules: [
                (v) => !!v || 'Password is required',
                (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(v) || 'Password Must be atleast 8 char, 1 lowercase, 1 Uppercase char and 1 number'
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
            ],
            size: 'xs',
            imageClassName: {
                '1': {
                    set:false,
                    url:'https://pbs.twimg.com/profile_images/839721704163155970/LI_TRk1z.jpg'
                },
                '2': {
                    set:false,
                    url:'https://pbs.twimg.com/profile_images/839721704163155970/LI_TRk1z.jpg'
                },
                '3':{
                    set:false,
                    url:'https://pbs.twimg.com/profile_images/839721704163155970/LI_TRk1z.jpg'
                },
                '4': {
                    set:false,
                    url:'https://pbs.twimg.com/profile_images/839721704163155970/LI_TRk1z.jpg'
                },
                '5': {
                    set:false,
                    url:'https://pbs.twimg.com/profile_images/839721704163155970/LI_TRk1z.jpg'
                },
                '6': {
                    set:false,
                    url:'https://pbs.twimg.com/profile_images/839721704163155970/LI_TRk1z.jpg'
                },
                '7': {
                    set:false,
                    url:'https://pbs.twimg.com/profile_images/839721704163155970/LI_TRk1z.jpg'
                },
                '8': {
                    set:false,
                    url:'https://pbs.twimg.com/profile_images/839721704163155970/LI_TRk1z.jpg'
                },
                '9': {
                    set:false,
                    url:'https://pbs.twimg.com/profile_images/839721704163155970/LI_TRk1z.jpg'
                }
            },
            colorClassName: {
                '1': {
                    set:false,
                    color:'red'
                },
                '2': {
                    set:false,
                    color:'blue'
                },
                '3': {
                    set:false,
                    color:'green'
                },
                '4': {
                    set:false,
                    color:'yellow'
                },
                '5': {
                    set:false,
                    color:'pink'
                },
                '6': {
                    set:false,
                    color:'purple'
                },
                '7': {
                    set:false,
                    color:'brown'
                },
                '8': {
                    set:false,
                    color:'gray'
                },
                '9': {
                    set:false,
                    color:'orange'
                }
            },
            displayGrid: false,
            imageSelectionCounter: 0,
            colorSelectionCounter: 0,
            embedImage: null
        }),
        methods: {
            async submit() {
                if (this.colorSelectionCounter != 2 || this.colorSelectionCounter != 2) {
                    alert("please select atleast 2 categories and 2 colors")
                } else {
                    let categories = [];
                    let colors = [];
                    for (let i in this.imageClassName) {
                        if (this.imageClassName[i]['set']) categories.push(this.imageClassName[i]['url']);
                    }
                    for (let i in this.colorClassName) {
                        if (this.colorClassName[i]['set']) colors.push(this.colorClassName[i]['color']);
                    }
                    let user = {
                        id: this.email,
                        password: this.password,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        mobileNumber: this.mobileNumber,
                        categories: categories,
                        colors: colors
                    }
                    if(this.embedImage == null) user.embedImage = this.embedImage
                    let result = await http.signupUser(user);
                    // do something with response
                    console.log(result);
                }
            },
            clear() {
                this.$refs.form.reset()
            },
            updateRoute(path) {
                router.replace(path);
            },
            updateImageClass(num) {
                if (this.imageSelectionCounter < 2 || this.imageClassName[num]['set']) {
                    if (this.imageClassName[num]['set'] == true) {
                        this.imageSelectionCounter--;
                    } else {
                        this.imageSelectionCounter++;
                    }
                    this.imageClassName[num]['set'] = !this.imageClassName[num]['set'];
                } else {
                    alert('Cannot select more than 2 images');
                }
            },
            updateColorClass(num) {
                if (this.colorSelectionCounter < 2 || this.colorClassName[num]['set']) {
                    if (this.colorClassName[num]['set'] == true) {
                        this.colorSelectionCounter--;
                    } else {
                        this.colorSelectionCounter++;
                    }
                    this.colorClassName[num]['set'] = !this.colorClassName[num]['set'];
                } else {
                    alert('Cannot select more than 2 colors');
                }
            },
            updateView() {
                this.displayGrid = true;
            },
            onFileChange(e) {
                this.embedImage = e.target.files[0];
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
<template>
  <v-app id="inspire">
    <v-container fluid fill-height>
        <v-layout v-if="!displayGrid" align-center justify-center>
            <v-flex xs12 sm6>
                <v-card>
                  <v-toolbar dark class="header-gradient elevation-0" style="margin-bottom:20px">
                    <v-toolbar-title>User Registration</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
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
                                        <v-text-field label="Password" id="password" v-model="password" :rules="passwordRules"  :append-icon="p1 ? 'visibility' :'visibility_off'" :append-icon-cb="() => (p1 = !p1)" :type="p1 ? 'password' : 'text'" required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field label="Confirm Password" id="confirmPassword" v-model="confirmPassword" :append-icon="p2 ? 'visibility' :'visibility_off'" :append-icon-cb="() => (p2 = !p2)" :type="p2 ? 'password' : 'text'" required :rules="confirmPasswordRules"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <h3>Upload image for embedded key (optional)</h3>
                                </v-layout>
                                <v-layout row style="margin-top:10px">
                                    <input type="file" @change="onFileChange" accept="image/jpeg" name="uploadImage" value="Upload Image" />
                                </v-layout>
                                <v-card-actions style="margin-top:20px">
                                    <v-spacer></v-spacer>
                                    <v-btn @click="clear" style="width:25%" color="tertiary white--text">Clear</v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="updateRoute('/')" style="width:25%" color="primary white--text">Login</v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="updateView" style="width:50%"  color="secondary white--text" :disabled="!valid">Next</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout v-else  align-center justify-center>
        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step step="1" :complete="e1 > 1"></v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" ></v-stepper-step>
            </v-stepper-header>
            <v-stepper-items style="padding-top:4%;padding-bottom:4%">
                <v-stepper-content step="1">
                <v-layout>
                    <v-flex>
                        <v-card class="elevation-0">
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
                    </v-flex>
                </v-layout>
                <v-btn class="header-gradient" style="margin-top:10px;width:10%;" :disabled="imageSelectionCounter != 2" @click="updateStepper(2)" color="white--text">NEXT</v-btn>
                </v-stepper-content>
                <v-stepper-content step="2">
                <v-layout>
                    <v-flex>
                        <v-card class="elevation-0">
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
                    </v-flex>
                </v-layout>
                <v-btn @click="submit" color="primary white--text" :disabled="colorSelectionCounter != 2">Complete</v-btn>
                <v-btn @click="updateStepper(1)" class="header-gradient" color="white--text">Back</v-btn>
                <v-btn @click="updateRoute('/')" color="secondary white--text">Login</v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
        </v-layout>
    </v-container>
  </v-app>
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
            p1: true,
            p2: true,
            size: 'xs',
            e1: 0,
            mobileNumber: '',
            password: '',
            confirmPassword: '',
            nameRules: [
                (v) => !!v || 'Name is required',
                (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
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
            ],
            size: 'xs',
            imageClassName: {
                '1': {
                    set: false,
                    url: 'https://github.com/rohandhamapurkar/be-proj/raw/master/static/fixedCategories/boat.jpeg',
                    name:'boat'
                },
                '2': {
                    set: false,
                    url: 'https://github.com/rohandhamapurkar/be-proj/raw/master/static/fixedCategories/building.jpeg',
                    name:'building'
                },
                '3': {
                    set: false,
                    url: 'https://github.com/rohandhamapurkar/be-proj/raw/master/static/fixedCategories/butterfly.jpeg',
                    name:"butterfly"
                },
                '4': {
                    set: false,
                    url: 'https://github.com/rohandhamapurkar/be-proj/raw/master/static/fixedCategories/car.jpeg',
                    name:'car'
                },
                '5': {
                    set: false,
                    url: 'https://github.com/rohandhamapurkar/be-proj/raw/master/static/fixedCategories/cat.jpeg',
                    name:'cat'
                },
                '6': {
                    set: false,
                    url: 'https://github.com/rohandhamapurkar/be-proj/raw/master/static/fixedCategories/dog.jpeg',
                    name:'dog'
                },
                '7': {
                    set: false,
                    url: 'https://github.com/rohandhamapurkar/be-proj/raw/master/static/fixedCategories/sign.jpeg',
                    name:'sign'
                },
                '8': {
                    set: false,
                    url: 'https://github.com/rohandhamapurkar/be-proj/raw/master/static/fixedCategories/pizza.jpg',
                    name:'pizza'
                },
                '9': {
                    set: false,
                    url: 'https://github.com/rohandhamapurkar/be-proj/raw/master/static/fixedCategories/volcano.jpg',
                    name:'volcano'
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
                if (this.colorSelectionCounter != 2 || this.imageSelectionCounter != 2) {
                    alert("please select atleast 2 categories and 2 colors")
                } else {
                    let categories = [];
                    let colors = [];
                    for (let i in this.imageClassName) {
                        if (this.imageClassName[i]['set']) categories.push(this.imageClassName[i]['name']);
                    }
                    for (let i in this.colorClassName) {
                        if (this.colorClassName[i]['set']) colors.push(this.colorClassName[i]['color']);
                    }
                    let validSeq = [];
                    validSeq = categories.concat(colors);
                    let user = {
                        id: this.email,
                        password: this.password,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        mobileNumber: this.mobileNumber,
                        validSeq: validSeq
                    }
                    if(this.embedImage != null) user.embedImage = this.embedImage
                    let result = await http.signupUser(user);
                    if(result.ok) {
                        alert(result.message)
                        router.replace('/')
                    } else {
                        alert("Something went wrong please try again");
                    }
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
                var files = e.target.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                var image = new Image();
                var reader = new FileReader();
                var vm = this;

                reader.onload = (e) => {
                    console.log(e.target.result)
                    this.embedImage = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            updateStepper(nextStep) {
                    this.e1 = nextStep;
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
    .header-gradient{
      background: linear-gradient(225deg, #2cb5e8, #0fb8ad)!important;
    }
</style>

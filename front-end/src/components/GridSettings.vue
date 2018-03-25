<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card :disabled="true">
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
                <v-card :disabled="true">
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
                <v-btn @click="updateGridData" color="primary">update</v-btn>
                <v-btn v-if="!editGridFields" @click="editGrid" color="accent">Edit</v-btn>
                <v-btn v-else @click="editGrid" color="error">Cancel</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    import router from '../router';
    import http from '@/Services/http';
    export default {
        data: () => ({
            editGridFields: false,
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
                    set: false,
                    color: 'red'
                },
                '2': {
                    set: false,
                    color: 'blue'
                },
                '3': {
                    set: false,
                    color: 'green'
                },
                '4': {
                    set: false,
                    color: 'yellow'
                },
                '5': {
                    set: false,
                    color: 'pink'
                },
                '6': {
                    set: false,
                    color: 'purple'
                },
                '7': {
                    set: false,
                    color: 'brown'
                },
                '8': {
                    set: false,
                    color: 'gray'
                },
                '9': {
                    set: false,
                    color: 'orange'
                }
            },
            imageSelectionCounter: 0,
            colorSelectionCounter: 0,
            embedImage: null
        }),
        methods: {
            async init(){
                let result = await http.getImageGridSettings();
                for(i in this.imageClassName){
                    if(this.imageClassName[i].name == result.validSeq[0] || this.imageClassName[i].name == result.validSeq[1]) this.imageClassName[i].set = true;
                }
                for(i in this.colorClassName){
                    if(this.colorClassName[i].color == result.validSeq[0] || this.colorClassName[i].color == result.validSeq[1]) this.colorClassName[i].set = true;
                }
            },
            async updateGridData() {
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
                    let result = await http.updateProfile({
                        validSeq : validSeq
                    });
                    alert(result.message);
                }
            },
            editGrid() {
                this.editGridFields = !this.editGridFields
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
            }
            
        },
        created() {
            console.log('taher')
            this.init();
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

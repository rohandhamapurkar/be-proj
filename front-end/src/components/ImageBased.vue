<template>
    <v-container>
        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step step="1" :complete="e1 > 1">GRID 1</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" :complete="e1 > 2">GRID 2</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3">GRID 3</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items style="padding-top:4%;padding-bottom:4%">
                <v-stepper-content step="1">
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-card class="elevation-0">
                                <v-container fluid v-bind="{ [`grid-list-${size}`]: true }">
                                    <h2 style="padding-bottom:10px;">Say <b>YES</b> if the grid is valid, <b>NO</b> if its invalid</h2>
                                    <v-layout row wrap>
                                        <v-flex xs4 v-for="n in 9" :key="n">
                                            <v-card flat tile>
                                                <v-card-media @click="updateImageClass(n)" :src="urls[(n-1)]" height="150px">
                                                </v-card-media>
                                            </v-card>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <v-btn style="margin-top:10px;width:10%" @click="updateStepper(true,2)" color="yes white--text">Yes</v-btn>
                    <v-btn style="margin-top:10px;width:10%" @click="updateStepper(false,2)" color="nope white--text">No</v-btn>
                    <!--v-btn color="accent" @click.native="e1 = 2">Continue</v-btn-->
                </v-stepper-content>
                <v-stepper-content step="2">
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-card class="elevation-0">
                                <v-container fluid v-bind="{ [`grid-list-${size}`]: true }">
                                    <h1>Say YES if the grid is valid, NO if its invalid</h1>
                                    <v-layout row wrap>
                                        <v-flex xs4 v-for="n in 9" :key="n">
                                            <v-card flat tile>
                                                <v-card-media @click="updateImageClass(n)" :src="urls[(n-1)+9]" height="150px">
                                                </v-card-media>
                                            </v-card>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <v-btn style="margin-top:10px;width:10%" @click="updateStepper(true, 3)" color="yes white--text">Yes</v-btn>
                    <v-btn style="margin-top:10px;width:10%" @click="updateStepper(false, 3)" color="nope white--text">No</v-btn>
                    <!--v-btn color="accent" @click.native="e1 = 3">Continue</v-btn-->
                </v-stepper-content>
                <v-stepper-content step="3">
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-card class="elevation-0">
                                <v-container fluid v-bind="{ [`grid-list-${size}`]: true }">
                                    <h1>Say YES if the grid is valid, NO if its invalid</h1>
                                    <v-layout row wrap>
                                        <v-flex xs4 v-for="n in 9" :key="n">
                                            <v-card flat tile>
                                                <v-card-media @click="updateImageClass(n)" :src="urls[(n-1)+18]" height="150px">
                                                </v-card-media>
                                            </v-card>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <v-btn style="margin-top:10px;width:10%" @click="updateStepper(true, 4)" color="yes white--text">Yes</v-btn>
                    <v-btn style="margin-top:10px;width:10%" @click="updateStepper(false, 4)" color="nope white--text">No</v-btn>
                    <!--v-btn color="accent" @click.native="e1 = 1">Continue</v-btn-->
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-container>
</template>


<script>
    import router from '../router';
    import http from '@/Services/http';
    export default {
        name: 'intermediatePage',
        data: () => ({
            valid: true,
            size: 'xs',
            e1: 0,
            gridsSelected: [],
            urls: []
        }),
        computed: {},
        async created() {
            let result = await http.getImageGrid();
            console.log(result);
            this.urls = result.data;
        },
        methods: {
            async updateStepper(selection, nextStep) {
                if (nextStep > 3) {
                    this.gridsSelected[nextStep - 2] = selection;
                    console.log('send request');
                    let result = await http.verifyImageGrid(this.gridsSelected);
                    console.log(result);
                    alert(his.$store.getters.onSuccessPath,his.$store.getters.onUnsuccessPath)
                    // if (result.ok) {
                    //     window.location.replace(this.$store.getters.onSuccessPath + '?sessionId=' + this.$store.getters.sessionId);
                    //     // window.location.replace('https://google.com');
                    // } else {
                    //     window.location.replace(this.$store.getters.onUnsuccessPath);
                    //     // window.location.replace('https://facebook.com');
                    // }
                } else {
                    this.e1 = nextStep;
                    this.gridsSelected[nextStep - 2] = selection;
                }
                console.log(this.gridsSelected)
            }
        }
    }
</script>


<style scoped>

</style>

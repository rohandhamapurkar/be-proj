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
            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-card>
                                <v-container fluid v-bind="{ [`grid-list-${size}`]: true }">
                                    <h1>Say YES if the grid is valid, NO if its invalid</h1>
                                    <v-layout row wrap>
                                        <v-flex xs4 v-for="n in 9" :key="n">
                                            <v-card flat tile>
                                                <v-card-media @click="updateImageClass(n)" :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`" height="150px">
                                                </v-card-media>
                                            </v-card>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <v-btn @click="updateStepper(true,2)" color="primary">Yes</v-btn>
                    <v-btn @click="updateStepper(false,2)" color="error">No</v-btn>
                    <!--v-btn color="accent" @click.native="e1 = 2">Continue</v-btn-->
                </v-stepper-content>
                <v-stepper-content step="2">
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-card>
                                <v-container fluid v-bind="{ [`grid-list-${size}`]: true }">
                                    <h1>Say YES if the grid is valid, NO if its invalid</h1>
                                    <v-layout row wrap>
                                        <v-flex xs4 v-for="n in 9" :key="n">
                                            <v-card flat tile>
                                                <v-card-media @click="updateImageClass(n)" :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`" height="150px">
                                                </v-card-media>
                                            </v-card>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <v-btn @click="updateStepper(true, 3)" color="primary">Yes</v-btn>
                    <v-btn @click="updateStepper(false, 3)" color="error">No</v-btn>
                    <!--v-btn color="accent" @click.native="e1 = 3">Continue</v-btn-->
                </v-stepper-content>
                <v-stepper-content step="3">
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-card>
                                <v-container fluid v-bind="{ [`grid-list-${size}`]: true }">
                                    <h1>Say YES if the grid is valid, NO if its invalid</h1>
                                    <v-layout row wrap>
                                        <v-flex xs4 v-for="n in 9" :key="n">
                                            <v-card flat tile>
                                                <v-card-media @click="updateImageClass(n)" :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`" height="150px">
                                                </v-card-media>
                                            </v-card>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <v-btn @click="updateStepper(true, 4)" color="primary">Yes</v-btn>
                    <v-btn @click="updateStepper(false, 4)" color="error">No</v-btn>
                    <!--v-btn color="accent" @click.native="e1 = 1">Continue</v-btn-->
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-container>
</template>


<script>
    import router from '../router';
    export default {
        name: 'intermediatePage',
        data: () => ({
            valid: true,
            size: 'xs',
            e1: 0,
            gridsSelected: []
        }),
        computed: {},
        methods: {
            updateStepper(selection, nextStep) {
                if (nextStep > 3) {
                    this.gridsSelected[nextStep-2] = selection;
                    console.log('send request');
                } else {
                    this.e1 = nextStep;
                    this.gridsSelected[nextStep-2] = selection;
                }
                console.log(this.gridsSelected)
            }
        }
    }
</script>


<style scoped>

</style>
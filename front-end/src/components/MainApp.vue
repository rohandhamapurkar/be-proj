<template>
    <div class="mainapp">
        <v-toolbar dark color="primary">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="white--text">Title goes here</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- The below commented code adds 3 more buttons to the right hand side of the toolbar -->
            <!--v-btn icon>
                                    <v-icon>search</v-icon>
                                </v-btn>
                                <v-btn icon>
                                    <v-icon>apps</v-icon>
                                </v-btn>
                                <v-btn icon>
                                    <v-icon>refresh</v-icon>
                                </v-btn>
                                <v-btn icon>
                                    <v-icon>more_vert</v-icon>
                                </v-btn-->
        </v-toolbar>
        <v-navigation-drawer temporary v-model="drawer" light absolute>
            <v-list class="pa-1">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="https://randomuser.me/api/portraits/men/85.jpg" />
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>User's Name and Image</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-list class="pt-0" dense>
                <v-divider></v-divider>
                <v-list-tile v-for="item in items" :key="item.title" @click="updateRoute(item.path)">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-actions>
                        <v-select label="Size" :items="items" v-model="size"></v-select>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                    <v-container fluid v-bind="{ [`grid-list-${size}`]: true }">
                        <v-layout row wrap>
                            <v-flex xs4 v-for="n in 9" :key="n">
                                <v-card flat tile v-bind:class="{nayaClass: className[n]}">
                                    <v-card-media @click="updateClass(n)" :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`" height="150px">
                                    </v-card-media>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
        <router-view></router-view>
    </div>
</template>

<script>
    import http from '@/Services/http';
    import router from '../router';
    export default {
        name: 'mainapp',
        data() {
            return {
                drawer: null,
                items: [{
                        title: 'Profile',
                        icon: 'dashboard',
                        path: '/mainapp/home'
                    },
                    {
                        title: 'Settings',
                        icon: 'question_answer',
                        path: '/mainapp/home'
                    }
                ],
                size: 'xs',
                items: [{
                        text: 'Extra small (1px)',
                        value: 'xs'
                    },
                    {
                        text: 'Small (4px)',
                        value: 'sm'
                    },
                    {
                        text: 'Medium (8px)',
                        value: 'md'
                    },
                    {
                        text: 'Large (16px)',
                        value: 'lg'
                    },
                    {
                        text: 'Extra large (24px)',
                        value: 'xl'
                    }
                ],
                className:{'1':true,'2':true,'3':true,'4':true,'5':true,'6':true,'7':true,'8':true,'9':true},
                oneSelected:-1,
                twoSelected:-1
            }
        },
        methods: {
            updateRoute(path) {
                router.replace(path);
            },
            updateClass(num) {
                this.className[num] = !this.className[num];
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .testClass {
        border: 1px solid black;
    }
    
    .nayaClass {
        border: 1px solid red;
    }
    
</style>

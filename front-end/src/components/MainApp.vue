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
                        path: '/mainapp/profile'
                    },
                    {
                        title: 'Grid Settings',
                        icon: 'question_answer',
                        path: '/mainapp/gridsettings'
                    },
                    {
                        title: 'Embedded Image Settings',
                        icon: 'question_answer',
                        path: '/mainapp/embeddedimagesettings'
                    }
                ],
            }
        },
        methods: {
            updateRoute(path) {
                router.replace(path);
            }
        },
        created() {
            router.replace('/mainapp/profile');
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

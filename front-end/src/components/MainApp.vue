<template>
    <div class="mainapp">
        <v-toolbar dark color="primary">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
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
        <router-view @updateTitle='updateTitle'></router-view>
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
                title: ''
            }
        },
        methods: {
            updateRoute(path) {
                router.replace(path);
            },
            updateTitle(title) {
                this.title = title;
            }
        },
        created() {
            if (!!this.$store.getters.auth) {
                if (this.$store.getters.accountType == 1) {
                    this.items = this.items.slice(0, 0)
                    this.updateRoute('/mainapp/adminprofile');
                } else {
                    this.updateRoute('/mainapp/profile');
                }
            } else {
                this.updateRoute('/')
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

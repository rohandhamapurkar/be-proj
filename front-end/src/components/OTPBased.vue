<template>
    <v-app id="inspire">
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card>
                        <v-toolbar dark class="header-gradient elevation-0" style="margin-bottom:20px">
                            <v-toolbar-title>Please enter the OTP from the Companion app</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-container style="padding:5%">
                            <v-text-field label="OTP" id="OTP" style="width:60%;margin-left:auto;margin-right:auto" v-model="otp" type="text"></v-text-field>
                            <v-btn @click="requestServer" style="width:30%;" color="primary">Submit</v-btn>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>


<script>
    import router from '../router';
    import http from '@/Services/http';
    export default {
        name: 'intermediatePage',
        data: () => ({
            otp: '',
        }),
        computed: {},
        methods: {
            async requestServer() {
                let result = await http.verifyOTP(this.otp);
                if (result.authentication) {
                    window.location.replace(this.$store.getters.onSuccessPath + '?sessionId=' + this.$store.getters.sessionId);
                } else {
                    window.location.replace(this.$store.getters.onUnsuccessPath);
                }
            }
        }
    }
</script>


<style scoped>
    .header-gradient {
        background: linear-gradient(225deg, #2cb5e8, #0fb8ad)!important;
    }
</style>

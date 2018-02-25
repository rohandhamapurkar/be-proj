<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-container>
                        <h1>Please enter the OTP from the Companion app</h1>
                        <v-text-field label="OTP" id="OTP" v-model="otp" type="text"></v-text-field>
                        <v-btn @click="requestServer" color="primary">Submit</v-btn>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    import router from '../router';
    export default {
        name: 'intermediatePage',
        data: () => ({
            otp: '',
        }),
        computed: {},
        methods: {
            requestServer() {
                let that = this;
                console.log(that.otp.length);
            }
        }
    }
</script>


<style scoped>

</style>
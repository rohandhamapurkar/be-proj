<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <br>
                <h1 class="text-center">Select Authentication Method</h1><br>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-form v-model="valid" ref="form">
                                <v-layout>
                                    <v-layout row>
                                        <v-flex>
                                            <v-text-field name="email" label="Email" id="email" v-model="email" :rules="emailRules" type="email" required></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-layout>
                            </v-form>
                        </v-container>
                    </v-card-text>
                </v-card>
                <v-layout>
                    <v-layout row>
                        <v-btn @click="updatePath('/authprogress/imagebased')" color="primary" :disabled="!valid">Image Grid Based</v-btn>
                    </v-layout>
                    <v-layout row>
                        <v-btn @click="updatePath('/authprogress/embeddedimagebased')" color="primary" :disabled="!valid">Embedded Image Based</v-btn>
                    </v-layout>
                    <v-layout row>
                        <v-btn @click="updatePath('/authprogress/otpbased')" color="primary" :disabled="!valid">OTP Based</v-btn>
                    </v-layout>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    import router from '../router';
    export default {
        name: 'intermediatePage',
        data: () => ({
            valid: true,
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
        }),
        computed: {},
        methods: {
            updatePath(path) {
                this.$store.commit('sessionEmail', this.email);
                router.replace(path);
            }
        }
    }
</script>


<style scoped>

</style>
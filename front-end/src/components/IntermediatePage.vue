<template style="background:#fafafa !important">
    <v-app id="inspire">
    <v-container  fluid fill-height>
        <v-layout  align-center justify-center>
            <v-flex xs12 sm8 md6 lg5>
                <v-card>
                  <v-toolbar dark class="header-gradient elevation-0" style="margin-bottom:20px">
                    <v-toolbar-title>Select Authentication Method</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
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
                    <v-card-actions style="padding-bottom:20px">
                            <v-spacer></v-spacer>
                            <v-btn style="width:33%"  @click="updatePath('/authprogress/imagebased')" color="primary" :disabled="!valid">Image Grid Based</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn style="width:33%" @click="updatePath('/authprogress/embeddedimagebased')" color="midpointary white--text" :disabled="!valid">Embedded Image Based</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn style="width:33%" @click="updatePath('/authprogress/otpbased')" color="secondary" :disabled="!valid">OTP Based</v-btn>
                            <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
  </v-app>
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
.header-gradient{
  background: linear-gradient(225deg, #2cb5e8, #0fb8ad)!important;
}
</style>

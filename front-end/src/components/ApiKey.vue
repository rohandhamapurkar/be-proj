<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-form>
                               <h1 class="text-center">Your API Key</h1><br>
                                <v-layout justify-space-between>
                                    <v-flex>
                                        <v-text-field id="apiKey" type="text" value="*** Key ***" disabled>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<style>
input {
       text-align: center; 
}
</style>
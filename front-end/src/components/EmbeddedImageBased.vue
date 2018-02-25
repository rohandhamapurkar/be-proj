<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-container>
                        <h1>Please upload your embedded image</h1>
                        <input type="file" @change="onFileChange" accept="image/x-png,image/gif,image/jpeg" name="uploadImage" value="Upload Image"  />
                        <v-btn color="primary">Submit</v-btn>
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
            embedImage: null
        }),
        computed: {},
        methods: {
            onFileChange(e) {
                this.embedImage = e.target.files[0];
            }
        }
    }
</script>


<style scoped>

</style>
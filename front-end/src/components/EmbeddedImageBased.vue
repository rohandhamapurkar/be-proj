<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-container>
                        <h1>Please upload your embedded image</h1>
                        <input type="file" @change="onFileChange" accept="image/jpeg" name="uploadImage" value="Upload Image"  />
                        <!--v-btn color="primary">Submit</v-btn-->
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    import router from '../router';
    import http from '@/Services/http';

    export default {
        name: 'intermediatePage',
        data: () => ({
            embedImage: null
        }),
        computed: {},
        methods: {
            onFileChange(e) {
                var files = e.target.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);    
            },
            createImage(file) {
                var image = new Image();
                var reader = new FileReader();
                var vm = this;

                reader.onload = async (e) => {
                    console.log(e.target.result)
                    let result = await http.verifyEmbededImage(e.target.result);
                    if(result.authentication) {
                        // some redirect code with positive feedback
                    } else {
                        // some redirect code with negative feedback
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    }
</script>


<style scoped>

</style>
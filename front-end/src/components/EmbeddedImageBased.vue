<template>
    <v-app id="inspire">
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card>
                        <v-toolbar dark class="header-gradient elevation-0" style="margin-bottom:20px">
                            <v-toolbar-title>Please upload your embedded image</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-container style="padding:10%">
                            <label for="file-upload" class="custom-file-upload">
                            <div style="display:flex"><span class="material-icons">cloud_upload</span>&nbsp;&nbsp;<span>Upload Image</span></div>
                          </label>
                            <input id="file-upload" type="file" @change="onFileChange" accept="image/jpeg" name="uploadImage" value="Upload Image">
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
                reader.onload = async(e) => {
                    console.log(e.target.result)
                    let result = await http.verifyEmbededImage(e.target.result);
                    console.log(result);
                    alert(this.$store.getters.onSuccessPath,this.$store.getters.onUnsuccessPath)
                    // if (result.ok) {
                    //     window.location.replace(this.$store.getters.onSuccessPath + '?sessionId=' + this.$store.getters.sessionId);
                    // } else {
                    //     window.location.replace(this.$store.getters.onUnsuccessPath);
                    // }
                };
                reader.readAsDataURL(file);
            }
        }
    }
</script>


<style scoped>
    .header-gradient {
        background: linear-gradient(225deg, #2cb5e8, #0fb8ad)!important;
    }
    input[type="file"] {
        display: none;
    }
    .custom-file-upload {
        background: linear-gradient(225deg, #2cb5e8, #0fb8ad)!important;
        font-size: 1.2em;
        color: #fff;
        border-radius: 5px;
        display: inline-block;
        padding: 12px 12px;
        cursor: pointer;
    }
</style>

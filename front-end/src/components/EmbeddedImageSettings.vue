<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <br>
                <h1 class="text-center">My Profile</h1><br>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-btn @click="getEmbeddedImage" :disabled="disableDownload" color="accent">Download Image</v-btn>
                            <v-btn @click="toggleUploadCard" color="primary">Upload Image</v-btn>
                        </v-container>
                    </v-card-text>
                </v-card>
                <v-card v-if="uploadCard">
                    <v-card-text>
                        <v-container>
                            <input type="file" @change="onFileChange" accept="image/x-png,image/gif,image/jpeg" name="uploadImage" value="Upload Image" />
                            <v-btn @click="toggleUploadCard" color="accent">Cancel</v-btn>
                            <v-btn @click="uploadImageAndEmbed" color="error">Upload</v-btn>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    import router from '../router';
    export default {
        data: () => ({
            disableDownload: false,
            uploadCard: false,
            embedImage: null
        }),
        computed: {},
        methods: {
            getEmbeddedImage() {
            },
            toggleUploadCard() {
                this.uploadCard = !this.uploadCard;
                this.disableDownload = !this.disableDownload;
            },
            uploadImageAndEmbed() {
            },
            onFileChange(e) {
                this.embedImage = e.target.files[0];
            }
        }
    }
</script>


<style scoped>

</style>
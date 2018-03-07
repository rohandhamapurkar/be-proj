<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <br>
                <h1 class="text-center">My Profile</h1><br>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <a id="downloadLink" :href="img" download="embeddedImage.jpg"></a>
                            <v-btn @click="getEmbeddedImage" :disabled="disableDownload" color="accent">Download Image</v-btn>
                            <v-btn @click="toggleUploadCard" color="primary">Upload Image</v-btn>
                        </v-container>
                    </v-card-text>
                </v-card>
                <v-card v-if="uploadCard">
                    <v-card-text>
                        <v-container>
                            <input type="file" @change="onFileChange" accept="image/jpeg" name="uploadImage" value="Upload Image" />
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
    import http from '@/Services/http';
    export default {
        data: () => ({
            disableDownload: false,
            uploadCard: false,
            embedImage: null,
            img: null
        }),
        computed: {},
        methods: {
            async getEmbeddedImage() {
                let result = await http.getEmbededImage();
                if(result.ok) {
                    this.img = 'data:image/jpeg;base64,' + result.image.image
                    setTimeout(function() {
                        document.getElementById('downloadLink').click();
                    }, 200)
                } else {
                    alert('You have not uploaded an image yet');
                }
                console.log(result);
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
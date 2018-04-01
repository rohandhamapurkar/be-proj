<template>
    <div class="authprogress">
        <router-view></router-view>
    </div>
</template>

<script>
    import http from '@/Services/http';
    import router from '../router';
    export default {
        name: 'authprogress',
        data() {
            return {}
        },
        methods: {},
        async created() {
            // 69efc29b-a904-42a4-8f2d-75cc1c2b9524
            // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRhaGVyIiwiaWF0IjoxNTIwMTUzMzA4LCJleHAiOjE1MjA0MTI1MDh9.ngYmJRWgf2TkllOUnzEmVa7JXpof_W0sp2hj5VafrhI"
            // console.log(result);
            let result = await http.apiKeyVerification("92fb5a0b-d0b9-468b-9f4f-a9c64b50bda7");
            this.$store.commit('sessionId', result.token);
            // let query = this.$route.query;
            // if(query.hasOwnProperty('sessionId') && query.sessionId == 1234) {
            router.replace('/authprogress/intermediatepage');
            // } else {
            //     router.replace('/404');
            // }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

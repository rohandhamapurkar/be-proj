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
        created() {
            let query = this.$route.query;
            if(query.hasOwnProperty('sessionId') && query.sessionId == 1234) {
                router.replace('/authprogress/intermediatepage');
            } else {
                router.replace('/404');
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

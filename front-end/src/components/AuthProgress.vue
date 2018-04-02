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
            let query = this.$route.query;
            if (query.hasOwnProperty('sessionId') && query.hasOwnProperty('onSuccessPath') && query.hasOwnProperty('onUnsuccessPath')) {
                let result = await http.verifySession(query.sessionId);
                if(result.ok){
                    this.$store.commit('sessionId', query.sessionId);
                    this.$store.commit('sessionSuccessPath', query.onSuccessPath);
                    this.$store.commit('sessionuUnsuccessPath', query.onUnsuccessPath);
                    router.replace('/authprogress/intermediatepage');
                } else {
                    router.replace('/404');
                }
            } else {
                router.replace('/404');
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

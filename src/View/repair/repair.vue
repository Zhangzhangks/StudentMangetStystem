<template>
  
    <KeepAlive>
      <repairstudent v-if="identy === 'student'"></repairstudent>
      <repairAdmin v-else></repairAdmin>
    </KeepAlive>
 
</template>

<script>

import repairAdmin from "./repairAdmin.vue";
import repairstudent from './reqpairstudent.vue'
import { useStore } from "vuex";
export default {
  name: "WorkspaceJsonRepair",
  components: {  repairAdmin ,repairstudent},
  setup() {
    const store = useStore();
    const identy = store.state.user.loginIdenty;

    return { identy };
  },
};
</script>
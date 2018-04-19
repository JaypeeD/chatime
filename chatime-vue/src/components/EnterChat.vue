<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Welcome to CHATime</v-card-title>
        <v-card-text>
          <v-layout>
            <v-flex xs12>
              <v-text-field
                v-model="nickname"
                label="Nickname"
                prepend-icon="face"
                v-on:keyup.enter="joinChat"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed medium color="green darken-1" @click.native="joinChat">Join</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
    data: () => ({
      dialog: true,
      nickname: null
    }),
    methods: {
        joinChat(){
            const _self = this;

            if(_self.nickname != null) {
                console.log(_self.nickname);
                _self.$socket.emit('new_user', {nickname:_self.nickname}, (data) => {
                    if(data) {
                        _self.dialog = false;
                    }
                })
              _self.nickname = null;
            }
        }
    }
}
</script>

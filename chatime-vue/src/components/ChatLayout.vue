<template>
  <v-app id="inspire" dark>
    <v-toolbar color="indigo" dark fixed app flat dense>
      <v-toolbar-title>CHATime v0.1</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <enter-chat></enter-chat>
        <v-layout row>
          <v-flex xs10>
            <div class="chat-container" color="grey lighten-2">
              <div class="message-container">
                <v-card style="width: 100%; height: 100%;" flat >
                  <v-list two-line>
                    <template v-for="(mess, index) in received_message">
                      <v-list-tile :key="index" v-if="(!mess.user_join && !mess.user_out)">
                        <v-list-tile-avatar>
                          <v-avatar class="red">
                            <span class="white--text headline">{{ mess.name.charAt(0) }}</span>
                          </v-avatar>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="mess.name"></v-list-tile-title>
                          <v-list-tile-sub-title v-html="mess.message"></v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile v-else>
                        <v-list-tile-content>
                          <v-list-tile-title class="text-xs-center">
                            <span class="caption">
                              {{ mess.message }}
                            </span>
                          </v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                    </template>
                  </v-list>
                </v-card>
              </div>
              <div class="message-btn">
                <v-text-field light
                              solo
                              label="Write Message ..."
                              style="border-radius: 5px;"
                              v-model="sent_message"
                              append-icon="fa-smile-o"
                              v-on:keyup.enter="sendMessage">

                </v-text-field>
              </div>
            </div>

          </v-flex>
          <v-flex xs2>
            <v-card style="width: 100%; height: 100%; border-left: 1px solid hsla(0,0%,100%,.12);" flat>
              <v-layout row>
                <v-flex xs12>
                  <v-list subheader>
                    <v-subheader>Available Users</v-subheader>
                    <v-divider></v-divider>
                    <v-list-tile avatar v-for="user in users" :key="user.name" @click="">
                      <v-list-tile-avatar>
                        <img src="https://vuetifyjs.com/static/doc-images/lists/1.jpg">
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="user.name"></v-list-tile-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-icon :color="user.connect ? 'teal' : 'grey'">fiber_manual_record</v-icon>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>


    <v-footer color="indigo" app>
      <span class="white--text">&copy; Jaypee De Castro - 2018</span>
    </v-footer>

  </v-app>
</template>

<script>
  import EnterChat from './EnterChat.vue'

  export default {
    name: 'HelloWorld',
    data: () => ({
      drawer: null,
      user_id: '',
      sent_message: '',
      received_message: []
    }),
    mounted() {
      const _self = this;

      _self.$options.sockets.newMessage = (data) => {
        console.log(data);
        _self.received_message.push(data);
        _self.otherList = true;
      }
      _self.$options.sockets.userUniqueId = (data) => {
        _self.user_id = data.id;
      }
      _self.$options.sockets.retrieveMessages = (data) => {
        if(data.length > 0) {
          _self.received_message = [];
          data.map((value, index) => {
            _self.received_message.push(value);
          })
        }
      }
    },
    computed: {
      users() {
        return this.$store.state.users;
      }
    },
    methods: {
      sendMessage() {
        const _self = this;
        this.$socket.emit('send_message', {
          message: _self.sent_message
        })

        _self.sender = true;
        _self.sent_message = '';
      }
    },
    components: {
      'enter-chat': EnterChat
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .chat-container {
    position: relative;
    height: 100%;
    background-color: #424242;
    border-radius: 2px;
  }
  .message-container {
    position: absolute;
    width: 100%;
    height: calc(100% - (70px));
    padding: 10px;
    overflow-y: auto;
  }
  ::-webkit-scrollbar{
    height:10px;
    width:6px;
    border-radius: 4px;
    background: transparent;
    transition: all 0.3s ease;
  }
  .message-btn{
    position: absolute;
    width: 100%;
    padding: 10px;
    bottom: 0;
  }
  ::-webkit-scrollbar:hover{
    background: #c6c7ca;
  }
  ::-webkit-scrollbar-thumb{
    background:#777779;
    border-radius: 4px;
  }
</style>

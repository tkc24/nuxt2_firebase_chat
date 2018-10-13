<template lang="pug">
  section.container
    v-container(fluid grid-list-lg)
      v-layout(row)
        v-form
        v-text-field(v-model="message" label="メッセージ" placeholder="メッセージ")
      v-layout(row)
        v-btn(@click="addMessage" block )
          v-icon(dark) create
          span 投稿
      v-layout(row v-for="messageData in messages")
        template(v-if="currentUser.uid === messageData.uid")
          v-flex.text-center(lg3 md3 sm3 xs3)
            v-icon(large color="cyan") fa-user
            p わたし
          v-flex(lg9 md9 sm9 xs9)
            p(style="height: 100%;" :key="messageData['.key']") {{messageData['text']}}
        template(v-else)
          v-flex.text-center(lg3 md3 sm3 xs3)
            v-icon(large) fa-user
            p 違う人
          v-flex(lg9 md9 sm9 xs9)
            p(style="height: 100%;" :key="messageData['.key']") {{messageData['text']}}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      message: ''
    }
  },
  computed: {
    ...mapGetters('messages', ['messages']),
    ...mapGetters('auth', ['currentUser'])
  },
  created() {
    this.initMessages()
  },
  methods: {
    ...mapActions('messages', {
      initMessages: 'initMessages',
      addMessageRef: 'addMessageRef'
    }),
    // メッセージ追加処理
    addMessage() {
      this.addMessageRef({ text: this.message, uid: this.currentUser.uid })
      this.message = ''
    }
  }
}
</script>

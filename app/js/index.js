$(document).ready(_ => {
  var app = new Vue({
    el: '#app',
    data: {
      address: '',
      notifications: []
    },
    async mounted () {
      web3.setProvider(web3.givenProvider);
      setTimeout(async _ => {
        await Chat.methods.register().send({from: web3.eth.defaultAccount})
        this.notifications.push({message: `Registered as ${web3.eth.defaultAccount}`})
      }, 200);

    },
    methods: {
      async send_message () {
        await Chat.methods.message(this.address, this.message).send({from: web3.eth.defaultAccount, gas: 1e6});
        this.notifications.push({message: `Message sent from ${web3.eth.defaultAccount} to ${this.address}`})
      },
      async retrieve_latest_message () {
        const message = await Chat.methods.getLatest(this.address).call({from: web3.eth.defaultAccount});
        debugger
        this.notifications.push({message: `${message.timestamp}: ${message.message}`})
      }
    }
  })

});

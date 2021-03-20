const Discord = require('discord.js')
const config = require('./config.json')
const { Webhooks } = require('@octokit/webhooks')
const discordEmbedMessage = require('./util/embed')

const client = new Discord.Client()
let channel

const webhooks = new Webhooks({
  secret: config.github.WEBHOOK_SECRET
})

client.on('ready', () => {
  channel = client.channels.cache.get(config.discord.CHANNEL_ID)

  webhooks.on('pull_request', response => {
    if (response.payload.action === 'opened') {
      const {
        title,
        user,
        labels,
        assignees,
        html_url: htmlUrl,
        created_at: createdAt,
        requested_reviewers: reviewers
      } = response.payload.pull_request
      const repositoryName = response.payload.repository.name
      const avatarUrl = response.payload.sender.avatar_url
      const embed = discordEmbedMessage(
        htmlUrl,
        title,
        user,
        createdAt,
        assignees,
        reviewers,
        labels,
        avatarUrl,
        repositoryName
      )
      channel.send(embed)
    }
  })

  require('http').createServer(webhooks.middleware).listen(8080)
})

client.login(config.discord.BOT_TOKEN)

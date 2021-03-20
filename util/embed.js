const Discord = require('discord.js')

const discordEmbedMessage = (
  url,
  title,
  user,
  createdAt,
  assignees,
  reviewers,
  labels,
  avatar,
  repo
) => {
  const assigneeNames = assignees.map(u => u.login)
  const reviewerNames = reviewers.map(u => u.login)
  const embed = new Discord.MessageEmbed()
    .setColor('#4785ff')
    .setTitle('Pull Request')
    .setURL(url)
    .setAuthor(user.login)
    .setDescription(title)
    .addFields(
      { name: 'Repository:', value: repo },
      {
        name: 'Reviewers:',
        value: reviewerNames.length
          ? reviewerNames.join(', ')
          : 'No reviewers added'
      },
      {
        name: 'Assignee:',
        value: assigneeNames.length
          ? assigneeNames.join(', ')
          : 'No assignees added'
      },
      { name: 'Type', value: labels.length > 0 ? labels[0].name : 'No Labels' }
    )
    .setImage(
      'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
    )
    .setThumbnail(avatar)
    .setFooter('Created at ' + createdAt)
  return embed
}

module.exports = discordEmbedMessage

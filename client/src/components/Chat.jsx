import ChatAction from './CommentAction'
import ChatActions from './CommentActions'
import ChatAuthor from './CommentAuthor'


export { default as Chat } from './views/Comment'
export { default as ChatSearchFriends } from './views/Comment/CommentAction'
export { default as ChatFriendMessage } from './views/Comment/CommentActions'
export { default as ChatUserMessage } from './views/Comment/CommentAuthor'
export { default as ChatInputField } from './views/Comment/CommentAuthor'
export { default as ChatButton } from './views/Comment/CommentAuthor'

Chat.Author = CommentAuthor
Chat.Action = CommentAction
Chat.Actions = CommentActions
Chat.Avatar = CommentAvatar
Chat.Content = CommentContent
Chat.Group = CommentGroup
Chat.Metadata = CommentMetadata
Chat.Text = CommentText

export default Chat
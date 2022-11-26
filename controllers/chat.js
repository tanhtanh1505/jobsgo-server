const ConversationModel = require("../models/conersation");
const MessageModel = require("../models/message");
const { v4: uuidv4 } = require("uuid");
const { json } = require("express");

class ChatController {
  //get list conversation of user
  getListConversations = async (req, res) => {
    var conversation1 = await ConversationModel.find({ firstUser: req.user.id });
    var conversation2 = await ConversationModel.find({ secondUser: req.user.id });
    var conversation = conversation1.concat(conversation2);
    var listMessage = [];
    for (var i = 0; i < conversation.length; i++) {
      listMessage.push(conversation[i]);
    }
    return res.status(200).json(listMessage);
  };

  // get conversation with other user. If not exist, create new one
  getConversation = async (req, res) => {
    var conversation = await ConversationModel.findOne({ firstUser: req.user.id, secondUser: req.body.friendId });
    if (conversation) {
      return res.status(200).send(conversation);
    }
    conversation = await ConversationModel.findOne({ firstUser: req.body.friendId, secondUser: req.user.id });
    if (conversation) {
      return res.status(200).send(conversation);
    }
    const id = uuidv4();
    conversation = await ConversationModel.create({ id: id, firstUser: req.user.id, secondUser: req.body.friendId });
    return res.status(200).send(conversation);
  };

  saveMessage = async (conversationId, message) => {
    const id = uuidv4();
    const messageData = await MessageModel.create({ id, conversationId, content: message.content, sender: message.sender, status: message.status });
    await ConversationModel.update({ lastMsg: id }, conversationId);
    return json(messageData);
  };

  getLastMessage = async (req, res) => {
    var conversation = await ConversationModel.findOne({ id: req.params.id, firstUser: req.user.id });
    if (!conversation) {
      conversation = await ConversationModel.findOne({ id: req.params.id, secondUser: req.user.id });
    }
    if (!conversation) {
      return res.status(404).send("Conversation not found");
    }
    const message = await MessageModel.findOne({ id: conversation.lastMsg });
    return res.status(200).send(message);
  };

  getListMessage = async (req, res) => {
    var conversation = await ConversationModel.findOne({ id: req.params.conversationId, firstUser: req.user.id });
    if (!conversation) {
      conversation = await ConversationModel.findOne({ id: req.params.conversationId, secondUser: req.user.id });
    }
    if (!conversation) {
      return res.status(404).send("Conversation not found");
    }
    const messages = await MessageModel.find({ conversationId: req.params.conversationId });
    return res.status(200).send(messages);
  };

  getNumberLastMessage = async (req, res) => {
    var conversation = await ConversationModel.findOne({ id: req.params.conversationId, firstUser: req.user.id });
    if (!conversation) {
      conversation = await ConversationModel.findOne({ id: req.params.conversationId, secondUser: req.user.id });
    }
    if (!conversation) {
      return res.status(404).send("Conversation not found");
    }
    const messages = await MessageModel.findLimit({ conversationId: req.params.conversationId }, req.params.number);
    return res.status(200).send(messages);
  };
}

module.exports = new ChatController();

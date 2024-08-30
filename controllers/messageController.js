import Message from "../models/Message.js";
import { NlpManager } from 'node-nlp';

// Initialize the NLP Manager
const manager = new NlpManager({ languages: ['en'] });

// Function to train the model
const trainModel = async () => {
    // Add training data for greetings
    manager.addDocument('en', 'Hello', 'greeting.hello');
    manager.addDocument('en', 'Hi', 'greeting.hello');
    manager.addDocument('en', 'How are you?', 'greeting.howareyou');

    manager.addAnswer('en', 'greeting.hello', 'Hello! How can I help you?');
    manager.addAnswer('en', 'greeting.howareyou', 'I am doing great, thank you for asking!');

    // Add training data for plans
    manager.addDocument('en', 'Tell me about the Premium plan', 'plans.premium');
    manager.addDocument('en', 'What does the Basic plan include?', 'plans.basic');
    manager.addDocument('en', 'What is the Standard plan?', 'plans.standard');

    manager.addAnswer('en', 'plans.premium', 'Our Premium plan includes features X, Y, and Z. It is designed for those who need extensive functionality and support.');
    manager.addAnswer('en', 'plans.basic', 'The Basic plan includes features A and B. It is suitable for users with standard needs.');
    manager.addAnswer('en', 'plans.standard', 'The Standard plan offers features C and D. It is a middle ground between Basic and Premium.');

    // Add training data for cybersecurity
    manager.addDocument('en', 'What are vulnerabilities?', 'cybersecurity.vulnerabilities');
    manager.addDocument('en', 'Tell me about vulnerabilities', 'cybersecurity.vulnerabilities');
    manager.addDocument('en', 'What do you do in cybersecurity?', 'cybersecurity.whatwedo');

    manager.addAnswer('en', 'cybersecurity.vulnerabilities', 'Vulnerabilities are weaknesses in a system that can be exploited by attackers. Common types include software bugs, misconfigurations, and insecure designs.');
    manager.addAnswer('en', 'cybersecurity.whatwedo', 'We offer penetration testing, vulnerability assessments, and security consulting to help protect your systems from threats.');

    // Add training data for services
    manager.addDocument('en', 'What services do you offer?', 'services.whatwedo');
    manager.addDocument('en', 'Tell me about your services', 'services.whatwedo');

    manager.addAnswer('en', 'services.whatwedo', 'We provide penetration testing, motor application development, and web development services to ensure robust and secure solutions for our clients.');

    // Add a default response
    manager.addDocument('en', 'What else can you do?', 'default');
    manager.addDocument('en', 'Can you help with something else?', 'default');
    manager.addDocument('en', 'I have a different question', 'default');

    manager.addAnswer('en', 'default', 'Sorry, I don\'t understand that question. Can you please ask something else?');

    // Train the model
    await manager.train();
    manager.save();
};

// Load the trained model
const loadModel = async () => {
    try {
        await manager.load();
    } catch (err) {
        console.error("Failed to load model:", err);
    }
};

// Controller to handle training the model
export const trainMessageModel = async (req, res) => {
    try {
        await trainModel();
        res.status(200).json({
            success: true,
            message: "Model trained successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to train the model, try again'
        });
    }
};

// Controller to handle creating a new chatbot message
export const createMessage = async (req, res) => {
    const { userMessage, userId, sessionId } = req.body;

    // Validate required fields
    if (!userMessage || !userId || !sessionId) {
        return res.status(400).json({
            success: false,
            message: "Required fields are missing"
        });
    }

    try {
        // Load the model if not already loaded
        await loadModel();

        // Process the user message with Node-NLP
        const response = await manager.process('en', userMessage);
        const chatbotResponse = response.answer || "Sorry, I don't understand.";

        // Save the message and response
        const newMessage = new Message({
            userMessage,
            chatbotResponse,
            userId,
            sessionId
        });

        const savedMessage = await newMessage.save();
        res.status(200).json({
            success: true,
            message: "Message saved successfully",
            data: savedMessage
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Message not saved, try again'
        });
    }
};

// Controller to update a chatbot message
export const updateMessage = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedMessage = await Message.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({
            success: true,
            message: "Successfully updated message",
            data: updatedMessage
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Message not updated, try again'
        });
    }
};

// Controller to delete a chatbot message
export const deleteMessage = async (req, res) => {
    const id = req.params.id;
    try {
        await Message.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Message deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete message'
        });
    }
};

// Controller to find a specific chatbot message
export const findMessage = async (req, res) => {
    const id = req.params.id;
    try {
        const findSingleMessage = await Message.findById(id);
        res.status(200).json({
            success: true,
            message: 'Message details found',
            data: findSingleMessage
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Cannot find the message'
        });
    }
};

// Controller to find all chatbot messages with pagination
export const findAllMessages = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    try {
        const allMessages = await Message.find({}).populate('userId').skip(page * 10).limit(10); // Adjust limit as needed
        res.status(200).json({
            success: true,
            count: allMessages.length,
            message: 'All messages available',
            data: allMessages
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'No messages available'
        });
    }
};

// Controller to get message count
export const getMessageCounts = async (req, res) => {
    try {
        const messageCount = await Message.estimatedDocumentCount();
        res.status(200).json({
            success: true,
            message: 'Message count retrieved',
            data: messageCount,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Failed to retrieve message count'
        });
    }
};

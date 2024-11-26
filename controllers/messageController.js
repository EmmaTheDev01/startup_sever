import Message from "../models/Message.js";
import { NlpManager } from "node-nlp";

const manager = new NlpManager({ languages: ["en"] });

// Flag to check if model is already loaded
let modelLoaded = false;

// Check if the model is trained and loaded into memory
const loadModel = async () => {
  if (!modelLoaded) {
    try {
      await manager.load();
      modelLoaded = true;
    } catch (err) {
      console.error("Failed to load model:", err);
    }
  }
};
// Function to train the model
const trainModel = async () => {
  // Check if model is already trained (use a flag or check file existence)
  try {
    const isModelTrained = await checkIfModelExists(); // Implement a check for existing model
    if (isModelTrained) return; // Skip training if model exists
  } catch (err) {
    console.error("Error checking model existence:", err);
  }

  // Add training data for greetings
  manager.addDocument("en", "Hello", "greeting.hello");
  manager.addDocument("en", "Hi", "greeting.hello");
  manager.addDocument("en", "How are you?", "greeting.howareyou");

  manager.addAnswer("en", "greeting.hello", "Hello! How can I help you?");
  manager.addAnswer(
    "en",
    "greeting.howareyou",
    "I am doing great, thank you for asking!"
  );

  // Add training data for plans
  manager.addDocument("en", "Tell me about the Premium plan", "plans.premium");
  manager.addDocument("en", "What does the Basic plan include?", "plans.basic");
  manager.addDocument("en", "What is the Standard plan?", "plans.standard");

  manager.addAnswer(
    "en",
    "plans.premium",
    "Our Premium plan includes features X, Y, and Z. It is designed for those who need extensive functionality and support."
  );
  manager.addAnswer(
    "en",
    "plans.basic",
    "The Basic plan includes features A and B. It is suitable for users with standard needs."
  );
  manager.addAnswer(
    "en",
    "plans.standard",
    "The Standard plan offers features C and D. It is a middle ground between Basic and Premium."
  );

  // Add training data for cybersecurity
  // Vulnerabilities
  manager.addDocument(
    "en",
    "What are vulnerabilities?",
    "cybersecurity.vulnerabilities"
  );
  manager.addDocument(
    "en",
    "Tell me about vulnerabilities",
    "cybersecurity.vulnerabilities"
  );
  manager.addDocument(
    "en",
    "What do you do in cybersecurity?",
    "cybersecurity.whatwedo"
  );

  manager.addAnswer(
    "en",
    "cybersecurity.vulnerabilities",
    "Vulnerabilities are weaknesses in a system that can be exploited by attackers. Common types include software bugs, misconfigurations, and insecure designs."
  );
  manager.addAnswer(
    "en",
    "cybersecurity.whatwedo",
    "We offer penetration testing, vulnerability assessments, and security consulting to help protect your systems from threats."
  );

  // Malware
  manager.addDocument("en", "What is malware?", "cybersecurity.malware");
  manager.addDocument("en", "Tell me about malware", "cybersecurity.malware");
  manager.addDocument(
    "en",
    "What types of malware exist?",
    "cybersecurity.malware"
  );

  manager.addAnswer(
    "en",
    "cybersecurity.malware",
    "Malware refers to any software intentionally designed to cause damage to a computer, server, or network. Types of malware include viruses, worms, Trojans, and ransomware."
  );

  // Phishing
  manager.addDocument("en", "What is phishing?", "cybersecurity.phishing");
  manager.addDocument("en", "Tell me about phishing", "cybersecurity.phishing");
  manager.addDocument(
    "en",
    "How can I protect myself from phishing attacks?",
    "cybersecurity.phishing"
  );

  manager.addAnswer(
    "en",
    "cybersecurity.phishing",
    "Phishing is a form of cyber attack where attackers try to trick individuals into revealing sensitive information, such as passwords and credit card details, by pretending to be a trustworthy entity."
  );
  manager.addAnswer(
    "en",
    "cybersecurity.phishing",
    "To protect yourself from phishing, always check the email address of the sender, do not click on suspicious links, and avoid sharing personal details through email."
  );

  // Firewalls
  manager.addDocument("en", "What is a firewall?", "cybersecurity.firewall");
  manager.addDocument(
    "en",
    "How does a firewall protect a network?",
    "cybersecurity.firewall"
  );

  manager.addAnswer(
    "en",
    "cybersecurity.firewall",
    "A firewall is a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules. It acts as a barrier between trusted internal networks and untrusted external networks."
  );

  // Data Protection & Encryption
  manager.addDocument(
    "en",
    "What is data protection?",
    "cybersecurity.dataprotection"
  );
  manager.addDocument(
    "en",
    "How can I protect my data?",
    "cybersecurity.dataprotection"
  );
  manager.addDocument("en", "What is encryption?", "cybersecurity.encryption");

  manager.addAnswer(
    "en",
    "cybersecurity.dataprotection",
    "Data protection involves securing sensitive data from unauthorized access, corruption, or loss. This includes using encryption, access controls, and regular backups."
  );
  manager.addAnswer(
    "en",
    "cybersecurity.encryption",
    "Encryption is the process of converting data into a coded format to prevent unauthorized access. Only authorized parties with the decryption key can access the original data."
  );

  // DDoS Attacks
  manager.addDocument("en", "What is a DDoS attack?", "cybersecurity.ddos");
  manager.addDocument("en", "Tell me about DDoS attacks", "cybersecurity.ddos");

  manager.addAnswer(
    "en",
    "cybersecurity.ddos",
    "A Distributed Denial of Service (DDoS) attack is a malicious attempt to disrupt the normal traffic of a targeted server, service, or network by overwhelming it with a flood of internet traffic from multiple sources."
  );

  // Zero-Day Vulnerabilities
  manager.addDocument(
    "en",
    "What is a zero-day vulnerability?",
    "cybersecurity.zeroday"
  );
  manager.addDocument(
    "en",
    "Tell me about zero-day vulnerabilities",
    "cybersecurity.zeroday"
  );

  manager.addAnswer(
    "en",
    "cybersecurity.zeroday",
    "A zero-day vulnerability is a security flaw that is unknown to the software vendor or developer. Attackers exploit these flaws before the vendor has an opportunity to release a patch, making them extremely dangerous."
  );

  // Social Engineering Attacks
  manager.addDocument(
    "en",
    "What is social engineering?",
    "cybersecurity.socialengineering"
  );
  manager.addDocument(
    "en",
    "Tell me about social engineering attacks",
    "cybersecurity.socialengineering"
  );

  manager.addAnswer(
    "en",
    "cybersecurity.socialengineering",
    "Social engineering is a technique used by cyber attackers to manipulate individuals into revealing confidential information by exploiting human psychology rather than technical vulnerabilities."
  );

  // Incident Response
  manager.addDocument(
    "en",
    "What is incident response?",
    "cybersecurity.incidentresponse"
  );
  manager.addDocument(
    "en",
    "How do I respond to a cybersecurity incident?",
    "cybersecurity.incidentresponse"
  );

  manager.addAnswer(
    "en",
    "cybersecurity.incidentresponse",
    "Incident response is the process of handling a security breach or cyberattack. It involves identifying the attack, containing the damage, eradicating the threat, and recovering from the incident."
  );

  // Penetration Testing (Pentest)
  manager.addDocument(
    "en",
    "What is penetration testing?",
    "cybersecurity.pentest"
  );
  manager.addDocument(
    "en",
    "Tell me about penetration testing",
    "cybersecurity.pentest"
  );
  manager.addDocument(
    "en",
    "How does penetration testing work?",
    "cybersecurity.pentest"
  );
  manager.addDocument(
    "en",
    "Why should I get penetration testing?",
    "cybersecurity.pentest"
  );
  manager.addDocument(
    "en",
    "What do you do in penetration testing?",
    "cybersecurity.pentest"
  );

  manager.addAnswer(
    "en",
    "cybersecurity.pentest",
    "Penetration testing, or pentesting, is a simulated cyber attack conducted by ethical hackers to identify vulnerabilities in a system. It helps organizations discover weaknesses before malicious attackers can exploit them."
  );
  manager.addAnswer(
    "en",
    "cybersecurity.pentest",
    "We conduct thorough penetration tests to assess the security of your applications, networks, and systems. Our ethical hackers attempt to exploit vulnerabilities, providing you with valuable insights into how your systems can be improved."
  );
  manager.addAnswer(
    "en",
    "cybersecurity.pentest",
    "Penetration testing involves network scanning, vulnerability assessment, exploitation, and post-exploitation to simulate real-world attack scenarios. Our reports include detailed findings and recommendations to enhance your security posture."
  );
  manager.addAnswer(
    "en",
    "cybersecurity.pentest",
    "We offer different types of penetration testing: external, internal, web application, wireless, and social engineering testing to ensure your systems are well-secured against all potential attack vectors."
  );

  // Add training data for services
  manager.addDocument("en", "What services do you offer?", "services.whatwedo");
  manager.addDocument("en", "Tell me about your services", "services.whatwedo");

  manager.addAnswer(
    "en",
    "services.whatwedo",
    "We provide penetration testing, vulnerability assessments, security audits, social engineering assessments, motor application development, and web development services to ensure robust and secure solutions for our clients."
  );

  // Add a default response
  manager.addDocument("en", "What else can you do?", "default");
  manager.addDocument("en", "Can you help with something else?", "default");
  manager.addDocument("en", "I have a different question", "default");

  manager.addAnswer(
    "en",
    "default",
    "Sorry, I don't understand that question. Can you please ask something else?"
  );

  // Train the model
  try {
    await manager.train(); // Train the model
    await manager.save(); // Save the trained model
  } catch (err) {
    console.error("Error training the model:", err);
    throw new Error("Training failed. Please check the logs.");
  }
};

// Dummy function to check if model exists (can be replaced with a file check or database flag)
const checkIfModelExists = async () => {
  // Implement a check if the model file or flag exists
  return false; // Return false to always train, change as needed
};

// Controller to handle training the model
export const trainMessageModel = async (req, res) => {
  try {
    await trainModel();
    res.status(200).json({
      success: true,
      message: "Model trained successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to train the model, try again",
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
      message: "Required fields are missing",
    });
  }

  try {
    // Load the model if not already loaded
    await loadModel();

    // Process the user message with Node-NLP
    const response = await manager.process("en", userMessage);
    const chatbotResponse = response.answer || "Sorry, I don't understand.";

    if (chatbotResponse === "Sorry, I don't understand.") {
      return res.status(400).json({
        success: false,
        message: "Chatbot did not generate a valid response",
      });
    }

    // Save the message and response
    const newMessage = new Message({
      userMessage,
      chatbotResponse,
      userId,
      sessionId,
    });

    const savedMessage = await newMessage.save();
    res.status(200).json({
      success: true,
      message: "Message saved successfully",
      data: savedMessage,
      chatbotResponse,
    });
  } catch (err) {
    console.error("Error processing message:", err);
    res.status(500).json({
      success: false,
      message: "Message not saved, try again",
      error: err.message || err,
    });
  }
};

// Controller to update a chatbot message
export const updateMessage = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated message",
      data: updatedMessage,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Message not updated, try again",
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
      message: "Message deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete message",
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
      message: "Message details found",
      data: findSingleMessage,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Cannot find the message",
    });
  }
};

// Controller to find all chatbot messages with pagination
export const findAllMessages = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  try {
    const allMessages = await Message.find({})
      .skip(page * 10)
      .limit(10); // Adjust limit as needed
    res.status(200).json({
      success: true,
      count: allMessages.length,
      message: "All messages available",
      data: allMessages,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "No messages available",
    });
  }
};

// Controller to get message count
export const getMessageCounts = async (req, res) => {
  try {
    const messageCount = await Message.estimatedDocumentCount();
    res.status(200).json({
      success: true,
      message: "Message count retrieved",
      data: messageCount,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Failed to retrieve message count",
    });
  }
};

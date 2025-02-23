
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Message } from "@/types/chat";

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div className="min-h-[400px] mb-20">
      {messages.map((msg, index) => (
        <motion.div 
          key={index}
          className={`mb-4 flex ${msg.isAi ? 'justify-start' : 'justify-end'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card 
            className={`p-4 max-w-[80%] ${
              msg.isAi 
                ? 'bg-gray-100' 
                : 'bg-[#0A2540] text-white'
            }`}
          >
            <p className={msg.isAi ? 'text-gray-800' : 'text-white'}>
              {msg.text}
            </p>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ChatMessages;

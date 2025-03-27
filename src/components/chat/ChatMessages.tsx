
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Message } from "@/types/chat";

interface ChatMessagesProps {
  messages: Message[];
  isLoading?: boolean;
}

const ChatMessages = ({ messages, isLoading = false }: ChatMessagesProps) => {
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
      
      {isLoading && (
        <motion.div 
          className="mb-4 flex justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Card className="p-4 bg-gray-100">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default ChatMessages;
